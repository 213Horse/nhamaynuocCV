import React, { useRef, useState ,useEffect} from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import { useMediaQuery } from "react-responsive";
import { fetchApiAddPaymentMethod } from "../../../redux/slices/paymentMethodSlice/paymentMethodSlice";
import { useDispatch, useSelector } from "react-redux";
import Captcha from "../../../components/Captcha/Captcha";
import { addDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { fetchApiAllPaymentMethod } from "../../../redux/slices/paymentMethodSlice/paymentMethodSlice";

const AddList_Payment_Method = ({ hideModal, tabListbc }) => {
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const firstInputRef = useRef();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const layout = {
    labelCol: {
      span: 5,
    },
  };
  // // handle submit form (main)
  // const handleSubmit = (values) => {
  //   console.log("values", values);
  // };

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
  // useEffect(() => {
  //   if (nhaMayId) {
  //     console.log("Data nha may:", nhaMayId);
  //     const queryString = createFilterQueryString();
  //     dispatch(fetchApiAddPaymentMethod(queryString));
  //   }
  // }, [nhaMayId]);


  // handle save and close modal
  const handleSaveAndClose = async () => {
    const queryString = createFilterQueryString();
    try {
      const values = await form1.validateFields();
      console.log("values", values);
      if (values) {
        values.queryString = queryString;
        await dispatch(fetchApiAddPaymentMethod(values));
        form1.resetFields();
        hideModal();
        // Sau khi thêm mới, cập nhật danh sách phương thức thanh toán tại đây
        dispatch(fetchApiAllPaymentMethod(queryString));
      }
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi nếu có
    }
  };
  
  

  // handle save and continue add
  const handleSaveAndAdd = () => {
    form1.validateFields().then((values) => {
      if (values) {
        dispatch(fetchApiAddPaymentMethod(values));
        captchaRef.current.reset();
        setIsCaptcha(false);
        form1.resetFields();
      }
    });
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  return (
    <>
      <Form
        {...layout}
        form={form1}
        // onFinish={handleSubmit}
        onFinishFailed={handleFailed}
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
              label="Phương thức"
              name="kyHieu"
              rules={[
                { required: true, message: "Hãy nhập phương thức thanh thoán" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                name="pttt"
                placeholder="Nhập phương thức thanh toán"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              label="Mô tả"
              name="moTaPhuongThuc"
              rules={[
                { required: true, message: "Hãy nhập mô tả phương thức" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                name="mota"
                placeholder="Nhập mô tả"
              />
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

export default AddList_Payment_Method;
