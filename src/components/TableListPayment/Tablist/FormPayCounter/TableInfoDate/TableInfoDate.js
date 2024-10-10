import { Col, Form, Input, Row, Table } from "antd";

function TableInfoDate() {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 12 },
      lg: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  const cols = [
    {
      key: "period",
      title: "Kỳ",
      dataIndex: "period",
    },
    {
      key: "fall_day",
      title: "Ngày thu",
      dataIndex: "fall_day",
    },
    {
      key: "date_from",
      title: "Từ ngày",
      dataIndex: "date_from",
    },
    {
      key: "date_to",
      title: "Đến ngày",
      dataIndex: "date_to",
    },
    {
      key: "consume",
      title: "Tiêu thụ",
      dataIndex: "consume",
    },
    {
      key: "total",
      title: "Tổng tiền",
      dataIndex: "total",
    },
    {
      key: "emp_manager",
      title: "Nhân viên quản lý",
      dataIndex: "emp_manager",
    },
  ];

  // handle submit form
  const handleSubmit = (values) => {
    console.log("values", values);
  };

  // handle submit form error
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <>
      <Table
        columns={cols}
        rowKey="index"
        size="small"
        scroll={{ x: 700 }}
      ></Table>

      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        style={{ marginTop: "10px" }}
      >
        {/* Tiền thanh toán + Tiền khách đưa + Còn lại */}
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item name="" label="Tiền thanh toán" {...formItemLayout}>
              <Input name="" placeholder="Tiền thanh toán" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item name="" label="Tiền khách đưa" {...formItemLayout}>
              <Input name="" placeholder="Tiền khách đưa" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item name="" label="Còn lại" {...formItemLayout}>
              <Input name="" placeholder="Còn lại" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default TableInfoDate;
