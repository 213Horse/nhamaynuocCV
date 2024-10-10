import { React, useEffect, useState } from "react";
import { Form, Input, Table, Popover, Col, Row, Tooltip } from "antd";
import {
  PlusOutlined,
  RedoOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import TableListLocation from "./TableListLocation.js";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import "moment/locale/vi";
import areaSlice, { fetchApiAllArea, fetchApiGetKhuVucAndVung } from "../../../redux/slices/areaSlice/areaSlice.js";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchApiAllAreaSelector,
  getKhuVucAndVungSelector,
  isLoadingAllAreaSelector,
} from "../../../redux/selector.js";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice.js";

moment.locale("vi");

function ListLocation() {
  const [resultSearch, setResultSearch] = useState("");

  const dispatch = useDispatch();

  const areas = useSelector(fetchApiAllAreaSelector);
  const isLoading = useSelector(isLoadingAllAreaSelector);
  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  const khuVucAndVung = useSelector(getKhuVucAndVungSelector)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [selectedRow, setSelectedRow] = useState(null);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "Mã khu vực",
      dataIndex: "keyId",
      key: "keyId",
      filteredValue: [resultSearch],
      onFilter: (value, record) => {
        return String(record.keyId).toLowerCase().includes(value.toLowerCase());
      },
      render: (text, record) => (
        <>
          <SnippetsOutlined />
          {text}
        </>
      ),
    },
    {
      title: "Tên khu vực",
      dataIndex: "tenKhuVuc",
      key: "tenKhuVuc",
    },
    // {
    //   title: "Vùng",
    //   dataIndex: "vungId",
    //   key: "vungId",
    // },
  ];

  const layout = {
    labelCol: {
      span: 0,
    },
  };
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    dispatch(fetchApiAllArea());
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, []);

  useEffect(() => {
    const queryString = createFilterQueryString()
    dispatch(fetchApiGetKhuVucAndVung(queryString));


  }, [factoryId]);

  console.log("khuvuc", khuVucAndVung);
  // handle row select

  const rowSelected = useSelector(
    (state) => state.areaSlice.rowSelected
  );
  
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(areaSlice.actions.btnClickTabListArea((selectedRows[0])));
    setSelectedRow(selectedRows[0]);
  };

  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(
      areaSlice.actions.btnClickTabListArea(null)
    );
  };

  const parentColumns = [
    {
      title: "",
      key: "tenVung",
      dataIndex: "tenVung",
      render: (text, record) => {
        const vung = khuVucAndVung?.find(
          (vung) => vung.tenVung === text
        );
        return vung ? (
          <div>
            <p>{text}</p>
          </div>
        ) : (
          []
        );
      },
    },
  ];
  const data = khuVucAndVung?.map((item, i) => {
    return {
      key: i + 1,
      id: item.id,
      tenVung: item.tenVung,
    };
  });
console.log("khuvucandvung", khuVucAndVung);

  const blockColumns = () => [
    {
      title: "Mã Khu Vực",
      dataIndex: "keyId",
      key: "keyId",
      align:"center",
      width:"50%"
    },
    {
      title: "Tên Khu Vực",
      dataIndex: "tenKhuVuc",
      key: "tenKhuVuc",
      align:"center",
      width:"50%"
    },
    
  ]

  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableListLocation />
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
                  setResultSearch(value);
                }}
                onChange={(e) => {
                  setResultSearch(e.target.value);
                }}
                placeholder="Nhập mã khu vực"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* <Table
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
          areas?.length <= 0
            ? []
            : areas.map((_area, index) => ({
                index: index + 1,
                keyId: _area.keyId,
                tenKhuVuc: _area.tenKhuVuc,
                vungId: _area.vungId,
              }))
        }
        loading={isLoading}
        onRow={(record, index) => {
          return {
            onClick: () => {
              // clicked row to check radio
              console.log(record);
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
          selectedRowKeys: tabListbc ? [tabListbc.index] : [],
        }}
      /> */}

            <Table
        showHeader={false}
        className="parent-table"
        columns={parentColumns}
        dataSource={data}
        size="small"
        scroll={{
          x: 800,
          scrollToFirstRowOnChange: true,
        }}

        expandable={{
          expandedRowRender: (record) => {
            console.log("record",record)
            const khuVuc = khuVucAndVung.flatMap((item) => item.khuVucInVungModel);
            console.log("record",khuVuc)
            const childData = khuVuc
              ?.filter(
                (blockItem) => blockItem.vungId === record.id
              )
              .map((blockItem, i) => {       
                return {
                  keyId: blockItem?.keyId,
                  tenKhuVuc: blockItem?.tenKhuVuc,            
                };
              });
              console.log(childData)
            return (
              <Table
                size="small"
                className="child-table"
                rowKey="keyId"
                columns={blockColumns(false).map((column) => {
                  if (column?.key === "keyId") {
                    column.onFilter = (value, record) => {
                      return String(record.keyId)
                        .toLowerCase()
                        .includes(value.toLowerCase());
                    };
                  }
                  return {
                  
                    ...column,
                    render: (text) => (
                      <div
                        style={{
                          wordWrap: "break-word",
                          wordBreak: "break-all",
                        }}
                      >
                        {text}
                      </div>
                    ),
                  };
                })}
                dataSource={childData}
                pagination={false}
                onRow={(record, index) => {
                  return {
                    onClick: () => {
                      dispatch(
                        areaSlice.actions.btnClickTabListArea(
                          record
                        )
                      );
                      setSelectedRow(record);
                      console.log("selected:", record);
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
                  selectedRowKeys: rowSelected ? [rowSelected?.keyId] : [],
                }}
                bordered
              />
            );
          },
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
                <TableListLocation isTabletOrMobile={isTabletOrMobile} />
              }
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListLocation />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default ListLocation;
