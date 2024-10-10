import { CloseOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Table, Button, theme, Row, Col } from "antd";

const ListInvoicePrint = ({ visible, onCancel }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const detailData = Array.from({ length: 14 }, (_, i) => {
    return {
      key: i + 1,
      order: i + 1,
      serialNumber: `Sê ri ${i + 1}`,
      invoiceNumber: `Số hóa đơn ${i + 1}`,
      customerName: `Tên khách hàng ${i + 1}`,
      contractNumber: `Số hợp đồng ${i + 1}`,
      consumption: `Tiêu thụ ${i + 1}`,
      amountDue: `Thành tiền ${i + 1}`,
      vatFee: `Phí VAT ${i + 1}`,
      environmentalFee: `Phí BVMT ${i + 1}`,
      totalAmountDue: `Tổng tiền ${i + 1}`,
      printDate: `Ngày in ${i + 1}`,
      status: `Tình trạng ${i + 1}`,
      notes: `Ghi chú ${i + 1}`,
      dtdn: `Phí ĐTĐN ${i + 1}`,
      address: `Đia chỉ ${i + 1}`,
      mdh: `Mã ĐH ${i + 1}`,
      mtd: `Mã Tuyến Đọc ${i + 1}`,
      tt: `Thứ tự ${i + 1}`,
    };
  });
  return (
    <Modal
      title="Danh sách hóa đơn in"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      height={500}
    >
      <Table
        dataSource={detailData}
        size="small"
        scroll={{ x: 2000, y: 400 }}
        columns={[
          {
            title: "#",
            dataIndex: "order",
            key: "order",
            width: 70,
          },
          {
            title: "Mã tuyến đọc",
            dataIndex: "mtd",
            key: "mtd",
          },
          {
            title: "Thứ tự",
            dataIndex: "tt",
            key: "tt",
          },

          {
            title: "Số hợp đồng",
            dataIndex: "contractNumber",
            key: "contractNumber",
          },
          {
            title: "Mã ĐH",
            dataIndex: "mdh",
            key: "mdh",
          },
          {
            title: "Tên KH",
            dataIndex: "customerName",
            key: "customerName",
          },
          {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
          },
          {
            title: "Tiêu thụ",
            dataIndex: "consumption",
            key: "consumption",
          },
          {
            title: "Thành tiền",
            dataIndex: "amountDue",
            key: "amountDue",
          },
          {
            title: "Phí ĐTĐN",
            dataIndex: "dtdn",
            key: "dtdn",
          },
          {
            title: "Phí VAT",
            dataIndex: "vatFee",
            key: "vatFee",
          },
          {
            title: "Phí BVMT",
            dataIndex: "environmentalFee",
            key: "environmentalFee",
          },
          {
            title: "Tổng tiền",
            dataIndex: "totalAmountDue",
            key: "totalAmountDue",
          },
          {
            title: "Ghi chú",
            dataIndex: "notes",
            key: "notes",
          },
        ]}
      />

      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          icon={<CloseOutlined />}
          className="custom-btn-close-d"
          onClick={onCancel}
          style={{ marginLeft: "10px" }}
        >
          Đóng
        </Button>
      </Row>
    </Modal>
  );
};

export default ListInvoicePrint;
