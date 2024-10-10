import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiUpdateCancel } from "../../../redux/slices/listCancelSlice/listCancelSlice";
import { toast } from "react-toastify";
import Captcha from "../../../components/Captcha/Captcha";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const EditListCancel = ({ tabListCancel, hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const layout = {
    labelCol: {
      span: 4,
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
  // handle submit form (update price List Object)
  const handleSubmit = (values) => {
    if (values) {
      values.queryString = createFilterQueryString();
      dispatch(fetchApiUpdateCancel({ ...values, id: tabListCancel?.id }));
      form1.resetFields();
      hideModal();
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
        onFinish={handleSubmit}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
        // fields={[
        //   { name: "keyId", value: tabListCancel ? tabListCancel?.keyId : null },
        //   { name: "lyDo", value: tabListCancel ? tabListCancel?.lyDo : null },
        // ]}
      >
        {/* <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item {...rules} label="ID" name="id">
              <Input
                style={{ width: "100%" }}
                name="id"
                placeholder="Nhập ID"
              />
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              label="Mã/Ký hiệu"
              name="kyHieu"
              initialValue={tabListCancel ? tabListCancel?.kyHieu : null}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập mã lý do hủy"
              />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              label="Tên lý do hủy"
              name="lyDo"
              initialValue={tabListCancel ? tabListCancel?.lyDo : null}
            >
              <Input
                style={{ width: "100%" }}
                name="lyDo"
                placeholder="Nhập tên lý do hủy"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item className="captcha-wrapper">
              <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={null}
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
            key="update"
            htmlType="submit"
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
            htmlType="submit"
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

export default EditListCancel;
