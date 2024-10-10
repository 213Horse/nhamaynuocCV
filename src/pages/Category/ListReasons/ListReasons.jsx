import { React, useEffect, useMemo, useState } from "react";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Table, Popover, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { AdvancedSearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";
import TableListPC from "./TableListPC";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchAllReasonSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { fetchReasonData } from "../../../redux/slices/reasonSlice/reasonSlice";

moment.locale("vi");

function ListReasons() {
  const dispatch = useDispatch();
  const tabListTotalWatch = useSelector(btnClickTabListInvoicePrintSelector);
  const reasonData = useSelector(fetchAllReasonSelector);
  const [searchQuery, setSearchQuery] = useState("");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

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

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(fetchReasonData(queryString));
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, [nhaMayId]);

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 70,
    },
    {
      title: "Mã/Ký hiệu",
      dataIndex: "kyHieu",
      key: "kyHieu",
    },

    {
      title: "Tên lý do thay",
      dataIndex: "tenLDT",
      key: "tenLDT",
    },
  ];

  const data = useMemo(() => {
    return (
      reasonData?.map((_reason, i) => ({
        key: _reason.id,
        stt: i + 1,
        // maLDT: _reason.keyId,
        tenLDT: _reason.value,
        kyHieu: _reason.kyHieu,
      })) || []
    );
  }, [reasonData]);

  return (
    <>
      <AdvancedSearchForm setSearchQuery={setSearchQuery} />

      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="key"
        scroll={{ x: 500, y: 480 }}
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={data}
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
          selectedRowKeys: tabListTotalWatch ? [tabListTotalWatch.key] : [],
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
              content={<TableListPC isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">{/* <TabListBC /> */}</div>
          )}
        </div>
      )}
    </>
  );
}
export default ListReasons;
