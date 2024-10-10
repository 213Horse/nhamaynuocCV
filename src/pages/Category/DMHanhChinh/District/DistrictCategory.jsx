/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Table, Form, Input, Col, Row, Tooltip, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";

// import "./CSS_Category_Status_ReadNumber.css";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import {
  btnClickTabListInvoicePrintSelector,
  fetchApiGetAllDistrictSelector,
} from "../../../../redux/selector";
import HeaderActionButton from "./HeaderActionButton";
import { fetchApiGetAllDistrict } from "../../../../redux/slices/districtSlice/districtSlice";
import { useQuery } from "@apollo/client";
import { GetQuanHuyens } from "../../../../graphql/district/districtQuery";

const DistrictCategory = () => {
  const dispatch = useDispatch();
  const listDistrict = useSelector(fetchApiGetAllDistrictSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [openPopover, setOpenPopover] = useState(false);
  const rowSelected = useSelector(btnClickTabListInvoicePrintSelector);
  const [searchResult, setSearchResult] = useState("");

  // pagination
  const pageSize = 100;
  const [currentPage, setCurrentPage] = useState(1);

  // get data from graphql
  const {
    data: districts,
    loading: isLoading,
    fetchMore,
    refetch,
  } = useQuery(GetQuanHuyens, {
    variables: {
      first: pageSize,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 70,
      onCell(text, record) {
        return {
          props: {
            style: {
              background: "#FF3333",
            },
            children: <div>{text}</div>,
          },
        };
      },
    },
    {
      title: "Mã Quận/Huyện",
      dataIndex: "codename",
      filteredValue: [searchResult],
      width: 210,
      onFilter: (value, record) => {
        return String(record.codename).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên Quận/Huyện",
      dataIndex: "ten",
    },
    {
      title: "Tên Thành phố/Tỉnh",
      dataIndex: "tinhThanh",
    },
  ];
  const getHasNextPage = (data) => data.GetQuanHuyens.pageInfo.hasNextPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Fetch data for the selected page
    fetchMore({
      variables: {
        first: pageSize,
        after: districts.GetQuanHuyens.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const _hasNextPage = getHasNextPage(districts);

        if (!fetchMoreResult) return prev;

        if (_hasNextPage) {
          // Update data when click change page
          const updateData = {
            GetQuanHuyens: {
              ...prev.GetQuanHuyens,
              nodes: [
                ...prev.GetQuanHuyens.nodes,
                ...fetchMoreResult.GetQuanHuyens.nodes,
              ],
              pageInfo: fetchMoreResult.GetQuanHuyens.pageInfo,
            },
          };

          return updateData;
        }
      },
    });
  };

  useEffect(() => {
    // dispatch(fetchApiGetAllDistrict())

    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, []);

  const handleUncheckRadio = () => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const renderCategoryAction = () => (
    <HeaderActionButton refetch={refetch} isTabletOrMobile={isTabletOrMobile} />
  );

  const data =
    districts?.GetQuanHuyens?.nodes?.map((item, idx) => ({
      ...item,
      tinhThanh: item.tinhThanh.ten,
      index: idx + 1,
    })) || [];

  return (
    <>
      <Form>
        <Row>
          <Col
            span={isTabletOrMobile ? 8 : 16}
            className="category-header-content"
          >
            {isTabletOrMobile ? (
              <Popover
                rootClassName="fix-popover-z-index"
                placement="bottomRight"
                trigger="click"
                open={openPopover}
                onOpenChange={handleOpenChange}
                content={renderCategoryAction()}
              >
                <PlusOutlined />
              </Popover>
            ) : (
              renderCategoryAction()
            )}
          </Col>

          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item" name="9">
              <Input.Search
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  console.log("e", e.target.value);
                  setSearchResult(e.target.value);
                }}
                placeholder="Nhập mã quận/huyện"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        pagination={{
          pageSize: 10,
          total: districts?.GetQuanHuyens?.totalCount,
          onChange: (page) => handlePageChange(page),
          currentPage: currentPage,
        }}
        className="my-table"
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1000, y: 480 }}
        columns={columns?.map((col) => ({ ...col, className: "cell-wrap" }))}
        dataSource={data}
        onRow={(record, rowIndex) => ({
          style: {
            color: record.maMau,
          },
          onClick: () => {
            dispatch(
              tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                record
              )
            );
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
          selectedRowKeys: rowSelected ? [rowSelected.index] : [],
        }}
      />
    </>
  );
};

export default DistrictCategory;
