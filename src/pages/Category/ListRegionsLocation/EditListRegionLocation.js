import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { fetchApiUpdateRegion } from "../../../redux/slices/regionSlice/regionSlice";
import Captcha from "../../../components/Captcha/Captcha";

const EditListRegionLocation = ({ tabListbc, hideModal, factoryNames }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const layout = {
    labelCol: {
      span: 4,
    },
  };

  // handle submit form (update region)
  const handleSubmit = (values) => {
    if (values) {
      dispatch(
        fetchApiUpdateRegion({ ...values, prevKeyId: tabListbc?.keyId })
      );
      form1.resetFields();
      hideModal();
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
              label="Nhà máy"
              initialValue={tabListbc ? tabListbc?.nhaMayId : null}
              name="nhaMayId"
              {...rules}
            >
              <Select placeholder="Chọn tên nhà máy" fieldNames="nhaMayId">
                {factoryNames?.length <= 0
                  ? []
                  : factoryNames.map((_factory) => {
                      return (
                        <Select.Option key={_factory.id} value={_factory.id}>
                          {_factory.tenNhaMay}
                        </Select.Option>
                      );
                    })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              label="Mã vùng"
              name="keyId"
              initialValue={tabListbc ? tabListbc?.keyId : null}
              {...rules}
            >
              <Input style={{ width: "100%" }} name="keyId" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              label="Tên vùng"
              name="tenVung"
              initialValue={tabListbc ? tabListbc?.tenVung : null}
              {...rules}
            >
              <Input
                style={{ width: "100%" }}
                name="tenVung"
                placeholder="Nhập tên vùng"
              />
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
          <Button
            key="update"
            htmlType="submit"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
          >
            {/* Lưu và thêm tiếp */}
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

export default EditListRegionLocation;
