import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";

export default async function Page() {
  const payload = await getPayload({ config });

  // Fetch data in parallel
  const [categories, articles] = await Promise.all([
    payload.find({
      collection: "categories",
      limit: 6,
    }),
    payload.find({
      collection: "articles",
      sort: "-publishedDate",
      limit: 3,
      where: {
        _status: {
          equals: "published",
        },
      },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white relative h-[600px] w-full">
        <div className="p-4 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Dhaulagiri Hospital</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Providing quality healthcare services to the community.
          </p>
          <div className="gap-4 flex">
            <Link
              href="/categories"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition"
            >
              Our Services
            </Link>
            <Link
              href="/contact"
              className="border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded border-2 bg-transparent transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions (Suchi Darta) */}
      <section className="py-12 bg-blue-50">
        <div className="px-4 container mx-auto">
          <div className="md:grid-cols-3 gap-6 grid grid-cols-1 text-center">
            <Link
              href="/suchi-darta"
              className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg border-blue-600 group block border-t-4 transition"
            >
              <div className="text-4xl mb-4 transition group-hover:scale-110">📝</div>
              <h3 className="text-xl font-bold mb-2">Vendor Registration</h3>
              <p className="text-gray-600">Register your firm for hospital procurement.</p>
            </Link>
            <Link
              href="/suchi-darta/status"
              className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg border-green-600 group block border-t-4 transition"
            >
              <div className="text-4xl mb-4 transition group-hover:scale-110">🔍</div>
              <h3 className="text-xl font-bold mb-2">Check Application Status</h3>
              <p className="text-gray-600">Track your vendor registration status.</p>
            </Link>
            <Link
              href="/notices"
              className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg border-orange-600 group block border-t-4 transition"
            >
              <div className="text-4xl mb-4 transition group-hover:scale-110">📢</div>
              <h3 className="text-xl font-bold mb-2">Notices & Announcements</h3>
              <p className="text-gray-600">Latest updates, tenders, and news.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="px-4 container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="md:grid-cols-2 lg:grid-cols-3 gap-8 grid grid-cols-1">
            {categories.docs.map((category: any) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition"
              >
                {category.image && (
                  <div className="h-48 relative w-full">
                    <Image
                      src={(category.image as any).url}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  {/* <p className="text-gray-600 line-clamp-3">{category.description}</p> */}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/categories" className="text-blue-600 font-bold hover:underline">
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
          <div className="md:grid-cols-3 gap-8 grid grid-cols-1">
            {articles.docs.map((item: any) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <span className="text-sm text-gray-500 mb-2 block">
                  {new Date(item.publishedDate).toLocaleDateString()}
                </span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  <Link href={`/articles/${item.slug}`} className="hover:text-blue-600">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  href={`/articles/${item.slug}`}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  Read More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
