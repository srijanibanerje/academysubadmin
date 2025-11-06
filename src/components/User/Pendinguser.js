/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import {
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormInput,
} from '@coreui/react'

const Pendinguser = () => {
  const ROOT_URL = import.meta.env.VITE_LOCALHOST_URL
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${ROOT_URL}/api/users/all`)
      if (res.data.success) {
        // Filter only pending users
        const pendingUsers = res.data.data.filter((user) => user.status === 'pending')
        console.log('Pending Users:', pendingUsers)
        setUsers(pendingUsers)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle Approve / Reject
  const handleUpdateStatus = async (userId, status) => {
    try {
      const res = await axios.put(`${ROOT_URL}/api/users/status/${userId}`, { status })
      if (res.data.success) {
        swal('Success', res.data.message, 'success')
        fetchUsers() // refresh table
      }
    } catch (error) {
      console.error('Error updating status:', error)
      swal('Error', error.response?.data?.message || 'Failed to update status', 'error')
    }
  }

  // Filter users by search
  const filteredUsers = users.filter(
    (user) =>
      user.userId.toLowerCase().includes(query.toLowerCase()) ||
      user.name?.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <p className="text-center mt-5">Loading users...</p>

  return (
    <>
      <CCardHeader>
        <div className="d-flex justify-content-end align-items-center">
          <CFormInput
            className="ms-3 w-25"
            placeholder="Search user..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <h5 className="text-center mb-2 mt-2">Pending Users Verification</h5>
      </CCardHeader>

      {filteredUsers.length > 0 ? (
        <CTable responsive="sm" color="dark" className="mt-2">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S/N</CTableHeaderCell>
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Aadhaar Photo(front)</CTableHeaderCell>
                <CTableHeaderCell>Aadhaar Photo(back)</CTableHeaderCell>
                  <CTableHeaderCell>Pan Photo</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredUsers.map((user, index) => (
              <CTableRow key={user._id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{user.userId}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.address}</CTableDataCell>

                <CTableDataCell>
                  <img
                    src={user.aadharPhotoFront}
                    alt="Aadhaar"
                    style={{
                      width: '200px',
                      height: '200px',
                     objectFit: "contain",
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.style.display = 'none'
                    }}
                  />
                </CTableDataCell>
                 <CTableDataCell>
                  <img
                    src={user.aadharPhotoBack}
                    alt="Aadhaar"
                    style={{
                      width: '200px',
                      height: '200px',
                     objectFit: "contain",
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.style.display = 'none'
                    }}
                  />
                </CTableDataCell>
                 <CTableDataCell>
                 
                  <img
                    src={user.panPhoto}
                    alt="Aadhaar"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: "contain",
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.style.display = 'none'
                    }}
                  />
                  
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="d-flex gap-2 justify-content-center">
                    <CButton
                      color="success"
                      className="text-white"
                      onClick={() => handleUpdateStatus(user.userId, 'active')}
                    >
                      Approve
                    </CButton>
                    <CButton
                      color="danger"
                      className="text-white"
                      onClick={() => handleUpdateStatus(user.userId, 'rejected')}
                    >
                      Reject
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        <p className="text-center mt-3">No pending users found.</p>
      )}
    </>
  )
}

export default Pendinguser
