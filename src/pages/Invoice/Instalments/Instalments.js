import { CloseOutlined, SaveFilled } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal, theme } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
export const Instalments = (props) => {
  const { isOpen, handleCancel, handleOk } = props;
  const { token } = theme.useToken();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Modal
      title="Tính tiền hóa đơn trả góp"
      open={isOpen}
      onOk={() => handleOk("", "instalments")}
      onCancel={() => handleCancel("", "instalments")}
      width={600}
      footer={null}
      centered
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 10,
        }}
      >
        <Form.Item name="date" label="Tháng" style={{ marginRight: "70px", width: "100%" }}>
          <DatePicker
            allowClear
            locale={locale}
            placeholder="Chọn tháng"
            style={{ width: "100%" }}
            format="MM-YYYY"
            picker="month"
          />
        </Form.Item>
        <Form.Item
          name="person"
          label="Ngày đầu kỳ"
          style={{ marginRight: "70px", width: "100%" }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            allowClear
            locale={locale}
            placeholder="Chọn tháng"
            style={{ width: "100%" }}
            format="MM-YYYY"
          />
        </Form.Item>
        <Form.Item
          name="tuyendoc"
          label="Ngày cuối kỳ"
          style={{ marginRight: "70px", width: "100%" }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            allowClear
            locale={locale}
            placeholder="Chọn tháng"
            style={{ width: "100%" }}
            format="MM-YYYY"
          />
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "justify-between",
          marginBottom: 16,
          marginTop: 16,
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "auto" }}>
          <Button
            type="primary"
            icon={<SaveFilled />}
            style={{ marginRight: 5 }}
            size="middle" 
          >
            Bắt đầu thực hiện
          </Button>
          <Button
            className="custom-btn-close"
            onClick={() => handleCancel("", "instalments")}
            size="middle"
          >
            <CloseOutlined />
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
};
