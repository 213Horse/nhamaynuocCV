import { Table } from "antd";

function TableCustomerRevenueAnalysis() {
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "doiTuongGia",
      title: "Đối tượng giá",
      dataIndex: "doiTuongGia",
    },
    {
      key: "soHo",
      title: "Số hộ",
      dataIndex: "soHo",
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
      key: "thue",
      title: "Thuế VAT (VNĐ)",
      dataIndex: "thue",
    },
    {
      key: "phi",
      title: "Phí BVMT (VNĐ)",
      dataIndex: "phi",
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
        <h1>BÁO CÁO PHÂN TÍCH DOANH THU THEO ĐỐI TƯỢNG GIÁ</h1>
        <p>Từ: 01/09/2023 - Đến: 30/09/2023</p>
      </div>

      <Table
        columns={cols}
        rowKey="index"
        scroll={{ x: 1500 }}
      ></Table>

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

export default TableCustomerRevenueAnalysis;
