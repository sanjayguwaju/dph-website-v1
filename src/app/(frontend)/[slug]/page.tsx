import React from "react";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const page = result.docs[0];

  if (!page) {
    return notFound();
  }

  return (
    <div className="px-4 py-8 container mx-auto">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      {page.featuredImage && (
        <div className="h-64 mb-8 rounded-lg relative w-full overflow-hidden">
          <Image
            src={(page.featuredImage as any).url}
            alt={page.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* 
        Note: RichText rendering would require a proper serializer or helper component.
        For now, just dumping raw content or simple placeholder if complex.
        Ideally use @payloadcms/richtext-lexical/react or similar if relying on lexical.
        Assuming basic JSON serialization or simple text for "run now".
      */}
      <div className="prose max-w-none">
        {/* Simplified content rendering - in a real app, use RichText from payload */}
        {JSON.stringify(page.content)}
      </div>
    </div>
  );
}
