import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { CloseOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
function FormUpdateInfoDebt({ hideModalUpdateInfoDebt }) {
  // handle submit form (Cập nhật thông tin hợp đồng nợ)
  const handleSubmit = (values) => {
    console.log("values ->", values);
  };

  // handle submit error (Cập nhật thông tin hợp đồng nợ)
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
      {/* Mã hợp đồng + Loại nợ + Mã nợ + Button */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Mã hợp đồng" className="gutter-item">
            <Select
              fieldNames=""
              options={[{ value: "1", label: "Mã HĐ 1" }]}
              placeholder="Chọn mã hợp đồng"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Loại nợ" className="gutter-item">
            <Select
              fieldNames=""
              options={[{ value: "1", label: "LN 1" }]}
              placeholder="Chọn loại nợ"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={7}>
          <Form.Item name="" label="Mã nợ (*)" className="gutter-item">
            <Input name="" placeholder="Nhập mã nợ" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={1}>
          <Button type="primary">
            <UndoOutlined />
          </Button>
        </Col>
      </Row>

      {/* Tên nợ + Ngày vay */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={16}>
          <Form.Item name="" label="Tên nợ (*)" className="gutter-item">
            <Input name="" placeholder="Nhập tên nợ" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Ngày vay">
            <DatePicker
              name=""
              locale={locale}
              placeholder="Chọn ngày vay"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Tiền vay + Tiền trả góp + Tiền đã trả */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Tiền vay" className="gutter-item">
            <InputNumber
              name=""
              placeholder="Nhập tiền vay"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Tiền trả góp" className="gutter-item">
            <InputNumber
              name=""
              placeholder="Nhập tiền trả góp"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Tiền đã trả">
            <InputNumber
              name=""
              placeholder="Nhập tiền đã trả"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Tiền còn nợ + Ngày BĐ trả + Ngày KT trả */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Tiền còn nợ" className="gutter-item">
            <InputNumber
              name=""
              placeholder="Nhập tiền còn nợ"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Ngày BĐ trả" className="gutter-item">
            <DatePicker
              name=""
              locale={locale}
              placeholder="Chọn ngày BĐ trả"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Ngày KT trả">
            <DatePicker
            locale={locale}
              name=""
              placeholder="Chọn ngày KT trả"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Hình thức trả + Ghi chú */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item name="" label="Hình thức trả" className="gutter-item">
            <Select
              fieldNames=""
              options={[{ value: "1", label: "HT 1" }]}
              placeholder="Chọn hình thức trả"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={16}>
          <Form.Item name="" label="Ghi chú">
            <Input
              name=""
              placeholder="Nhập ghi chú"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      {/* Buttons  */}
      <div className="func-update-info-debt-btn">
        {/* <Button htmlType="submit" type="primary">
          <SaveOutlined />
          Lưu và thêm tiếp
        </Button> */}
        <Button
          htmlType="submit"
          className="item-update-info-debt-btn"
          type="primary"
        >
          <SaveOutlined />
          Lưu và đóng
        </Button>
        <Button onClick={() => hideModalUpdateInfoDebt()} type="primary">
          <CloseOutlined />
          Đóng
        </Button>
      </div>
    </Form>
  );
}

export default FormUpdateInfoDebt;
