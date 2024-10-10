import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import { useMediaQuery } from "react-responsive";
import Captcha from "../../../../../components/Captcha/Captcha";
import { FileAddOutlined, CloseOutlined } from "@ant-design/icons";

const EditRoleModal = ({ hideModal, rowSelection }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  // handle submit form (main)
  const handleSubmit = (values) => {
    hideModal();
    form.resetFields();
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  //
  const handleSubmitAndReset = async () => {
    try {
      const values = await form.validateFields();

      form.resetFields();
      // captcha
      captchaRef.current.reset();
      setIsCaptcha(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const layout = {
    labelCol: 4,
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  return (
    <Form
      {...layout}
      form={form}
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
            label="Mã role"
            name="roleId"
            {...rules}
            initialValue={rowSelection?.roleId}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item
            label="Tên role"
            name="roleName"
            {...rules}
            initialValue={rowSelection?.roleName}
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
        <Button
          style={{
            marginLeft: "10px",
          }}
          icon={<FileAddOutlined />}
          className="custom-btn-reset-d"
          htmlType="submit"
          disabled={!isCaptcha}
        >
          Cập nhật
        </Button>

        <Button
          style={{
            marginLeft: "10px",
          }}
          icon={<CloseOutlined />}
          className="custom-btn-close-d"
          onClick={() => hideModal()}
        >
          Đóng
        </Button>
      </Row>
    </Form>
  );
};

export default EditRoleModal;
