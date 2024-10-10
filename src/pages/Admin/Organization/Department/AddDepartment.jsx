import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, message, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import Captcha from "../../../../components/Captcha/Captcha";
import { useDispatch } from "react-redux";
import { fetchCreatePhongBan } from "../../../../redux/slices/phongBanSlice/phongBanSlice";
import { setRefreshTable } from "../../../../redux/slices/currentPageSlice/currentPageSlice";

const AddDepartment = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };
  // handle submit from
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      dispatch(fetchCreatePhongBan(values))
        .unwrap()
        .then(() => {
          dispatch(setRefreshTable(true));
          form.resetFields();
          hideModal();
        });
    } catch (error) {
      console.log({ error });
    }
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
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules} name="name" label="Tên">
              <Input
                name="name"
                style={{ width: "100%" }}
                placeholder="Nhập tài khoản đại diện của phòng ban/đơn vị"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules} name="description" label="Mô tả">
              <Input name="description" placeholder="Mô tả phòng ban/đơn vị" />
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
            <Form.Item style={{ width: "fit-content", margin: "22px auto" }}>
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
            onClick={handleCreate}
          >
            Thêm
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

export default AddDepartment;
