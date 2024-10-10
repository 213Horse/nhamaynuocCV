import { Table } from "antd";

function TableTotalWaterYieldArea() {
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "maKH",
      title: "Tên tuyến",
      dataIndex: "maKH",
    },
    {
      key: "tenKH",
      title: "Số KH",
      dataIndex: "tenKH",
    },
    {
      key: "soHopDong",
      title: "Số HĐ",
      dataIndex: "soHopDong",
    },
    {
      key: "maDongHo",
      title: "Tiêu thụ",
      dataIndex: "maDongHo",
    },
    {
      key: "diaChi",
      title: "Tiền nước",
      dataIndex: "diaChi",
    },
    {
      key: "loaiDongHo",
      title: "Thuế VAT",
      dataIndex: "loaiDongHo",
    },
    {
      key: "soHo",
      title: "Thuế BVMT",
      dataIndex: "soHo",
    },
    {
      key: "trangThai",
      title: "Khấu trừ",
      dataIndex: "trangThai",
    },
    {
      key: "trangThai",
      title: "Tổng tiền",
      dataIndex: "trangThai",
    },
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>BÁO CÁO DOANH THU THEO KHU VỰC</h1>
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

export default TableTotalWaterYieldArea;
