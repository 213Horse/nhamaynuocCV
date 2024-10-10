import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Captcha from "../../../../components/Captcha/Captcha";
import { getAllCities } from "../../../../redux/slices/citySlice/citySlice";
import { getAllCitySelector } from "../../../../redux/selector";
import { fetchAddDistrict } from "../../../../redux/slices/districtSlice/districtSlice";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";

const AddDistrict = ({ hideModal }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const listCity = useSelector(getAllCitySelector);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  // handle submit form (main)
  const handleSubmit = (values) => {
    dispatch(fetchAddDistrict(values));
    hideModal();
  };

  useEffect(() => {
    dispatch(getAllCities());
  }, []);

  const layout = {
    labelCol: {
      span: 6,
    },
  };

  const handleSubmitAndAdd = async () => {
    const values = await form.validateFields();
    dispatch(fetchAddDistrict(values));
    form.resetFields();
    captchaRef.current.reset();
    setIsCaptcha(false);
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

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
          <Form.Item name="tinhThanhId" label="Tên Thành phố/Tỉnh" {...rules}>
            <Select
              placeholder="Chọn tên Thành phố/Tỉnh"
              style={{ width: "100%" }}
              options={listCity.map((item) => ({
                value: item.id,
                label: item.ten,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item name="keyId" label="Mã Quận/Huyện" {...rules}>
            <Input
              name="ten"
              placeholder="Nhập mã Quận/Huyện"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item name="ten" label="Tên Quận/Huyện" {...rules}>
            <Input
              name="ten"
              placeholder="Nhập tên Quận/Huyện"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          span={24}
          className={isTabletOrMobile ? "" : "gutter-item"}
        >
          <Form.Item style={{ width: "fit-content", margin: "22px auto" }}>
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
          onClick={handleSubmitAndAdd}
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
          onClick={() => {
            captchaRef.current.reset();
            hideModal();
          }}
        >
          Đóng
        </Button>
      </Row>
    </Form>
  );
};

export default AddDistrict;
