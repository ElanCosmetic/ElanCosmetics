import { CollectionConfig, PayloadRequest } from "payload";
import { Order } from "@/payload-types";
import path from 'path';
import ejs from 'ejs';
import axios from 'axios'

export const Orders: CollectionConfig = {
    slug: 'orders',
    labels: {
        plural: "Comenzi",
        singular: "Comanda"
    },
    admin: {
        useAsTitle: 'orderNumber',
        defaultColumns: ['orderNumber', 'status', 'createdAt']
    },
    fields: [
        {
            name: 'orderNumber',
            label: 'Nr.comanda',
            type: 'number',
            unique: true,
            required: true
        },
        {
            name: 'customer',
            label: 'ID utilizator',
            type: 'relationship',
            relationTo: 'users',
            required: false
        },
        {
            name: 'guestInfo',
            label: 'Informatie utilizator anonim',
            type: 'group',
            fields: [
                { name: 'name', label: 'Nume', type: 'text' },
                { name: 'email', label: 'Email', type: 'text' },
                { name: 'phone', label: 'Nr.tel', type: 'text' },
            ],
        },
        {
            name: 'items',
            label: 'Produsele comandate',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'product',
                    label: "Produs",
                    type: 'relationship',
                    relationTo: 'products',
                    required: true
                },
                {
                    name: 'quantity',
                    label: "Cantitate",
                    type: 'number',
                    min: 1,
                    required: true
                },
                {
                    name: 'totalPrice',
                    label: 'Pret total',
                    type: 'number',
                    required: true
                }
            ]
        },
        {
            name: 'shippingAddress',
            label: 'Adresa de livrare',
            type: 'group',
            fields: [
                { name: 'fullName', type: 'text', required: true },
                { name: 'street', type: 'text', required: true },
                { name: 'city', type: 'text', required: true },
                { name: 'phone', type: 'text', required: true },
            ],
        },
        {
            name: 'subtotal',
            label: 'Subtotal',
            type: 'number',
            required: true,
        },
        {
            name: 'shippingCost',
            label: "Cost livrare",
            type: 'number',
            required: true,
        },
        {
            name: 'totalAmount',
            label: "Suma totala",
            type: 'number',
            required: true,
        },
        {
            name: 'discount',
            label: 'Reducere',
            type: 'group',
            fields: [
                { name: 'code', type: 'text', required: false },
                {
                    name: 'type',
                    type: 'select',
                    options: ['fixed', 'percent'],
                    required: false
                },
                { name: 'value', type: 'number', required: false },
            ],
        },
        {
            name: 'status',
            label: "Status",
            type: 'select',
            required: true,
            defaultValue: 'pending',
            options: [
                { label: 'În așteptare', value: 'pending' },
                { label: 'Expediată', value: 'shipped' },
                { label: 'Livrată', value: 'delivered' },
                { label: 'Anulată', value: 'cancelled' }
            ],
        },
        {
            name: 'createdAt',
            label: "Comanda a fost facuta",
            type: 'date',
            defaultValue: () => new Date().toISOString(),
        },
    ],
    access: {
        create: ({ req }) => {
            return true; // Ensure guests can create orders
        }
    },
    hooks: {
        // Trigger this after an order is created
        afterChange: [
            async ({ doc, operation, req }: { doc: Order, operation: any, req: PayloadRequest }) => {
                if (operation === 'create') {
                    const currentDate = new Date();
                    const month = currentDate.toLocaleString('default', { month: 'long' });
                    const year = currentDate.getFullYear();

                    // Replace with actual recipient email and subject
                    let recipientEmail = ''
                    if (doc.customer && typeof doc.customer === 'string') {
                        try {
                            const customer = await req.payload.findByID({
                                collection: 'users',
                                id: doc.customer,
                                depth: 1
                            })

                            if (customer && customer.email) {
                                recipientEmail = customer.email
                            }
                        } catch (error) {
                            console.error('Error fetching customer:', error);
                        }

                    }
                    if (!recipientEmail && doc.guestInfo && doc.guestInfo.email) {
                        recipientEmail = doc.guestInfo.email;
                    }

                    if (!recipientEmail) {
                        console.error('No email found for the order');
                        return; // Don't send email if no recipient email is found
                    }

                    const items = await Promise.all(doc.items.map(async (item) => {
                        const product = await req.payload.findByID({
                            collection: 'products',
                            id: typeof item.product === 'string' ? item.product : item.product.id,
                            locale: 'ro', // specify the locale
                        });

                        return {
                            productName: product.title, // assuming `title` is localized
                            quantity: item.quantity,
                            totalPrice: item.totalPrice,
                        };
                    }));

                    const templatePath = path.resolve(process.cwd(), 'src', 'app', 'utils', 'orderConfirmation', 'orderConfirmation.html');
                    const htmlContent = await ejs.renderFile(templatePath, {
                        month,
                        year,
                        items,
                        totalAmount: doc.totalAmount,
                    });

                    const subject = 'Order Confirmation';

                    try {
                        req.payload.sendEmail({
                            from: 'noreply@elencosmetic.com',
                            to: recipientEmail,
                            subject: subject,
                            html: htmlContent,
                        });
                    } catch (error) {
                        console.error('Error sending email:', error);
                    }

                    try {
                        await axios.post("https://api.telegram.org/bot7621828283:AAGQ_1kxpeIo6xe8mv7OpmKg3XLzA8NJSrI/sendMessage", {
                            chat_id: "455247765",
                            text: `🛒 O comandă nouă a fost efectuată\n\nNr. comandă: ${doc.orderNumber}\nTotal: ${doc.totalAmount}mdl`
                        });
                    } catch (error) {
                        console.error("Error sending message to Telegram:", error);
                    }
                }
            },
        ],
    },
};