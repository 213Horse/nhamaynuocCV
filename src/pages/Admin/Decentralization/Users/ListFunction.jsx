import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";

const ListFunction = ({
  selectedUser, // id of user
  claims,
  selectedRows,
  setSelectedRows,
}) => {
  const columns = [
    {
      title: "Danh sách chức năng",
      dataIndex: "name",
      key: "name",
    },
  ];

  const mainData = claims.map((item, i) => {
    return {
      key: `${i + 1}`,
      name: `${item.group.toUpperCase()}`,
      children: item.claims.map((item2, j) => {
        return {
          key: `${i + 1}.${j + 1}`,
          name: item2.properties.DisplayName,
        };
      }),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log("record", record);
      console.log("selected", selected);
      console.log("selectedRows", selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  async function handleSubmit() {
    var ListFunction = [];
    selectedRows.map((item, i) => {
      if (item.includes(".")) {
        ListFunction.push({
          claimType: "api",
          claimValue:
            claims[parseInt(item.split(".")[0]) - 1].claims[
              parseInt(item.split(".")[1]) - 1
            ].value,
        });
      }
    });
    console.log("ListFunction", ListFunction);
    try {
      const response = await fetch(
        `https://api-awa-v2.amazingtech.vn/api/auth/user/update-claim`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserId: selectedUser,
            claims: ListFunction,
          }),
        }
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("response", response);
      message.success("Cập nhật thành công");
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      message.error("Có lỗi xảy ra khi cập nhật");
    }
  }

  return (
    <>
      <div style={{ margin: "10px 0px" }}>
        <h4>Danh sách chức năng</h4>
      </div>
      {selectedUser ? (
        <>
          <Table
            bordered
            size="small"
            columns={columns}
            rowSelection={{
              ...rowSelection,
              checkStrictly: false,
              selectedRowKeys: selectedRows,
              onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
            }}
            dataSource={mainData}
            pagination={false}
            scroll={{ x: 350, y: 635 }}
            rowKey={(record) => record.key}
            expandable={{
              defaultExpandAllRows: true,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0",
            }}
          >
            <Button type="primary" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Vui lòng chọn người dùng bên trái
        </div>
      )}
    </>
  );
};

export default ListFunction;
