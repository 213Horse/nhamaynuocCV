import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import './permission.css'
import ListPermission from './ListPermission/ListPermission'
import { useDispatch } from 'react-redux'
import { fetchPermision, fetchPermision2, fetchStaff } from '../../../../redux/slices/permissionSlice/permissionSlice'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import ListStaff from './ListStaff/ListStaff'
import { getAllClaims } from '../../../../redux/slices/claimSlice/claimSlice'

const Permission = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchPermision2());
    dispatch(fetchStaff());
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    }
  }, [])


  return (
    <Row gutter={[12, 12]}>
      <Col lg={12} >
        <ListPermission />
      </Col>
      <Col lg={12} >
        <ListStaff />
      </Col>
    </Row>
  )
}

export default Permission