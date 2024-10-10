import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select,  theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import Captcha from "../../../../components/Captcha/Captcha";
import { useDispatch } from "react-redux";

const EditMap = ({ hideModal, tabMap }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const { TextArea } = Input
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const dispatch = useDispatch()
  const layout = {
    labelCol: {
      span: 7,
    },
  };

  const rules = {rules: [{ required: true, message: "Vui lòng không được bỏ trống." }]}

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
      >
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="nameMap" label="Tên bản đồ" initialValue={tabMap ? tabMap.Title : null}>
              <Input name="nameMap" style={{ width: "100%" }} placeholder="Nhập tên bản đồ" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
            <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules}  label="Mô tả" name="Description">
                <TextArea placeholder="Nhập mô tả" rows={7}/>
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
            <Form.Item style={{width : 'fit-content', margin : "22px auto"}}>
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
          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
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
            onClick={() => {
              captchaRef.current.reset()
              hideModal()
            }}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default EditMap;
