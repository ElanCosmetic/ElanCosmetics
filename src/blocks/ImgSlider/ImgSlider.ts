import type { Block } from 'payload';

const ImgSliderBlock: Block = {
    slug: 'imgslider',
    fields: [
        {
            name: 'slides',
            type: 'array',
            fields: [
                {
                    name: 'img',
                    label: 'Imaginea',
                    type: 'relationship',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'linkType',
                    label: 'Link Tip',
                    type: 'select',
                    options: [
                        { label: 'None', value: 'none' },
                        { label: 'Link Intern', value: 'internal' },
                        { label: 'Link Extern', value: 'external' }
                    ],
                    defaultValue: 'none',
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
        }
    ]
}

export default ImgSliderBlock