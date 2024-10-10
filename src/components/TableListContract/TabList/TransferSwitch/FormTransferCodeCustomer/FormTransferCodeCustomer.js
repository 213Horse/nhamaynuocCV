import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Divider, Form, Input, Row } from "antd";
import { toast } from "react-toastify";

function FormTransferCodeCustomer({ hideModalTransferCodeCustomer }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
      md: { span: 6 },
      lg: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  const handleHideModal = () => {
    hideModalTransferCodeCustomer();
  };

  return (
    <div className="container-transfer-code-cus">
      {/* collapse (Chuyễn mã KH) */}
      <Collapse
        key="1"
        items={[
          {
            key: "1",
            label: "Chuyển mã khách hàng",
            children: (
              <Form>
                <Row>
                  {/* Mã KH */}
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form.Item
                      name="maKH"
                      label="Mã KH"
                      {...formItemLayout}
                      rules={[
                        {
                          // required: true,
                          message: "Bạn cần phải nhập mã khách hàng.",
                        },
                      ]}
                    >
                      <Input name="maKH" placeholder="Nhập mã khách hàng" />
                    </Form.Item>
                  </Col>

                  {/* Button tìm kiếm */}
                  <Col xs={24} sm={24} md={20} lg={4}>
                    <Form.Item {...formItemLayout}>
                      <Button
                        type="primary"
                        className="space-left-6"
                        onClick={() => toast.info("Tính năng chưa hoạt động")}
                      >
                        Tìm
                      </Button>
                    </Form.Item>
                  </Col>

                  <Divider orientation="left">Thông tin khách hàng</Divider>

                  {/* Tên KH */}
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form.Item
                      name="tenKH"
                      label="Tên KH"
                      {...formItemLayout}
                      rules={[
                        {
                          // required: true,
                          message: "Bạn cần phải nhập tên khách hàng.",
                        },
                      ]}
                    >
                      <Input
                        name="tenKH"
                        placeholder="Tên khách hàng"
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  {/* Địa chỉ KH */}
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form.Item
                      name="diaChiMoi"
                      label="Địa chỉ"
                      {...formItemLayout}
                    >
                      <Input name="diaChiMoi" placeholder="Địa chỉ" disabled />
                    </Form.Item>
                  </Col>

                  <Divider />

                  {/* Mã KH mới */}
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form.Item
                      name="maKHMoi"
                      label="Mã KH mới"
                      {...formItemLayout}
                      rules={[
                        {
                          // required: true,
                          message: "Bạn cần phải nhập mã khách hàng mới.",
                        },
                      ]}
                    >
                      <Input
                        name="maKHMoi"
                        placeholder="Nhập mã khách hàng mới"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="update-reading-footer">
                  <Button
                    htmlType="submit"
                    className="custom-btn-add space-right-10"
                    onClick={() => toast.info("Tính năng chưa hoạt động")}
                  >
                    <SaveOutlined /> Thực hiện
                  </Button>

                  <Button
                    className="custom-btn-close"
                    onClick={handleHideModal}
                  >
                    <CloseOutlined /> Đóng
                  </Button>
                </div>
              </Form>
            ),
          },
        ]}
        defaultActiveKey={["1"]}
        style={{ margin: "12px 0px" }}
        size="small"
      />
    </div>
  );
}

export default FormTransferCodeCustomer;
