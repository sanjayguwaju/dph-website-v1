'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const PayloadForm = ({ form, submissionData }: { form: any; submissionData?: any }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)

      const formData = new FormData(e.currentTarget)
      const data: { [key: string]: any } = {}

      formData.forEach((value, key) => {
        data[key] = value
      })

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/api/form-submissions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              form: form.id,
              submissionData: Object.entries(data).map(([name, value]) => ({
                field: name,
                value,
              })),
            }),
          },
        )

        if (req.status >= 400) {
          throw new Error('Could not submit form.')
        }

        setSuccess(true)
        if (form.confirmationType === 'redirect' && form.redirect) {
          router.push(form.redirect.url)
        }
      } catch (err) {
        console.error(err)
        setError('Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [form, router],
  )

  if (success && form.confirmationType === 'message') {
    return (
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline">
          {' '}
          {form.confirmationMessage || 'Thank you for your submission.'}
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="flex flex-wrap -mx-3 mb-6">
        {form.fields?.map((field: any, index: number) => {
          if (field.blockType === 'text') {
            return (
              <div key={index} className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={field.name}
                >
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={field.name}
                  type="text"
                  name={field.name}
                  required={field.required}
                />
              </div>
            )
          }
          if (field.blockType === 'textarea') {
            return (
              <div key={index} className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={field.name}
                >
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={4}
                />
              </div>
            )
          }
          if (field.blockType === 'email') {
            return (
              <div key={index} className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={field.name}
                >
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={field.name}
                  type="email"
                  name={field.name}
                  required={field.required}
                />
              </div>
            )
          }
          if (field.blockType === 'number') {
            return (
              <div key={index} className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={field.name}
                >
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={field.name}
                  type="number"
                  name={field.name}
                  required={field.required}
                />
              </div>
            )
          }
          if (field.blockType === 'select') {
            return (
              <div key={index} className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={field.name}
                >
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={field.name}
                    name={field.name}
                    required={field.required}
                  >
                    <option value="">Select...</option>
                    {field.options?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          }
          // Add other field types as needed
          return null
        })}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
        </button>
      </div>
    </form>
  )
}
