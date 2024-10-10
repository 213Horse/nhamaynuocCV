import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {btnClickGetFactoryIdSelector} from "../../../redux/selector";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiUpdatePaymentMethod } from "../../../redux/slices/paymentMethodSlice/paymentMethodSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { updateDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";

const EditPaymentMethod = ({ tabListbc, hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

 
  // handle submit form
  const handleSubmit = (values) => {
    const queryString = createFilterQueryString();
    console.log("tabListbc", tabListbc);
    if (values) {
      console.log({ values });
      values.queryString = queryString;
      values.keyId = tabListbc.keyId;
      dispatch(fetchApiUpdatePaymentMethod(values));
      form1.resetFields();
      hideModal();
    }
  };
  // handle submit error
  const handleFailed = (error) => {
    console.log({ error });
  };

  return (
    <>
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
      // fields={[
      //   { name: "keyId", value: tabListbc ? tabListbc?.keyId : null },
      //   {
      //     name: "moTaPhuongThuc",
      //     value: tabListbc ? tabListbc?.moTaPhuongThuc : null,
      //   },
      // ]}
      >
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Mã"
              name="ma"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={tabListbc ? tabListbc.ma : null}
            >
              <Input
                style={{ width: "100%" }}
                name="keyId"
                placeholder="Nhập mã"
              />
            </Form.Item>
          </Col>
        </Row> */}
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Phương thức"
              name="kyHieu"
              initialValue={tabListbc ? tabListbc.pttt : null}
            >
              <Input
                style={{ width: "100%" }}
                name="kyHieu"
                placeholder="Nhập phương thức thanh toán"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Mô tả"
              name="moTaPhuongThuc"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={tabListbc ? tabListbc.mota : null}
            >
              <Input
                style={{ width: "100%" }}
                name="moTaPhuongThuc"
                placeholder="Nhập mô tả"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* //captcha */}
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item className="captcha-wrapper">
              <Captcha
                className="captcha-fix-trang-thai"
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={null}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //captcha */}


        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
    
          <Button
            key="update"
            htmlType="submit"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
          >
            {/* Lưu và thêm tiếp */}
            Cập nhật
          </Button>
          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<CloseOutlined />}
            htmlType="submit"
            className="custom-btn-close-d"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default EditPaymentMethod;
