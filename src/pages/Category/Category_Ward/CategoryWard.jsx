import { React, useEffect, useState } from "react";
import { Form, Input, Table, Popover, Col, Row, Tooltip, Pagination } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

import TableListWard from "./TableListWard";
import "./CategoryWard.css";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import "moment/locale/vi";
import {
  btnClickTabListInvoicePrintSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { useQuery } from "@apollo/client";
import { GetWardQuery } from "../../../graphql/wards/wardQuery";

moment.locale("vi");

function CategoryWard() {
  const [resultSearch, setResultSearch] = useState("");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const dispatch = useDispatch();

  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  // pagination
  const pageSize = 100;
  const [currentPage, setCurrentPage] = useState(1);


  // get data from graphql
  const {
    data: wards,
    loading: isLoading,
    fetchMore,
    refetch
  } = useQuery(GetWardQuery, {
    variables: {
      first: pageSize,
    },
  });

  const getHasNextPage = (data) => data.GetPhuongXas.pageInfo.hasNextPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Fetch data for the selected page
    fetchMore({
      variables: {
        first: pageSize,
        after: wards.GetPhuongXas.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log('PREV: ', prev);
        console.log('fetchMoreResult: ', fetchMoreResult);
        const _hasNextPage = getHasNextPage(wards);

        if (!fetchMoreResult) return prev;

        if (_hasNextPage) {
          // Update data when click change page
          const updateData = {
            GetPhuongXas: {
              ...prev.GetPhuongXas,
              nodes: [
                ...prev.GetPhuongXas.nodes,
                ...fetchMoreResult.GetPhuongXas.nodes,
              ],
              pageInfo: fetchMoreResult.GetPhuongXas.pageInfo,
            },
          };

          console.log('update: ', updateData);

          return updateData;
        }
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    }
  }, [])

  const layout = {
    labelCol: {
      span: 9,
    },
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "Mã Phường Xã",
      dataIndex: "codename",
      key: "codename",
      width: 200,
    },
    {
      title: "Tên Phường/Xã",
      dataIndex: "nameWard",
      key: "nameWard",
      filteredValue: [resultSearch],
      onFilter: (value, record) => {
        return String(record.keyId).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên Quận/Huyện",
      dataIndex: "nameDistrict",
      key: "nameDistrict",
    },
    {
      title: "Tên Thành phố/Tỉnh",
      dataIndex: "nameCity",
      key: "nameDistrict",
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

  return (
    <>
      {/* <AdvancedSearchForm /> */}
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={8}>
              <Form.Item>
                <TableListWard refetch={refetch} />
              </Form.Item>
            </Col>
          )}

          <Col
            xs={24}
            sm={24}
            md={16}
            lg={16}
          >
            <Form.Item className="custom-form-item" label="Tìm kiếm" name="9">
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
                placeholder="Nhập mã phường/xã"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        pagination={{
          pageSize: 10,
          total: wards?.GetPhuongXas?.totalCount,
          onChange: (page) => handlePageChange(page),
          currentPage: currentPage,
        }}
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
          wards?.GetPhuongXas?.nodes?.length <= 0
            ? []
            : wards?.GetPhuongXas?.nodes?.map((_ward, index) => ({
              ..._ward,
              index: index + 1,
              nameCity: _ward.quanHuyen.tinhThanh.ten,
              nameDistrict: _ward.quanHuyen.ten,
              nameWard: _ward.ten,
            }))
        }
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
          selectedRowKeys: tabListbc ? [tabListbc.index] : [],
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
              content={<TableListWard refetch={refetch} isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListWard refetch={refetch} isTabletOrMobile={isTabletOrMobile} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default CategoryWard;
