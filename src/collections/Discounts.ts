import type { CollectionConfig } from "payload";

export const Discounts: CollectionConfig = {
  slug: 'discounts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'discountType', 'amount']
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Discount Titlu',
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      label: 'Discount Code',
      unique: true,
    },
    {
      name: 'discountType',
      type: 'select',
      required: true,
      label: 'Tip de Discount',
      options: [
        { label: 'Procent', value: 'percent' },
        { label: 'Sumă fixă', value: 'fixed' },
      ],
      defaultValue: 'percent',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Discount Valoare',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData.discountType === 'percent' || siblingData.discountType === 'fixed',
      },
    },
    {
      name: 'minimumOrderAmount',
      type: 'number',
      label: 'Suma minima a comenzii',
      required: false,
      min: 0,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Utilizator Asociat',
      required: false,
      hasMany: false,
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Când începe',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Când expiră',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Activ',
      defaultValue: true,
    },
  ],
};
