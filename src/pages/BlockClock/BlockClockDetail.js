import { SendOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Modal, Table, theme } from "antd";
import { useState } from "react";
import "./FormBlockClock/BlockClock.css";
export const BlockClockDetail = (props) => {
  const { isOpen, setIsOpenModalNoticeDetail } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { token } = theme.useToken();
  console.log("render modal Detail");
  function fetchDataForPage(page) {
    const pageSize = 18;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataSource.slice(startIndex, endIndex);
  }

  const handleData1Change = (pagination) => {
    const currentPage = pagination.current;
  };
  const dataSource = Array.from({ length: 50 }, (_, key) => ({
    key: key + 1,
    stt: key + 1,
    shd: "duong",
    mkh: "duong",
    tkh: "duong",
    dc: "duong",
    dt: "duong",
    t: "duong",
    sh: "duong",
    kdh: "duong",
    vtld: "duong",
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 60,
    },
    {
      title: "Số hợp đồng",
      dataIndex: "shd",
      key: "shd",
    },
    {
      title: "Mã KH",
      dataIndex: "mkh",
      key: "mkh",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tkh",
      key: "tkh",
      width: 190,
    },
    {
      title: "Địa chỉ",
      dataIndex: "dc",
      key: "dc",
      width: 190,
    },
    {
      title: "Điện thoại",
      dataIndex: "dt",
      key: "dt",
    },
    {
      title: "Tuyến",
      dataIndex: "t",
      key: "t",
    },
    {
      title: "Số hiệu",
      dataIndex: "sh",
      key: "sh",
    },
    {
      title: "Kiểu đồng hồ",
      dataIndex: "kdh",
      key: "kdh",
      width: 190,
    },
    {
      title: "Vị trí lắp đặt",
      dataIndex: "vtld",
      key: "vtld",
      width: 190,
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
      width={1500}
      footer={null}
      centered={true}
      style={{
        top: 20,
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          marginTop: 16,
          padding: "10px 10px",
        }}
      >
        <Table
          rowKey="index"
          onChange={handleData1Change}
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          size="small"
          scroll={{
            x: 1200,
            y: 240,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "justify-between",
          marginBottom: 16,
          marginTop: 16,
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "auto" }}>
          <Button
            className="custom-btn-save-and-add-d"
            style={{ marginRight: 5 }}
          >
            Xuất Excel
          </Button>
          <Button
            className="custom-btn-watch-report-d"
            style={{ marginRight: 5 }}
          >
            Chuyển đồng hồ
          </Button>
          <Button
            className="    custom-btn-update-d"
            style={{ marginRight: 5 }}
          >
            Thêm đồng hồ
          </Button>
          <Button className="custom-btn-right-d" style={{ marginRight: 5 }}>
            Xóa
          </Button>
          <Button
            key="submit"
            className="custom-btn-close-d"
            onClick={() => setIsOpenModalNoticeDetail(false)}
          >
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
};
