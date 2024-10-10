import React, { useEffect, useState } from "react";
import "../../../components/GlobalStyles/GlobalStyles.css";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchApiGetAllDMTotalByTypeSelector,
  fetchApiGetAllProducingCountrySelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Table, Tooltip, Popover } from "antd";
import { RedoOutlined, PlusOutlined } from "@ant-design/icons";
import TableListProducingCountry from "./TableListProducingCountry";
import { Form, Row, Col, Input } from "antd";
import { getAllDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
function ListProducingCountry() {
  const tabListObject = useSelector(btnClickTabListInvoicePrintSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
  const listData = useSelector(fetchApiGetAllProducingCountrySelector);
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
        selectedRows[0]
      )
    );
  };

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    if (nhaMayId) {
      console.log("Data nha may:", nhaMayId);
      const queryString = createFilterQueryString();
      const filterData = {
        type: 5,
        queryString: queryString,
      };
      dispatch(getAllDMTotalByType(filterData));
    }
  }, [nhaMayId]);

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
      title: "Nước sản xuất",
      dataIndex: "nuocSX",
      key: "nuocSX",
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
  //   nuocSX : `nước sản xuất ${i + 1}`,
  //   mota: `Mô tả ${i + 1}`,
  // }))

  const initialData = listData?.map((item, i) => ({
    key: item.id,
    stt: i + 1,
    ma: item.keyId,
    nuocSX: item.value,
    mota: item.description,
    kyHieu: item.kyHieu,
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
                <TableListProducingCountry />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item lassName="custom-form-item">
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
              content={
                <TableListProducingCountry
                  isTabletOrMobile={isTabletOrMobile}
                />
              }
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListProducingCountry />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ListProducingCountry;
