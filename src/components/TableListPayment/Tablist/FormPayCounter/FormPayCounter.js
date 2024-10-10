import {
  CloseOutlined,
  FormOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, Collapse, Divider, Row } from "antd";

import "./FormPayCounter.css";
import TableInfoCustomer from "./TableInfoCustomer/TableInfoCustomer";
import TableInfoDate from "./TableInfoDate/TableInfoDate";
import TableInfoContract from "./TableInfoContract/TableInfoContract";
import FormFilterPayCounter from "./FormFilterPayCounter/FormFilterPayCounter";

function FormPayCounter({ hideModal }) {
  // Collapse filter
  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormFilterPayCounter />,
    },
  ];

  return (
    <>
      {/* (Collapse filter) */}
      <Collapse
        key="1"
        items={items}
        accordion={false}
        defaultActiveKey={["1"]}
        style={{ marginBottom: "12px", marginTop: "10px" }}
        size="small"
      />

      {/* table info customer */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={12}>
          <TableInfoCustomer />
        </Col>
      </Row>

      {/* table info date + table info contract */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="tbl-info-date">
            <TableInfoDate />
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="tbl-info-contract">
            <Divider orientation="left">Giỏ hàng</Divider>
            <TableInfoContract />
          </div>
        </Col>
      </Row>

      <Divider />

      {/* Footer buttons */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={5}>
          <p className="pay-counter-footer-text">
            Bạn sẽ là người thu tiền của hóa đơn nếu bạn cập nhật thanh toán!
          </p>
        </Col>

        <Col xs={24} sm={24} md={12} lg={2}>
          <div className="pay-counter-footer-quantity">Số lượng: 0</div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={3}>
          <div className="pay-counter-footer-total">Tổng tiền: 0 vnđ</div>
        </Col>

        <Col xs={24} sm={12} md={12} lg={2}>
          <Button className="custom-btn-export space-top-10">
            <FormOutlined />
            Ghi lại và in
          </Button>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <div className="pay-counter-pay-and-close">
            <Button className="custom-btn-del space-top-10">
              <ShoppingCartOutlined />
              Thanh toán giỏ hàng
            </Button>
            <Button
              className="custom-btn-close space-top-10"
              style={{ marginLeft: "12px" }}
              onClick={() => hideModal()}
            >
              <CloseOutlined />
              Đóng
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default FormPayCounter;
