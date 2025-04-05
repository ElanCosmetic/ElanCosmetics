'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';
import { Form } from "@/components/ui/form";
import { useCartStore } from '../../useCartStore';
import { CheckoutFormValues, FormSchema } from "./CheckoutSchema";
import DeliveryForm from './forms/DeliveryForm';
import PaymentForm from './forms/PaymentForm';
const CheckoutForm = ({ userId }: { userId: string | null }) => {
    const items = useCartStore(state => state.items);
    const discount = useCartStore(state => state.discount);
    const [isLoading, setIsLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState<'success' | 'error' | null>(null);

    const schema = FormSchema();

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = discount
        ? discount.type === "percent"
            ? (subtotal * discount.value) / 100
            : discount.value
        : 0;

    const totalAmount = subtotal - discountAmount;

    const defaultValues: CheckoutFormValues = useMemo(() => ({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        terms: false,
        numerar: false,
        customer: userId,
        guestInfo: { name: '', email: 'daniel@gmail.com', phone: '' },
        subtotal,
        totalAmount,
        shippingCost: 0,
        items: items.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
        })),
        discount: discount ? discount : {
            code: "",
            type: "percent",
            value: 0
        }
    }), [userId, items, discount, subtotal, totalAmount])

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(schema),
        defaultValues
    });

    useEffect(() => {
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const discountAmount = discount
            ? discount.type === "percent"
                ? (subtotal * discount.value) / 100
                : discount.value
            : 0;
        const totalAmount = subtotal - discountAmount;

        form.reset({
            ...defaultValues,
            items: items.map(item => ({
                product: item.productId,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity,
            })),
            subtotal,
            totalAmount,
            discount: discount ? discount : {
                code: "",
                type: "percent",
                value: 0
            }
        });
    }, [items, discount, form, defaultValues]);

    async function onSubmit(values: CheckoutFormValues) {
        setIsLoading(true);
        setOrderStatus(null);

        const orderNumber = Math.floor(Math.random() * 1000000);
        const orderData = {
            orderNumber: orderNumber,
            customer: values.customer,
            guestInfo: userId ? { name: '', email: '', phone: '' } : {
                name: values.name,
                email: values.email,
                phone: values.phone,
            },
            items: values.items,
            shippingAddress: {
                fullName: values.name,
                street: values.address,
                city: values.city,
                phone: values.phone,
            },
            subtotal: values.subtotal,
            shippingCost: values.shippingCost,
            totalAmount: values.totalAmount,
            discount: values.discount,
            status: 'pending'
        }

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            if (response.ok) {
                setOrderStatus('success');
            } else {
                setOrderStatus('error');
            }
        } catch (error) {
            setOrderStatus('error');
            console.error("Order Failed", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10'>
                <DeliveryForm form={form} />
                <PaymentForm form={form} isLoading={isLoading} orderStatus={orderStatus} />
            </form>
        </Form>
    );
};

export default CheckoutForm;
