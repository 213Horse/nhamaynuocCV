import { Table } from "antd";

function TableBillFollowByEmployee() {
//   STT
// TT ghi
// Mã KH
// Tên khách hàng
// Số hợp đồng
// Địa chỉ
// Điện thoại
// Mã số
// Chỉ số
// Chỉ số
// Tiêu thụ
// Tiền nước
// Thuế VAT
// Phí BVMT
// Tổng tiền
// Số kí hiệu
// Mã đồng
// Đối tượng
 	 	 	 	 	 	 	
// thuế
// đầu
// cuối
// (m3)
// (VNĐ)
// (VNĐ)
// (VNĐ)
// (VNĐ)
//  HĐ
// hồ cha
// giá
  const cols = [
    {
      key: "stt",
      title: "STT",
      dataIndex: "sst",
    },
    {
      key: 'ttghi',
      title: 'TT ghi',
      dataIndex: 'ttghi',
    },
    {
      key: 'maKH',
      title: 'Mã KH',
      dataIndex: 'maKH',
    },
    {
      key: 'tenKH',
      title: 'Tên khách hàng',
      dataIndex: 'tenKH',
    },
    {
      key: 'soHopDong',
      title: 'Số hợp đồng',
      dataIndex: 'soHopDong',
    },
    {
      key: 'diaChi',
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
    },
    {
      key: 'dienThoai',
      title: 'Điện thoại',
      dataIndex: 'dienThoai',
    },
    {
      key: 'maSoThue',
      title: 'Mã số thuế',
      dataIndex: 'maSo',
    },
    {
      key: 'chiSoDau',
      title: 'Chỉ số đầu',
      dataIndex: 'chiSoDau',
    },
    {
      key: 'chiSoCuoi',
      title: 'Chỉ số cuối',
      dataIndex: 'chiSoCuoi',
    },
    {
      key: 'tieuthu',
      title: 'Tiêu thụ (m3)',
      dataIndex: 'tieuthu',
    },
    {
      key: 'tienNuoc',
      title: 'Tiền nước (VNĐ)',
      dataIndex: 'tienNuoc',
    },
    {
      key: 'thueVAT',
      title: 'Thuế VAT (VNĐ)',
      dataIndex: 'thueVAT',
    },
    {
      key: 'phiBVMT',
      title: 'Phí BVMT (VNĐ)',
      dataIndex: 'phiBVMT',
    },
    {
      key: 'tongTien',
      title: 'Tổng tiền (VNĐ)',
      dataIndex: 'tongTien',
    },
    {
      key: 'soKiHieu',
      title: 'Số kí hiệu HĐ',
      dataIndex: 'soKiHieu',
    },
    {
      key: 'maDongHoCha',
      title: 'Mã đồng hồ cha',
      dataIndex: 'maDong',
    },
    {
      key: 'doiTuongGia',
      title: 'Đối tượng giá',
      dataIndex: 'doiTuong',
    }
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>BẢNG KÊ HÓA ĐƠN TIỀN NƯỚC - THUẾ THEO NHÂN VIÊN</h1>
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

export default TableBillFollowByEmployee;
