import { Button, Modal, Row, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchApiPermisson,
} from "../../../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import tabListInvoicePrintSlice from "../../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import {
  PlusCircleOutlined,
  RedoOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import TabPermission from "./TabPermission";
import { fetchUserRole, fetchUserRole2 } from "../../../../../redux/slices/permissionSlice/permissionSlice";

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
  },
];

const ListPermission = () => {
  const dispatch = useDispatch();
  const listPermission = useSelector(fetchApiPermisson);
  const rowSelection = useSelector(btnClickTabListInvoicePrintSelector);
  const nhaMayIds = useSelector(btnClickGetFactoryIdSelector);
  const data = listPermission?.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));
   const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayIds === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayIds}`;
    }
    return `${factoryQueryString}`;
  };
  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
        selectedRows[0]
      )
    );
  };

  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  useEffect(() => {
    if (rowSelection) {
      const nhaMayIds= createFilterQueryString()
      const roleId =  rowSelection?.id
      const values = {nhaMayIds, roleId}
      dispatch(fetchUserRole2(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 4 }}>
        <h4 className="actions-title">Danh sách nhóm quyền</h4>

        <div>
          <TabPermission rowSelection={rowSelection} />
        </div>
      </Row>
      {
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 400, y: 615.5 }}
          style={{
            whiteSpace: "nowrap",
          }}
          bordered
          pagination={false}
          size="small"
          rowKey="id"
          rowSelection={{
            type: "radio",
            columnTitle: () => {
              return (
                <Tooltip title="Bỏ chọn hàng hiện tại.">
                  <RedoOutlined
                    className="icon-reset-rad-btn"
                    onClick={handleUncheckRadio}
                  />
                </Tooltip>
              );
            },
            onChange: handleRowSelection,
            selectedRowKeys: rowSelection ? [rowSelection.id] : [],
          }}
          onRow={(record, index) => {
            return {
              onClick: () => {
                // clicked row to check radio
                dispatch(
                  tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                    record
                  )
                );
              },
            };
          }}
        />
      }
    </>
  );
};

export default ListPermission;
