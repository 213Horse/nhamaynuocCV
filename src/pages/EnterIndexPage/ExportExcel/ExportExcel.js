import { FileExcelOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

const ExportExcel = (props) => {
  const { setFileForm } = props;
  const [form1] = Form.useForm();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const handleSubmit = (values) => {
    const queryString = createFilterQueryString();
    const ThangTaoSoDoc = dayjs(values.ThangTaoSoDoc).format("MM/YYYY");
    const url = `${process.env.REACT_APP_BASE_URL}chi-so-dong-ho/export-excel?${queryString}&ThangTaoSoDoc=${ThangTaoSoDoc}`;
    window.open(url, "_blank");
    form1.resetFields();
    setFileForm(false);
  };

  return (
    <>
      <Form
        form={form1}
        onFinish={handleSubmit}
        style={{
          maxWidth: "none",
          padding: 24,
        }}
      >
        <Row>
          <Col span={12} xs={24} sm={12}>
            <Form.Item name="ThangTaoSoDoc" label="Chọn Tháng">
              <DatePicker
                locale={locale}
                style={{
                  width: "100%",
                }}
                picker="month"
                format="MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
          gutter={24}
        >
          <Button
            icon={<FileExcelOutlined />}
            htmlType="submit"
            className="tab-item-ep tab-item-ep-3"
            style={{
              marginLeft: "10px",
            }}
          >
            Xuất Excel
          </Button>

          <Button
            className="custom-btn-close-d"
            style={{
              marginLeft: "10px",
            }}
            onClick={() => {
              setFileForm(false);
              form1.resetFields();
            }}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default ExportExcel;
