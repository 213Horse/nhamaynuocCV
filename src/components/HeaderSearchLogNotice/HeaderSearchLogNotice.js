import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
export const AdvancedSearchForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const date_from = new Date(values.date_from.toDate()).getTime();
    const date_to = new Date(values.date_to.toDate()).getTime();
    if (date_from > date_to) {
      alert("Ngày gửi không thể lớn hơn ngày nhận:");
      return;
    }

    values.date_from = moment(date_from).format("DD-MM-YYYY");
    values.date_to = moment(date_to).format("DD-MM-YYYY");

    console.log("Received values of form: ", values);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    // wrapperCol: {
    //   span: 22,
    // },
  };

  return (
    <Form
      {...layout}
      form={form}
      name="advanced_search"
      onFinish={onFinish}
      //   size="small"
    >
      <Row gutter={24}>
        <Col span={8} xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="date_from" label="Ngày gửi">
            <DatePicker
              locale={locale}
              allowClear
              placeholder="Từ"
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item name="date_to" label="Ngày nhận">
            <DatePicker
              locale={locale}
              allowClear
              placeholder="Đến"
              format="DD-MM-YYYY"
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="tuyendoc" label="Hình thức gửi">
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
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="status" label="Người gửi">
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
      <Row gutter={24}>
        <Col span={6} xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="place" label="Tên lần gửi">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="ky" label="Đã trả tiền">
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
        <Col span={6} xs={24} sm={12} md={12} lg={8}>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Button
              className="custom-btn-search gutter-item-btn"
              htmlType="submit"
            >
              <SearchOutlined />
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
