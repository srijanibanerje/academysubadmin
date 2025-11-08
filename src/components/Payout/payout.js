import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
} from '@coreui/react'
import swal from 'sweetalert'

function Payout() {
  const ROOT_URL = import.meta.env.VITE_LOCALHOST_URL
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [updating, setUpdating] = useState(null) // track which payout is being updated

  // Fetch all user payouts
  const fetchPayouts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${ROOT_URL}/api/payout/all-payouts`)
      if (res.data.success) {
        // Flatten nested payouts for table display

        const formatted = res.data.data.flatMap((user) =>
          user.payouts
            .filter((payout) => payout.amount > 0) // ✅ exclude zero-amount payouts
            .map((payout) => ({
              name: user.name,
              userId: user.userId,
              payoutId: payout._id,
              amount: payout.amount,
              date: payout.date,

              status: payout.status,
            })),
        )
        setPayouts(formatted)
      }
    } catch (error) {
      console.error(error)
      swal('Error', 'Failed to fetch payouts', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayouts()
  }, [])

  // Generate payouts
  const handleGeneratePayout = async () => {
    try {
      setGenerating(true)
      const res = await axios.post(`${ROOT_URL}/api/payout/run`)
      if (res.data.success) {
        swal('Success', res.data.message, 'success')
        fetchPayouts()
      } else {
        swal('Error', res.data.message, 'error')
      }
    } catch (error) {
      console.error(error)
      swal('Error', 'Failed to generate payout', 'error')
    } finally {
      setGenerating(false)
    }
  }

  // ✅ Update payout status API call
  const handleStatusUpdate = async (userId, payoutId, newStatus) => {
    try {
      setUpdating(payoutId)
      const res = await axios.put(`${ROOT_URL}/api/payout/status/${userId}/${payoutId}/status`, {
        status: newStatus,
      })

      if (res.data.success) {
        swal('Success', res.data.message, 'success')
        fetchPayouts() // refresh after update
      } else {
        swal('Error', res.data.message, 'error')
      }
    } catch (error) {
      console.error(error)
      swal('Error', 'Failed to update payout status', 'error')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">All User Payouts</h5>
        <CButton
          color="success"
          className="text-white"
          onClick={handleGeneratePayout}
          disabled={generating}
        >
          {generating ? (
            <>
              <CSpinner size="sm" className="me-2" /> Generating...
            </>
          ) : (
            'Generate Payout'
          )}
        </CButton>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <CSpinner color="primary" />
          <p className="mt-2">Loading payouts...</p>
        </div>
      ) : (
        <CTable responsive bordered hover align="middle">
          <CTableHead color="dark">
            <CTableRow className="text-center">
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>User Name</CTableHeaderCell>
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Payout Amount(₹)</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Amount-TDS(5%)</CTableHeaderCell>

              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody className="text-center">
            {payouts.length > 0 ? (
              payouts.map((p, index) => (
                <CTableRow key={p.payoutId}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{p.name}</CTableDataCell>
                  <CTableDataCell>{p.userId}</CTableDataCell>
                  <CTableDataCell>₹{p.amount}</CTableDataCell>
                  <CTableDataCell>{new Date(p.date).toLocaleDateString()}</CTableDataCell>
                  <CTableDataCell>₹{(p.amount - p.amount * 0.05).toFixed(2)}</CTableDataCell>

                  <CTableDataCell>
                    <span
                      className={`badge px-3 py-2 ${
                        p.status === 'completed'
                          ? 'bg-success'
                          : p.status === 'pending'
                            ? 'bg-warning text-dark'
                            : 'bg-secondary'
                      }`}
                    >
                      {p.status}
                    </span>
                  </CTableDataCell>
                  <CTableDataCell>
                    {p.status === 'completed' ? (
                      <CButton color="secondary" size="sm" disabled>
                        Completed
                      </CButton>
                    ) : (
                      <CButton
                        color="primary"
                        size="sm"
                        disabled={updating === p.payoutId}
                        onClick={() => handleStatusUpdate(p.userId, p.payoutId, 'completed')}
                      >
                        {updating === p.payoutId ? (
                          <>
                            <CSpinner size="sm" /> Updating...
                          </>
                        ) : (
                          ' Completed'
                        )}
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="7" className="text-muted">
                  No payouts found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      )}
    </>
  )
}

export default Payout
