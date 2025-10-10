import React from 'react'
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
  CFormInput
} from '@coreui/react';
function payout() {
  return (
    <>
          <h5 className='text-center mb-5'> All Payouts</h5>
          <CTable  responsive="sm" color="dark" className='mt-2'>
                                      <CTableHead align="middle">
                                          <CTableRow  >
                                               <CTableHeaderCell>S/N</CTableHeaderCell>
                          <CTableHeaderCell>User Name</CTableHeaderCell>
                            <CTableHeaderCell>User ID</CTableHeaderCell>
                          <CTableHeaderCell>Payout Amount</CTableHeaderCell>
                           <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                          </CTableRow>
                                      </CTableHead>
                                      <CTableBody align="middle" >
                                        <CTableRow active  >
                                         <CTableDataCell>1</CTableDataCell>
                         <CTableDataCell>Testing</CTableDataCell>
                         <CTableDataCell>Testing</CTableDataCell>
                         <CTableDataCell>Testing</CTableDataCell>
                       
                         <CTableDataCell>
                                         <div className="d-flex gap-2 justify-content-center">
                                           <CButton className="btn btn-success text-white">Paid</CButton>
                                          
                                         </div>
                                       </CTableDataCell>
                      
                                      </CTableRow>
                                      </CTableBody>
                                  </CTable>
    </>
  )
}

export default payout