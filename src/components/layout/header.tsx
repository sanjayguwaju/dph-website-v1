import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";

export const Header = async () => {
  const payload = await getPayload({ config });
  const header = await payload.findGlobal({
    slug: "navigation",
    depth: 1,
  });

  const logoUrl = (header.logo as any)?.url;

  return (
    <header className="bg-white shadow">
      <div className="px-4 py-4 container mx-auto flex items-center justify-between">
        <Link href="/" className="gap-2 flex items-center">
          {logoUrl && (
            <div className="w-12 h-12 relative">
              <Image src={logoUrl} alt="Logo" fill style={{ objectFit: "contain" }} priority />
            </div>
          )}
          <div className="font-bold text-xl text-gray-800">Dhaulagiri Hospital</div>
        </Link>
        <nav className="md:flex gap-6 hidden">
          {header.navItems?.map((item: any, i: number) => {
            const href =
              item.link.type === "reference" ? `/${item.link.reference?.slug}` : item.link.url;

            // Handle Home link if reference is not populated or slug is index/home
            const finalHref = href || "/";

            return (
              <Link
                key={i}
                href={finalHref}
                className="text-gray-600 hover:text-blue-600 font-medium"
                target={item.link.newTab ? "_blank" : undefined}
                rel={item.link.newTab ? "noopener noreferrer" : undefined}
              >
                {item.link.label}
              </Link>
            );
          })}
        </nav>
        {/* Mobile menu button could go here */}
      </div>
    </header>
  );
};
