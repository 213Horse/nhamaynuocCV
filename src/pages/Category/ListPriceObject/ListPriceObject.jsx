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
import TableListPO from "./TableListPO.js";
import { fetchApiAllPriceListObject } from "../../../redux/slices/priceListObjectSlice/priceListObjectSlice";
import {
  btnClickTabListInvoicePrintSelector,
  isLoadingAllPriceListObjectSelector,
  fetchApiAllPriceListObjectSelector,
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";

moment.locale("vi");

function ListPriceObject() {
  const [resultSearchLPO, setResultSearchLPO] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
  const tabListPO = useSelector(btnClickTabListInvoicePrintSelector);
  const priceListObject = useSelector(fetchApiAllPriceListObjectSelector);
  const isLoading = useSelector(isLoadingAllPriceListObjectSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  // console.log(priceListObject);
  console.log("record", tabListPO);


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
    dispatch(fetchApiAllPriceListObject(queryString));
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
      title: "Ký hiệu",
      key: "kyHieu",
      dataIndex: "kyHieu",
      filteredValue: [resultSearchLPO],
      onFilter: (value, record) => {
        return String(record.kyHieu).toLowerCase().includes(value.toLowerCase());
      },
      render: (text, record) => (
        <>
          <SnippetsOutlined />
          {text}
        </>
      ),
      // width: 140,
    },
    {
      key: "moTa",
      title: "Mô tả",
      dataIndex: "moTa",
      // width: 140,
    },
    {
      key: "donViTinh",
      title: "Đơn vị tính",
      dataIndex: "donViTinh",
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
                <TableListPO />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item" name="9">
              <Input.Search
                style={{
                  width: "100%",
                }}
                onSearch={(value) => {
                  setResultSearchLPO(value);
                }}
                onChange={(e) => {
                  setResultSearchLPO(e.target.value);
                }}
                placeholder="Nhập ký hiệu"
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
        dataSource={priceListObject.map((_priceListObject, index) => ({
          index: index + 1,
          id: _priceListObject.id,
          keyId: _priceListObject.keyId,
          kyHieu: _priceListObject.kyHieu,
          moTa: _priceListObject.moTa,
          donViTinh: _priceListObject.donViTinh,
        }))}
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
          selectedRowKeys: tabListPO ? [tabListPO.index] : [],
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
              content={<TableListPO isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListPO />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default ListPriceObject;
