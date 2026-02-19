import type { CollectionConfig } from 'payload'

export const VendorApplications: CollectionConfig = {
  slug: 'vendor-applications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['trackingCode', 'name', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Public can create
    read: ({ req: { user } }) => Boolean(user), // Only admin can read all
    update: ({ req: { user } }) => Boolean(user), // Only admin can update
    delete: ({ req: { user } }) => Boolean(user), // Only admin can delete
  },
  fields: [
    {
      name: 'trackingCode',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ operation, value }) => {
            if (operation === 'create') {
              // Simple random 8-char string
              return Math.random().toString(36).substring(2, 10).toUpperCase()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Organization / Firm Name',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'contactPerson',
          type: 'text',
          required: true,
          label: 'Contact Person Name',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'correspondenceAddress',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'mobile',
          type: 'text',
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'serviceCategory',
      type: 'select',
      required: true,
      options: [
        { label: 'Goods Supply', value: 'goods' },
        { label: 'Construction Work', value: 'construction' },
        { label: 'Consultancy Services', value: 'consultancy' },
        { label: 'Other Services', value: 'other' },
      ],
    },
    {
      name: 'serviceDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'documents',
      type: 'group',
      fields: [
        {
          name: 'firmRegistration',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Firm Registration Certificate',
        },
        {
          name: 'vatPan',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'VAT / PAN Registration',
        },
        {
          name: 'taxClearance',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Tax Clearance Certificate',
        },
        {
          name: 'license',
          type: 'upload',
          relationTo: 'media',
          label: 'License / Permit (if applicable)',
        },
      ],
    },
  ],
}
