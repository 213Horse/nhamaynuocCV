import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
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
  Table,
} from "antd";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
export const ViewDetailListClock = (props) => {
  const { isOpen, setIsOpenModalViewDetail } = props;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  console.log(isOpen);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const dataSource = Array.from({ length: 100 }, (_, index) => ({
    key: index,
    stt: index + 1,
    name: `Số HĐ ${index}`,
    age: `Mã ĐH ${index}`,
    address: `Tên khách hàng ${index}`,
    notwrite: `Địa chỉ ${index}`,
    close: `Chỉ số cũ ${index}`,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Mã KH",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã ĐH",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Địa chỉ",
      dataIndex: "notwrite",
      key: "notwrite",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "close",
      key: "close",
    },
  ];

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Modal
      title="Tạo sổ ghi chỉ số"
      open={isOpen}
      onOk={() => setIsOpenModalViewDetail(false)}
      onCancel={() => setIsOpenModalViewDetail(false)}
      width={1000}
      footer={null}
      centered
    >
      <Form.Item label="Chọn tháng">
        <DatePicker
          allowClear
          placeholder="Chọn ngày"
          style={{ width: "100%" }}
          locale={locale}
          format={"DD/MM/YYYY"}
          picker="month"
        />
      </Form.Item>
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        size="small"
        pagination={{
          current: 1,
          // total: 10000,
          // pageSize: 50,
        }}
        scroll={{
          x: 1200,
          y: 240,
        }}
        style={{ marginTop: "10px" }}
        bordered
      />

      <Form {...layout} form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="status"
              label="Cán bộ đọc"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
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
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="status"
              label="Kỳ ghi chỉ số"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
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
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="status"
              label="Ngày đầu kỳ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                allowClear
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="place"
              label="Tên sổ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Nhập tên"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="place"
              label="Ngày hóa đơn"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                allowClear
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="place"
              label="Ngày cuối kỳ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                allowClear
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row
        style={{
          display: "flex",
          marginTop: 16,
          width: "100%",
        }}
      >
        <Col sm={24} md={24} lg={12}>
          <Checkbox style={{ marginRight: "13px" }}>Tạo biểu mẫu</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>Không SD kỳ</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>Ghi chỉ số online</Checkbox>
        </Col>
        <Col
          style={{
            // marginTop: `${isMobile ? "10px" : ""}`,
            textAlign: "end",
          }}
          sm={24}
          md={24}
          lg={12}
        >
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isTabletOrMobile ? "10px" : ""}`,
            }}
            className="create-modal tab-item-readingIndex-1"
          >
            Tạo sổ và đóng
          </Button>
          <Button
            className="custom-btn-close"
            onClick={() => setIsOpenModalViewDetail(false)}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
          >
            <CloseOutlined />
            Đóng
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
