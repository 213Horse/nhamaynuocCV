import {
  CloseOutlined,
  SendOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Modal,
  Row,
  Table,
} from "antd";
import { useState } from "react";
import { SearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";

export const NoticeDetail = (props) => {
  const { isOpen, setIsOpenModalNoticeDetail } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  console.log("render modal Notice Detail");

  const dataSource = Array.from({ length: 500 }, (_, key) => ({
    key,
    stt: key + 1,
    type: "Loại " + key,
    address: "Địa chỉ nhận " + key,
    info: "Thông tin " + key,
    content: "Nội dung " + key,
    timeSent: "Thời gian gửi " + key,
    result: "Kết quả " + key,
    number: "Số tin " + key,
    netHouse: "Nhà mạng " + key,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Thời gian gửi",
      dataIndex: "timeSent",
      key: "timeSent",
    },
    {
      title: "Kết quả",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Số tin",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Nhà mạng",
      dataIndex: "netHouse",
      key: "netHouse",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Modal
      title="Chi tiết thông báo"
      open={isOpen}
      onOk={() => setIsOpenModalNoticeDetail(false)}
      onCancel={() => setIsOpenModalNoticeDetail(false)}
      width={1000}
      footer={null}
      centered
    >
      <Collapse
        items={[
          {
            key: "1",
            label: "Tìm kiếm",
            children: <SearchForm />,
          },
        ]}
        size="small"
      />
      <Table
        bordered
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        size="small"
        scroll={{
          x: 1200,
          y: 240,
        }}
        style={{
          marginTop: "10px",
        }}
      />
      <Row>
        <Col lg={8}>
          <Button
            type="primary"
            icon={<SyncOutlined />}
            style={{ margin: "10px 5px 0px 0px" }}
          >
            Cập nhật nhà mạng từ phiên gửi - TTKH
          </Button>
        </Col>
        <Col lg={8}>
          <Button
            type="primary"
            icon={<SendOutlined style={{ transform: "rotate(310deg)" }} />}
            style={{ margin: "10px 5px 0px 0px" }}
          >
            Gửi lại
          </Button>
        </Col>
        {/* <Col lg={8}> */}
        <Button
          className="custom-btn-close"
          onClick={() => setIsOpenModalNoticeDetail(false)}
          style={{
            marginLeft: "auto",
          }}
        >
          <CloseOutlined />
          Đóng
        </Button>
        {/* </Col> */}
      </Row>
    </Modal>
  );
};
