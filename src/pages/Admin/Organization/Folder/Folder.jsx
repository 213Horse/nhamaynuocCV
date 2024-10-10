import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import SidebarFolder from './SidebarFolder';
import './folder.css';
import FolderContent from './FolderContent';
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice';
import { useDispatch } from 'react-redux';

const Folder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row gutter={[10, 10]} style={{ height: '100%' }}>
      <Col lg={6} md={6} sm={24} xs={24}>
        <SidebarFolder showTitle />
      </Col>
      <Col lg={18} md={18} sm={24} xs={24}>
        <FolderContent showTitle />
      </Col>
    </Row>
  )
}

export default Folder