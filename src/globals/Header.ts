import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
    slug: 'header',
    fields: [
        {
            name: 'upperHeader',
            label: 'Sus header',
            type: 'text',
            localized: true
        },
        {
            name: 'logo',
            label: 'Logo',
            type: 'relationship',
            relationTo: 'media',
            required: true
        },
        {
            name: 'menuItems',
            label: 'Menu Itemi',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'label',
                    label: 'Denumirea',
                    type: 'text',
                    required: true,
                    localized: true
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
                },
                {
                    name: 'subItems',
                    label: 'Itemi nivel 2',
                    type: 'array',
                    fields: [
                        {
                            name: 'label',
                            label: 'Denumirea',
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
                            label: 'Link Extern',
                            type: 'text',
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.linkType === 'external'
                            }
                        },
                        {
                            name: 'subSubItems',
                            label: 'Itemi nivel 3',
                            type: 'array',
                            fields: [
                                {
                                    name: 'label',
                                    label: 'Denumirea',
                                    type: 'text',
                                    required: true,
                                    localized: true
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
                    ],
                }
            ]
        }
    ]
};
