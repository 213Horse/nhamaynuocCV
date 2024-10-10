import React, { useRef, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { addKy } from "../../../redux/slices/DMKy/kySlice";
import Captcha from "../../../components/Captcha/Captcha";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
const AddDMKy = ({ hideModal }) => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const factoryId = useSelector(btnClickGetFactoryIdSelector);


  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

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
    values.queryString = queryString;
  
    // Gọi hàm addKy(values) và sử dụng .then() để xử lý khi nó hoàn thành
    dispatch(addKy(values)).then(() => {
      // Các hành động tiếp theo sau khi addKy(values) hoàn thành
      captchaRef.current.reset();
      setIsCaptcha(false);
      form.resetFields();
      hideModal();
    });
  };
  

  const handleSaveAndAdd = async () => {
    // const queryString = createFilterQueryString();
    const values = await form.validateFields();

    dispatch(addKy(values));
    captchaRef.current.reset();
    setIsCaptcha(false);
    form.resetFields();
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

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
            <Form.Item {...rules} name="kyHieu" label="Mã/Ký hiệu">
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
              name="moTa"
              label="Tên/Mô tả"
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
              name="ngaySuDungTu"
              label="Ngày sử dụng từ"
            >
              <DatePicker
                locale={locale}
                name="ngaySuDungTu"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
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
              name="ngaySuDungDen"
              label="Ngày sử dụng đến"
            >
              <DatePicker
                locale={locale}
                name="ngaySuDungDen"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>{" "}
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item {...rules} name="ngayHoaDon" label="Ngày hóa đơn">
              <DatePicker
                locale={locale}
                name="ngayHoaDon"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item className="captcha-wrapper">
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
          {/* <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
            onClick={handleSaveAndAdd}
          >
            Lưu và thêm tiếp
          </Button> */}

          <Button
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
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

export default AddDMKy;
