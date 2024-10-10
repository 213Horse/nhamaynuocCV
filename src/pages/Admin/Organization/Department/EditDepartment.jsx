import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import Captcha from "../../../../components/Captcha/Captcha";
import { useDispatch, useSelector } from "react-redux";
import { btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import { fetchEditPhongBan } from "../../../../redux/slices/phongBanSlice/phongBanSlice";
import { setRefreshTable } from "../../../../redux/slices/currentPageSlice/currentPageSlice";

const EditDepartment = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const rowDetailSelector = useSelector(btnClickTabListInvoicePrintSelector);

  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  useEffect(() => {
    console.log(rowDetailSelector);
    if (rowDetailSelector) {
      form.setFieldValue("name", rowDetailSelector.name);
      form.setFieldValue("description", rowDetailSelector.description);
    }
  }, [rowDetailSelector]);

  const handleSubmit = (values) => {
    const data = values;
    const value = {
      id: rowDetailSelector.key,
      data: data,
    };
    dispatch(fetchEditPhongBan(value))
      .unwrap()
      .then(() => {
        dispatch(setRefreshTable(true));
        hideModal();
      });
  };

  return (
    <>
      <Form
        onFinish={handleSubmit}
        {...layout}
        form={form}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="departmentParent" label="PB/ĐV cha">
              <Input name="departmentParent" style={{ width: "100%" }} placeholder="Nhập tên phòng ban cha" />
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="maDepartment" label="Mã PB/ĐV">
              <Input name="maDepartment" style={{ width: "100%" }} placeholder="Nhập mã phòng ban/đơn vị" />
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules} name="name" label="Tên PB/ĐV">
              <Input
                name="name"
                style={{ width: "100%" }}
                placeholder="Nhập tên phòng ban/đơn vị"
              />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="address" label="Địa chỉ">
              <Input name="address" style={{ width: "100%" }} placeholder="Nhập địa chỉ của phòng ban/đơn vị" />
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="phone" label="Số điện thoại">
              <Input name="phone" style={{ width: "100%" }} placeholder="Nhập số điện thoại đại diện của phòng ban/đơn vị" />
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} name="representative" label="Người đại diện">
              <Input name="representative" style={{ width: "100%" }} placeholder="Nhập tài khoản đại diện của phòng ban/đơn vị" />
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules} name="description" label="Mô tả">
              <TextArea
                rows={7}
                name="description"
                placeholder="Mô tả phòng ban/đơn vị"
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
            htmlType="submit"
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

export default EditDepartment;
