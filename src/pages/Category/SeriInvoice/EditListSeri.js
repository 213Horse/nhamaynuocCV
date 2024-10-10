import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTableSeriSelector,
  btnClickTableWatchSelector,
} from "../../../redux/selector";
import watchSlice, {
  fetchUpdateWatch,
  fetchWatchData,
} from "../../../redux/slices/watchSlice/watchSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { fetchUpdateSeriHoaDon } from "../../../redux/slices/seriInvoiceSlice/seriInvoiceSlice";

const EditListSeri = ({ hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const rowSelected = useSelector(btnClickTableSeriSelector);

  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const createFactoryQueryString = () => {
    let factoryQueryString = "";
    if (factoryID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${factoryID}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const handleSubmit = (values) => {
    const nhaMayId = createFactoryQueryString();
    console.log("Row data: ", rowSelected);
    dispatch(
      fetchUpdateSeriHoaDon({
        keyId: rowSelected.keyId,
        values,
        nhaMayId,
        // key: rowSelected?.key,
      })
    );
    hideModal();
    form1.resetFields();
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const handleReset = () => {
    form1.resetFields();
  };

  const layout = {
    labelCol: 5,
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
        // fields={form1.setFieldsValue({
        //    keyId: rowSelected !== null ? rowSelected?.maDH : "",
        //    kieuDongHo: rowSelected !== null ? rowSelected?.tenDH : "",
        // })}
      >
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              name="soHD"
              rules={[
                {
                  required: true,
                  message: "Mã kiểu đồng hồ không được bỏ trống",
                },
              ]}
              label="Số hóa đơn"
              initialValue={rowSelected !== null ? rowSelected?.soHD : ""}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              name="soLuongHoaDon"
              rules={[
                {
                  required: true,
                  message: "Tên kiểu đồng hồ không được bỏ trống",
                },
              ]}
              label="Số lượng hóa đơn"
              initialValue={
                rowSelected !== null ? rowSelected?.soLuongHoaDon : ""
              }
            >
              <Input style={{ width: "100%" }} />
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
                ref={null}
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
                  key="reset"
                  style={{
                     marginLeft: "10px",
                  }}
                  icon={<FileAddOutlined />}
                  className="custom-btn-reset-d"
                  onClick={handleReset}
                  // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
               >
                  Làm mới
               </Button> */}

          <Button
            key="submit"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-reset-d"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
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
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            onClick={() => {
              dispatch(fetchWatchData());
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

export default EditListSeri;
