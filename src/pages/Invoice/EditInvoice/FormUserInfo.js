import { Col, Form, Input, Row } from "antd";
import React from "react";

export const FormUserInfo = () => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 24,
    },
  };
  return (
    <div className="user-info" style={{ marginTop: "15px" }}>
      <Row gutter={24}>
        <Col sm={12} md={12} lg={12} style={{ width: "100%" }}>
          <Form.Item name="khachHangKeyId" label="Mã KH">
            <Input placeholder="Mã KH" disabled/>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12} style={{ width: "100%" }}>
          <Form.Item name="tenKH" label="Tên KH">
            <Input placeholder="Tên KH" disabled/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col sm={12} md={12} lg={12} style={{ width: "100%" }}>
          <Form.Item name="maSoThue" label="Mã số thuế">
            <Input placeholder="Mã số thuế" disabled/>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12} style={{ width: "100%" }}>
          <Form.Item
            name="soDienThoai"
            label="Điện thoại"
          >
            <Input placeholder="Điện thoại" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={24} style={{ width: "100%" }}>
          <Form.Item name="diaChi" label="Địa chỉ">
            <Input placeholder="Địa chỉ" disabled/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={8} style={{ width: "100%" }}>
          <Form.Item name="soHo" label="Số hộ">
            <Input placeholder="Số hộ" disabled/>
          </Form.Item>
        </Col>
        <Col lg={8} style={{ width: "100%" }}>
          <Form.Item name="soKhau" label="Số khẩu">
            <Input placeholder="Số khẩu" disabled/>
          </Form.Item>
        </Col>
        <Col lg={8} style={{ width: "100%" }}>
          <Form.Item name="tenNganHang" label="Tên ngân hàng">
            <Input placeholder="Tên ngân hàng" disabled/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} style={{ width: "100%" }}>
          <Form.Item name="taiKhoanNH" label="Tài khoản NH">
            <Input placeholder="Tài khản NH" disabled/>
          </Form.Item>
        </Col>
        <Col lg={12} style={{ width: "100%" }}>
          <Form.Item name="tenTaiKhoan" label="Tên tài khoản">
            <Input placeholder="Tên tài khoản" disabled/>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
