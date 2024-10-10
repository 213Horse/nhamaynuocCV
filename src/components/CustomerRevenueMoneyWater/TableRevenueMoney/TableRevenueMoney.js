import { Table } from "antd";

function TableRevenueMoney() {
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
      key: "maDongHo",
      title: "Mã đồng hồ",
      dataIndex: "maDongHo",
    },
    {
      key: "noiDung",
      title: "Nội dung",
      dataIndex: "noiDung",
    },
    {
      key: "tieuThu",
      title: "Tiêu thụ (m3)",
      dataIndex: "tieuThu",
    },
    {
      key: "tienNuoc",
      title: "Tiền nước (VNĐ)",
      dataIndex: "tienNuoc",
    },
    {
      key: "thueVAT",
      title: "Thuế VAT (VNĐ)",
      dataIndex: "thueVAT",
    },
    {
      key: "phiBVMT",
      title: "Phí BVMT (VNĐ)",
      dataIndex: "phiBVMT",
    },
    {
      key: "tongTien",
      title: "Tổng tiền (VNĐ)",
      dataIndex: "tongTien",
    },
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>BÁO CÁO SẢN LƯỢNG DOANH THU TIỀN NƯỚC </h1>
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

export default TableRevenueMoney;
