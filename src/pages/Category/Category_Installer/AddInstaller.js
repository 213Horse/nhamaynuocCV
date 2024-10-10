import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import Captcha from "../../../components/Captcha/Captcha";
import { addDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { useDispatch, useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const AddInstaller = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const dispatch = useDispatch();

  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 6,
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

  const handleSubmit = (values) => {
    console.log(values);
    values.queryString = createFilterQueryString();
    if (values) {
      dispatch(
        addDMTotalByType({
          action: 1,
          keyId: values.ma,
          type: 2,
          value: values.tenNguoiLapDat,
          description: values.mota,
          kyHieu: values.kyHieu,
          nhaMayId: values.queryString,
        })
      );
      form.resetFields();
      hideModal();
    }
  };

  const handleSubmitAndAdd = async () => {
    const values = await form.validateFields();
    values.queryString = createFilterQueryString();
    dispatch(
      addDMTotalByType({
        action: 1,
        keyId: values.ma,
        type: 2,
        value: values.tenNguoiLapDat,
        description: values.mota,
        kyHieu: values.kyHieu,
        nhaMayId: values.queryString,
      })
    );
    form.resetFields();
    captchaRef.current.reset();
    setIsCaptcha(false);
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules} name="kyHieu" label="Mã ký hiệu">
              <Input style={{ width: "100%" }} placeholder="Nhập mã ký hiệu" />
            </Form.Item>
          </Col>
        </Row>
       
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Tên người lắp đặt tối đa 100 kí tự" },
              ]}
              name="tenNguoiLapDat"
              label="Tên người lắp đặt"
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập tên người lắp đặt"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Mô tả tối đa 100 kí tự" },
              ]}
              name="mota"
              label="Mô tả"
            >
              <Input
                name="mota"
                style={{ width: "100%" }}
                placeholder="Nhập mô tả"
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
                className="captcha-fix-galaxy-s8"
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
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
            onClick={handleSubmitAndAdd}
          >
            Lưu và thêm tiếp
          </Button> */}

          <Button
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

export default AddInstaller;
