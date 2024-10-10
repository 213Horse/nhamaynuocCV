import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";

export const ModalMessage = (props) => {
  const { isModalEmail, setIsModalEmail, isModalSMS, setIsModalSMS } = props;
  
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };
  
  const onFinish = (values) => {
    console.log(values);
  };
 

  return (
    <Modal
      title={isModalEmail ? "Gửi email thông báo" : "Gửi SMS thông báo"}
      open={isModalSMS || isModalEmail}
      onOk={() => {
        isModalEmail ? setIsModalEmail(false) : setIsModalSMS(false);
      }}
      onCancel={() => {
        isModalEmail ? setIsModalEmail(false) : setIsModalSMS(false);
      }}
      footer={[null, null]}
    >
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        size="small"
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề!'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={isModalEmail ? "email" : "phone"}
          label="Kiểu Email"
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{marginLeft: 'auto', width: 'fit-content'}} >
          <Button type="primary" htmlType="submit" icon={<SendOutlined style={{transform: "rotate(290deg)"}} />}>
            Gửi
          </Button>
          <Button
            htmlType="button"
            onClick={() =>
              isModalEmail ? setIsModalEmail(false) : setIsModalSMS(false)
            }
            style={{marginLeft: 10}}
          >
            Đóng
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
