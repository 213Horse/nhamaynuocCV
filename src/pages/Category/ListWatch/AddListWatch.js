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
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const AddListWatch = ({ hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
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
  // handle submit form (main)
  const handleSubmit = (values) => {
    values.queryString = createFilterQueryString();
    dispatch(fetchAddWatch({ ...values }));
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

      dispatch(fetchAddWatch({ ...values }));
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
              name="kyHieu"
              rules={[
                {
                  required: true,
                  message: "Mã ký hiệu không được bỏ trống",
                },
                { max: 100, message: "Mã ký hiệu tối đa 100 kí tự" },
              ]}
              label="Mã/Ký hiệu"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="kieuDongHo"
              rules={[
                {
                  required: true,
                  message: "Tên kiểu đồng hồ không được bỏ trống",
                },
                { max: 100, message: "Tên kiểu đồng hồ tối đa 100 kí tự" },
              ]}
              label="Tên Kiểu Đồng Hồ"
            >
              <Input style={{ width: "100%" }} />
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
              dispatch(fetchWatchData(createFilterQueryString()));
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

export default AddListWatch;
