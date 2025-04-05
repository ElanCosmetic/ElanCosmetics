import type { CollectionConfig } from "payload";

export const CustomerContactMessages: CollectionConfig = {
    slug: 'customerContactMessages',
    labels: {
        plural: "Mesajele de la contact",
        singular: "Mesaj de la contact"
    },
    admin: {
        defaultColumns: ['message', 'customer', 'createdAt']
    },
    fields: [
        {
            name: 'customer',
            label: 'Utilizator',
            type: 'group',
            fields: [
                {
                    name: 'name',
                    label: 'Nume',
                    type: 'text',
                    required: true
                },
                {
                    name: 'secondName',
                    label: 'Prenume',
                    type: 'text',
                    required: true
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'text',
                    required: true
                },
                {
                    name: 'phone',
                    label: 'Telefon',
                    type: 'text',
                    required: true
                },
            ]
        },
        {
            name: 'message',
            label: 'Mesaj',
            type: 'text',
            required: true
        }
    ],
    access: {
        create: () => true
    }
}