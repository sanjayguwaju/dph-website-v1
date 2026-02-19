import type { CollectionConfig } from 'payload'

export const PhotoGallery: CollectionConfig = {
  slug: 'photo-gallery',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
