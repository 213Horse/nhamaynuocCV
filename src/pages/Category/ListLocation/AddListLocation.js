import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { fetchApiAddArea } from "../../../redux/slices/areaSlice/areaSlice";
import Captcha from "../../../components/Captcha/Captcha";

const AddListLocation = ({ regions, hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const firstInputRef = useRef();

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: 4,
    },
    // wrapperCol: {
    //   span: 40,
    // },
  };

  // handle save and add
  const handleSaveAndAdd = async () => {
    try {
      const values = await form1.validateFields();
      dispatch(fetchApiAddArea(values));

      form1.resetFields();
      captchaRef.current.reset();
      setIsCaptcha(false)
      firstInputRef.current.focus();
    } catch (error) {

    }
  };

  // handle save and close modal
  const handleSaveAndClose = async () => {
    try {
      const values = await form1.validateFields();
      dispatch(fetchApiAddArea(values));

      form1.resetFields();
      hideModal();
    } catch (error) {

    }
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

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
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item label="Mã khu vực" name="keyId" {...rules}>
              <Input
                style={{ width: "100%" }}
                name="keyId"
                ref={firstInputRef}
                placeholder="Nhập mã khu vực"
                onKeyDown={(e) => {
                  const forbiddenChars = /[^A-Za-z0-9]/;
                  if (forbiddenChars.test(e.key)) {
                    e.preventDefault();
                  }
                  if (e.key === ' ' || e.key === 'Tab') {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item label="Tên khu vực" name="tenKhuVuc" {...rules}>
              <Input
                style={{ width: "100%" }}
                name="tenKhuVuc"
                placeholder="Nhập tên khu vực"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item label="Vùng" name="vungId" {...rules}>
              <Select
                style={{ width: "100%" }}
                fieldNames="vungId"
                options={
                  regions?.length <= 0
                    ? []
                    : regions.map((_regoin) => ({
                      label: _regoin.tenVung,
                      value: _regoin.id,
                    }))
                }
                placeholder="Chọn vùng"
              />
            </Form.Item>

            {/* <Form.Item label="Khu Vực Cha">
              <Select style={{ width: "100%" }}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
              </Select>
            </Form.Item> */}
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
            key="saveAndAdd"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
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
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default AddListLocation;
