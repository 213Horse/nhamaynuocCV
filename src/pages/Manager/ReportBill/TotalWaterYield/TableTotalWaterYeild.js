import { Table } from "antd";

function TableTotalWaterYeild() {
  // STT
  // Tên tuyến
  // SLHĐ
  // Tiêu thụ (m3)
  // Tiền hàng (VNĐ)
  // Thuế VAT (VNĐ)
  // Phí BVMT (VNĐ)
  // Tổng tiền (VNĐ)
  const cols = [
    {
      key: "index",
      title: "STT",
      dataIndex: "index",
    },
    {
      key: 'readRouteName',
      title: 'Tên tuyến',
      dataIndex: 'readRouteName',
    },
    {
      key: 'contractNumber',
      title: 'SLHĐ',
      dataIndex: 'contractNumber',
    },
    {
      key: 'totalWaterYield',
      title: 'Tiêu thụ (m3)',
      dataIndex: 'totalWaterYield',
    },
    {
      key: 'totalMoney',
      title: 'Tiền hàng (VNĐ)',
      dataIndex: 'totalMoney',
    },
    {
      key: 'vat',
      title: 'Thuế VAT (VNĐ)',
      dataIndex: 'vat',
    },
    {
      key: 'bvmt',
      title: 'Phí BVMT (VNĐ)',
      dataIndex: 'bvmt',
    },
    {
      key: 'total',
      title: 'Tổng tiền (VNĐ)',
      dataIndex: 'total',
    },
  ];

  return (
    <>
      <h1>CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM</h1>

      <div className="title-tbl-report-cus">
        <h1>TỔNG HỢP SẢN LƯỢNG NƯỚC</h1>
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

export default TableTotalWaterYeild;
