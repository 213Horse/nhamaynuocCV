import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, message } from "antd";
import { useQuery } from "@apollo/client";
import { GetUserAccount } from "../../../../../graphql/ManagerClaims/getUserAccounts";
import { getRequest } from "../../../../../services";

const App = ({ selectedFunction, claims }) => {
  const { loading, error, data } = useQuery(GetUserAccount);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    if (selectedFunction?.toString().includes(".")) {
      var num1 = selectedFunction?.toString().split(".")[0];
      var num2 = selectedFunction?.toString().split(".")[1];
      getRequest(
        "https://api-awa-v2.amazingtech.vn/api/auth/get-users-by-claim?claimType=api&claimValue=" +
        claims[num1 - 1]?.claims[num2 - 1].value
      )
        .then((res) => {
          console.log(res);
          var result = res.data.data;
          var initialDataTemp = data?.GetUsers.nodes?.map((item, index) => {
            return {
              key: index + 1,
              stt: index + 1,
              id: item.id,
              name: item.normalizedUserName,
              email: item.email,
              action:
                result?.findIndex((item2) => item2.userId === item.id) !== -1
                  ? true
                  : false,
            };
          });
          console.log(initialDataTemp);
          setInitialData(initialDataTemp);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedFunction]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
          placeholder={`Search ${dataIndex}`}
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
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      width: "45%",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) =>
        text ? (
          <Button
            danger
            style={{
              height: "20px",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "0px 10px",
            }}
            onClick={() => {
              hadleDelete(
                record.id,
                "api",
                claims[parseInt(selectedFunction?.toString().split(".")[0]) - 1]
                  ?.claims[
                  parseInt(selectedFunction?.toString().split(".")[1]) - 1
                ].value
              );
            }}
          >
            Xoá
          </Button>
        ) : (
          <Button
            style={{
              height: "20px",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "0px 10px",
            }}
            type="primary"
            onClick={() =>
              handleAdd(
                record.id,
                "api",
                claims[parseInt(selectedFunction?.toString().split(".")[0]) - 1]
                  ?.claims[
                  parseInt(selectedFunction?.toString().split(".")[1]) - 1
                ].value
              )
            }
          >
            Thêm
          </Button>
        ),
      sorter: (a, b) => (a.action === b.action ? 0 : a.action ? -1 : 1),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "ascend",
      width: "13%",
      showSorterTooltip: false,
    },
  ];

  function hadleDelete(userId, claimType, claimValue) {
    fetch("https://api-awa-v2.amazingtech.vn/api/auth/user/remove-claim", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        claim: {
          claimType: claimType,
          claimValue: claimValue,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          initialData.map((item) => {
            if (item.id === userId) {
              item.action = false;
            }
          });
          setInitialData([...initialData]);
        } else {
          message.error("Xóa thất bại");
        }
      })
      .catch((err) => console.log(err));
  }

  async function handleAdd(userId, claimType, claimValue) {
    try {
      const response = await fetch(
        `https://api-awa-v2.amazingtech.vn/api/auth/user/add-claim`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserId: userId,
            claims: [
              {
                claimType: claimType,
                claimValue: claimValue,
              },
            ],
          }),
        }
      )
        .then((res) => {
          if (res.ok) {
            initialData.map((item) => {
              if (item.id === userId) {
                item.action = true;
              }
            });
            setInitialData([...initialData]);
          } else {
            message.error("Add thất bại");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <h4 className="actions-title">Danh sách người dùng</h4>
      {selectedFunction?.toString().includes(".") ? (
        <Table
          bordered
          columns={columns}
          dataSource={initialData}
          scroll={{ x: 650, y: 615.5 }}
          style={{
            whiteSpace: "nowrap",
          }}
          pagination={false}
          indentSize={20}
          size="small"
        />
      ) : (
        <p style={{ textAlign: "center" }}>Vui lòng chọn chức năng...</p>
      )}
    </>
  );
};
export default App;
