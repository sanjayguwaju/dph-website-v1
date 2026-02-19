import React from "react";
import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@/payload.config";
import { PayloadForm } from "@/components/forms/payload-form";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FormPage({ params }: PageProps) {
  const { slug } = await params;
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  try {
    const result = await payload.find({
      collection: "forms",
      where: {
        id: {
          equals: slug, // Assuming we use ID for now as form builder default doesn't enforce slug uniqueness on main "forms" collection in older versions or might just be easier. Actually let's try to find by ID if it's an ID-like string or... wait, the plugin creates a "forms" collection.
          // Let's assume the user navigates to /forms/<ID> for simplicity first, or we can query by a field if we add one.
          // The default plugin has an 'id' field. Let's use ID for the URL for now: /forms/[id].
          // If the user wants a slug, they might need to extend the collection.
          // Wait, standard payload collections usually have IDs.
        },
      },
    });

    // Actually, usually we want to query by a slug if it exists.
    // The default form builder plugin structure:
    // It creates a 'forms' collection.
    // Let's assume we are passing the ID in the URL for now as it's guaranteed.
    // If the user provided a slug field in the config overrides (which we didn't add yet explicitly), we could use that.

    // Let's try to find by ID first.
    let form = null;

    try {
      form = await payload.findByID({
        collection: "forms",
        id: slug,
      });
    } catch (e) {
      // If ID find fails, it might be a slug or invalid ID.
      // But for now let's just Stick to ID.
    }

    if (!form) {
      return notFound();
    }

    return (
      <div className="py-10 px-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-6">{form.title}</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <PayloadForm form={form} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
