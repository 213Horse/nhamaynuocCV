import { Button, Col, Divider, Form, Input, Row, Select, Table } from "antd";
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  SaveOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";

function FormSortNumberClock({ hideModalSortNumber }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 5 },
      lg: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  // cols
  const cols = [
    {
      key: "index",
      title: "STT",
      dataIndex: "index",
    },
    {
      key: "fullName",
      title: "Tên khách hàng",
      dataIndex: "fullName",
    },
    {
      key: "code_clock",
      title: "Mã đồng hồ",
      dataIndex: "code_clock",
    },
    {
      key: "address",
      title: "Địa chỉ",
      dataIndex: "address",
    },
  ];

  // handle submit form
  const handleSubmit = (values) => {
    console.log("values ->", values);
  };

  // handle submit error
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
      {/* Tìm kiếm + Buttons + Tuyến đọc */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="" label="Tìm kiếm" {...formItemLayout}>
            <div className="container-label-input">
              <Input
                name=""
                placeholder="Tìm kiếm"
                className="space-right-10"
              />
              <Button type="primary" className="space-right-10">
                <LeftOutlined />
              </Button>
              <Button type="primary" className="space-right-10">
                <RightOutlined />
              </Button>
            </div>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name=""
            label="Tuyến đọc (*)"
            {...formItemLayout}
            className="gutter-item"
          >
            <Select
              fieldNames=""
              options={[{ value: "1", label: "TD 1" }]}
              placeholder="Chọn mã tuyến đọc"
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      {/* render table */}
      <div className="container-tbl-sort-number">
        <Table
          columns={cols}
          rowKey="index"
          size="small"
          scroll={{
            x: 900,
          }}
        ></Table>
      </div>

      <Divider />

      {/* Buttons  */}
      <div className="func-sort-number-btn">
        <Button
          htmlType="submit"
          className="item-sort-number-btn custom-btn-sort"
        >
          <SortAscendingOutlined />
          Sắp xếp theo TT ghi
        </Button>
        <Button
          htmlType="submit"
          className="item-sort-number-btn custom-btn-add"
        >
          <SaveOutlined />
          Lưu
        </Button>
        <Button
          className="item-sort-number-btn-close custom-btn-close"
          onClick={() => hideModalSortNumber()}
        >
          <CloseOutlined />
          Đóng
        </Button>
      </div>
    </Form>
  );
}

export default FormSortNumberClock;
