import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    labels: {
        plural: "Produse",
        singular: "Produs"
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'productCode', 'featuredImg', 'status'],
        listSearchableFields: ['title', 'productCode']
    },
    fields: [
        {
            name: 'title',
            label: 'Titlu',
            type: 'text',
            index: true,
            required: true,
            localized: true,
        },
        {
            name: 'status',
            label: 'Stare',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Public', value: 'published' }
            ],
            defaultValue: 'published',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'productCode',
            label: 'CodProdus',
            type: "text",
            index: true
        },
        {
            name: 'featuredImg',
            label: 'Imagine Principala',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' }
            },
            required: true
        },
        {
            name: 'media',
            label: 'Media',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true
        },
        {
            name: 'brandRelation',
            label: 'Brand',
            type: 'relationship',
            relationTo: 'brand',
        },
        {
            name: 'price',
            label: 'Pret',
            type: 'number',
            required: true
        },
        {
            name: 'compare_price',
            label: 'Pret comparatie',
            type: 'number',
        },
        {
            name: 'description',
            label: 'Descriere',
            type: 'richText',
            localized: true,
        },
        {
            name: 'ingredients',
            label: 'Ingrediente',
            type: 'text',
            localized: true
        },
        {
            name: 'stock',
            label: 'Stock',
            type: 'number',
            admin: {
                hidden: true
            }
        },
        {
            name: 'volumeRelation',
            label: 'Volum',
            type: 'relationship',
            relationTo: 'volume',
        },
        {
            name: 'relatedCollections',
            type: 'join',
            collection: 'collection',
            on: 'products',
            admin: {
                hidden: true
            }
        }
    ],
    access: {
        read: ({ req }) => {
            if (req?.user?.role === "admin") {
                return true; // Admins can see all products
            }
            return {
                status: {
                    equals: "published"
                }
            };
        }
    }
};
