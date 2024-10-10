import { CloseOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  message,
  theme,
} from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { postRequest } from "../../../services";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const CalculateMoney = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      values.thangTaoHoaDon = values.thangTaoHoaDon.format("MM/YYYY");
      values.hoaDonId = props.rowSelection.id
      console.log("Received values of form: ", values);
      postRequest("/hoa-don/tinh-tien-hoa-don", values).then((res) => {
        console.log("res", res);
        if (res?.status === 200) {
          toast.success("Tính tiền hóa đơn thành công");
          form.resetFields();
        }
      });
    } catch (error) {
      toast.error("Tính tiền hóa đơn thất bại");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    if (props.isOpen) {
      console.log("props.rowSelection", props.rowSelection);
      form.setFieldsValue({
        tenTuyenDoc: props.rowSelection?.readingRoute,
        tenKhachHang: props.rowSelection?.username,
      });
    }
  }, [props.rowSelection, props.isOpen]);

  return (
    <Modal
      title="Tính tiền hóa đơn"
      open={props.isOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
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
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        onKeyDown={handleKeyDown}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 10,
        }}
      >
        <Form.Item
          name="thangTaoHoaDon"
          label="Tháng"
          style={{ marginRight: "70px", width: "100%" }}
        >
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
          name="tenTuyenDoc"
          label="Tuyến đọc"
          style={{ marginRight: "70px", width: "100%" }}
        >
          <Input
            disabled
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="tenKhachHang"
          label="Khách hàng"
          style={{ marginRight: "70px", width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="ghiChu"
          label="Ghi chú"
          style={{ marginRight: "70px", width: "100%" }}
        >
          <Input placeholder="Ghi chú" />
        </Form.Item>
        <Checkbox style={{ marginRight: "13px" }}>Tính lại tất cả</Checkbox>

        <Row justify={"end"}>
          <Col span={9}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SaveFilled />}
                size="middle"
              >
                Thực thi tiến trình
              </Button>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Button
                className="custom-btn-close"
                onClick={() => {
                  props.handleCancel();
                  form.resetFields();
                }}
                size="middle"
                icon={<CloseOutlined />}
              >
                Đóng
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
