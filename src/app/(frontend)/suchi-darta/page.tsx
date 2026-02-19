'use client'

import React, { useActionState, useEffect } from 'react'
import { submitVendorApplication, VendorApplicationState } from './actions'

const initialState: VendorApplicationState = {
  error: '',
  success: false,
  trackingCode: '',
}

export default function SuchiDartaPage() {
  const [state, formAction, isPending] = useActionState(submitVendorApplication, initialState)

  useEffect(() => {
    if (state?.success && state.trackingCode) {
      window.scrollTo(0, 0)
    }
  }, [state])

  if (state?.success) {
    return (
      <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Application Submitted Successfully!</h2>
          <p>Your application for vendor registration has been received.</p>
          <div
            style={{
              marginTop: '2rem',
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '4px',
              border: '1px solid #c3e6cb',
            }}
          >
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Tracking Code:</p>
            <h1 style={{ fontSize: '2.5rem', margin: 0, color: '#333' }}>{state.trackingCode}</h1>
          </div>
          <p style={{ marginTop: '1.5rem' }}>
            Please save this code to check your application status later.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a
              href="/suchi-darta/status"
              style={{
                textDecoration: 'none',
                backgroundColor: '#155724',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
              }}
            >
              Check Status
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Suchi Darta Form</h1>
        <p style={{ color: '#666' }}>Vendor / Supplier Registration Form</p>
      </header>

      {state?.error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1.5rem',
          }}
        >
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Step 1: Basic Information */}
        <section style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
          <h3
            style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            Step 1: Basic Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Organization / Firm Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Address <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Correspondence Address <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="correspondenceAddress"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Contact Person Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Telephone No. <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Mobile No. <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="mobile"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </div>
        </section>

        {/* Step 2: Documents */}
        <section style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
          <h3
            style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            Step 2: Required Documents
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
            Supported formats: JPG, PNG, PDF. Max size: 5MB.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Firm Registration Certificate <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="file"
                name="firmRegistration"
                accept=".jpg,.jpeg,.png,.pdf"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                VAT / PAN Registration Certificate <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="file"
                name="vatPan"
                accept=".jpg,.jpeg,.png,.pdf"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Tax Clearance Certificate <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="file"
                name="taxClearance"
                accept=".jpg,.jpeg,.png,.pdf"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                License / Permit (if applicable)
              </label>
              <input
                type="file"
                name="license"
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </section>

        {/* Step 3: Description */}
        <section style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
          <h3
            style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            Step 3: Service Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Service Category <span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="serviceCategory"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Select a category</option>
                <option value="goods">Goods Supply</option>
                <option value="construction">Construction Work</option>
                <option value="consultancy">Consultancy Services</option>
                <option value="other">Other Services</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Description of Goods/Services <span style={{ color: 'red' }}>*</span>
              </label>
              <textarea
                name="serviceDescription"
                rows={5}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
                placeholder="Please describe the nature of goods or services..."
              ></textarea>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            disabled={isPending}
            style={{
              backgroundColor: isPending ? '#ccc' : '#0056b3',
              color: '#fff',
              padding: '1rem 2.5rem',
              borderRadius: '4px',
              border: 'none',
              cursor: isPending ? 'not-allowed' : 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            {isPending ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  )
}
