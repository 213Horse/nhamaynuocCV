import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { fetchApiUpdateWard } from "../../../redux/slices/wardSlice/wardSlice";
import { GetInfoToAddWardQuery } from "../../../graphql/wards/wardQuery";
import { useQuery } from "@apollo/client";
import Captcha from "../../../components/Captcha/Captcha";

const EditWard = ({ tabListbc, hideModal }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const {
    data: dataCity,
  } = useQuery(GetInfoToAddWardQuery);

  const [districts, setDistricts] = useState(() => (
    dataCity?.GetTinhThanhs?.nodes?.filter(item => item.id === tabListbc?.quanHuyen?.tinhThanh?.id)[0]?.quanHuyens || []
  ));

  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const layout = {
    labelCol: {
      span: 6,
    },
  };

  // handle submit form (update )
  const handleSubmit = (values) => {
    console.log({ ...values, prevKeyId: tabListbc?.keyId });
    if (values) {
      dispatch(fetchApiUpdateWard({ ...values, prevKeyId: tabListbc?.keyId }));
      form1.resetFields();
      hideModal();
    }
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const handleChangeCity = (value) => {
    const listDistrict = dataCity?.GetTinhThanhs?.nodes?.filter(item => item.id === value);
    setDistricts(listDistrict[0]?.quanHuyens || [])
  }

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

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
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Tên Thành phố/Tỉnh"
              name="cityId"
              {...rules}
              initialValue={tabListbc?.quanHuyen?.tinhThanh?.id}
            >
              <Select
                placeholder="Chọn tên Thành phố/Tỉnh"
                options={dataCity?.GetTinhThanhs?.nodes?.map(item => ({
                  label: item?.ten,
                  value: item?.id
                }))}
                onSelect={handleChangeCity}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Tên Quận/Huyện"
              name="quanHuyenId"
              {...rules}
              initialValue={districts?.length > 0 && tabListbc?.quanHuyen?.id}
            >
              <Select
                placeholder="Chọn tên Quận/Huyện"
                options={districts?.map(item => ({
                  label: item.ten,
                  value: item.id
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item label="Mã Phường/Xã" name="keyId" {...rules} initialValue={tabListbc?.keyId}>
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập mã Phường/Xã"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item label="Tên Phường/Xã" name="ten" {...rules} initialValue={tabListbc?.ten}>
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập tên Phường/Xã"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* //captcha */}
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
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

export default EditWard;
