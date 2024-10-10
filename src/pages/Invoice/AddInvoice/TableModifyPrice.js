import { CloseCircleFilled, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  theme,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
const TableModifyPrice = (props) => {
  const { isOpen, setIsOpen } = props;
  const { token } = theme.useToken();

  return (
    <Modal
      title="Nhập giá mới"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={800}
      footer={null}
    >
      <Form
        size="small"
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 10,
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="date" label="Mã khách hàng">
              <Input placeholder="Mã khách hàng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="person" label="Tên KH">
              <Input placeholder="Tên khách hàng" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="date" label="Địa chỉ">
              <Input placeholder="địa chỉ" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="date" label="Tiêu thụ">
              <Input placeholder="Tiêu thụ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="person"
              label="ĐT giá"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="ĐT giá"
                style={{
                  width: "100%",
                }}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="date" label="Ghi chú">
              <Input placeholder="Ghi chú" />
            </Form.Item>
          </Col>
        </Row>
        <Checkbox style={{ marginRight: "13px" }}>
          Áp dụng cho cả tháng sau & lưu vào hợp đồng
        </Checkbox>
      </Form>
      <div
        style={{ marginTop: "10px", }}
      >
        <p style={{ color: 'red' }}>
          Tổng khối lượng phân bổ phải bằng tiêu thụ, Nếu hạng mục nhập định định mức là -1 thì khối lượng còn lại sẽ đẩy hết vào đó
        </p>
        <div style={{ marginLeft: 'auto', width: "fit-content" }}>
          <Button
            type="primary"
            icon={<SaveFilled />}
            style={{ marginLeft: "10px" }}
          >
            Thực hiện
          </Button>
          <Button
            type="primary"
            icon={<CloseCircleFilled />}
            style={{ marginLeft: "10px" }}
            onClick={() => setIsOpen(false)}
          >
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TableModifyPrice;
