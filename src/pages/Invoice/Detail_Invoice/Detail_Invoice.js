import { Divider, Drawer, Table } from "antd";
import { useState } from "react";

export const DetailInvoice = (props) => {
  const { open, onClose } = props;
  const [placement, setPlacement] = useState("bottom");

  const dataSource = Array.from({ length: 10 }).map((_, index) => ({
    key: index,
    name: `Hạng mục ${index}`,
    quantity: `Số lượng ${index}`,
    price: `Đơn giá ${index}`,
    total: `Thành tiền ${index}`,
    vat: `Tiền VAT ${index}`,
    bvmt: `Phí BVMT ${index}`    
  }));

  const columns = [
    {
      title: "Hạng mục", 
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Tiền VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Phí BVMT",
      dataIndex: "bvmt",
      key: "bvmt",
    },
  ];

  const columnRight = [
    {
      title: "Tên nợ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại nợ",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Số tiền",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div style={{ width: "calc(100vw - 270px)" }}>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="left-table" style={{ display: "flex", alignItems: 'center' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ flex: 3 }}
            size="small"
            bordered
            scroll={{
              x: 1000,
              y: 240,
            }}
          />
          <Divider type="vertical" style={{height: '200px'}}/>
          <Table
            dataSource={dataSource}
            columns={columnRight}
            style={{ flex: 1 }}
            size="small"
            bordered
            scroll={{
              x: 1000,
              y: 240,
            }}
          />
        </div>
      </Drawer>
    </div>
  );
};
