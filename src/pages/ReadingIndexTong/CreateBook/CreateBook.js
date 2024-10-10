import {
  FilePdfOutlined,
  PlusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useState } from "react";
import { SearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const CreateBook = (props) => {
  const { isOpen, listKGCS } = props;
  const [form] = Form.useForm();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  console.log(isOpen);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const optionsKGCS = listKGCS?.map((item) => ({
    label: item.moTa,
    value: item.id,
  }));

  const dataSource = Array.from({ length: 500 }, (_, index) => ({
    key: index,
    name: `Số HĐ ${index}`,
    age: `Mã ĐH ${index}`,
    address: `Tên khách hàng ${index}`,
    notwrite: `Địa chỉ ${index}`,
    close: `Chỉ số cũ ${index}`,
  }));

  const columns = [
    {
      title: "Số HĐ",
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
      span: 6,
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
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={1700}
      footer={null}
      centered
    >
      <Collapse
        items={[
          {
            key: "1",
            label: "Tìm kiếm",
            children: <SearchForm optionsKGCS={optionsKGCS} />,
          },
        ]}
        size="small"
      />
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        size="small"
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
              locale={locale}
                allowClear
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
            onClick={props.handleCancel}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            icon={<FilePdfOutlined />}
            className="custom-btn-export"
          >
            Xuất bảng kê
          </Button>
          {/* <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            className="create-modal tab-item-readingIndex-1"
          >
            Tạo sổ và tạo tiếp
          </Button> */}
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
            onClick={props.handleCancel}
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
