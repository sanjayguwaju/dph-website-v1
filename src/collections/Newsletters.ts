import { CollectionConfig } from "payload";

export const Newsletters: CollectionConfig = {
  slug: "newsletters",
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
  ],
};
