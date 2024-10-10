import React, { useEffect, useMemo, useState } from "react";
import { Col, Form, Input, Popover, Row, Table, Tooltip } from "antd";
import { useMediaQuery } from "react-responsive";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./member.css";

import TableListMember from "./TableListMember";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  getMemberSelector,
  nhaMayChangeSelector,
  refreshTableSelector,
} from "../../../../redux/selector";
import {
  fetchGetMember,
  setUser,
} from "../../../../redux/slices/thanhVienSlice/thanhVienSlice";
import {
  setOpen,
  setRefreshTable,
} from "../../../../redux/slices/currentPageSlice/currentPageSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: "5%",
  },
  {
    title: "Tên thành viên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ID đăng nhập",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Nhóm quyền",
    dataIndex: "roleName",
    key: "roleName",
    width: 590,
    // render: (item) => item === 'owner' ? 'Chủ sở hữu' : item === 'member' ? 'Thành viên' : 'Quản lý'
  },
];

const Member = () => {
  const dispatch = useDispatch();
  const tabListMB = useSelector(btnClickTabListInvoicePrintSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const members = useSelector(getMemberSelector);
  const refreshTable = useSelector(refreshTableSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const nhayChangeClick = useSelector(nhaMayChangeSelector);
  const createFilterQueryString2 = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    const nhaMayIds = createFilterQueryString2();
    dispatch(fetchGetMember(nhaMayIds))
      .unwrap()
      .then(() => {
        dispatch(setRefreshTable(false));
      });
  }, [nhayChangeClick, refreshTable, dispatch, nhaMayId]);

  const [searchQuery, setSearchQuery] = useState("");

  const initialData = useMemo(() => {
    return members.map((item, i) => ({
      stt: i + 1,
      ...item,
    }));
  }, [members]);

  const filterTable = useMemo(() => {
    return initialData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [initialData, searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    // setCurrentUserChoose(selectedRows[0].userId)
    // dispatch(setUser(null));
    dispatch(setUser(selectedRows[0].userId));
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

  const layout = {
    labelCol: {
      span: 0,
    },
  };

  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableListMember isTabletOrMobile={isTabletOrMobile} />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item">
              <Input
                placeholder="Lọc người dùng theo tên, ID hoặc Email"
                style={{
                  marginRight: "5px",
                  width: "100%",
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        // pagination={false}
        size="small"
        scroll={{ x: 1300, y: 480 }}
        bordered
        rowKey="stt"
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={filterTable === null ? initialData : filterTable}
        onRow={(record, index) => {
          return {
            onClick: () => {
              // clicked row to check radio
              // setCurrentUserChoose(record.userId);
              dispatch(setUser(null));
              dispatch(setUser(record.userId));
              dispatch(
                tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                  record
                )
              );
            },
          };
        }}
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
          onChange: (selectedRowKeys, selectedRows) => {
            handleRowSelection(selectedRowKeys, selectedRows);
          },
          selectedRowKeys: tabListMB ? [tabListMB.stt] : [],
        }}
      />
      {isTabletOrMobile && (
        <div className="contract-bottom">
          {/* check mobile */}
          {isTabletOrMobile ? (
            <Popover
              size="small"
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
              content={<TableListMember isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListMember isTabletOrMobile={isTabletOrMobile} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Member;
