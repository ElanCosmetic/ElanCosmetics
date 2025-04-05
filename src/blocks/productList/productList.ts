import type { Block } from "payload";

const ProductListBlock: Block = {
    slug: 'productList',
    fields: [
        {
            name: 'title',
            label: 'Titlu',
            type: 'text',
            required: true,
            localized: true
        },
        {
            name: 'category',
            label: 'Colectia',
            type: 'relationship',
            relationTo: 'collection',
            required: true
        }
    ]
}

export default ProductListBlock;