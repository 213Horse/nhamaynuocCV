import { CloseOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

function FormPayByBill({ hideModal }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
      md: { span: 6 },
      lg: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  // handle submit form
  const handleSubmit = (values) => {
    console.log("values", values);
  };

  // handle submit form error
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <>
      <Divider />

      <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
        {/* Seri + Số hóa đơn + button search */}
        <Row justify="start">
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Số seri" {...formItemLayout}>
              <Input name="" placeholder="Nhập số seri" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Số HĐ" {...formItemLayout}>
              <Input name="" placeholder="Nhập số hóa đơn" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button className="custom-btn-search">Tìm</Button>
            </div>
          </Col>
        </Row>

        <Divider orientation="left">Thông tin khách hàng</Divider>

        {/* Số hóa đơn + Khách hàng */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Số HĐ" {...formItemLayout}>
              <Input name="" placeholder="Nhập số hóa đơn" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Tên KH" {...formItemLayout}>
              <Input name="" placeholder="Nhập tên khách hàng" />
            </Form.Item>
          </Col>
        </Row>

        {/*  Địa chỉ + Hợp đồng */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Địa chỉ" {...formItemLayout}>
              <Input name="" placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Hợp đồng" {...formItemLayout}>
              <Input name="" placeholder="Nhập số hợp đồng" />
            </Form.Item>
          </Col>
        </Row>

        {/* tổng tiền + Tiền bằng chữ */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Tổng tiền" {...formItemLayout}>
              <InputNumber
                name=""
                placeholder="Tổng tiền"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Bằng chữ" {...formItemLayout}>
              <Input name="" placeholder="Tiền bằng chữ" />
            </Form.Item>
          </Col>
        </Row>

        {/* Đã thanh toán + Ngày thu + Người thu tiền */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name=""
              label="Đã TT"
              valuePropName="checked"
              {...formItemLayout}
            >
              <Checkbox name="" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Ngày thu" {...formItemLayout}>
              <DatePicker
                name=""
                locale={locale}
                placeholder="Chọn ngày thu"
                className="gutter-item-date-picker"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Người thu" {...formItemLayout}>
              <Select
                fieldNames=""
                options={[{ value: "1", label: "NT 1" }]}
                placeholder="Chọn người thu tiền"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <div className="func-pay-by-bill-buttons">
          <Button className="custom-btn-add space-right-10" htmlType="submit">
            <FormOutlined /> Ghi lại
          </Button>
          <Button
            onClick={() => hideModal()}
            className="pay-by-bill-btn-close custom-btn-close"
          >
            <CloseOutlined /> Đóng
          </Button>
        </div>
      </Form>
    </>
  );
}

export default FormPayByBill;
