import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  Modal,
  Tag,
  theme,
} from "antd";
import React, { useState } from "react";
import { SearchForm } from "./SearchForm";
import { TableTransfer } from "./TableTranfer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useMediaQuery } from "react-responsive";
const mockTags = ["cat", "dog", "bird"];

const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 4 === 0,
  tag: mockTags[i % 3],
}));

const originTargetKeys = mockData
  .filter((item) => Number(item.key) % 3 > 1)
  .map((item) => item.key);

const TakeCareCustomer = (props) => {
  const { token } = theme.useToken();
  const { isOpen, setIsOpen } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const triggerDisable = (checked) => {
    setDisabled(checked);
  };
  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };

  const items = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: <SearchForm />,
    },
  ];
  const dataSource = Array.from({ length: 50 }, (_, key) => ({
    key: key + 1,
    stt: key + 1,
    type: "abc",
    address: "abc",
    info: "abc",
    content: "abc",
    timeSent: "abc",
    result: "abc",
    number: "abc",
    netHouse: "abc",
  }));
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên KH",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Số tin",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Mã ĐT giá",
      dataIndex: "codeprice",
      key: "codeprice",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Phí BVMT",
      dataIndex: "bvmt",
      key: "bvmt",
    },
    {
      title: "Phí thải",
      dataIndex: "phithai",
      key: "phithai",
    },
    {
      title: "Phí BV Rừng",
      dataIndex: "Phibvrung",
      key: "Phibvrung",
    },
    {
      title: "Phí VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Ngày gửi",
      dataIndex: "datesend",
      key: "datesend",
    },
  ];

  const itemTranfer = [
    {
      key: "1",
      label: "Chọn khách hàng để gửi tin",
      children: <TableTransfer />,
    },
  ];

  return (
    <Modal
      title="Gửi thông báo chăm sóc khách hàng"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={1400}
      footer={null}
      centered
    >
      <Collapse items={items} size="small" />
      <Collapse items={itemTranfer} size="small" style={{ marginTop: 10 }} />
      <Form.Item label="Tiêu đề" style={{ marginTop: 10 }}>
        <Input
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginLeft: '5px' }}
        />
      </Form.Item>
      <div style={{ marginTop: 10 }}>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
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
          <Checkbox style={{ marginRight: "13px" }}>Email</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>
            Ứng dụng Nước Sạch
          </Checkbox>
          <Button
            type="primary"
            icon={<SendOutlined style={{ transform: "rotate(310deg)" }} />}
            style={{ marginRight: 5, marginTop: `${isMobile ? "10px" : 0}` }}
            size="middle"
          >
            Gửi tin nhắn
          </Button>
          <Button
            className="custom-btn-close"
            onClick={() => setIsOpen(false)}
            size="middle"
            style={{ marginTop: `${isMobile ? "10px" : 0}` }}
          >
            <CloseOutlined />
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TakeCareCustomer;
