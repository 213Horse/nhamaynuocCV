import { Table } from "antd";

function TableClockIndex() {
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
      key: "seriDongHo",
      title: "Seri đồng hồ",
      dataIndex: "seriDongHo",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>BẢNG KÊ CHỈ SỐ ĐỒNG HỒ NƯỚC</h1>
        <p>Từ: 01/09/2023 - Đến: 30/09/2023</p>
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

export default TableClockIndex;
