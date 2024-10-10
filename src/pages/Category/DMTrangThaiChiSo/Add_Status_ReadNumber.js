import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  theme,
} from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addDMTrangThaiChiSo, getAllDMTrangThaiChiSo } from "../../../redux/slices/DMTrangThaiChiSo/trangThaiChiSoSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import { fetchApiAllPriceObject } from "../../../redux/slices/priceObjectSlice/priceObjectSlice";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";

const Add_Status_ReadNumber = ({ hideModal }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isAddedSuccess = useSelector(
    (state) => state.trangThaiChiSo.isAddedSuccess
  );
  const [colorValue, setColorValue] = useState("");
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
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
  const handleSubmit = async (values) => {
    const queryString = createFilterQueryString()
    const data = { ...values };
    data.KeyId = "";
    data.maMau = colorValue;
    data.queryString = queryString
    if (data) {
      await dispatch(addDMTrangThaiChiSo(data));
      dispatch(getAllDMTrangThaiChiSo(queryString));
      form.resetFields();
      hideModal();
    }
  };
  const handleAddAndContinue = () => {
    form.validateFields().then((values) => {
      const data = { ...values };
      data.maMau = colorValue;
      if (data) {
        dispatch(addDMTrangThaiChiSo(data));
        captchaRef.current.reset();
        setIsCaptcha(false);
        form.resetFields();
      }
    });
  };

  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const handleColorChange = (color) => {
    setColorValue(color.toHexString());
    
  };

  const onReset = () => {
    form.resetFields();
  };


  useEffect(() => {
    form.setFieldValue("giaTriMau", colorValue)
  }, [colorValue]);

  return (
    <Form
      {...layout}
      form={form}
      onFinish={handleSubmit}
      style={{
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 10,
      }}
    >
      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item
            name="kyHieu"
            label="Mã trạng thái"

          >
            <Input name="kyHieu" style={{ width: "100%" }}/>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item
            name="tenTrangThai"
            label="Tên trạng thái"
            rules={[
              {
                required: true,
                message: "Tên trạng thái không được để trống",
              },
              { max: 50, message: "Tên trạng thái tối đa 50 kí tự" },
            ]}
          >
            <Input name="tenTrangThai" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item
            rules={[{ max: 50, message: "Mô tả tối đa 50 kí tự" }]}
            name="moTaNgan"
            label="Mô tả ngắn"
          >
            <Input name="moTaNgan" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Số thứ tự không được để trống",
              },
            ]}
            name="soTt"
            label="Số thứ tự"
          >
            <Input
              placeholder="Nhập số thứ tự"
              type="Number"
              min={1}
              name="soTt"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item
            rules={[{ required: true, message: "Hãy chọn mã màu!" }]}
            label="Mã màu"
            name="maMau"
          >
            <ColorPicker
              name="maMau"
              color={colorValue}
              onChange={handleColorChange}
              showText={(color) => (
                <span> Mã màu : ({color.toHexString()})</span>
              )}
            />
          </Form.Item>
          <Form.Item name="giaTriMau" label="Giá trị màu" rules={[{ required: true, message: "Hãy chọn mã màu!" }]}>
            <Input initialValue={colorValue} value={colorValue} readOnly />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col
          style={{ marginLeft: "40px" }}
          className={isTabletOrMobile ? "" : "gutter-item"}
        >
          <Form.Item name="khongChoPhepGhi" valuePropName="checked">
            <Checkbox name="khongChoPhepGhi">Không cho phép ghi</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col
          style={{ marginLeft: "40px" }}
          className={isTabletOrMobile ? "" : "gutter-item"}
        >
          <Form.Item name="khongChoPhepHienThi" valuePropName="checked">
            <Checkbox name="khongChoPhepHienThi">
              Không cho phép hiển thị trên thanh ghi chỉ số
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>

      {/* //captcha */}
      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item className="captcha-wrapper">
            <Captcha
              className="captcha-fix-trang-thai"
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
          style={{
            marginLeft: "10px",
          }}
          icon={<FileAddOutlined />}
          className="custom-btn-reset-d"
          onClick={handleAddAndContinue}
          disabled={!isCaptcha}
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
          onClick={() => hideModal()}
        >
          Đóng
        </Button>
      </Row>
    </Form>
  );
};

export default Add_Status_ReadNumber;
