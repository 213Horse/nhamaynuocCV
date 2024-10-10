import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
} from "antd";
import { useState } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
export const ModalAdvanceSearch = (props) => {
  const { isOpenModalSearch, setIsOpenModalSearch } = props;
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="Tìm kiếm hóa đơn nâng cao"
      open={isOpenModalSearch}
      footer={[
        <Button type="primary" icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>,
        <Button
          type="primary"
          icon={<CloseCircleOutlined />}
          onClick={() => form.resetFields()}
        >
          Xóa điều kiện TK
        </Button>,
        <Button
          type="primary"
          icon={<CloseCircleOutlined />}
          onClick={() => setIsOpenModalSearch(false)}
        >
          Đóng
        </Button>,
      ]}
      width={900}
      onCancel={() => setIsOpenModalSearch(false)}
    >
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={"small"}
      >
        <Row>
          <Col span={12} style={{ width: "300px" }}>
            <Form.Item label="Loại KH">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Số tài khoản">
              <Input style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item label="Tên thường gọi">
              <Input style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item label="Vùng">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Hình thức TT">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="ĐH block">
              <InputNumber style={{ width: "300px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Điện thoại">
              <Input style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item label="Mã số thuế">
              <Input style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item label="Đối tượng giá">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Khu vực">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Cán bộ thu">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Xã/Phường">
              <Select style={{ width: "300px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
