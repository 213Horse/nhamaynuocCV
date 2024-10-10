import { Table } from "antd";

function TableNotReadingNumber() {
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
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "loaiDongHo",
      title: "Loại đồng hồ",
      dataIndex: "loaiDongHo",
    },
    {
      key: "soHo",
      title: "Số hộ",
      dataIndex: "soHo",
    },
    {
      key: "trangThai",
      title: "Trạng thái",
      dataIndex: "trangThai",
    },
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>BẢNG KÊ HỢP ĐỒNG CHƯA ĐỌC SỐ</h1>
        <p>Từ: 01/09/2023 - Đến: 30/09/2023</p>
      </div>

      <Table columns={cols} rowKey="index"
        scroll={{ x: 1000}}
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

export default TableNotReadingNumber;
