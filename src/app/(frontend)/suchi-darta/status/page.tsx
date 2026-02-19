'use client'

import React, { useActionState } from 'react'
import { checkApplicationStatus, VendorStatusState } from '../actions'

const initialState: VendorStatusState = {
  error: '',
  success: false,
  status: undefined,
  application: null,
}

export default function StatusCheckPage() {
  const [state, formAction, isPending] = useActionState(checkApplicationStatus, initialState)

  return (
    <div
      className="container"
      style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', minHeight: '60vh' }}
    >
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Check Application Status</h1>
        <p style={{ color: '#666' }}>
          Enter your tracking code to view the status of your application.
        </p>
      </header>

      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #eee',
        }}
      >
        <form action={formAction} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              name="trackingCode"
              placeholder="Enter Tracking Code (e.g., X7Y8Z9)"
              required
              style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
              type="submit"
              disabled={isPending}
              style={{
                backgroundColor: '#0056b3',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {isPending ? 'Checking...' : 'Check'}
            </button>
          </div>
        </form>

        {state?.error && (
          <div
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '1rem',
              borderRadius: '4px',
            }}
          >
            {state.error}
          </div>
        )}

        {state?.success && state?.application && state?.status && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Status:</span>
              <span
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  backgroundColor:
                    state.status === 'approved'
                      ? '#d4edda'
                      : state.status === 'rejected'
                        ? '#f8d7da'
                        : '#fff3cd',
                  color:
                    state.status === 'approved'
                      ? '#155724'
                      : state.status === 'rejected'
                        ? '#721c24'
                        : '#856404',
                }}
              >
                {state.status.toUpperCase()}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '0.5rem',
                fontSize: '0.95rem',
              }}
            >
              <div style={{ color: '#666' }}>Organization:</div>
              <div style={{ fontWeight: '500' }}>{state.application.name}</div>

              <div style={{ color: '#666' }}>Contact Person:</div>
              <div style={{ fontWeight: '500' }}>{state.application.contactPerson}</div>

              <div style={{ color: '#666' }}>Tracking Code:</div>
              <div style={{ fontWeight: '500' }}>{state.application.trackingCode}</div>

              <div style={{ color: '#666' }}>Submission Date:</div>
              <div style={{ fontWeight: '500' }}>
                {new Date(state.application.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a href="/suchi-darta" style={{ color: '#0056b3', textDecoration: 'none' }}>
          &larr; Back to Registration Form
        </a>
      </div>
    </div>
  )
}
