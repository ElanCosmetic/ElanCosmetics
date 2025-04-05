import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: "Utilizatori",
    singular: "Utilizator"
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role']
  },
  auth: {
    maxLoginAttempts: 10,
    lockTime: 300000
  },
  access: {
    admin: ({ req }) => req.user?.role === 'admin',
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true;
      return { id: { equals: req.user?.id } }
    },
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role == 'admin',
    create: () => true
  },

  fields: [
    {
      name: 'role',
      label: 'Rol utilizator',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Admin', value: 'admin' }
      ]
    },
    {
      name: 'firstName',
      label: 'Nume',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Prenume',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Nr.tel',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Adresa livrare',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'zipCode', type: 'text' },
      ],
    },
    {
      name: 'wishlist',
      label: 'Wishlist',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        hidden: true
      }
    }
  ],
}
