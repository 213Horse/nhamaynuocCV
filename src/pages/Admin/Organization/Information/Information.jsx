import { Button, Col, Form, Input, InputNumber, Row, theme, Typography } from 'antd'
import React from 'react'
import {SaveOutlined} from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import TextArea from 'antd/es/input/TextArea'


const Information = () => {
	const [form] = Form.useForm();
	const { token } = theme.useToken();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })

  // handle save and close modal
  const handleSaveAndClose = (values) => {
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const layout = {
    labelCol: {
      lg: 3,
      md: 4,
    },
  };

	const rules = {rules: [{ required: true, message: "Vui lòng không được bỏ trống." }]}
  const rulesPhone = {rules: [{ required: true, message: "Vui lòng không được bỏ trống." }, { pattern: /([0-9]{10})\b/, message: "Số điện thoại không hợp lệ." }]}

  return (
    <>
      <Row align='middle' justify='space-between'>
        <Col>
          <h4>Thông tin tổ chức</h4>
        </Col>
        <Col>
          <Button
            key="submit"
            style={{
                marginLeft: "10px",
            }}
            icon={<SaveOutlined />}
            className="custom-btn-reset-d"
          >
            Cập nhật
          </Button>
        </Col>
      </Row>
      
      <Form
        {...layout}
        form={form}
        onFinish={handleSaveAndClose}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
          marginTop: 10
        }}
      >
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Mã tổ chức" 
              name="groupcode"
              {...rules}
            >
              <Input style={{ width: "100%" }}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Tên tổ chức" 
              name="groupname"
              {...rules}
            >
              <Input style={{ width: "100%" }}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Ngành" 
              name="branch" 
              {...rules}
            >
              <Input style={{ width: "100%" }}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Địa chỉ" 
              name="address" 
              {...rules}
            >
              <Input style={{ width: "100%" }}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Số điện thoại" 
              name="phone" 
              {...rulesPhone}
            >
              <Input style={{ width: "100%" }} maxLength={10}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Giới thiệu" 
              name="introl" 
            >
              <TextArea rows={4} style={{ width: "100%" }}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item 
              label="Trạng thái"
            >
              <Input style={{ width: "100%", color: '#16a3f4', fontWeight: 'bold' }} defaultValue="Đang hoạt động" disabled/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Information