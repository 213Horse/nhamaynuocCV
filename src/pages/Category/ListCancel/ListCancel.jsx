import { React, useEffect, useState } from "react";

import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Form, Input, Table, Popover, Col, Row, Tooltip } from "antd";
import {
  PlusOutlined,
  RedoOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "moment/locale/vi";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import TableListCancel from "./TableListCancel.js";
import { fetchApiAllCancel } from "../../../redux/slices/listCancelSlice/listCancelSlice";
import {
  btnClickTabListInvoicePrintSelector,
  isLoadingAllListCancelSelector,
  fetchApiAllListCancelSelector,
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";

moment.locale("vi");

function ListCancel() {
  const [resultSearchCancel, setResultSearchCancel] = useState("");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const dispatch = useDispatch();

  const tabListCancel = useSelector(btnClickTabListInvoicePrintSelector);
  const listCancel = useSelector(fetchApiAllListCancelSelector);
  const isLoading = useSelector(isLoadingAllListCancelSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const createFilterQueryString = () => {
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
    const queryString = createFilterQueryString();
    dispatch(fetchApiAllCancel(queryString));

    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, [nhaMayId]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "Mã/Ký hiệu",
      key: "kyHieu",
      dataIndex: "kyHieu",
      // width: 140,
    },
    {
      title: "Tên lý do hủy",
      key: "lyDo",
      dataIndex: "lyDo",
      // width: 140,
    },
  ];

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
  const layout = {
    labelCol: {
      span: 9,
    },
  };
  // const AdvancedSearchForm = () => {
  //   return (

  //   );
  // };

  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableListCancel />
              </Form.Item>
            </Col>
          )}

          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item
              className="custom-form-item"
              label={isTabletOrMobile ? false : "Tìm kiếm"}
              name="9"
            >
              <Input.Search
                style={{
                  width: "100%",
                  color: "#111111",
                }}
                onSearch={(value) => {
                  console.log("---->", value);
                  setResultSearchCancel(value);
                }}
                onChange={(e) => {
                  console.log("e", e.target.value);
                  setResultSearchCancel(e.target.value);
                }}
                placeholder="Tìm kiếm theo mã lý do hủy"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1000, y: 480 }}
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={
          listCancel?.map((_listCancel, index) => ({
            index: index + 1,
            keyId: _listCancel.keyId,
            lyDo: _listCancel.value,
            id: _listCancel.id,
            kyHieu: _listCancel.kyHieu,
          })) || []
        }
        loading={isLoading}
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
          selectedRowKeys: tabListCancel ? [tabListCancel.index] : [],
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
              content={<TableListCancel isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListCancel />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default ListCancel;
