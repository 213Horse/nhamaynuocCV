import { React, useEffect, useState } from "react";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Table, Popover, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { SearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import {
  btnClickTabListInvoicePrintSelector,
  getAllCitySelector,
} from "../../../redux/selector";
import { getAllCities } from "../../../redux/slices/citySlice/citySlice";
import TableCity from "./TableCity";

const CategoryCity = () => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dataCities = useSelector(getAllCitySelector);
  const [searchResult, setSearchResult] = useState("");
  const initialData = dataCities?.map((dataCities, index) => {
    return {
      ...dataCities,
      index: index + 1,
      codeName: dataCities.codeName,
      ten: dataCities.ten,
    };
  });
  useEffect(() => {
    dispatch(getAllCities());

    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 70,
    },

    {
      title: "Mã Thành phố/Tỉnh",
      dataIndex: "codeName",
      key: "codeName",
      filteredValue: [searchResult],
      onFilter: (value, record) => {
        return String(record.codeName)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Tên Thành phố/Tỉnh",
      dataIndex: "ten",
      key: "ten",
    },
  ];

  // import kỳ lạ của Dương
  const tabCity = useSelector(btnClickTabListInvoicePrintSelector);
  console.log(tabCity);
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
  // Kết thúc import kỳ lạ của Dương

  return (
    <>
      <SearchForm onChange={setSearchResult} />
      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1000, y: 480 }}
        columns={columns}
        dataSource={initialData}
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
          selectedRowKeys: tabCity ? [tabCity.index] : [],
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
              content={<TableCity isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableCity />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryCity;
