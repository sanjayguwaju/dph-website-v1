import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "designation", "department", "order"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "designation",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "department",
      type: "text",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Chief Guest / Chairperson", value: "chief" },
        { label: "Medical Superintendent", value: "superintendent" },
        { label: "Information Officer", value: "information_officer" },
        { label: "Doctor", value: "doctor" },
        { label: "Staff", value: "staff" },
      ],
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "showOnHomepage",
      type: "checkbox",
      defaultValue: false,
      label: "Display on Homepage",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower number = higher priority",
      },
    },
  ],
};
