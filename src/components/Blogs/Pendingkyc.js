/* eslint-disable prettier/prettier */
import { useState, React } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormInput,
} from '@coreui/react'
// import axios from 'axios'
// import swal from 'sweetalert'
// import uploadpic from '../../Image/upload.png'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

const Pendingkyc = () => {
  // const navigate = useNavigate();
  // const [blogtitle, setBlogtitle] = useState('')
  // const [blogdescription, setBlogdescription] = useState('')
  // const [shortdescription , setshortdescription] = useState('')
  // const [image, setImage] = useState(null)
  // const [slug,setSlug] = useState('')

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   // console.log(blogdescription)
  //   const ROOT_URL = import.meta.env.VITE_LOCALHOST_URL;

  //   // alert("submit works")
  //   if (
  //       blogtitle === '' || blogdescription === '' || shortdescription === "" || slug === ''|| image === '') {
  //     swal('Opps!', 'Please fill out all required fields!', 'error')
  //   } else {

  //     try {
  //       await axios
  //         .post(ROOT_URL+'/api/v1/blog', {
  //           blogtitle,
  //           blogdescription,
  //           shortdescription,
  //           slug,
  //           image })
  //           .then((res) => {
  //           console.log(res)
  //           swal('yeah', 'Blog is  sucessfully inserted!', 'success')
  //           navigate('/allblog');

  //         })
  //     } catch (error) {
  //       console.error('Error:', error)
  //       swal('Opps!', 'Not inserted !', 'error')
  //     }
  //   }
  // }

  // const convertToBase64 = (file) => {
  //   // console.log(file)
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   const data = new Promise((resolve, reject) => {
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = (err) => {
  //       reject(err)
  //     }
  //   })
  //   return data
  // }

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0]
  //   const image = await convertToBase64(file)
  //   setImage(image)
  //   console.log(image)
  // }

  return (
    <>
      <CCardHeader>
        <div className="d-flex justify-content-end">
          <CFormInput
            className="ms-3 w-25"
            id="searchuser"
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user..."
          />
        </div>
        <h5 className="text-center mb-2">All KYC verification for users</h5>
      </CCardHeader>
      
        <CTable responsive="sm" color="dark" className="mt-2">
          <CTableHead align="middle">
            <CTableHeaderCell>S/N</CTableHeaderCell>
            <CTableHeaderCell>User Details</CTableHeaderCell>
            <CTableHeaderCell>Bank Details</CTableHeaderCell>
            <CTableHeaderCell>Aadhar (Front)</CTableHeaderCell>
            <CTableHeaderCell>Bank Card</CTableHeaderCell>
            <CTableHeaderCell>User Photo</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
          </CTableHead>
          <CTableBody align="middle">
            <CTableRow active>
              <CTableDataCell>1</CTableDataCell>
              <CTableDataCell>Testing</CTableDataCell>
              <CTableDataCell>Testing</CTableDataCell>
              <CTableDataCell>Testing</CTableDataCell>
              <CTableDataCell>Testing</CTableDataCell>
              <CTableDataCell>Testing</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex gap-2 justify-content-center">
                  <CButton className="btn btn-success text-white">Approve</CButton>
                  <CButton className="btn btn-danger text-white">Reject</CButton>
                </div>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>

        {/* {filteredData.length > 0 ? (
          <CTable responsive='sm' color='dark'>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>S/N</CTableHeaderCell>
                <CTableHeaderCell>User Details</CTableHeaderCell>
                <CTableHeaderCell>Bank Details</CTableHeaderCell>
                <CTableHeaderCell>PAN Card</CTableHeaderCell>
                <CTableHeaderCell>Aadhar (Front)</CTableHeaderCell>
                <CTableHeaderCell>Aadhar (Back)</CTableHeaderCell>
                <CTableHeaderCell>Bank Card</CTableHeaderCell>
                <CTableHeaderCell>User Photo</CTableHeaderCell>
                <CTableHeaderCell className='text-center'>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData.map((user, index) => (
                <CTableRow key={user._id}>
                  <CTableDataCell>{index + 1}.</CTableDataCell>
                  <CTableDataCell>
                    ID: {user.userDetails.mySponsorId}<br />
                    Name: {user.userDetails.name}<br />
                    Mobile: {user.userDetails.mobileNumber}<br />
                    PAN: {user.bankDetaills.panCard}<br />
                    Aadhar: {user.bankDetaills.aadharCard}
                  </CTableDataCell>
                  <CTableDataCell>
                    Bank: {user.bankDetaills.bankName}<br />
                    Acc#: {user.bankDetaills.accountNumber}<br />
                    Branch: {user.bankDetaills.branchName}<br />
                    IFSC: {user.bankDetaills.ifscCode}
                  </CTableDataCell>
                  {['panCardFront', 'aadharCardFront', 'aadharCardBack', 'bankCard', 'profilephoto'].map((doc, i) => (
                    <CTableDataCell key={i}>
                      <img className='img_hover' width={100} height={100} src={user.documents[doc]} alt={doc} />
                    </CTableDataCell>
                  ))}
                  <CTableDataCell>
                    <div className='d-flex gap-2'>
                      <CButton className='btn btn-success text-white' onClick={() => handleApproval(user.userDetails.mySponsorId, 'approve')}>Approve</CButton>
                      <CButton className='btn btn-danger text-white' onClick={() => handleApproval(user.userDetails.mySponsorId, 'reject')}>Reject</CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p className='text-center'>No pending KYC</p>
        )} */}
      
    </>
  )
}

export default Pendingkyc
