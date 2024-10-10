import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";

function FormHistoryUseWater({ tabList }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 7 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  // handle submit form (history use water)
  const handleSubmit = (values) => {
    console.log("values ->", values);
  };

  // handle submit error (history use water)
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={handleSubmitFailed}
      fields={[
        { name: "date_from_chk", value: false },
        { name: "date_to_chk", value: false },
      ]}
    >
      <Row>
        {/* Khách hàng */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <Form.Item
            name="code_customer"
            label="Mã khách hàng"
            {...formItemLayout}
          >
            <Input name="code_customer" placeholder="Nhập mã khách hàng" />
          </Form.Item>
        </Col>

        {/* Số hợp đồng */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <Form.Item
            name="num_contract"
            label="Số hợp đồng"
            {...formItemLayout}
          >
            <Input name="num_contract" placeholder="Nhập số hợp đồng" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        {/* Từ ngày + Checkbox (Từ ngày) */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <Form.Item name="date_from" label="Từ ngày" {...formItemLayout}>
            <div className="container-label-input container-label-input-mobile">
              <Select
                fieldNames="date_from"
                placeholder="Chọn ngày"
                className="space-right-10 inp-select-item"
              />
              <Checkbox className="inp-checkbox-item">
                Không có giá trị
              </Checkbox>
            </div>
          </Form.Item>
        </Col>

        {/* Đến ngày + Checkbox (Đến ngày) */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <Form.Item name="date_to" label="Đến ngày" {...formItemLayout}>
            <div className="container-label-input container-label-input-mobile">
              <Select
                fieldNames="date_to"
                placeholder="Chọn ngày"
                className="space-right-10 inp-select-item"
              />
              <Checkbox className="inp-checkbox-to-date-item">
                Không có giá trị
              </Checkbox>
            </div>
          </Form.Item>
        </Col>

        {/* Button */}
        <Col xs={24} sm={24} md={24} lg={4}>
          <div className="history-water-btn">
            <Button
              htmlType="submit"
              className="history-water-item-btn custom-btn-watch-report"
            >
              Xem báo cáo
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default FormHistoryUseWater;
