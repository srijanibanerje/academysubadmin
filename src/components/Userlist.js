/* eslint-disable prettier/prettier */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
import {Link } from 'react-router-dom';
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
        console.log(res.data.data)
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
 const filteredUsers = users
  // latest first
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .filter((user) => {
    const queryLower = query.toLowerCase()

    const hasCourse = !!user.courseDetails
    const courseName = user.courseDetails?.courseName?.toLowerCase() || ''
    const packageName = user.courseDetails?.packageName?.toLowerCase() || ''

    // 👇 virtual searchable labels
    const noCourseText = !hasCourse ? 'no enrolled course' : ''
    const noPackageText = !hasCourse ? 'no enrolled package' : ''

    return (
      user.userId?.toLowerCase().includes(queryLower) ||
      user.name?.toLowerCase().includes(queryLower) ||
      courseName.includes(queryLower) ||
      packageName.includes(queryLower) ||
      noCourseText.includes(queryLower) ||
      noPackageText.includes(queryLower)
    )
  })


const downloadUsersPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("User List (Name & Phone)", 14, 15);

  const tableColumn = ["S/N", "Name", "Phone"];
  const tableRows = [];

  filteredUsers.forEach((user, index) => {
    tableRows.push([
      index + 1,
      user.name || "N/A",
      user.phone || "N/A",
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25,
  });

  doc.save("users-name-phone.pdf");
};


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
        <button className="btn btn-success ms-2" onClick={downloadUsersPDF}>
  Download PDF
</button>

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
              <CTableHeaderCell>Course name</CTableHeaderCell>
              <CTableHeaderCell>Purchase date</CTableHeaderCell>
              <CTableHeaderCell>Package name</CTableHeaderCell>
               
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell className='text-center'>Action</CTableHeaderCell>
             
             
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
                <CTableDataCell>
                  {user.courseDetails?.courseName   || (
                    <span className="text-muted">No Enrolled Course</span>
                  )}
                 
                </CTableDataCell>
                <CTableDataCell>{user.courseDetails?.purchaseHistory[0].date}</CTableDataCell>
                <CTableDataCell>
                  {user.courseDetails?.packageName || (
                    <span className="text-muted">No Enrolled Package</span>
                  )}
                  <br/> {user.courseDetails?.purchaseHistory[0].amount || '0000'}
                </CTableDataCell>
               

                 <CTableHeaderCell>{user.status}</CTableHeaderCell>
                
                 <CTableHeaderCell className='text-center'><Link to={`/user/edituser/${user.userId}`} className='mt-1'><i className="fa fa-edit ms-2 mt-1"></i></Link></CTableHeaderCell>
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
