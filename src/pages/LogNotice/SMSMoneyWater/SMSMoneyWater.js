import { CloseOutlined, SendOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Table,
  theme,
} from "antd";
import React from "react";
import { SearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";

export const SMSMoneyWater = (props) => {
  const { token } = theme.useToken();
  const { isOpen, setIsOpen } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const items = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: <SearchForm />,
    },
  ];
  const dataSource = Array.from({ length: 50 }, (_, key) => ({
    key: key + 1,
    stt: key + 1,
    type: "abc",
    address: "abc",
    info: "abc",
    content: "abc",
    timeSent: "abc",
    result: "abc",
    number: "abc",
    netHouse: "abc",
  }));
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên KH",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Số tin",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Mã ĐT giá",
      dataIndex: "codeprice",
      key: "codeprice",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Phí BVMT",
      dataIndex: "bvmt",
      key: "bvmt",
    },
    {
      title: "Phí thải",
      dataIndex: "phithai",
      key: "phithai",
    },
    {
      title: "Phí BV Rừng",
      dataIndex: "Phibvrung",
      key: "Phibvrung",
    },
    {
      title: "Phí VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Ngày gửi",
      dataIndex: "datesend",
      key: "datesend",
    },
  ];
  console.log("render modal sms money water");
  return (
    <Modal
      title="Gửi SMS tiền nước"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={1000}
      footer={null}
      centered
    >
      <Collapse items={items} size="small" />
      <div
        style={{
          lineHeight: "200px",
          textAlign: "center",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          marginTop: 16,
          padding: "10px 10px",
        }}
      >
        <Table
          //   rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={{
            current: 1,
            // total: 10000,
            // pageSize: 50,
          }}
          scroll={{
            x: 2000,
            y: 240,
          }}
        />
      </div>
      <Row style={{ display: "flex", marginTop: "10px" }}>
        <Col sm={24} md={24} lg={12} style={{ width: "100%" }}>
          <Form.Item
            name="date"
            label="Tiêu đề"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ marginLeft: "10px" }} />
          </Form.Item>
        </Col>
        <Col sm={24} md={24} lg={12} style={{ textAlign: "end" }}>
          <div style={{ marginLeft: "auto" }}>
            <Checkbox style={{ marginRight: "13px" }}>Email</Checkbox>
            <Checkbox style={{ marginRight: "13px" }}>
              Ứng dụng Nước Sạch
            </Checkbox>
            <Button
              type="primary"
              icon={<SendOutlined style={{ transform: "rotate(310deg)" }} />}
              style={{ marginRight: 5, marginTop: `${isMobile ? '10px' : 0}` }}
              size="middle"
            >
              Gửi
            </Button>
            <Button
              className="custom-btn-close"
              onClick={() => setIsOpen(false)}
              size="middle"
              style={{marginTop: `${isMobile ? '10px' : 0}` }}
            >
              <CloseOutlined />
              Đóng
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
