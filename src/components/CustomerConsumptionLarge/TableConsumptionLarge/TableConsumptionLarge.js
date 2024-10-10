import { Table } from "antd";

function TableConsumptionLarge() {
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "maKH",
      title: "Mã KH",
      dataIndex: "maKH",
    },
    {
      key: "tenKH",
      title: "Tên khách hàng",
      dataIndex: "tenKH",
    },
    {
      key: "soHopDong",
      title: "Số hợp đồng",
      dataIndex: "soHopDong",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "nhanVienQL",
      title: "Nhân viên quản lý",
      dataIndex: "nhanVienQL",
    },
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>
          DANH SÁCH KHÁCH HÀNG CÓ MỨC TIÊU THỤ LỚN {`(>= 10)`} TRONG VÒNG 3
          THÁNG
        </h1>
        {/* <p>Từ: 01/09/2023 - Đến: 30/09/2023</p> */}
      </div>

      <Table columns={cols} rowKey="index"></Table>

      <div className="footer-signature">
        <p>Ngày ... tháng ... năm 2023</p>

        <div className="footer-signature-inner">
          <p className="signature-creator">Người lập</p>
          <p>Ký, họ tên</p>
        </div>
      </div>
    </>
  );
}

export default TableConsumptionLarge;
