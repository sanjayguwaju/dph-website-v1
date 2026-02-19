import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function Page() {
  const payload = await getPayload({ config })

  // Fetch data in parallel
  const [heroSlides, services, news] = await Promise.all([
    payload.find({
      collection: 'hero-slides',
      sort: 'order',
    }),
    payload.find({
      collection: 'services',
      limit: 6,
    }),
    payload.find({
      collection: 'news',
      sort: '-publishedDate',
      limit: 3,
      where: {
        _status: {
          equals: 'published',
        },
      },
    }),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-gray-900 text-white">
        {heroSlides.docs.length > 0 ? (
          <div className="relative h-full w-full">
            {heroSlides.docs[0].image && (
              <Image
                src={(heroSlides.docs[0].image as any).url}
                alt="Hero"
                fill
                style={{ objectFit: 'cover', opacity: 0.6 }}
                priority
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {heroSlides.docs[0].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
                {heroSlides.docs[0].caption}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/services"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition"
                >
                  Our Services
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-5xl font-bold">Welcome to Dhaulagiri Hospital</h1>
          </div>
        )}
      </section>

      {/* Quick Actions (Suchi Darta) */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Link
              href="/suchi-darta"
              className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-blue-600 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">📝</div>
              <h3 className="text-xl font-bold mb-2">Vendor Registration</h3>
              <p className="text-gray-600">Register your firm for hospital procurement.</p>
            </Link>
            <Link
              href="/suchi-darta/status"
              className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-green-600 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">🔍</div>
              <h3 className="text-xl font-bold mb-2">Check Application Status</h3>
              <p className="text-gray-600">Track your vendor registration status.</p>
            </Link>
            <Link
              href="/notices"
              className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-orange-600 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">📢</div>
              <h3 className="text-xl font-bold mb-2">Notices & Announcements</h3>
              <p className="text-gray-600">Latest updates, tenders, and news.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.docs.map((service: any) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition"
              >
                {service.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image.url}
                      alt={service.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 line-clamp-3">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="text-blue-600 font-bold hover:underline">
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.docs.map((item: any) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <span className="text-sm text-gray-500 mb-2 block">
                  {new Date(item.publishedDate).toLocaleDateString()}
                </span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  <Link href={`/news/${item.id}`} className="hover:text-blue-600">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{item.excerpt}</p>
                <Link
                  href={`/news/${item.id}`}
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
  )
}
