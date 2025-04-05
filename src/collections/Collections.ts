import type { CollectionConfig } from "payload";

export const Collection: CollectionConfig = {
    slug: 'collection',
    labels: {
        plural: "Colectii",
        singular: "Colectie"
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'products'],
    },
    fields: [
        {
            name: 'title',
            label: 'Titlu',
            type: 'text',
            required: true,
            localized: true,
            unique: true
        },
        {
            name: 'products',
            label: "Produse",
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            index: true
        },
        {
            name: 'all_products',
            label: "Adauga toate produsele de pe site",
            type: "checkbox"
        }
    ],
    access: {
        read: () => true
    },
    hooks: {
        beforeChange: [
            async ({ data, req }) => {
                if (data.all_products) {
                    const allProducts = await req.payload.find({
                        collection: 'products',
                        limit: 10000, // Ensure we fetch all products (adjust if needed)
                    });

                    if (allProducts && allProducts.docs.length > 0) {
                        data.products = allProducts.docs.map(product => product.id);
                    }
                }
                return data;
            }
        ]
    },
};
