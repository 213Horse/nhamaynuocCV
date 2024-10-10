import React, { useState, useRef } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { fetchApiAddCancel } from "../../../redux/slices/listCancelSlice/listCancelSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const AddListCancel = ({ hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: 4,
    },
  };
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
  const handleSaveAndClose = () => {
    form1.validateFields().then((values) => {
      if (values) {
        values.queryString = createFilterQueryString();
        dispatch(fetchApiAddCancel(values));
        captchaRef.current.reset();
        setIsCaptcha(false);
        form1.resetFields();
        hideModal();
      }
    });
  };

  // handle save and continue add
  const handleSaveAndAdd = () => {
    form1.validateFields().then((values) => {
      if (values) {
        values.queryString = createFilterQueryString();
        dispatch(fetchApiAddCancel(values));
        captchaRef.current.reset();
        setIsCaptcha(false);
        form1.resetFields();
        // hideModal();
      }
    });
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    // console.log({ error })
  };

  return (
    <>
      <Form
        {...layout}
        form={form1}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item label="Mã/Ký hiệu" name="kyHieu">
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập mã ký hiệu do hủy"
              />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item label="Tên lý do hủy" name="lyDo">
              <Input
                style={{ width: "100%" }}
                name="lyDo"
                placeholder="Nhập tên lý do hủy"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item className="captcha-wrapper">
              <Captcha
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
            key="saveAndAdd"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            // htmlType="submit"
            onClick={handleSaveAndAdd}
            disabled={!isCaptcha}
          >
            Lưu và thêm tiếp
          </Button> */}

          <Button
            key="saveAndClose"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
            onClick={handleSaveAndClose}
            disabled={!isCaptcha}
          >
            Lưu và đóng
          </Button>

          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<CloseOutlined />}
            htmlType="submit"
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

export default AddListCancel;
