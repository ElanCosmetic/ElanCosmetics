import type { CollectionConfig } from "payload";

export const Volume: CollectionConfig = {
    slug: 'volume',
    labels: {
        plural: "Volume",
        singular: "Volum"
    },
    admin: {
        useAsTitle: 'slug',
        defaultColumns: ['slug', 'createdAt']
    },
    fields: [
        {
            name: 'slug',
            label: 'Titlu',
            type: 'text',
            required: true,
            unique: true
        },
        {
            name: 'assignProducts',
            type: 'relationship',
            label: 'Produse atribuite',
            relationTo: 'products',
            hasMany: true,
            admin: {
                hidden: true
            }
        }
    ],
    access: {
        read: () => true
    }
}