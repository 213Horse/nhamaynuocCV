import { React, useEffect, useState } from "react";
import TableListLocation from "./TableListSigning.js";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import {
  Form,
  Input,
  Table,
  Popover,
  Col,
  Row,
  DatePicker,
  Tooltip,
} from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import viVN from "antd/es/date-picker/locale/vi_VN";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { getAllKy } from "../../../redux/slices/DMKy/kySlice.js";

// import kỳ lạ của Dương:
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  getAllKySelector,
} from "../../../redux/selector.js";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import dayjs from "dayjs";

moment.locale("vi");
function DMKy() {
  const [textKyHieu, setTextKyHieu] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
  const dataAllKy = useSelector(getAllKySelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const tabListPO = useSelector(btnClickTabListInvoicePrintSelector);

  // console.log("regions", regions);
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
    const queryString = createFilterQueryString();
    dispatch(getAllKy(queryString));
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, [factoryId]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "Ký hiệu",
      dataIndex: "kyHieu",
      key: "kyHieu",
      width: 170,
      filteredValue: [textKyHieu],
      onFilter: (value, record) => {
        return String(record.kyHieu).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Ngày sử dụng từ",
      dataIndex: "ngaySuDungTu",
      key: "ngaySuDungTu",
    },
    {
      title: "Ngày sử dụng đến",
      dataIndex: "ngaySuDungDen",
      key: "ngaySuDungDen",
    },
    {
      title: "Ngày hóa đơn",
      dataIndex: "ngayHoaDon",
      key: "ngayHoaDon",
    },
  ];

  const layout = {
    labelCol: {
      span: 9,
    },
  };
  const filteredData =
    factoryId && factoryId !== "all"
      ? dataAllKy.filter((data) => data.nhaMayId === factoryId)
      : dataAllKy;

  // Map filtered data to dataSource
  const dataSource = filteredData.map((_dataAllKy, index) => ({
    index: index + 1,
    keyId: _dataAllKy.keyId,
    kyHieu: _dataAllKy.kyHieu,
    moTa: _dataAllKy.moTa,
    ngaySuDungTu: dayjs(_dataAllKy.ngaySuDungTu).format("DD/MM/YYYY"),
    ngaySuDungDen: dayjs(_dataAllKy.ngaySuDungDen).format("DD/MM/YYYY"),
    ngayHoaDon: dayjs(_dataAllKy.ngayHoaDon).format("DD/MM/YYYY"),
  }));
  console.log(dataSource);
  console.log("id ", factoryId);
  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 12}>
              <Form.Item>
                <TableListLocation />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 8 : 4}>
            <Form.Item lassName="custom-form-item">
              <Input.Search
                placeholder="Nhập và Enter để tìm kiếm"
                style={{
                  marginRight: "5px",
                  width: "100%",
                }}
                onChange={(e) => setTextKyHieu(e.target.value)}
                onSearch={(value) => setTextKyHieu(value)}
              />
            </Form.Item>
          </Col>
          <Col span={isTabletOrMobile ? 8 : 4}>
            <Form.Item lassName="custom-form-item">
              <DatePicker
                locale={viVN}
                placeholder="Nhập ngày ghi chỉ"
                style={{ marginLeft: "5px", width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={isTabletOrMobile ? 8 : 4}>
            <Form.Item lassName="custom-form-item">
              <DatePicker
                locale={viVN}
                placeholder="Nhập ngày hóa đơn"
                style={{
                  marginLeft: "10px",
                  width: "100%",
                }}
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
        dataSource={dataSource}
        // import kỳ lạ của Dương
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
        // kết thúc import kỳ lạ của Dương
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
export default DMKy;
