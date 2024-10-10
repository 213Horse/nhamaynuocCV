import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { updateKy } from "../../../redux/slices/DMKy/kySlice";
import dayjs from "dayjs";
import Captcha from "../../../components/Captcha/Captcha";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
} from "../../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import moment from "moment";

const EditListSigning = ({ hideModal }) => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const tabKy = useSelector(btnClickTabListInvoicePrintSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

  // console.log("regions", regions);
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

  // handle submit form (main)
  const handleSubmit = (values) => {
    const queryString = createFilterQueryString();
    console.log(values);
    if (values) {
      console.log(tabKy.keyId);
      let dataMain = {
        keyId: tabKy.keyId,
        data: {
          keyId: "",
          kyHieu: values.kyHieu,
          moTa: values.moTa,
          ngaySuDungTu: values.ngaySuDungTu,
          ngaySuDungDen: values.ngaySuDungDen,
          ngayHoaDon: values.ngayHoaDon,
        },
      };
      console.log(dataMain);
      dispatch(updateKy({ dataMain, queryString }));
      form.resetFields();
      hideModal();
    }
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const layout = {
    labelCol: {
      span: 6,
    },
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  const validateStartDate = (_, values) => {
    const ngaySuDungDen = form.getFieldValue("ngaySuDungDen");
    if (ngaySuDungDen && values && values.isAfter(ngaySuDungDen)) {
      return Promise.reject("Ngày sử dụng không hợp lệ!");
    }
    return Promise.resolve();
  };

  const validateEndDate = (_, values) => {
    const ngaySuDungTu = form.getFieldValue("ngaySuDungTu");
    if (ngaySuDungTu && values && values.isBefore(ngaySuDungTu)) {
      return Promise.reject("Ngày sử dụng không hợp lệ!");
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
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
              {...rules}
              label="Mã/Ký hiệu"
              name="kyHieu"
              initialValue={tabKy ? tabKy.kyHieu : null}
            >
              <Input name="kyHieu" style={{ width: "100%" }} />
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
              label="Tên/Mô tả"
              name="moTa"
              initialValue={tabKy ? tabKy.moTa : null}
            >
              <Input name="moTa" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                {
                  validator: validateStartDate,
                },
              ]}
              label="Ngày sử dụng từ"
              name="ngaySuDungTu"
              initialValue={
                tabKy?.ngaySuDungTu !== null
                  ? dayjs(tabKy?.ngaySuDungTu, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                picker="date"
                format="DD/MM/YYYY"
                name="ngaySuDungTu"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                {
                  validator: validateEndDate,
                },
              ]}
              label="Ngày sử dụng đến"
              name="ngaySuDungDen"
              initialValue={
                tabKy?.ngaySuDungDen !== null
                  ? dayjs(tabKy?.ngaySuDungDen, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                picker="date"
                format="DD/MM/YYYY"
                name="ngaySuDungDen"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>{" "}
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              label="Ngày hóa đơn"
              name="ngayHoaDon"
              initialValue={
                tabKy?.ngayHoaDon !== null
                  ? dayjs(tabKy?.ngayHoaDon, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                picker="date"
                format="DD/MM/YYYY"
                name="ngayHoaDon"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
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
            key="reset"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            htmlType="submit"
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

export default EditListSigning;
