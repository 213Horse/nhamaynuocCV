import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiUpdatePriceListObject } from "../../../redux/slices/priceListObjectSlice/priceListObjectSlice";
import Captcha from "../../../components/Captcha/Captcha";
import {btnClickGetFactoryIdSelector} from "../../../redux/selector";

const EditListRegionLocation = ({ tabListPO, hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  console.log("ROWSELEC: ", tabListPO);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const layout = {
    labelCol: {
      span: 5,
    },
  };

  // handle submit form (update price List Object)
  const handleSubmit = (values) => {
    console.log(tabListPO);
    const queryString = createFilterQueryString();
    if (values) {
      values.queryString = queryString;
      dispatch(
        fetchApiUpdatePriceListObject({ ...values, prevKeyId: tabListPO.keyId })
      );
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
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              label="Mã/Ký hiệu"
              name="kyHieu"
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Mã/Ký hiệu tối đa 100 kí tự" },
              ]}
              initialValue={tabListPO ? tabListPO?.kyHieu : null}
            >
              <Input
                style={{ width: "100%" }}
                name="kyHieu"
                placeholder="Ký hiệu"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              label="Tên/Mô tả"
              name="moTa"
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Tên/Mô tả tối đa 100 kí tự" },
              ]}
              initialValue={tabListPO ? tabListPO?.moTa : null}
            >
              <Input
                style={{ width: "100%" }}
                name="moTa"
                placeholder="Nhập mô tả"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              label="Đơn vị tính"
              name="donViTinh"
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Đơn vị tính tối đa 100 kí tự" },
              ]}
              initialValue={tabListPO ? tabListPO?.donViTinh : null}
            >
              <Input
                style={{ width: "100%" }}
                name="donViTinh"
                placeholder="Nhập đơn vị"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* //captcha */}
        <Row>
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
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                // ref={captchaRef}
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

export default EditListRegionLocation;
