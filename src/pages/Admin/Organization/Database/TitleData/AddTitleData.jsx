import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button, Input, theme } from 'antd';
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import Captcha from '../../../../../components/Captcha/Captcha';
import { useMediaQuery } from 'react-responsive';

const AddTitleData = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { TextArea } = Input;
  const dispatch = useDispatch()
  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

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
            <Form.Item {...rules} name="departmentParent" label="Tên chủ đề">
              <Input name="departmentParent" style={{ width: "100%" }} placeholder="Nhập tên chủ đề" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="maDepartment" label="Chủ đề cha">
              <Input name="maDepartment" style={{ width: "100%" }} placeholder="Nhập chủ đề cha" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="desc" label="Mô tả">
              <TextArea rows={7} name="desc" />
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
            <Form.Item style={{ width: 'fit-content', margin: "22px auto" }}>
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
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
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
}

export default AddTitleData