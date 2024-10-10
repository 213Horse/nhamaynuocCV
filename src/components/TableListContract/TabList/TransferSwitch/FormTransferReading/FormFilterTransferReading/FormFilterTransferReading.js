import { Button, Col, Form, Input, Row, Select } from "antd";
import { toast } from "react-toastify";

function FormFilterTransferReading() {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
      md: { span: 10 },
      lg: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  return (
    <Form>
      <Row>
        {/* Tuyến/ phạm vi */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item
            name="tuyenDocId"
            label="Tuyến/ phạm vi"
            rules={[
              {
                // required: true,
                message: "Bạn cần phải chọn tuyến đọc.",
              },
            ]}
            {...formItemLayout}
          >
            <Select fieldNames="tuyenDocId" placeholder="Chọn tuyến đọc" />
          </Form.Item>
        </Col>

        {/* Tuyến đọc cũ */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item
            name="tuyenDocCuId"
            label="Tuyến đọc cũ"
            {...formItemLayout}
          >
            <Select fieldNames="tuyenDocCuId" placeholder="Chọn tuyến đọc cũ" />
          </Form.Item>
        </Col>

        {/* Nhân viên cũ */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item name="nhanVienCu" label="Nhân viên cũ" {...formItemLayout}>
            <Input name="nhanVienCu" placeholder="Tên nhân viên cũ" />
          </Form.Item>
        </Col>

        {/* Trạng thái */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item
            name="trangThaiSuDung"
            label="Trạng thái"
            {...formItemLayout}
          >
            <Select
              fieldNames="trangThaiSuDung"
              placeholder="Chọn trạng thái"
            />
          </Form.Item>
        </Col>

        {/* Mã khách hàng */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item
            name="maKhachHang"
            label="Mã khách hàng"
            {...formItemLayout}
          >
            <Input name="maKhachHang" placeholder="Nhập mã khách hàng" />
          </Form.Item>
        </Col>

        {/* Số hợp đồng */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item name="soHopDong" label="Số hợp đồng" {...formItemLayout}>
            <Input name="soHopDong" placeholder="Nhập số hợp đồng" />
          </Form.Item>
        </Col>

        {/* ĐH block */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Form.Item
            name="dongHoBlock"
            label="Đồng hồ block"
            {...formItemLayout}
          >
            <Select fieldNames="dongHoBlock" placeholder="Chọn đồng hồ block" />
          </Form.Item>
        </Col>

        {/* Button tìm kiếm */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <Row justify={"end"}>
            <Form.Item {...formItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="space-left-6"
                onClick={() => toast.info("Tính năng chưa hoạt động")}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default FormFilterTransferReading;
