import {
  CloseOutlined,
  PrinterOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Modal, Form, Input, Table, Button, theme, Row, Col } from "antd";

const InvoicingDetailsModal = ({ visible, onCancel, data }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
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
    };
  });
  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 30,
    },
  };
  return (
    <Modal
      title="Chi tiết phiếu in"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        {...layout}
        form={form1}
        onFinish={onFinish}
        name="nest-messages"
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item label="Mã khách hàng">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Số hợp đồng">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Số hóa đơn">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Tên khách hàng">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              icon={<SearchOutlined />}
              size="small"
              className="custom-btn-search-d"
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={detailData}
        size="small"
        scroll={{ x: 2000, y: 150 }}
        columns={[
          {
            title: "Số thứ tự",
            dataIndex: "order",
            key: "order",
          },
          {
            title: "Sê ri",
            dataIndex: "serialNumber",
            key: "serialNumber",
          },
          {
            title: "Số hóa đơn",
            dataIndex: "invoiceNumber",
            key: "invoiceNumber",
          },
          {
            title: "Tên khách hàng",
            dataIndex: "customerName",
            key: "customerName",
          },
          {
            title: "Số hợp đồng",
            dataIndex: "contractNumber",
            key: "contractNumber",
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
            title: "Ngày in",
            dataIndex: "printDate",
            key: "printDate",
          },
          {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
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
          icon={<PrinterOutlined />}
          size="small"
          className="custom-btn-close-d"
          style={{ marginLeft: "10px" }}
        >
          Cập nhật HĐ chưa in
        </Button>
        <Button
          icon={<WarningOutlined />}
          size="small"
          className="custom-btn-close-d"
          style={{ marginLeft: "10px" }}
        >
          Cập nhật HĐ hỏng
        </Button>
        <Button
          icon={<CloseOutlined />}
          size="small"
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

export default InvoicingDetailsModal;
