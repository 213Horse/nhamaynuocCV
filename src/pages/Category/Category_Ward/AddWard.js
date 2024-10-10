import React, { useEffect, useRef, useState } from "react";
import { AutoComplete, Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { fetchApiAddWard } from "../../../redux/slices/wardSlice/wardSlice";
import { GetInfoToAddWardQuery } from "../../../graphql/wards/wardQuery";
import { useQuery } from "@apollo/client";
import Captcha from "../../../components/Captcha/Captcha";

const AddWard = ({ hideModal, factoryNames }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [districts, setDistricts] = useState([]);

  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: 6,
    },
  };

  const {
    data: dataCity,
  } = useQuery(GetInfoToAddWardQuery, { variables: { first: 100 } });

  const handleChangeCity = (value) => {
    const listDistrict = dataCity?.GetTinhThanhs?.nodes.filter(item => item.id === value);
    console.log(value);
    setDistricts(listDistrict[0]?.quanHuyens || [])
  }

  console.log("District: ", districts);

  // handle save and close modal
  const handleSaveAndClose = (value) => {
    dispatch(fetchApiAddWard(value));

    form1.resetFields();
    hideModal();
  };

  // handle save and continue add
  const handleSaveAndAdd = () => {
    form1.validateFields().then((values) => {
      if (values) {
        dispatch(fetchApiAddWard(values));

        form1.resetFields();
      }
    });
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

  return (
    <>
      <Form
        {...layout}
        form={form1}
        onFinish={handleSaveAndClose}
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
            <Form.Item label="Tên Thành phố/Tỉnh" name="cityId" {...rules}>
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
            <Form.Item label="Tên Quận/Huyện" name="quanHuyenId" {...rules}>
              <Select
                placeholder="Chọn Tên Quận/Huyện"
                options={districts.map(item => ({
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
            <Form.Item label="Mã Phường/Xã" name="keyId" {...rules}>
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
            <Form.Item label="Tên Phường/Xã" name="ten" {...rules}>
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
    </>
  );
};

export default AddWard;
