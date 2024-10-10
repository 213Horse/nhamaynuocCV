import React from "react";
import { Progress, Row, Col, Form, theme, Tooltip } from "antd";
const ProgressBarExample = (hideModal) => {
  // handle submit form (main)
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "pink",
    "purple",
  ];
  const percents = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const titles = [
    "Nội dung một",
    "Nội dung hai",
    "Nội dung ba",
    "Nội dung 4",
    "Nội dung 5",
    "Nội dung 6",
    "Nội dung 7",
    "Nội dung 8",
    "Nội dung 9",
  ];
  return (
    <Form
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
      <Row>
        {colors.map((color, index) => (
          <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Tooltip title={titles[index]}>
              <Progress
                percent={percents[index]}
                strokeColor={color}
                format={(percent) => `${percent * 10}`}
              />
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Form>
  );
};
export default ProgressBarExample;
