import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { News } from './collections/News'
import { Officials } from './collections/Officials'
import { Services } from './collections/Services'
import { HeroSlides } from './collections/HeroSlides'
import { PhotoGallery } from './collections/PhotoGallery'
import { VideoGallery } from './collections/VideoGallery'
import { VendorApplications } from './collections/VendorApplications'
import { Notices } from './collections/Notices'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    News,
    Officials,
    Services,
    HeroSlides,
    PhotoGallery,
    VideoGallery,
    VendorApplications,
    Notices,
  ],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return [
            ...defaultFields,
            {
              name: 'customField',
              type: 'text',
            },
          ]
        },
      },
    }),
  ],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Nepali',
        code: 'ne',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
})
