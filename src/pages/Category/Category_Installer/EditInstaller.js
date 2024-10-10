import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
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

const EditInstaller = ({ tabInstaller, hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const [form] = Form.useForm();
  const { token } = theme.useToken();
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
          id: tabInstaller.key,
          type: 2,
          value: values.tenNguoiLapDat,
          description: values.mota,
          keyId: values.ma,
          kyHieu: values.kyHieu,
          nhaMayId: values.queryString,
        })
      );
      form.resetFields();
      hideModal();
    }
  };
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 6,
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
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
        onFinish={handleSubmit}
        // fields={[
        //   { name: "keyId", value: tabInstaller ? tabInstaller?.keyId : null },
        //   {
        //     name: "tenNguoiLapDat",
        //     value: tabInstaller ? tabInstaller?.tenNguoiLapDat : null,
        //   },
        // ]}
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              label="Mã/Ký hiệu"
              name="kyHieu"
              initialValue={tabInstaller ? tabInstaller?.kyHieu : null}
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
                { max: 100, message: "Tên người lắp đặt tối đa 100 kí tự" },
              ]}
              name="tenNguoiLapDat"
              label="Tên người lắp đặt"
              initialValue={tabInstaller ? tabInstaller.tenNguoiLapDat : null}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập tên người lắp đặt"
              />
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
              name="mota"
              label="Mô tả"
              initialValue={tabInstaller ? tabInstaller.mota : null}
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

export default EditInstaller;
