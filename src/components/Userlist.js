/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
} from '@coreui/react'

const Userlist = () => {
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
        setUsers(res.data.data) // ✅ show all users
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

  // Filter users by search
  const filteredUsers = users.filter(
    (user) =>
      user.userId.toLowerCase().includes(query.toLowerCase()) ||
      user.nameAsPerDocument?.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <p className="text-center mt-5">Loading users...</p>

  return (
    <>
      <CCardHeader className="d-flex justify-content-between align-items-center mb-3">
        <h5>All Users</h5>
        <CFormInput
          className="w-25"
          placeholder="Search user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </CCardHeader>

      {filteredUsers.length > 0 ? (
        <CTable responsive="sm" color="dark" className="mt-2">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S/N</CTableHeaderCell>
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Phone No</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
             
             
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
                  {user.phone}
                </CTableDataCell>
                <CTableDataCell>
                 {user.email}
                </CTableDataCell>
                 <CTableHeaderCell>{user.status}</CTableHeaderCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        <p className="text-center mt-3">No users found.</p>
      )}
    </>
  )
}

export default Userlist
