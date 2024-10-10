import { Table } from "antd";

export default function WaterPriceTable() {
  // Dữ liệu cho bảng giá nước
  const data = [
    {
      key: "1",
      level: "Mức 1",
      price: "5000",
    },
    {
      key: "2",
      level: "Mức 2",
      price: "7000",
    },
    // ...
  ];

  // Các cột của bảng giá nước
  const columns = [
    {
      title: "Mức",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Giá (đồng/m3)",
      dataIndex: "price",
      key: "price",
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} />;
}
