import React, { useEffect, useState } from "react";
import "../../../components/GlobalStyles/GlobalStyles.css";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchApiGetAllDMTotalByTypeSelector,
  fetchApiGetAllObjectSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Table, Tooltip, Popover } from "antd";
import { RedoOutlined, PlusOutlined } from "@ant-design/icons";
import TableListObject from "./TableListObject";
import { Form, Row, Col, Input } from "antd";
import { getAllDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
function ListObject() {
  const listData = useSelector(fetchApiGetAllObjectSelector);
  console.log(listData);
  const tabListObject = useSelector(btnClickTabListInvoicePrintSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
    },
    {
      title: "Mã/Ký hiệu",
      dataIndex: "kyHieu",
      key: "kyHieu",
      filteredValue: [textInput],
      onFilter: (value, record) => {
        return String(record.kyHieu)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Đối tượng",
      dataIndex: "doituong",
      key: "doituong",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
    },
  ];
  // const initialData = Array.from({ length: 100 }, (_, i) => ({
  //   key: i + 1,
  //   stt: i + 1,
  //   ma: `Mã ${i + 1}`,
  //   doituong : `Đối tượng ${i + 1}`,
  //   mota: `Mô tả ${i + 1}`,
  // }))

  const initialData = listData?.map((item, i) => ({
    key: item.id,
    stt: i + 1,
    ma: item.keyId,
    doituong: item.value,
    mota: item.description,
    kyHieu: item.kyHieu,
  }));
  const layout = {
    labelCol: {
      span: 0,
    },
  };
  useEffect(() => {
    const queryString = createFilterQueryString();
    const filterData = {
      type: 1,
      queryString: queryString,
    };
    dispatch(getAllDMTotalByType(filterData));
  }, [nhaMayId]);

  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableListObject />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item">
              <Input.Search
                placeholder="Nhập và Enter để tìm kiếm"
                style={{
                  marginRight: "5px",
                  width: "100%",
                }}
                onChange={(e) => setTextInput(e.target.value)}
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
          selectedRowKeys: tabListObject ? [tabListObject.stt] : [],
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
              content={<TableListObject isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListObject />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ListObject;
