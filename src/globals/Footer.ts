import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
    slug: 'footer',
    fields: [
        {
            name: 'our_adress',
            label: 'Adresele noastra',
            type: 'richText',
            localized: true
        },
        {
            name: 'social_links',
            label: 'Linkuri Sociale',
            type: 'array',
            fields: [
                {
                    name: 'social_link',
                    label: 'Url',
                    type: 'text',
                    required: true
                },
                {
                    name: 'social_icon',
                    label: 'Icon',
                    type: 'select',
                    required: true,
                    options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'TikTok', value: 'tiktok' }
                    ]
                }
            ]
        },
        {
            name: 'special_links',
            label: 'Special Links',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    label: 'Titlu',
                    type: 'text',
                    required: true,
                    localized: true
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'array',
                    required: true,
                    fields: [
                        {
                            name: 'title',
                            label: 'Titlu',
                            type: 'text',
                            required: true,
                            localized: true
                        },
                        {
                            name: 'linkType',
                            type: 'select',
                            label: 'Link Tip',
                            options: [
                                { label: 'Link Intern', value: 'internal' },
                                { label: 'Link Extern', value: 'external' }
                            ],
                            defaultValue: 'internal',
                            required: true
                        },
                        {
                            name: 'internalLink',
                            label: "Link Intern",
                            type: 'relationship',
                            relationTo: ['collection', 'products', 'termsPage'],
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.linkType === 'internal'
                            }
                        },
                        {
                            name: 'externalUrl',
                            label: "Link Extern",
                            type: 'text',
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.linkType === 'external'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}