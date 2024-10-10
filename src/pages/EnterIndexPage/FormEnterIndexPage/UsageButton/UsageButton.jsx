import React, { useState } from "react";
import { Button, Row, Col, Input, DatePicker, Form, Table, theme } from "antd";
import viVN from "antd/es/date-picker/locale/vi_VN";
import { otherData } from "../../../../utils/dataEnterIndexPage/data/otherData.js";
import { useMediaQuery } from "react-responsive";
import FromBarChart from "./FromBarChart";
import {
  CloseOutlined,
  LineChartOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const UsageButton = ({ hideModal }) => {
  const [showFormChart, setShowFormChart] = useState(false);
  const [data2, setData2] = useState(otherData);
  const handleData2Change = (newData) => {
    setData2(newData);
  };
  const otherColumns = [
    {
      title: "Số thứ tự",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Mã Khách Hàng",
      dataIndex: "customerCode",
      key: "customerCode",
    },
    {
      title: "Tiền Thu",
      dataIndex: "moneyCollected",
      key: "moneyCollected",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Ngày đọc",
      dataIndex: "readingDate",
      key: "readingDate",
    },
    {
      title: "Ngày đầu kì",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày cuối kì",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Chỉ số đầu cũ",
      dataIndex: "recordedIndex",
      key: "recordedIndex",
    },
    {
      title: "Chỉ số cuối cũ",
      dataIndex: "recordedIndex",
      key: "recordedIndex",
    },
    {
      title: "Ghi chú",
      dataIndex: "recordedIndex",
      key: "recordedIndex",
    },
    {
      title: "Trạng thái đọc",
      dataIndex: "recordedIndex",
      key: "recordedIndex",
    },
  ];
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const handleMonthChange = (date) => {
    if (date) {
      form1.setFieldsValue({ month: date.format("M/YYYY") });
    } else {
      form1.setFieldsValue({ month: undefined });
    }
  };
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 100,
    },
  };
  return (
    <Form
      {...layout}
      form={form1}
      onFinish={handleSubmit}
      onFinishFailed={handleFailed}
      style={{
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
      }}
    >
      <Row gutter={24}>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Số HĐ:
          <br />
          <Input />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Mã Kh:
          <br />
          <Input />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Từ ngày:
          <br />
          <DatePicker
            locale={viVN}
            style={{
              width: "100%",
            }}
            picker="month"
            onChange={handleMonthChange}
            format="DD/MM/YYYY"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Đến Ngày:
          <br />
          <DatePicker
            locale={viVN}
            style={{
              width: "100%",
            }}
            picker="month"
            onChange={handleMonthChange}
            format="DD/MM/YYYY"
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Tên khách hàng:
          <br />
          <Input />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Tuyến đọc:
          <Input
            style={{
              width: "100%",
            }}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Địa chỉ:
          <br />
          <Input />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={11}
          span={12}
          className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Nhân Viên ghi:
          <br />
          <Input />
        </Col>
      </Row>
      <Table
        className="d1"
        columns={otherColumns}
        dataSource={data2}
        onChange={handleData2Change}
        scroll={{ x: 1600, y: 450 }}
        style={{ marginTop: "10px" }}
      />
      {showFormChart && <FromBarChart />}
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
        justify="end"
      >
        <Button
          icon={<SearchOutlined />}
          className="custom-btn-search-d"
          // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Tìm kiếm
        </Button>
        <Button
          icon={<LineChartOutlined />}
          style={{
            marginLeft: "10px",
          }}
          className="custom-btn-export-d"
          // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          onClick={() =>
            setShowFormChart((prevshowFormChart) => !prevshowFormChart)
          }
        >
          Xuất biểu đồ nước
        </Button>

        <Button
          icon={<SaveOutlined />}
          style={{
            marginLeft: "10px",
          }}
          className="custom-btn-save-and-add-d"
          // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          Lưu biểu đồ
        </Button>
        <Button
          icon={<CloseOutlined />}
          style={{
            marginLeft: "10px",
          }}
          htmlType="submit"
          className="custom-btn-close-d"
          // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          onClick={() => hideModal()}
        >
          Đóng
        </Button>
      </Row>
    </Form>
  );
};
export default UsageButton;
