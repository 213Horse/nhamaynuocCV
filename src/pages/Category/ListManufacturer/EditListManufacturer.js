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
import {
  getAllDMTotalByType,
  updateDMTotalByType,
} from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const EditListManufacturer = ({ tabListManufacturer, hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  // const { Option } = Select;

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
          id: tabListManufacturer.key,
          type: 6,
          value: values.hangSX,
          description: values.mota,
          keyId: values.kyHieu,
          nhaMayId: values.queryString,
          kyHieu: values.kyHieu,
        })
      );
      form.resetFields();
      hideModal();
    }
    setTimeout(() => {
      const filterData = {
        type: 6,
        queryString: createFilterQueryString(),
      };
      dispatch(getAllDMTotalByType(filterData));
    }, 0);
  };

  const layout = {
    labelCol: {
      span: 5,
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
        //   { name: "keyId", value: tabListManufacturer ? tabListManufacturer?.keyId : null },
        //   {
        //     name: "tenNguoiLapDat",
        //     value: tabListManufacturer ? tabListManufacturer?.tenNguoiLapDat : null,
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
                tabListManufacturer ? tabListManufacturer?.kyHieu : null
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
                { max: 100, message: "Hãng sản xuất tối đa 100 kí tự" },
              ]}
              name="hangSX"
              label="Hãng sản xuất"
              initialValue={
                tabListManufacturer ? tabListManufacturer.hangSX : null
              }
            >
              <Input style={{ width: "100%" }} placeholder="Hãng sản xuất" />
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
                tabListManufacturer ? tabListManufacturer?.mota : null
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
            <Form.Item style={{ width: "fit-content", margin: "22px auto" }}>
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

export default EditListManufacturer;
