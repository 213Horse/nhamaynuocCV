import React from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";

const AddList_Scope = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  // handle submit form (main)
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };
  const { Option } = Select;
  const [form1] = Form.useForm();
  const { token } = theme.useToken();

  const layout = {
    labelCol: {
      span: 5,
    },
    // wrapperCol: {
    //   span: 40,
    // },
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
          padding: 10,
        }}
      >
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Mã phạm vi"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Tên phạm vi"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item label="Tên thu tiền">
              <Input
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
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
            key="reset"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
          >
            Lưu và thêm tiếp
          </Button> */}

          <Button
            key="submit"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
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

export default AddList_Scope;
