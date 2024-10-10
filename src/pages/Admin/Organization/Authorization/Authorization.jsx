import { Col, Row } from 'antd'
import React from 'react'
import SidebarAuth from './SidebarAuth/SidebarAuth'
import './authorization.css';
import AuthContent from './AuthContent/AuthContent';

const Authorization = () => {
  return (
    <Row gutter={[10, 10]} style={{height: '100%'}}>
      <Col lg={6} md={6} sm={24} xs={24}>
        <SidebarAuth/>
      </Col>
      <Col lg={18} md={18} sm={24} xs={24}>
        <AuthContent />
      </Col>
    </Row>
  )
}

export default Authorization