import React, { useEffect, useState } from "react";
import "../../../../components/GlobalStyles/GlobalStyles.css";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import {
  btnClickTabListInvoicePrintSelector,
  fetchPhongBanSelector,
  refreshTableSelector,
} from "../../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Table, Tooltip, Popover } from "antd";
import { RedoOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Row, Col, Input } from "antd";
import TableDepartment from "./TableDepartment";
import { useQuery } from "@apollo/client";
import { GetPhongBans } from "../../../../graphql/phongBan_donVis/phongBan_donVis";
import { fetchPhongBan } from "../../../../redux/slices/phongBanSlice/phongBanSlice";
import { setRefreshTable } from "../../../../redux/slices/currentPageSlice/currentPageSlice";
function Department() {
  const tabDepartment = useSelector(btnClickTabListInvoicePrintSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();

  const refresh = useSelector(refreshTableSelector);
  const [searchQuery, setSearchQuery] = useState("");
  const phongBan = useSelector(fetchPhongBanSelector);
  useEffect(() => {
    dispatch(fetchPhongBan())
      .unwrap()
      .then(() => {
        dispatch(setRefreshTable(false));
      });
  }, [refresh]);

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
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

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
    },
    {
      title: "Tên nhóm PB/ĐV",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchQuery],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];
  const initialData = phongBan.map((node, i) => ({
    stt: i,
    key: node.id,
    name: node.name,
    description: node.description,
  }));

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
                <TableDepartment />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item">
              <Input
                placeholder="Nhập Nhóm/Phòng ban"
                style={{
                  marginRight: "5px",
                  width: "100%",
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        size="small"
        scroll={{ x: 1000, y: 480 }}
        bordered
        rowKey="stt"
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={initialData}
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
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: tabDepartment ? [tabDepartment.stt] : [],
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
              content={<TableDepartment isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableDepartment />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Department;
