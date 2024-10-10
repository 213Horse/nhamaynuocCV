import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Table,
  Tooltip,
} from "antd";

import { RedoOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./ActivityLog.css";
import { btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import moment from "moment/moment";
import { useMediaQuery } from "react-responsive";
import TabListActivityLog from "./TabListActivityLog";
import { LOAD_ACTIONLOG } from "../../../../graphql/ActionLog/queries";
import { useQuery } from "@apollo/client";
import { SearchContext } from "./ActivityLog";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: "6%",
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createdTime",
    key: "createdTime",
  },
  {
    title: "Thời gian cập nhật",
    dataIndex: "lastUpdatedTime",
    key: "lastUpdatedTime",
  },
  {
    title: "Địa chỉ IP",
    dataIndex: "remoteHost",
    key: "remoteHost",
  },
  {
    title: "Tài khoản",
    dataIndex: "userName",
    key: "userName",
  },
  // {
  //   title: "Đối tượng",
  //   dataIndex: "claims",
  //   key: "claims",
  // },
  {
    title: "Thông báo",
    dataIndex: "responseBody",
    key: "responseBody",
    render: (text) => (
      <div
        style={{
          width: "70%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={text}
      >
        {text}
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Button
        type="link"
        icon={<EyeOutlined />}
        onClick={() => {
          // Hiển thị modal với nội dung của dòng
          Modal.info({
            width: 1800,
            title: "Thông tin chi tiết",
            content: (
              <div>
                <p>Thời gian tạo: {record.createdTime}</p>
                <p>Thời gian cập nhật: {record.lastUpdatedTime}</p>
                <p>Địa chỉ IP: {record.remoteHost}</p>
                <p>Tài khoản: {record.userName}</p>
                <p>Đối tượng: {record.claims}</p>
                <p>Thông báo: {record.responseBody}</p>
              </div>
            ),
          });
        }}
      />
    ),
  },
];

const FolderContent = () => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1900px)" });
  const tabListMB = useSelector(btnClickTabListInvoicePrintSelector);
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const { searchParams, setSearchParams } = useContext(SearchContext);
  const { loading, error, data } = useQuery(LOAD_ACTIONLOG, {
    variables: { first: 50, skip: (page - 1) * 50 },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const filteredData = data?.GetAuditLogs?.nodes
        .filter((item) => {
          const createdTime = moment(item.createdTime);
          const lastUpdatedTime = moment(item.lastUpdatedTime);
          return (
            (!searchParams.fromDate ||
              createdTime.isSameOrAfter(searchParams.fromDate, "day")) &&
            (!searchParams.toDate ||
              lastUpdatedTime.isSameOrBefore(searchParams.toDate, "day")) &&
            (!searchParams.account ||
              item.userName.includes(searchParams.account))
          );
        })
        .map((item, i) => ({
          ...item,
          stt: i + 1,
          createdTime: moment(item.createdTime).format("DD/MM/YYYY"),
          lastUpdatedTime: moment(item.lastUpdatedTime).format("DD/MM/YYYY"),
        }));

      setTableData(filteredData);
    }
  }, [loading, error, data, searchParams]);
  // const initialData = useMemo(() => {
  //   if (loading || error || !data) {
  //     return [];
  //   }

  //   return data.GetLogs.nodes.map((item, i) => ({
  //     ...item,
  //     stt: i + 1,
  //     createdTime: moment(item.createdTime).format("DD/MM/YYYY"),
  //     lastUpdatedTime: moment(item.lastUpdatedTime).format("DD/MM/YYYY"),
  //   }));
  // }, [loading, error, data]);

  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, []);

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
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="folder-wrapper" onScroll={handleScroll}>
      <Row>
        {!isTabletOrMobile && (
          <Col span={isTabletOrMobile ? 8 : 16}>
            <Form.Item>
              {/* <TabListActivityLog /> */}
            </Form.Item>
          </Col>
        )}
      </Row>
      <Table
        className="folder-table"
        size="small"
        scroll={{ x: 800, y: "72vh" }}
        bordered
        rowKey="stt"
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={tableData}
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
          onChange: (selectedRowKeys, selectedRows) => {
            handleRowSelection(selectedRowKeys, selectedRows);
          },
          selectedRowKeys: tabListMB ? [tabListMB.stt] : [],
        }}
        onScroll={handleScroll}
      />
     
    </div>
  );
};
// {isTabletOrMobile && (
//   <div className="contract-bottom">
//     {/* check mobile */}
//     {isTabletOrMobile ? (
//       <Popover
//         size="small"
//         rootClassName="fix-popover-z-index"
//         placement="bottomRight"
//         trigger="click"
//         content={
//           <TabListActivityLog isTabletOrMobile={isTabletOrMobile} />
//         }
//       >
//         <div className="contract-bottom-al">
//           <PlusOutlined />
//         </div>
//       </Popover>
//     ) : (
//       <div className="contract-bottom-al">
//         <TabListActivityLog />
//       </div>
//     )}
//   </div>
// )}
export default FolderContent;
