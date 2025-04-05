import type { Block } from 'payload';

const GeneralBigCategoriesBlock: Block = {
    slug: 'general-big-categories',
    fields: [
        {
            name: 'categories',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    label: "Imagine",
                    type: 'relationship',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'linkType',
                    label: 'Link Tip',
                    type: 'select',
                    options: [
                        { label: 'Link Intern', value: 'internal' },
                        { label: 'Link Extern', value: 'external' }
                    ],
                    defaultValue: 'internal',
                    required: true
                },
                {
                    name: 'internalLink',
                    type: 'relationship',
                    relationTo: ['collection', 'products'],
                    admin: {
                        condition: (_, siblingData) => siblingData.linkType === 'internal'
                    }
                },
                {
                    name: 'externalUrl',
                    type: 'text',
                    admin: {
                        condition: (_, siblingData) => siblingData.linkType === 'external'
                    }
                }
            ],
            required: true,
            minRows: 1,
            maxRows: 2
        }
    ]
}

export default GeneralBigCategoriesBlock