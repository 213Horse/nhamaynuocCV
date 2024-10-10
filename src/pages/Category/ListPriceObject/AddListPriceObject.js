import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { fetchApiAllPriceListObjectSelector ,btnClickGetFactoryIdSelector} from "../../../redux/selector";
import { fetchApiAllPriceListObject } from "../../../redux/slices/priceListObjectSlice/priceListObjectSlice";
import { fetchApiAddPriceListObject } from "../../../redux/slices/priceListObjectSlice/priceListObjectSlice";
import Captcha from "../../../components/Captcha/Captcha";
// import { fetchApiAllFactorySelector } from "../../../redux/selector";
// import { fetchApiAllFactory } from "../../../redux/slices/factorySlice/factorySlice";
// import { fetchApiAddRegion } from "../../../redux/slices/regionSlice/regionSlice";
const AddListPriceObject = ({ hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const firstInputRef = useRef();

  const dispatch = useDispatch();

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
  // useEffect(() => {
  //   if (nhaMayId) {
  //     console.log("Data nha may:", nhaMayId);
  //     const queryString = createFilterQueryString();
  //     dispatch(fetchApiAllPriceListObject(queryString));
  //   }
  // }, [nhaMayId]);



  const priceListObject = useSelector(fetchApiAllPriceListObjectSelector);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  const layout = {
    labelCol: {
      span: 5, // note
    },
  };

  // handle save and close modal
  const handleSaveAndClose = async () => {
    try {
      const queryString = createFilterQueryString();
      const values = await form1.validateFields();
      // values.queryString = queryString;
      dispatch(fetchApiAddPriceListObject({values: values , queryString: queryString}));
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
      dispatch(fetchApiAddPriceListObject(values));
      form1.resetFields();
      captchaRef.current.reset();
      setIsCaptcha(false);
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
            <Form.Item
              label="Mã/Ký hiệu"
              name="kyHieu"
              rules={[
                { required: true, message: "Vui lòng không được bỏ trống." },
                { max: 100, message: "Mã/Ký hiệu tối đa 100 kí tự" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                name="kyHieu"
                placeholder="Ký hiệu"
                onKeyPress={(event) => {
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  if (!/^[a-zA-Z0-9]*$/.test(keyValue)) event.preventDefault();
                }}
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

export default AddListPriceObject;
