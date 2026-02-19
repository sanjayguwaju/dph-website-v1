'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export interface VendorApplicationState {
  error?: string
  success?: boolean
  trackingCode?: string
}

export async function submitVendorApplication(
  prevState: any,
  formData: FormData,
): Promise<VendorApplicationState> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const documents = {
      firmRegistration: formData.get('firmRegistration') as File,
      vatPan: formData.get('vatPan') as File,
      taxClearance: formData.get('taxClearance') as File,
      license: formData.get('license') as File,
    }

    const uploadFile = async (file: File | null) => {
      if (!file || file.size === 0) return null

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `Document for ${formData.get('name')}`,
        },
        file: {
          data: buffer,
          mimetype: file.type,
          name: file.name,
          size: file.size,
        },
      })
      return media.id
    }

    const firmRegistrationId = await uploadFile(documents.firmRegistration)
    const vatPanId = await uploadFile(documents.vatPan)
    const taxClearanceId = await uploadFile(documents.taxClearance)
    const licenseId = await uploadFile(documents.license)

    if (!firmRegistrationId || !vatPanId || !taxClearanceId) {
      return { error: 'Please upload all required documents.', success: false }
    }

    const application = await payload.create({
      collection: 'vendor-applications',
      data: {
        name: formData.get('name') as string,
        contactPerson: formData.get('contactPerson') as string,
        address: formData.get('address') as string,
        correspondenceAddress: formData.get('correspondenceAddress') as string,
        phone: formData.get('phone') as string,
        mobile: formData.get('mobile') as string,
        email: formData.get('email') as string,
        serviceCategory: formData.get('serviceCategory') as any,
        serviceDescription: formData.get('serviceDescription') as string,
        documents: {
          firmRegistration: firmRegistrationId,
          vatPan: vatPanId,
          taxClearance: taxClearanceId,
          license: licenseId || undefined,
        },
        status: 'pending',
      },
    })

    return { success: true, trackingCode: application.trackingCode as string }
  } catch (error) {
    console.error('Error submitting application:', error)
    return { error: 'Failed to submit application. Please try again.', success: false }
  }
}

export interface VendorStatusState {
  error?: string
  success?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  application?: any
}

export async function checkApplicationStatus(
  prevState: any,
  formData: FormData,
): Promise<VendorStatusState> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const trackingCode = formData.get('trackingCode') as string

  try {
    const result = await payload.find({
      collection: 'vendor-applications',
      where: {
        trackingCode: {
          equals: trackingCode,
        },
      },
    })

    if (result.docs.length > 0) {
      return {
        success: true,
        status: result.docs[0].status as 'pending' | 'approved' | 'rejected',
        application: result.docs[0],
      }
    } else {
      return { error: 'Application not found with this tracking code.', success: false }
    }
  } catch (error) {
    console.error('Error checking status:', error)
    return { error: 'Failed to check status. Please try again.', success: false }
  }
}
