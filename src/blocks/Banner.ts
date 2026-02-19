import { Block } from "payload";

export const Banner: Block = {
  slug: "banner",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};
