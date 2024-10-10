import { Table } from "antd";

function TableInfoCustomer() {
  const cols = [
    {
      key: "code_cus",
      title: "Mã khách hàng",
      dataIndex: "code_cus",
    },
    {
      key: "fullName",
      title: "Tên khách hàng",
      dataIndex: "fullName",
    },
    {
      key: "code_line_reading",
      title: "Mã tuyến đọc",
      dataIndex: "code_line_reading",
    },
    {
      key: "num_contract",
      title: "Số hợp đồng",
      dataIndex: "num_contract",
    },
    {
      key: "address",
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      key: "phone",
      title: "Điện thoại",
      dataIndex: "phone",
    },
  ];

  return (
    <Table
      columns={cols}
      size="small"
      rowKey="code_cus"
      scroll={{ x: 700 }}
      className="tbl-info-customer"
    ></Table>
  );
}

export default TableInfoCustomer;
