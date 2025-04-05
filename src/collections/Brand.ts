import type { CollectionConfig } from "payload";

export const Brand: CollectionConfig = {
    slug: 'brand',
    labels: {
        plural: "Branduri",
        singular: "Brand"
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
            required: true
        },
        {
            name: 'associated_collection',
            label: 'Colectia asociata',
            type: 'relationship',
            relationTo: 'collection'
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
        read: () => true,
    }
}