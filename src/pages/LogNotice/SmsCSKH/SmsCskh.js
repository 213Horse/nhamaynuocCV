import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Modal, theme } from "antd";
import React, { useState } from "react";
import { SearchForm } from "./SearchForm";
import { TableTransfer } from "./TableTranfer";
import TextArea from "antd/es/input/TextArea";

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

const SmsCskh = (props) => {
  const { token } = theme.useToken();
  const { isOpen, setIsOpen } = props;

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

  return (
    <Modal
      title="Gửi SMS chăm sóc khách hàng"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={1400}
      footer={null}
      centered
    >
      <Collapse items={items} size="small" />
      <div
        style={{
          textAlign: "center",
          borderRadius: token.borderRadiusLG,
          marginTop: 10,
        }}
      >
        <TableTransfer />
      </div>
      <Form.Item
        label="Tiêu đề"
        style={{ marginTop: 10 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <TextArea
        placeholder="Nhập nội dung gửi"
        showCount
        maxLength={320}
        onChange={onChange}
      />

      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ marginLeft: "auto", marginTop: '20px' }}>
          <Button
            type="primary"
            icon={<SendOutlined style={{ transform: "rotate(310deg)" }} />}
            style={{ marginRight: 5 }}
            size="middle"
          >
            Gửi tin nhắn
          </Button>
          <Button
            className="custom-btn-close"
            onClick={() => setIsOpen(false)}
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

export default SmsCskh;
