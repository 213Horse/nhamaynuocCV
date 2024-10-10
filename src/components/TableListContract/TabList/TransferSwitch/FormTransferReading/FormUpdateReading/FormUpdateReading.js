import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { toast } from "react-toastify";

function FormUpdateReading({ hideModalTransferReading }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 7 },
      lg: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  const handleHideModal = () => {
    hideModalTransferReading();
  };

  return (
    <Form>
      <Row>
        {/* Tuyến đọc mới */}
        <Col xs={24} sm={24} md={8} lg={8}>
          <Form.Item
            name="tuyenDocMoiId"
            label="Tuyến đọc mới"
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn tuyến đọc mới.",
              },
            ]}
            {...formItemLayout}
          >
            <Select
              fieldNames="tuyenDocMoiId"
              placeholder="Chọn tuyến đọc mới"
            />
          </Form.Item>
        </Col>

        {/* Nhân viên mới */}
        <Col xs={24} sm={24} md={8} lg={8}>
          <Form.Item
            name="nhanVienMoi"
            label="Nhân viên mới"
            {...formItemLayout}
          >
            <Input name="nhanVienMoi" placeholder="Tên nhân viên mới" />
          </Form.Item>
        </Col>

        {/* Chuyển hóa đơn */}
        <Col xs={24} sm={24} md={8} lg={8}>
          <Form.Item name="chuyenHoaDon" label="Chuyển HĐ" {...formItemLayout}>
            <Select
              fieldNames="chuyenHoaDon"
              options={[
                { label: "Chuyển hết hóa đơn", value: 1 },
                { label: "Chuyển những hóa đơn chưa thanh toán", value: 2 },
                { label: "Chuyển những hóa đơn chưa có số hóa đơn", value: 3 },
                { label: "Không chuyển hóa đơn", value: 4 },
              ]}
              placeholder="Hóa đơn"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="update-reading-footer">
        <Button
          htmlType="submit"
          className="custom-btn-add space-right-10"
          onClick={() => toast.info("Tính năng chưa hoạt động")}
        >
          <SaveOutlined /> Thực hiện
        </Button>

        <Button className="custom-btn-close" onClick={handleHideModal}>
          <CloseOutlined /> Đóng
        </Button>
      </div>
    </Form>
  );
}

export default FormUpdateReading;
