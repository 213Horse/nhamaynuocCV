import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
const { TextArea } = Input;

function FormPayDebt({ hideModal }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
      md: { span: 7 },
      lg: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  // handle submit form
  const handleSubmit = (values) => {
    console.log("values", values);
  };

  // handle submit form error
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <>
      <Divider orientation="left">Thông tin tài khoản</Divider>

      <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
        {/* Tìm kiếm + Mã khách hàng */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Tìm kiếm" {...formItemLayout}>
              <Input
                name=""
                placeholder="Tìm theo mã khách hàng, idKH, tên khách hàng, địa chỉ, số điện thoại"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Mã KH (*)" {...formItemLayout}>
              <Input name="" placeholder="Nhập mã khách hàng" />
            </Form.Item>
          </Col>
        </Row>

        {/* id khách hàng + Tên khách hàng */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="ID KH" {...formItemLayout}>
              <Input name="" placeholder="Nhập id khách hàng" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Tên KH" {...formItemLayout}>
              <Input name="" placeholder="Nhập tên khách hàng" />
            </Form.Item>
          </Col>
        </Row>

        {/* Địa chỉ + Tài khoản có */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Địa chỉ" {...formItemLayout}>
              <Input name="" placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Tài khoản có" {...formItemLayout}>
              <Input name="" placeholder="Nhập tài khoản có" />
            </Form.Item>
          </Col>
        </Row>

        {/* Tài khoản nợ + Dư nợ hiện tại */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Tài khoản nợ" {...formItemLayout}>
              <Input name="" placeholder="Nhập tài khoản nợ" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Dư nợ hiện tại" {...formItemLayout}>
              <Input name="" placeholder="Nhập dư nợ hiện tại" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Divider orientation="left">Thông tin công nợ</Divider>

        {/* Loại công nợ */}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="" label="Loại công nợ (*)">
              <Select
                fieldNames=""
                options={[{ value: "1", label: "LCN 1" }]}
                placeholder="Chọn loại công nợ"
                className="custom-border-select-inp"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Số tiền + Hình thức */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Số tiền (*)" {...formItemLayout}>
              <Input name="" placeholder="Nhập số tiền" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Hình thức" {...formItemLayout}>
              <Select
                fieldNames=""
                options={[{ value: "1", label: "HT 1" }]}
                placeholder="Chọn hình thức"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Người nộp + render bằng chữ */}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Người nộp" {...formItemLayout}>
              <Input name="" placeholder="Nhập người nộp" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item {...formItemLayout}>
              <div className="pay-debt-num-to-text">
                <span>Bằng chữ: </span>
                <i>render number to text.</i>
              </div>
            </Form.Item>
          </Col>
        </Row>

        {/* Diễn giải*/}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="" label="Nhập diễn giải">
              <TextArea name="" placeholder="Nhập diễn giải"></TextArea>
            </Form.Item>
          </Col>
        </Row>

        {/* Ngày lập + Người lập*/}
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Ngày lập" {...formItemLayout}>
              <DatePicker
                name=""
                locale={locale}
                placeholder="Chọn ngày lập"
                className="gutter-item-date-picker"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="" label="Người lập" {...formItemLayout}>
              <Input name="" placeholder="Nhập người lập" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {/* Buttons */}
        <div className="func-pay-debt-buttons">
          <Button htmlType="submit" className="custom-btn-add space-right-10">
            <SaveOutlined />
            Lưu
          </Button>

          <Button
            onClick={() => hideModal()}
            className="pay-debt-btn-close custom-btn-close"
          >
            <CloseOutlined />
            Đóng
          </Button>
        </div>
      </Form>
    </>
  );
}

export default FormPayDebt;
