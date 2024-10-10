import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";

import InputSearch from "./InputSearch";
import tabListContractSlice from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import {
  btnClickFilterModalInfoCustomerSelector,
  btnClickGetFactoryIdSelector,
  setFilterModalInfoCustomerSelector,
} from "../../redux/selector";
import { LOAD_CUSTOMERS_BY_NHA_MAY_ID } from "../../graphql/customers/queries";
import customerSlice from "../../redux/slices/customerSlice/customerSlice";

function TableInfoClock({ tabList }) {
  const pageSize = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [resultSearch, setResultSearch] = useState("");

  const dispatch = useDispatch();

  // get from redux
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const filterModalInfoCustomer = useSelector(
    setFilterModalInfoCustomerSelector
  );
  const btnClickModalInfoCustomer = useSelector(
    btnClickFilterModalInfoCustomerSelector
  );

  // get from graphql
  const {
    data: listCustomerByNhaMayId,
    fetchMore,
    refetch: refetchListCustomerByNhaMayId,
  } = useQuery(LOAD_CUSTOMERS_BY_NHA_MAY_ID, {
    variables: {
      first: pageSize,
      nhaMayId: Object?.keys(factoryId).length >= 0 ? factoryId : "NotFound!",
    },
  });

  console.log("listCustomerByNhaMayId", listCustomerByNhaMayId);
  // console.log("tablist ->", tabList);
  console.log("filterModalInfoCustomer ->", filterModalInfoCustomer);
  // console.log("btnClickModalInfoCustomer ->", btnClickModalInfoCustomer);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
      filteredValue: [resultSearch],
      onFilter: (value, record) => {
        return String(record.tenKhachHang)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Mã khách hàng",
      dataIndex: "keyId",
      key: "keyId",
    },
    {
      title: "Phân loại",
      dataIndex: "loaiKhachHang",
      key: "loaiKhachHang",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Mã số thuế",
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: "Điện thoại",
      dataIndex: "dienThoai",
      key: "dienThoai",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số hộ dùng chung",
      dataIndex: "soHo",
      key: "soHo",
    },
    {
      title: "Số nhân khẩu",
      dataIndex: "soKhau",
      key: "soKhau",
    },
    {
      title: "Tuyến đọc",
      dataIndex: "tuyenDoc",
      key: "tuyenDoc",
    },
  ];

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListContractSlice.actions.btnClickTabListContract(selectedRows[0])
    );
  };

  // check continue page?
  const getHasNextPage = (data) => data.GetHopDongs.pageInfo.hasNextPage;

  // hanlge change page
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Fetch data for the selected page
    fetchMore({
      variables: {
        first: pageSize,
        after: listCustomerByNhaMayId.GetHopDongs.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const _hasNextPage = getHasNextPage(listCustomerByNhaMayId);

        if (!fetchMoreResult) return prev;

        if (_hasNextPage) {
          // Update data when click change page
          const updateData = {
            GetHopDongs: {
              ...prev.GetHopDongs,
              nodes: [
                ...prev.GetHopDongs.nodes,
                ...fetchMoreResult.GetHopDongs.nodes,
              ],
              pageInfo: fetchMoreResult.GetHopDongs.pageInfo,
            },
          };

          return updateData;
        }
      },
    });
  };

  // handle reset
  const handleUncheckRadio = () => {
    refetchListCustomerByNhaMayId();
    dispatch(customerSlice.actions.btnClickFilterModalInfoCustomer(null));
    dispatch(
      tabListContractSlice.actions.btnClickTabListContract(null) // clicked row to check radio
    );
  };

  // handle on search
  const handleOnSearch = (value) => {
    setResultSearch(value);
  };

  // handle on onChange
  const handleOnChange = (e) => {
    setResultSearch(e.target.value);
  };

  return (
    <div>
      <InputSearch
        handleOnSearch={handleOnSearch}
        handleOnChange={handleOnChange}
      />
      <Table
        size="small"
        rowKey="index"
        columns={columns}
        dataSource={
          filterModalInfoCustomer?.GetHopDongs?.nodes.length > 0 &&
          btnClickModalInfoCustomer === "filterModalInfoCustomer"
            ? filterModalInfoCustomer?.GetHopDongs?.nodes
                // ?.filter((__customer) => __customer.hopDongs.length > 0)
                ?.map((_customer, index) => ({
                  index: index + 1,
                  tenKhachHang: _customer.tenKhachHang,
                  keyId: _customer.keyId,
                  loaiKhachHang: _customer.loaiKhachHang,
                  diaChi: _customer.diaChi,
                  maSoThue: _customer.maSoThue,
                  dienThoai: _customer.dienThoai,
                  email: _customer.email,
                  soHo: _customer.soHo,
                  soKhau: _customer.soKhau,
                  tuyenDoc: _customer?.tuyenDoc,
                }))
            : listCustomerByNhaMayId?.GetHopDongs?.nodes?.length <= 0
            ? []
            : listCustomerByNhaMayId?.GetHopDongs?.nodes
                // ?.filter((__customer) => __customer?.hopDongs?.length > 0)
                ?.map((_customer, index) => ({
                  index: index + 1,
                  tenKhachHang: _customer.khachHang.tenKhachHang,
                  keyId: _customer.khachHang.keyId,
                  loaiKhachHang: _customer.khachHang.loaiKhachHang,
                  diaChi: _customer.khachHang.diaChi,
                  maSoThue: _customer.khachHang.maSoThue,
                  dienThoai: _customer.khachHang.dienThoai,
                  email: _customer.khachHang.email,
                  soHo: _customer.khachHang.soHo,
                  soKhau: _customer.khachHang.soKhau,
                  // tuyenDoc: _customer?.tuyenDoc,
                }))
        }
        onRow={(record, index) => {
          return {
            onClick: () => {
              console.log("record tbl info clock ->", record);
              dispatch(
                tabListContractSlice.actions.btnClickTabListContract(record) // clicked row to check radio
              );
            },
          };
        }}
        rowSelection={{
          type: "radio",
          columnTitle: () => {
            return (
              <Tooltip title="Làm mới">
                <RedoOutlined
                  className="icon-reset-rad-btn"
                  onClick={handleUncheckRadio}
                />
              </Tooltip>
            );
          },
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: tabList ? [tabList.index] : [],
        }}
        pagination={{
          pageSize: 50,
          total:
            filterModalInfoCustomer?.GetKhachHangs?.nodes.length > 0 &&
            btnClickModalInfoCustomer === "filterModalInfoCustomer"
              ? filterModalInfoCustomer?.GetKhachHangs?.totalCount
              : listCustomerByNhaMayId?.GetHopDongs?.totalCount,
          onChange: handlePageChange,
          currentPage: currentPage,
        }}
        scroll={{
          x: 2200,
          y: 220,
        }}
      >
        TableInfoClock
      </Table>
    </div>
  );
}

export default TableInfoClock;
