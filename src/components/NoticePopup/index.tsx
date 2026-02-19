'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export const NoticePopup = () => {
  const [notices, setNotices] = useState<any[]>([])
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const now = new Date().toISOString()
        const query = {
          and: [
            {
              status: {
                equals: 'published',
              },
            },
            {
              showInPopup: {
                equals: true,
              },
            },
            {
              or: [
                {
                  popupStartDate: {
                    exists: false,
                  },
                },
                {
                  popupStartDate: {
                    less_than_equal: now,
                  },
                },
              ],
            },
            {
              or: [
                {
                  popupEndDate: {
                    exists: false,
                  },
                },
                {
                  popupEndDate: {
                    greater_than_equal: now,
                  },
                },
              ],
            },
          ],
        }

        const stringifiedQuery = JSON.stringify(query)
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/api/notices?where=${encodeURIComponent(stringifiedQuery)}&depth=1`,
        )
        if (req.ok) {
          const data = await req.json()
          if (data.docs && data.docs.length > 0) {
            setNotices(data.docs)
            setIsOpen(true)
          }
        }
      } catch (err) {
        console.error('Error fetching notices:', err)
      }
    }

    fetchNotices()
  }, [])

  const closePopup = () => {
    setIsOpen(false)
  }

  const nextNotice = () => {
    setActiveNoticeIndex((prev) => (prev + 1) % notices.length)
  }

  const prevNotice = () => {
    setActiveNoticeIndex((prev) => (prev - 1 + notices.length) % notices.length)
  }

  if (!isOpen || notices.length === 0) return null

  const notice = notices[activeNoticeIndex]
  const imageUrl = notice.image?.url

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 z-10"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{notice.title}</h2>

          {imageUrl && (
            <div className="mb-4 relative w-full h-64 sm:h-80 md:h-96">
              <Image src={imageUrl} alt={notice.title} fill style={{ objectFit: 'contain' }} />
            </div>
          )}

          {notice.description && (
            <div className="prose max-w-none text-gray-700">{notice.description}</div>
          )}

          {notice.file?.url && (
            <div className="mt-4 text-center">
              <a
                href={notice.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Download Attachment
              </a>
            </div>
          )}
        </div>

        {notices.length > 1 && (
          <div className="bg-gray-100 p-3 flex justify-between items-center border-t border-gray-200">
            <button
              onClick={prevNotice}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              &larr; Previous
            </button>
            <span className="text-sm text-gray-500">
              {activeNoticeIndex + 1} of {notices.length}
            </span>
            <button
              onClick={nextNotice}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
