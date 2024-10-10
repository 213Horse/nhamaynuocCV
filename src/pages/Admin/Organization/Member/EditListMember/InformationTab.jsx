import React, { useRef, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select, theme } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import Captcha from "../../../../../components/Captcha/Captcha";
import { useDispatch, useSelector } from "react-redux";
import { updateNhanVien } from "../../../../../redux/slices/NguoiDungSlice/nguoidungSlice";
import { fetchGetMember } from "../../../../../redux/slices/thanhVienSlice/thanhVienSlice";
import { btnClickGetFactoryIdSelector } from "../../../../../redux/selector";

const InformationTab = ({ hideModal, tabListMember }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
  console.log("tabListMember", tabListMember);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const createFilterQueryString2 = () => {
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

  const [showFormItem, setShowFormItem] = useState(false);
  // handle save and close modal
  const handleSaveAndClose = (values) => {
    const nhaMayIds = createFilterQueryString2();
    dispatch(updateNhanVien(values))
      .unwrap()
      .then(() => {
        hideModal();
        dispatch(fetchGetMember(nhaMayIds));
      });
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const handleShowFormInput = (e) => {
    setShowFormItem(e.target.checked);
  };

  const layout = {
    labelCol: {
      span: 4, // note
    },
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={handleSaveAndClose}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Form.Item
          initialValue={tabListMember?.userId}
          name="id"
          style={{ display: "none" }}
        ></Form.Item>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              initialValue={tabListMember?.userName}
              label="Tên người dùng"
              name="userName"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              initialValue={tabListMember?.name}
              label="Tên hiển thị"
              name="normalizedUsername"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item label="Số điện thoại" name="phoneNumber" {...rules}>
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              initialValue={tabListMember?.email}
              label="Địa chỉ Email"
              name="email"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row className="item__row">
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="existEmail"
              valuePropName="checked"
              initialValue={false}
            >
              <span style={{ marginRight: 4 }}> Email có tồn tại: </span>
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{ display: "flex" }}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item>
              <span style={{ marginRight: 4 }}> Bật xác thực: </span>

              <Checkbox onChange={handleShowFormInput} />
            </Form.Item>
          </Col>
        </Row>
        {showFormItem && (
          <Row>
            <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
              <Form.Item
                initialValue={tabListMember?.email}
                label="Email xác thực"
                name="emailValidate"
                {...rules}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="lockUser"
              valuePropName="checked"
              initialValue={false}
            >
              <span style={{ marginRight: 4 }}>Khoá người dùng: </span>
              <Checkbox />
            </Form.Item>
          </Col>
        </Row> */}

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
            key="saveAndAdd"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
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
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default InformationTab;
