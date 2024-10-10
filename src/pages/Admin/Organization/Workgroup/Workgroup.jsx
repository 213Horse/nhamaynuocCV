import React, { useState } from "react";
import "../../../../components/GlobalStyles/GlobalStyles.css";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Table, Tooltip, Popover } from "antd";
import { RedoOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Row, Col, Input } from "antd";
import TableWorkgroup from "./TableWorkgroup";
function Workgroup() {
  const tabWorkgroup = useSelector(btnClickTabListInvoicePrintSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
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
  const [textInput, setTextInput] = useState("");
  const columns = [
    {
      title: "Tên nhóm công việc/dự án",
      dataIndex: "nameWorkgroup",
      key: "nameWorkgroup",
      filteredValue: [textInput],
      onFilter: (value, record) => {
        return String(record.nameWorkgroup)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];
  const initialData = Array.from({ length: 100 }, (_, i) => ({
    key: i + 1,
    nameWorkgroup: `Tên nhóm công việc ${i + 1}`,
    status: `Mở`,
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
                <TableWorkgroup />
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
                onChange={(e) => setTextInput(e.target.value.trim())}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        style={{
          marginBottom: "5rem",
        }}
        size="small"
        scroll={{ x: 1000, y: 480 }}
        bordered
        rowKey="nameWorkgroup"
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
          selectedRowKeys: tabWorkgroup ? [tabWorkgroup.nameWorkgroup] : [],
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
              content={<TableWorkgroup isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableWorkgroup />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Workgroup;
