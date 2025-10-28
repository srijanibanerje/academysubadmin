import React, { useState, useEffect } from 'react'
import {
  CCard,
  CFormInput,
  CCol,
  CRow,
  CForm,
  CButton,
  CFormLabel,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const Edituser = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const ROOT_URL = import.meta.env.VITE_LOCALHOST_URL
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    aadharNo: '',
    password: '',
    address: '',
  })

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${ROOT_URL}/api/users/getuserdetails`, { userId })
        const fetchedUser = response.data
        console.log(fetchUser);

        setUser({
          name: fetchedUser.name || '',
          email: fetchedUser.email || '',
          phone: fetchedUser.phone || '',
          aadharNo: fetchedUser.aadharNo || '',
          address: fetchedUser.address || '',
          password: '', // keep blank for security
        })
      } catch (error) {
        console.error('Error fetching user details:', error)
        swal('Oops!', 'Error fetching user details', 'error')
      }
    }

    fetchUser()
  }, [userId, ROOT_URL])

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.put(`${ROOT_URL}/api/users/update/${userId}`, user)

      if (response.status === 200) {
        swal('Success!', 'User details updated successfully!', 'success')
        navigate('/userlist')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      swal('Error', errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2 className="mb-4">Edit User Details</h2>

      <CCard className="p-4">
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Name</CFormLabel>
              <CFormInput
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>User ID</CFormLabel>
              <CFormInput type="text" value={userId} readOnly />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Mobile Number</CFormLabel>
              <CFormInput
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Address</CFormLabel>
              <CFormInput
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>Aadhaar Number</CFormLabel>
              <CFormInput
                type="text"
                name="aadharNo"
                value={user.aadharNo}
                onChange={handleChange}
                placeholder="Enter Aadhaar number"
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Password</CFormLabel>
              <CFormInput
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter new password (optional)"
              />
            </CCol>
          </CRow>

          <CButton type="submit" color="primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update User'}
          </CButton>
        </CForm>
      </CCard>
    </div>
  )
}

export default Edituser
