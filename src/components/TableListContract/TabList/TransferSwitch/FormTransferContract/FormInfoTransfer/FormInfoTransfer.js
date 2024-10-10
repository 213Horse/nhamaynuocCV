import { Col, Form, Input, Row } from "antd";
import { useSelector } from "react-redux";

import { fetchApiGetByIdCustomerSelector } from "../../../../../../redux/selector";

function FormInfoTransfer() {
  const customer = useSelector(fetchApiGetByIdCustomerSelector);

  // console.log("customer", customer);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
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

  return (
    <Form
      fields={[
        { name: "tenKH", value: customer?.tenKhachHang },
        { name: "diaChiCu", value: customer?.diaChi },
        { name: "soHopDong", value: customer?.hopDongs[0]?.keyId }, // đúng vs quan hệ 1-1
        { name: "ghiChu", value: customer?.ghiChu },
      ]}
    >
      <Row>
        {/* Tên KH */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="tenKH" label="Tên KH" {...formItemLayout}>
            <Input name="tenKH" disabled />
          </Form.Item>
        </Col>

        {/* Địa chỉ KH */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="diaChiCu" label="Địa chỉ" {...formItemLayout}>
            <Input name="diaChiCu" disabled />
          </Form.Item>
        </Col>

        {/* Số hợp đồng */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="soHopDong" label="Số hợp đồng" {...formItemLayout}>
            <Input name="soHopDong" disabled />
          </Form.Item>
        </Col>

        {/* Ghi chú */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="ghiChuCu" label="Ghi chú" {...formItemLayout}>
            <Input name="ghiChuCu" placeholder="Nhập ghi chú" />
          </Form.Item>
        </Col>
      </Row>

      <div className="update-reading-footer">
        {/* <Button htmlType="submit" className="custom-btn-add space-right-10">
        <SaveOutlined /> Thực hiện
      </Button>

      <Button className="custom-btn-close">
        <CloseOutlined /> Đóng
      </Button> */}
      </div>
    </Form>
  );
}

export default FormInfoTransfer;
