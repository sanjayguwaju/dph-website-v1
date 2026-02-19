import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const Footer = async () => {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  return (
    <footer className="bg-gray-800 text-white py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Dhaulagiri Hospital</h3>
          <p className="text-gray-400 text-sm">
            {footer.description || 'Providing quality healthcare services to the community.'}
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {/*  This could be pulled from footer link columns if implemented fully, 
                      but for now we stick to simple navItems.
                 */}
            {footer.navItems?.map((item: any, i: number) => {
              const href =
                item.link.type === 'reference' ? `/${item.link.reference?.slug}` : item.link.url

              const finalHref = href || '/'

              return (
                <li key={i}>
                  <Link
                    href={finalHref}
                    className="text-gray-400 hover:text-white transition"
                    target={item.link.newTab ? '_blank' : undefined}
                    rel={item.link.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {item.link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <div className="text-gray-400 text-sm space-y-2">
            <p>Baglung, Gandaki Province, Nepal</p>
            <p>Phone: +977-68-520188</p>
            <p>Email: info@dph.gov.np</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {footer.socialLinks?.map((social: any, i: number) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white capitalize"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
        {footer.copyright}
      </div>
    </footer>
  )
}
