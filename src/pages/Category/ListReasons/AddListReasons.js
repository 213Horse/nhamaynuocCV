import React, { useState, useRef } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import Captcha from "../../../components/Captcha/Captcha";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddReason } from "../../../redux/slices/reasonSlice/reasonSlice";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const AddListReasons = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const dispatch = useDispatch();
  const captchaRef = useRef();
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
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
  const handleSubmit = (values) => {
    try {
      if (values) {
        values.queryString = createFilterQueryString();
        console.log("values", values);
        dispatch(fetchAddReason(values));
        form1.resetFields();
        captchaRef.current.reset();
        hideModal();
        setIsCaptcha(false);
      }
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi nếu có
    }
  };

  const handleSubmitAndReset = async () => {
    try {
      const values = await form1.validateFields();
      values.queryString = createFilterQueryString();
      dispatch(fetchAddReason(values));
      form1.resetFields();
      captchaRef.current.reset();
      setIsCaptcha(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  // const { Option } = Select
  const layout = {
    labelCol: {
      span: 4,
    },
    // wrapperCol: {
    //   span: 40,
    // },
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
          padding: 10,
        }}
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="maKyHieu"
              label="Mã/Ký hiệu"
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Mã ký hiệu tối đa 100 kí tự" },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="tenLDT"
              label="Tên lý do"
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Tên lý do tối đa 100 kí tự" },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item className="captcha-wrapper">
              <Captcha
                className="captcha-fix-trang-thai"
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
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
        >
          {/* <Button
            key="reset"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
            onClick={handleSubmitAndReset}
          >
            Lưu và thêm tiếp
          </Button> */}

          <Button
            key="submit"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
            disabled={!isCaptcha}
          >
            Lưu và đóng
          </Button>

          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => {
              captchaRef.current.reset();
              hideModal();
            }}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default AddListReasons;
