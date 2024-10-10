import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { fetchApiAddRegion } from "../../../redux/slices/regionSlice/regionSlice";
import Captcha from "../../../components/Captcha/Captcha";

const ListRegionsLocation = ({ hideModal, factoryNames }) => {
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

  // handle save and close modal
  const handleSaveAndClose = async () => {
    try {
      const values = await form1.validateFields();
      dispatch(fetchApiAddRegion(values));

      form1.resetFields();
      hideModal();
    } catch (error) {
      console.log({ error });
    }
  };

  // handle save and continue add
  const handleSaveAndAdd = async () => {
    try {
      const values = await form1.validateFields();
      dispatch(fetchApiAddRegion(values));

      form1.resetFields();
      setIsCaptcha(false);
      captchaRef.current.reset();
      firstInputRef.current.focus();
    } catch (error) {
      console.log({ error });
    }
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
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
            <Form.Item label="Nhà máy" name="nhaMayId" {...rules}>
              <Select
                ref={firstInputRef}
                options={
                  factoryNames?.length <= 0
                    ? []
                    : factoryNames?.map((_factory) => ({
                        label: _factory.tenNhaMay,
                        value: _factory.id,
                      }))
                }
                fieldNames="nhaMayId"
                placeholder="Chọn tên nhà máy"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item label="Mã vùng" name="keyId" {...rules}>
              <Input
                style={{ width: "100%" }}
                name="keyId"
                placeholder="Nhập mã vùng"
                onKeyPress={(event) => {
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  if (!/^[a-zA-Z0-9]*$/.test(keyValue)) event.preventDefault();
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item label="Tên vùng" name="tenVung" {...rules}>
              <Input
                style={{ width: "100%" }}
                name="tenVung"
                placeholder="Nhập tên vùng"
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
            // htmlType="submit"
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

export default ListRegionsLocation;
