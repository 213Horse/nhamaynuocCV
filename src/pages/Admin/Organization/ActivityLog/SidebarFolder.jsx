import React, { useContext, useState } from "react";
import { DatePicker, Select, Tree, Input, Row, Col, Form, Button } from "antd";
import { FolderOpenOutlined, SearchOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { SearchContext } from "./ActivityLog";
const fakeData = [
  {
    tenThuMuc: "Dich vụ",
  },
  {
    tenThuMuc: "Chủ đề dữ liệu",
  },
  {
    tenThuMuc: "Lớp dữ liệu",
  },
  {
    tenThuMuc: "Bản đồ",
  },
  {
    tenThuMuc: "Dữ liệu",
  },
  {
    tenThuMuc: "Trường dữ liệu",
  },
  {
    tenThuMuc: "Khác",
  },
];

const convertDataToTree = (data) => {
  const newData = data.map((item, index) => ({
    title: item?.tenThuMuc,
    icon: <FolderOpenOutlined />,
  }));

  return newData;
};

const SidebarFolder = ({ showTitle = true }) => {
  const treeData = convertDataToTree(fakeData);
  const { searchParams, setSearchParams } = useContext(SearchContext);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [account, setAccount] = useState("");
  const handleSearch = () => {
    setSearchParams({ fromDate, toDate, account });
  };
  return (
    <div className="folder-wrapper">
      <Col span={24}>
        <Form.Item name="tuNgay" label="Từ Ngày">
          <DatePicker
            allowClear
            placeholder="Chọn ngày"
            style={{ width: "98%", marginLeft: "7px" }}
            locale={locale}
            format={"DD/MM/YYYY"}
            onChange={setFromDate}
          />
        </Form.Item>
        <Form.Item name="denNgay" label="Đến Ngày">
          <DatePicker
            allowClear
            placeholder="Chọn ngày"
            style={{ width: "100%" }}
            locale={locale}
            format={"DD/MM/YYYY"}
            onChange={setToDate}
          />
        </Form.Item>
        <Form.Item name="Thao tác" label="Thao tác">
          <Select
            defaultValue="Tất cả"
            style={{ width: "99%", marginLeft: "5px" }}
          >
            {/* Thêm các option khác nếu cần */}
            <Select.Option value="Tất cả">Tất cả</Select.Option>
          </Select>
        </Form.Item>
        <Row gutter={24}>
          <Col>
            <Form.Item name="taiKhoan" label="Tài khoản">
              <Input
                placeholder="Nhập tài khoản"
                style={{ width: "100%" }}
                onChange={(e) => setAccount(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              icon={<SearchOutlined />}
              className="tab-item-readingIndex-2 "
              style={{ marginRight: 5 }}
              onClick={handleSearch}
            >
              Tra cứu
            </Button>
          </Col>
        </Row>
      </Col>
      <Tree
        defaultExpandAll
        blockNode
        showLine
        showIcon
        treeData={treeData}
        className="folder-sidebar"
      />
    </div>
  );
};

export default SidebarFolder;
