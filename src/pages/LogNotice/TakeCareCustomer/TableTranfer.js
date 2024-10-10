import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Tag } from "antd";
import React, { useState } from "react";

const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 4 === 0,
  name: `name ${i + 1}`,
}));

const leftTableColumns = [
  {
    dataIndex: "title",
    title: "Tên KH",
  },
  {
    dataIndex: "tag",
    title: "Email",
    render: (tag) => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: "description",
    title: "Địa chỉ",
  },
];

const rightTableColumns = [
  {
    dataIndex: "title",
    title: "Tên KH",
  },
  {
    dataIndex: "tag",
    title: "Email",
    render: (tag) => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: "description",
    title: "Địa chỉ",
  },
];

export const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [leftDataSource, setLeftDataSource] = useState(mockData);
  const [rightDataSource, setRightDataSource] = useState([]);

  const handleSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const moveToRight = () => {
    const newLeftDataSource = leftDataSource.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    const newRightDataSource = [
      ...rightDataSource,
      ...leftDataSource.filter((item) => selectedRowKeys.includes(item.key)),
    ];
    setLeftDataSource(newLeftDataSource);
    setRightDataSource(newRightDataSource);
    setSelectedRowKeys([]);
  };

  const moveToLeft = () => {
    const newRightDataSource = rightDataSource.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    const newLeftDataSource = [
      ...leftDataSource,
      ...rightDataSource.filter((item) => selectedRowKeys.includes(item.key)),
    ];
    setRightDataSource(newRightDataSource);
    setLeftDataSource(newLeftDataSource);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };
  return (
    <Row>
      <Col>
        <Table
          rowSelection={rowSelection}
          columns={leftTableColumns}
          dataSource={leftDataSource}
          pagination={false}
          scroll={{ x: 1000, y: 140 }}
          bordered
        />
      </Col>
      <Col style={{ padding: "10px 0" }}>
        <Button
          className="custom-btn-update-d"
          onClick={moveToRight}
          icon={<StepForwardOutlined />}
        >
          Chuyển qua xuống
        </Button>
        <Button
          className="custom-btn-close-d"
          onClick={moveToLeft}
          style={{
            marginLeft: "10px",
          }}
          icon={<StepBackwardOutlined />}
        >
          Chuyển qua lên ......
        </Button>
      </Col>
      <Col>
        <Table
          rowSelection={rowSelection}
          columns={rightTableColumns}
          dataSource={rightDataSource}
          pagination={false}
          scroll={{ x: 1000, y: 140 }}
          bordered
        />
      </Col>
    </Row>
  );
};
