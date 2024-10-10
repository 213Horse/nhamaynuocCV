import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddWatch,
  fetchWatchData,
} from "../../../redux/slices/watchSlice/watchSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { fetchAddSeriInvoice } from "../../../redux/slices/seriInvoiceSlice/seriInvoiceSlice";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import { getAllSeriInvoice } from "../../../redux/slices/CHSeriInvoiceSlice/CHSeriInvoiceSlice";

const AddListSeri = ({ hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const createFactoryQueryString = () => {
    let factoryQueryString = "";
    if (factoryID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${factoryID}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const handleSubmit = (values) => {
    const nhaMayId = createFactoryQueryString();
    dispatch(fetchAddSeriInvoice({ values, nhaMayId }));
    hideModal();
    form1.resetFields();
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  //
  const handleSubmitAndReset = async () => {
    try {
      const values = await form1.validateFields();

      dispatch(fetchAddSeriInvoice({ ...values }));
      form1.resetFields();
      // captcha
      captchaRef.current.reset();
      setIsCaptcha(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const layout = {
    labelCol: 5,
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
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="soHoaDon"
              rules={[
                {
                  required: true,
                  message: "Số hóa đơn không được bỏ trống",
                },
                { max: 100, message: "Số hóa đơn tối đa 100 kí tự" },
              ]}
              label="Số hóa đơn"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
  <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
    <Form.Item
      name="soLuongHoaDon"
      rules={[
        {
          required: true,
          message: "Số lượng hóa đơn không được bỏ trống",
        },
        {
          pattern: /^[0-9]*$/,
          message: "Vui lòng chỉ nhập số",
        },
      ]}
      label="Số lượng hóa đơn"
    >
      <Input
        style={{ width: "100%" }}
        type="number"  // Sử dụng type="number" để chỉ cho phép nhập số
      />
    </Form.Item>
  </Col>
</Row>
        {/* //captcha */}
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item className="captcha-wrapper">
              <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
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
          {/* <Button
            key="reset"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            onClick={handleSubmitAndReset}
            disabled={!isCaptcha}
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
            // captcha
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
              // dispatch(fetchWatchData());
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

export default AddListSeri;
