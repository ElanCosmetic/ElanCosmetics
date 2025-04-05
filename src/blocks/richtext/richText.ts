import type { Block } from "payload";

const richText: Block = {
    slug: 'richtext',
    fields: [
        {
            name: 'Description',
            type: 'richText',
            required: true
        }
    ]
}

export default richText;