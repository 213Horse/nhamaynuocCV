import { React, useEffect, useState } from "react";
import TableListLocation from "./TableListSeri.js";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Form, Input, Table, Popover, Col, Row, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTableSeriSelector,
  btnClickTableWatchSelector,
  fetchApiWathList,
  getAllSeriInvoiceSelector,
} from "../../../redux/selector.js";
import watchSlice, {
  fetchWatchData,
} from "../../../redux/slices/watchSlice/watchSlice.js";

import seriInvoiceSlice, {
  getAllSeriInvoice,
} from "../../../redux/slices/seriInvoiceSlice/seriInvoiceSlice.js";
import seriSlice from "../../../redux/slices/seriInvoiceSlice/seriInvoiceSlice.js";
moment.locale("vi");

function SeriInvoice() {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  // const { token } = theme.useToken();
  const rowSelected = useSelector(btnClickTableSeriSelector);
  const listSeriData = useSelector(getAllSeriInvoiceSelector);
  const [searchQuery, setSearchQuery] = useState("");
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
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
    },
    {
      title: "Số hóa đơn",
      dataIndex: "soHD",
      key: "soHD",
      filteredValue: [searchQuery],
      onFilter: (value, record) => {
        return String(record.soHD).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Số lượng hóa đơn",
      dataIndex: "soLuongHoaDon",
      key: "soLuongHoaDon",
      filteredValue: [searchQuery],
      onFilter: (value, record) => {
        return String(record.soLuongHoaDon)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    // {
    //   title: "Tên kiểu đồng hồ",
    //   dataIndex: "tenDH",
    //   key: "tenDH",
    // },
  ];
  console.log("listSeriData: ", listSeriData);
  const data = listSeriData?.map((item, index) => ({
    keyId: item.keyId,
    key: item.id,
    stt: index + 1,
    soHD: item.soHoaDon,
    soLuongHoaDon: item.soLuongHoaDon,
  }));

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(getAllSeriInvoice(queryString));
  }, [nhaMayId]);

  const handleUncheckRadio = () => {
    dispatch(seriSlice.actions.btnClickTableSeri(null));
  };
  const layout = {
    labelCol: {
      span: 0,
    },
  };

  return (
    <>
      {/* ------ AdvancedSearchForm ------- */}
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
              <Input
                allowClear
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Nhập mã kiểu đồng hồ"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* -------------------------- */}
      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="key"
        scroll={{ x: 1000, y: 480 }}
        columns={columns?.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={data}
        // onChange={handleData1Change}

        onRow={(record, rowIndex) => ({
          onClick: () => {
            dispatch(seriSlice.actions.btnClickTableSeri(record));
          },
        })}
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
          selectedRowKeys: rowSelected ? [rowSelected.key] : [],
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
export default SeriInvoice;
