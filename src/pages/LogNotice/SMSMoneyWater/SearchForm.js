import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const SearchForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <Form
      {...layout}
      form={form}
      name="advanced_search"
      onFinish={onFinish}
      size="small"
    >
      <Row gutter={24}>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="date" label="Chọn tháng">
            <DatePicker
              allowClear
              locale={locale}
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="person" label="Cán bộ đọc">
            <Select
              defaultValue="--Chọn kết quả gửi--"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="person" label="Tuyến đọc">
            <Select
              defaultValue="--Chọn kết quả chi tiết--"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="date" label="phạm vi">
            <Input
              style={{ width: "100%" }}
              placeholder="Nhập mã KH hoặc địa chỉ nhận"
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="person" label="Số hợp đồng">
            <Select
              defaultValue="--Chọn kết quả gửi--"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="person" label="Loại KH">
            <Select
              defaultValue="--Chọn kết quả chi tiết--"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="date" label="Kiểu gửi">
            <Select
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="person" label="Trạng thái">
            <Select
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={8} style={{width: '100%'}}>
          <Form.Item name="person" label="Tình trạng">
            <Select
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={24} lg={12} style={{width: '100%'}}>
          <Form.Item name="person" label="Tên KH">
            <Input placeholder="Tên khách hàng" />
          </Form.Item>
        </Col>
        <Col md={24} lg={12} style={{width: '100%'}}>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
