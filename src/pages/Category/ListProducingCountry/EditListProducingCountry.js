import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme, Select } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import Captcha from "../../../components/Captcha/Captcha";
import { useDispatch, useSelector } from "react-redux";
import { updateDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const EditListProducingCountry = ({ tabListProducingCountry, hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const dispatch = useDispatch();
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
  const handleSubmit = (values) => {
    values.queryString = createFilterQueryString();
    if (values) {
      dispatch(
        updateDMTotalByType({
          action: 2,
          id: tabListProducingCountry.key,
          type: 5,
          value: values.nuocSX,
          description: values.mota,
          keyId: values.ma,
          nhaMayId: values.queryString,
          kyHieu: values.kyHieu,
        })
      );
      form.resetFields();
      hideModal();
    }
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
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
        onFinish={handleSubmit}
        // fields={[
        //   { name: "keyId", value: tabListProducingCountry ? tabListProducingCountry?.keyId : null },
        //   {
        //     name: "tenNguoiLapDat",
        //     value: tabListProducingCountry ? tabListProducingCountry?.tenNguoiLapDat : null,
        //   },
        // ]}
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              label="Mã/Ký hiệu"
              name="kyHieu"
              initialValue={
                tabListProducingCountry ? tabListProducingCountry?.kyHieu : null
              }
            >
              <Input style={{ width: "100%" }} placeholder="Nhập mã ký hiệu" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Nước sản xuất tối đa 100 kí tự" },
              ]}
              name="nuocSX"
              label="Nước sản xuất"
              initialValue={
                tabListProducingCountry ? tabListProducingCountry?.nuocSX : null
              }
            >
              <Input style={{ width: "100%" }} placeholder="Nước sản xuất" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Mô tả tối đa 100 kí tự" },
              ]}
              label="Mô tả"
              name="mota"
              initialValue={
                tabListProducingCountry ? tabListProducingCountry?.mota : null
              }
            >
              <Input
                name="mota"
                style={{ width: "100%" }}
                placeholder="Nhập mô tả"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              style={{ width: "fit-content", margin: "22px auto" }}
            >
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
            htmlType="submit"
            key="reset"
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

export default EditListProducingCountry;
