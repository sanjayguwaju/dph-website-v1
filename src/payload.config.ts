import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Articles } from "./collections/Articles";
import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
// import { HeroSlides } from './collections/HeroSlides' // User didn't request this in new structure, but I left the file. User requested Banner block.
import { PhotoGallery } from "./collections/PhotoGallery";
import { VideoGallery } from "./collections/VideoGallery";
import { Comments } from "./collections/Comments";
import { Notices } from "./collections/Notices";
import { Tags } from "./collections/Tags";
import { Newsletters } from "./collections/Newsletters";
import { Navigation } from "./globals/Navigation";
import { Footer } from "./globals/Footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
    Articles,
    Authors,
    Categories,
    // HeroSlides,
    PhotoGallery,
    VideoGallery,
    Comments,
    Notices,
    Tags,
    Newsletters,
  ],
  globals: [Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
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
              name: "customField",
              type: "text",
            },
          ];
        },
      },
    }),
  ],
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Nepali",
        code: "ne",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
});
