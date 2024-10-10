import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import areaSlice, { fetchApiGetKhuVucAndVung, fetchApiUpdateArea } from "../../../redux/slices/areaSlice/areaSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";

const EditListLocation = ({ tabListbc, hideModal, regions }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: 4,
    },
    // wrapperCol: {
    //   span: 40,
    // },
  };

  console.log(tabListbc);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  // handle submit form (main)
  const handleSubmit = async (values) => {
    if (values && tabListbc) {
      await dispatch(
        fetchApiUpdateArea({
          ...values,
          prevKeyId: tabListbc?.keyId
        })
      );
      const queryString = createFilterQueryString()
      dispatch(fetchApiGetKhuVucAndVung(queryString));
      dispatch(
        areaSlice.actions.btnClickTabListArea(null)
      );
      hideModal();
    }
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
              label="Mã khu vực"
              name="keyId"
              initialValue={tabListbc ? tabListbc?.keyId : null}
              {...rules}
            >
              <Input
                style={{ width: "100%" }}
                name="keyId"
                placeholder="Nhập mã khu vực"
                onKeyDown={(e) => {
                  const forbiddenChars = /[^A-Za-z0-9]/;
                  if (forbiddenChars.test(e.key)) {
                    e.preventDefault();
                  }
                  if (e.key === ' ' || e.key === 'Tab') {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Tên Khu Vực"
              name="tenKhuVuc"
              initialValue={tabListbc ? tabListbc?.tenKhuVuc : null}
              {...rules}
            >
              <Input
                style={{ width: "100%" }}
                name="tenKhuVuc"
                placeholder="Nhập tên khu vực"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              name="vungId"
              label="Khu Vực Cha"
              initialValue={tabListbc ? tabListbc?.vungId : null}
              {...rules}
            >
              <Select
                style={{ width: "100%" }}
                options={
                  regions?.length <= 0
                    ? []
                    : regions.map((_regoin) => ({
                      label: _regoin.tenVung,
                      value: _regoin.id,
                    }))
                }
                placeholder="Chọn vùng"
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
            Cập nhật
          </Button>

          {/* <Button
            key="submit"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
          >
            Lưu và đóng
          </Button> */}

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

export default EditListLocation;
