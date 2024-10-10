import React from "react";
import { Dropdown, Form, Menu, theme } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CalculatorOutlined,
  SyncOutlined,
  RetweetOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
const UtilityButton = ({ hideModal }) => {
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<DownloadOutlined />}>
        Xuất excel
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        Cập nhật sản lượng tạm tính
      </Menu.Item>
      <Menu.Item key="3" icon={<DeleteOutlined />}>
        Cập nhật hủy hóa đơn
      </Menu.Item>
      <Menu.Item key="4" icon={<PlusCircleOutlined />}>
        Nhập truy thu
      </Menu.Item>
      <Menu.Item key="5" icon={<CalculatorOutlined />}>
        Nhập chỉ số
      </Menu.Item>
      <Menu.Item key="6" icon={<SyncOutlined />}>
        Nhập tiêu thụ
      </Menu.Item>
      <Menu.Item key="7" icon={<RetweetOutlined />}>
        Thay đồng hồ
      </Menu.Item>
      <Menu.Item key="8" icon={<CheckCircleOutlined />}>
        Quay đồng hồ
      </Menu.Item>
      <Menu.Item key="9" icon={<CalendarOutlined />}>
        Gán chỉ số cuối
      </Menu.Item>
      <Menu.Item key="10" icon={<CalendarOutlined />}>
        Gán ngày cuối
      </Menu.Item>
    </Menu>
  );

  return (
    <>
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
        <Dropdown overlay={menu}></Dropdown>
      </Form>
    </>
  );
};

export default UtilityButton;
