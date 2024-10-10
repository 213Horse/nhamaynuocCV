import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const SearchForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 24,
    },
  };
  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      // size="small"
    >
      <Row gutter={24}>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="date" label="Tháng">
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
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item
            name="person"
            label="Cán bộ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="--Chọn cán bộ--"
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
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="tuyendoc" label="Tuyến đọc">
            <Select
              defaultValue="--Chọn tuyến đọc--"
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
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="status" label="Phạm vi">
            <Select
              defaultValue="--Chọn phạm vi--"
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
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="place" label="Loại KH">
            <Select
              defaultValue="--Chọn loại KH--"
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
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="ky" label="Số hợp đồng">
            <Input placeholder="Nhập số hợp đồng" />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="numberName" label="Loại ĐH">
            <Select
              defaultValue="--Chọn loại ĐH--"
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
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space size="small">
              <Button
                htmlType="submit"
                className="custom-btn-search gutter-item-btn"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                className="custom-btn-search gutter-item-btn"
                icon={<SearchOutlined />}
              >
                Tìm mới
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
