import { useQuery } from "@apollo/client";
import { GetUserAccount } from "../../../../graphql/ManagerClaims/getUserAccounts";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";

function TableUser({ setSelectedUser }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [tabUser, setTabUser] = useState(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm theo ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Tìm
          </Button>
          <Button
            type="primary"
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Làm mới
          </Button>
          <Button
            style={{ backgroundColor: "#0ce3bc", color: "white" }}
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            size="small"
            style={{ backgroundColor: "#e9491f", color: "white" }}
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
  ];

  const { loading, error, data } = useQuery(GetUserAccount);


  console.log("data", data);
  const initialData = data?.GetUsers.nodes?.map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      id: item.id,
      // name: item.userName,
      name: item.normalizedUserName,
      email: item.email,
    };
  });

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
      setSelectedUser(selectedRows[0].id);
      setTabUser(selectedRowKeys[0]);
    },
    selectedRowKeys: tabUser ? [tabUser] : [],
  };
  return (
    <div>
      <div style={{ margin: "10px 0px" }}>
        <h4>Danh sách nhân viên</h4>
      </div>
      <Table
        scroll={{ x: 500, y: 635 }}
        bordered
        size="small"
        pagination={false}
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={initialData}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log("recrod", record);
              setSelectedUser(record.id);
              setTabUser(record.key);
            }, // click row
          };
        }}
      />
    </div>
  );
}
export default TableUser;
