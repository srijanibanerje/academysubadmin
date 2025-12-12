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
    password: '',
    aadharNo: '',
    panNo: '',
    nameAsPerDocument: '',
    bankName: '',
    branchName: '',
    accountNo: '',
    ifscCode: '',
    address: '',
  })

  const [files, setFiles] = useState({
    aadharFront: null,
    aadharBack: null,
    panPhoto: null,
    passbookPhoto: null,
  })

  // ---------------- FETCH USER DETAILS ----------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          `${ROOT_URL}/api/users/getuserdetails`,
          { userId }
        )

        const fetchedUser = response.data

        setUser({
          name: fetchedUser.name || '',
          email: fetchedUser.email || '',
          phone: fetchedUser.phone || '',
          password: '',
          aadharNo: fetchedUser.aadharNo || '',
          panNo: fetchedUser.panNo || '',
          nameAsPerDocument: fetchedUser.bankDetails?.nameAsPerDocument || '',
          bankName: fetchedUser.bankDetails?.bankName || '',
          branchName: fetchedUser.bankDetails?.branchName || '',
          accountNo: fetchedUser.bankDetails?.accountNo || '',
          ifscCode: fetchedUser.bankDetails?.ifscCode || '',
          address: fetchedUser.address || '',
        })
      } catch (error) {
        console.error('Error fetching user details:', error)
        swal('Oops!', 'Error fetching user details', 'error')
      }
    }

    fetchUser()
  }, [userId, ROOT_URL])

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  // ---------------- FILE CHANGE ----------------
  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFiles((prev) => ({ ...prev, [name]: files[0] }))
  }

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()

      Object.entries(user).forEach(([key, value]) => {
        if (value !== '') formData.append(key, value)
      })

      // files
      if (files.aadharFront) formData.append('aadharFront', files.aadharFront)
      if (files.aadharBack) formData.append('aadharBack', files.aadharBack)
      if (files.panPhoto) formData.append('panPhoto', files.panPhoto)
      if (files.passbookPhoto) formData.append('passbookPhoto', files.passbookPhoto)

      const response = await axios.put(
        `${ROOT_URL}/api/users/update/${userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      swal('Success!', 'User details updated successfully!', 'success')
      navigate('/userlist')

    } catch (error) {
      console.error('Error updating user:', error)
      swal('Error', error.response?.data?.message || 'Failed to update user', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2 className="mb-4">Edit User Details</h2>

      <CCard className="p-4">
        <CForm onSubmit={handleSubmit}>

          {/* Basic Details */}
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Name</CFormLabel>
              <CFormInput name="name" value={user.name} onChange={handleChange} />
            </CCol>

            <CCol md="6">
              <CFormLabel>User ID</CFormLabel>
              <CFormInput value={userId} readOnly />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Email</CFormLabel>
              <CFormInput name="email" value={user.email} onChange={handleChange} />
            </CCol>

            <CCol md="6">
              <CFormLabel>Phone</CFormLabel>
              <CFormInput name="phone" value={user.phone} onChange={handleChange} />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Address</CFormLabel>
              <CFormInput name="address" value={user.address} onChange={handleChange} />
            </CCol>

            <CCol md="6">
              <CFormLabel>Password (optional)</CFormLabel>
              <CFormInput
                name="password"
                value={user.password}
                onChange={handleChange}
                type="text"
              />
            </CCol>
          </CRow>

          {/* Aadhar + PAN */}
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Aadhar Number</CFormLabel>
              <CFormInput
                name="aadharNo"
                value={user.aadharNo}
                onChange={handleChange}
              />
            </CCol>

            <CCol md="6">
              <CFormLabel>PAN Number</CFormLabel>
              <CFormInput
                name="panNo"
                value={user.panNo}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          {/* Bank Details */}
          <h5 className="mt-4">Bank Details</h5>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Name as per Document</CFormLabel>
              <CFormInput
                name="nameAsPerDocument"
                value={user.nameAsPerDocument}
                onChange={handleChange}
              />
            </CCol>

            <CCol md="6">
              <CFormLabel>Bank Name</CFormLabel>
              <CFormInput
                name="bankName"
                value={user.bankName}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Branch Name</CFormLabel>
              <CFormInput
                name="branchName"
                value={user.branchName}
                onChange={handleChange}
              />
            </CCol>

            <CCol md="6">
              <CFormLabel>Account Number</CFormLabel>
              <CFormInput
                name="accountNo"
                value={user.accountNo}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>IFSC Code</CFormLabel>
              <CFormInput
                name="ifscCode"
                value={user.ifscCode}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          {/* Document Uploads */}
          <h5 className="mt-4">Upload Documents</h5>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Aadhar Front</CFormLabel>
              <CFormInput type="file" name="aadharFront" onChange={handleFileChange} />
            </CCol>

            <CCol md="6">
              <CFormLabel>Aadhar Back</CFormLabel>
              <CFormInput type="file" name="aadharBack" onChange={handleFileChange} />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>PAN Photo</CFormLabel>
              <CFormInput type="file" name="panPhoto" onChange={handleFileChange} />
            </CCol>

            <CCol md="6">
              <CFormLabel>Passbook Photo</CFormLabel>
              <CFormInput
                type="file"
                name="passbookPhoto"
                onChange={handleFileChange}
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
