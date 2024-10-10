import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, theme } from "antd";
import React from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
export const SearchForm = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const formStyle = {
    borderRadius: token.borderRadiusLG,
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
      size="small"
    >
      <Row gutter={24}>
        <Col
          lg={8}
          style={{
            width: "100%",
          }}
        >
          <Form.Item name="date" label="Mã KH">
            <Input
              style={{ width: "100%" }}
              placeholder="Nhập mã KH hoặc địa chỉ nhận"
            />
          </Form.Item>
        </Col>
        <Col
          lg={8}
          style={{
            width: "100%",
          }}
        >
          <Form.Item name="person" label="Kết quả">
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
        <Col
          lg={8}
          style={{
            width: "100%",
          }}
        >
          <Form.Item name="person" label="Kết quả chi tiết">
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
      <div style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>
      </div>
    </Form>
  );
};
