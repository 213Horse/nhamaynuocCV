import { Table } from "antd";

function TableInitialPaymentTrackingList() {
  //   Tuyến đọc
  // Số hợp đồng
  // Mã KH
  // Tên khách hàng
  // Địa chỉ
  // Điện thoại
  // Ngày ký HĐ
  // Số tiền trả góp
  // Số tiền vay
  // Số tiền đã trả
  // Số kỳ đã trả
  // Tháng đã trả
  // Số tiền còn nợ
  const cols = [
    {
      key: "index",
      title: "SST",
      dataIndex: "index",
    },
    {
      key: 'readRoute',
      title: 'Tuyến đọc',
      dataIndex: 'readRoute',
    },
    {
      key: 'contractNumber',
      title: 'Số hợp đồng',
      dataIndex: 'contractNumber',
    },
    {
      key: 'customerCode',
      title: 'Mã KH',
      dataIndex: 'customerCode',
    },
    {
      key: 'customerName',
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      key: 'phoneNumber',
      title: 'Điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'signDate',
      title: 'Ngày ký HĐ',
      dataIndex: 'signDate',
    },
    {
      key: 'installmentAmount',
      title: 'Số tiền trả góp',
      dataIndex: 'installmentAmount',
    },
    {
      key: 'loanAmount',
      title: 'Số tiền vay',
      dataIndex: 'loanAmount',
    },
    {
      key: 'paidAmount',
      title: 'Số tiền đã trả',
      dataIndex: 'paidAmount',
    },
    {
      key: 'paidPeriod',
      title: 'Số kỳ đã trả',
      dataIndex: 'paidPeriod',
    },
    {
      key: 'paidMonth',
      title: 'Tháng đã trả',
      dataIndex: 'paidMonth',
    },
    {
      key: 'debtAmount',
      title: 'Số tiền còn nợ',
      dataIndex: 'debtAmount',
    }
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>DANH SÁCH THEO DÕI TÌNH TRẠNG THU TIỀN KHỞI THỦY</h1>
        <p>Từ: 01/09/2023 - Đến: 30/09/2023</p>
      </div>

      <Table columns={cols} rowKey="index"
        scroll={{ x: 1000 }}
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

export default TableInitialPaymentTrackingList;
