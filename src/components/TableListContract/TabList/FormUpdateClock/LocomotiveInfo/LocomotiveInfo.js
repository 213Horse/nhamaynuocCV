import { Col, Divider, Form, Input, Row, Select } from "antd";
import { useSelector } from "react-redux";

import { fetchApiAllReadingSelector } from "../../../../../redux/selector";

function LocomotiveInfo({ formItemLayout }) {
  const readings = useSelector(fetchApiAllReadingSelector);

  return (
    <div className="modal-locomotive-info">
      <Divider orientation="left">Thông tin đầu máy</Divider>

      <Row>
        {/* Mã khách hàng */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item name="keyIdOfCustomer" label="Mã KH" {...formItemLayout}>
            <Input
              name="keyIdOfCustomer"
              placeholder="Mã khách hàng"
              disabled
            />
          </Form.Item>
        </Col>

        {/* Tên khách hàng */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item name="tenKhachHang" label="Tên KH" {...formItemLayout}>
            <Input name="tenKhachHang" placeholder="Tên khách hàng" disabled />
          </Form.Item>
        </Col>
        {/* Địa chỉ */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item name="diaChi" label="Địa chỉ" {...formItemLayout}>
            <Input name="diaChi" placeholder="Địa chỉ" disabled />
          </Form.Item>
        </Col>

        {/* Tuyến đọc + Thứ tự */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item name="tuyenDocId" label="Tuyến đọc" {...formItemLayout}>
            <Select
              fieldNames="tuyenDocId"
              options={readings?.map((_reading) => ({
                label: _reading.tenTuyen,
                value: _reading.id,
              }))}
              placeholder="Tuyến đọc"
              disabled
            />
          </Form.Item>
        </Col>

        {/* Nhập số thứ tự */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item name="soThuTu" label="Thứ tự" {...formItemLayout}>
            <Input name="soThuTu" placeholder="Số thứ tự" disabled />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default LocomotiveInfo;
