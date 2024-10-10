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
import { btnClickGetFactoryIdSelector, btnClickTabListInvoicePrintSelector } from "../../../redux/selector";
import { getAllDMTrangThaiChiSo, updateDMTrangThaiChiSo } from "../../../redux/slices/DMTrangThaiChiSo/trangThaiChiSoSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { fetchApiAllPriceObject } from "../../../redux/slices/priceObjectSlice/priceObjectSlice";

const Edit_Status_ReadNumber = ({ hideModal }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const rowSelected = useSelector(btnClickTabListInvoicePrintSelector);
  const dispatch = useDispatch();
  const [colorValue, setColorValue] = useState(
    rowSelected?.maMau ? rowSelected?.maMau : ""
  );
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dataOnUpdate = useSelector(btnClickTabListInvoicePrintSelector);

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
    const data = { ...values, preKeyId: dataOnUpdate.KeyId };
    data.maMau = colorValue;
    data.queryString = queryString
    if (values) {
     await dispatch(updateDMTrangThaiChiSo(data));
      dispatch(getAllDMTrangThaiChiSo(queryString));
    }
    
    hideModal();
  };
  const handleColorChange = (color) => {
    setColorValue(color.toHexString());
    
  };
  const handleFailed = (error) => {
    console.log({ error });
  };

  const onReset = () => {
    form.resetFields();
  };

  const layout = {
    labelCol: {
      span: 5,
    },
  };
  useEffect(() => {
    form.setFieldValue("giaTriMau", colorValue)
  }, [colorValue]);
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
          padding: 10,
        }}
        // fields={form.setFieldsValue(rowSelected)}
      >
        {/* <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="KeyId"
              label="Mã trạng thái"
              required
              initialValue={rowSelected ? rowSelected.KeyId : null}
            >
              <Input name="KeyId" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row> */}

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
              initialValue={rowSelected ? rowSelected.tenTrangThai : null}
            >
              <Input name="tenTrangThai" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="moTaNgan"
              label="Mô tả ngắn"
              initialValue={rowSelected ? rowSelected.moTaNgan : null}
              rules={[{ max: 50, message: "Mô tả tối đa 50 kí tự" }]}
            >
              <Input name="moTaNgan" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              name="soTt"
              label="Số thứ tự"
              initialValue={rowSelected ? rowSelected.soTt : null}
              rules={[
                {
                  required: true,
                  message: "Số thứ tự không được để trống",
                },
              ]}
            >
              <Input
                name="soTt"
                placeholder="Nhập số thứ tự"
                type="Number"
                min={1}
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
            >
              <ColorPicker
                size="large"
                onChange={handleColorChange}
                showText={(color) => (
                  <span>Mã màu : ({color.toHexString()})</span>
                )}
                defaultValue={colorValue}
              />
            </Form.Item>
            <Form.Item name="giaTriMau" label="Giá trị màu" rules={[{ required: true, message: "Hãy chọn mã màu!" }]} initialValue={colorValue}>
            <Input  value={colorValue} readOnly />
          </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            style={{ marginLeft: "40px" }}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              name="khongChoPhepGhi"
              valuePropName="checked"
              initialValue={rowSelected ? rowSelected.khongChoPhepGhi : null}
            >
              <Checkbox name="khongChoPhepGhi">Không cho phép ghi</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            style={{ marginLeft: "40px" }}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              name="khongChoPhepHienThi"
              valuePropName="checked"
              initialValue={
                rowSelected ? rowSelected.khongChoPhepHienThi : null
              }
            >
              <Checkbox name="khongChoPhepHienThi">
                Không cho phép hiển thị trên thanh ghi chỉ số
              </Checkbox>
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
                className="captcha-fix-trang-thai"
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //captcha */}

        {/* Footer Button */}
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
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Edit_Status_ReadNumber;
