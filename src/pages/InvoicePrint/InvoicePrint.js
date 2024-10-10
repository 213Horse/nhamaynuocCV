import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { Collapse, Popover, Table, Tooltip, theme } from "antd";
import { useEffect, useState } from "react";
import "./InvoicePrint.css";
import { AdvancedSearchForm as FormSearchInvoicePrint } from "../../components/FormSearchInvoicePrint/FormSearchInvoicePrint";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getInvoicePrintList,
  isLoadingInvoicePrintListSelector,
} from "../../redux/selector";
import { gql } from "@apollo/client";
import apolloClient from "../../config/apolloClient";
import {
  fetchFilterListInvoice,
  fetchListInvoice,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import TabListIP from "./FormInvoicePrint/TableListIP.js";
import {
  fetchFilterListInvoicePrint,
  fetchListInvoicePrint,
} from "../../redux/slices/invoicePrintSlice/invoicePrintSlice.js";
import moment from "moment";
const InvoicePrint = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Tuyến đọc",
      dataIndex: "readingRoute",
      key: "readingRoute",
    },
    {
      title: "Cán bộ đọc",
      dataIndex: "reader",
      key: "reader",
    },
    {
      title: "Tên phiên",
      dataIndex: "sessionName",
      key: "sessionName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Sê ri",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 120,
    },
    {
      title: "Số hóa đơn BĐ",
      dataIndex: "startInvoiceNumber",
      key: "startInvoiceNumber",
    },
    {
      title: "Số hóa đơn KT",
      dataIndex: "endInvoiceNumber",
      key: "endInvoiceNumber",
    },
    {
      title: "Số lượng HĐ",
      dataIndex: "contractCount",
      key: "contractCount",
      width: 120,
    },
    {
      title: "Đã in xong",
      dataIndex: "isPrinted",
      key: "isPrinted",
      width: 120,
    },
  ];
  const dispatch = useDispatch();
  const pageSize = 10;
  const { token } = theme.useToken();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isOpenModalLedger, setIsOpenModalLedger] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const invoicePrintListSelector = useSelector(getInvoicePrintList);
  const isLoadingInvoicePrintList = useSelector(
    isLoadingInvoicePrintListSelector
  );
  const [openFooter, setOpenFooter] = useState(false);
  const [paramString, setParamString] = useState(null);

  const hide = () => {
    setOpenFooter(false);
  };
  const [dataTuyenDoc, setDataTuyenDoc] = useState(null);
  const [dataDongHo, setDataDongHo] = useState(null);
  const [dataHopDong, setDataHopDong] = useState(null);
  const [rowSelection, setRowSelection] = useState(null);
  const [clickReset, setClickReset] = useState(false);
  const [curPage, setCurPage] = useState(1);

  const createFactoryQueryString = () => {
    let factoryQueryString = "";
    if (factoryID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryID}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const createFilterQueryString = (filterForm) => {
    let queryString = "";
    for (const key in filterForm) {
      if (filterForm[key]) {
        if (queryString === "") {
          queryString += `${key}=${filterForm[key]}`;
        } else {
          queryString += `&${key}=${filterForm[key]}`;
        }
      }
    }
    console.log(`${queryString}`);
    return `${queryString}`;
  };

  // useEffect(() => {
  //   fetchInvoiceListByFactotyID();
  // }, []);

  useEffect(() => {
    fetchInvoicePrintListByFactotyID();
  }, [clickReset]);

  const fetchInvoicePrintListByFactotyID = () => {
    const factoryURI = createFactoryQueryString().replaceAll(
      "nhaMayIds",
      "nhaMayIds"
    );
    const queryString = `${factoryURI}&pageSize=${pageSize}&pageNumber=1`;
    dispatch(fetchListInvoicePrint(queryString));
    setParamString(queryString);
    setIsFilter(false);
  };

  const fetchFilterInvoiceList = (formValue) => {
    const factoryURI = createFactoryQueryString();
    const formValueURI = createFilterQueryString(formValue);
    const queryString = `${formValueURI}&${factoryURI}&invoiceParameter.pageSize=10&invoiceParameter.PageNumber=1`;
    dispatch(fetchFilterListInvoicePrint(queryString));
    setParamString(queryString);
    setIsFilter(true);
  };

  // ten tuyen
  const GET_TEN_TUYEN = gql`
    query GetTuyenDocs($first: Int, $ids: [String]) {
      GetTuyenDocs(first: $first, where: { id: { in: $ids } }) {
        nodes {
          id
          tenTuyen
        }
      }
    }
  `;

  function getTenTuyen(ids) {
    apolloClient
      .query({
        query: GET_TEN_TUYEN,
        variables: {
          first: 10,
          ids: ids,
        },
      })
      .then((result) => {
        setDataTuyenDoc(result?.data?.GetTuyenDocs?.nodes);
      });
  }

  const GET_MA_DONG_HO = gql`
    query GetDongHoNuocs($first: Int, $ids: [String]) {
      GetDongHoNuocs(first: $first, where: { id: { in: $ids } }) {
        nodes {
          id
          keyId
        }
      }
    }
  `;

  function getMaHopDong(ids) {
    console.log("ids", ids);
    apolloClient
      .query({
        query: GET_MA_DONG_HO,
        variables: {
          first: 10,
          ids: ids,
        },
      })
      .then((result) => {
        console.log("dong ho", result?.data?.GetDongHoNuocs?.nodes);
        setDataDongHo(result?.data?.GetDongHoNuocs?.nodes);
      });
  }

  const GET_SO_HOP_DONG = gql`
    query GetHopDongs($first: Int, $ids: [String]) {
      GetHopDongs(first: $first, where: { id: { in: $ids } }) {
        nodes {
          id
          keyId
          doiTuongGia
        }
      }
    }
  `;

  function getSoHopDong(ids) {
    console.log("ids", ids);
    apolloClient
      .query({
        query: GET_SO_HOP_DONG,
        variables: {
          first: 10,
          ids: ids,
        },
      })
      .then((result) => {
        console.log("hop dong", result?.data?.GetHopDongs?.nodes);
        setDataHopDong(result?.data?.GetHopDongs?.nodes);
      });
  }

  function handleReset() {
    setClickReset(!clickReset);
    setCurPage(1);
  }

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  useEffect(() => {
    handleReset();
  }, [factoryID]);

  const handlePageChange = (page) => {
    setCurPage(page);
    const newQueryString = paramString.replace(
      "pageNumber=1",
      `pageNumber=${page}`
    );
    if (isFilter) {
      dispatch(fetchFilterListInvoicePrint(newQueryString));
    } else {
      // dispatch(fetchListInvoicePrint(newQueryString));
    }
  };
  return (
    <>
      {/* filter */}
      {!isOpenModalLedger && (
        <>
          <Collapse
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Tìm kiếm",
                children: (
                  <FormSearchInvoicePrint
                    setClickReset={handleReset}
                    fetchFilterInvoiceList={fetchFilterInvoiceList}
                    setCurPage={setCurPage}
                  />
                ),
              },
            ]}
            size="small"
          />

          {/* main contain */}
          <div
            style={{
              lineHeight: "200px",
              textAlign: "center",
              borderRadius: token.borderRadiusLG,
              marginTop: 7,
              position: "relative",
            }}
          >
            <Table
              style={{
                whiteSpace: "nowrap",
              }}
              loading={isLoadingInvoicePrintList}
              rowKey="stt"
              bordered
              dataSource={invoicePrintListSelector?.items?.map(
                (item, index) => {
                  return {
                    id: item.id,
                    keyId: item.keyId,
                    stt: pageSize * (curPage - 1) + (index + 1),
                    readingRoute: item.tenTuyenDoc,
                    reader: item.tenCanBoDoc,
                    sessionName: item.TenPhien,
                    createdDate: item.ngayTao
                      ? moment(item.ngayTao).format("DD/MM/YYYY")
                      : null,
                    serialNumber: item.kyHieu,
                    startInvoiceNumber: item.soHoaDonBD,
                    endInvoiceNumber: item.soHoaDonKT,
                    contractCount: item.soLuongHopDong,
                    isPrinted: item.daInXong === true ? "Đã in" : "Đã ngừng",
                  };
                }
              )}
              columns={columns}
              pagination={{
                total: invoicePrintListSelector?.totalCount,
                pageSize: 10,
                current: curPage,
                onChange: (page, pageSize) => {
                  handlePageChange(page);
                },
              }}
              size="small"
              scroll={{
                x: 2000,
              }}
              rowSelection={{
                type: "radio",
                selectedRowKeys: rowSelection ? [rowSelection.stt] : [],
                onChange: (selectedRowKeys, selectedRows) => {
                  setRowSelection(selectedRows[0]);
                },
                columnTitle: () => {
                  return (
                    <Tooltip title="Bỏ chọn hàng hiện tại.">
                      <RedoOutlined
                        className="icon-reset-rad-btn"
                        onClick={() => {
                          setRowSelection(null);
                        }}
                      />
                    </Tooltip>
                  );
                },
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    setRowSelection(record);
                  },
                };
              }}
            />
          </div>
        </>
      )}

      {/* Footer */}
      <div className="InvoicePrint-bottom">
        <div className="contract-bottom-func">
          {isTabletOrMobile ? (
            <Popover
              size="small"
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
              content={<TabListIP isTabletOrMobile={isTabletOrMobile} />}
            >
              <PlusOutlined />
            </Popover>
          ) : (
            <TabListIP />
          )}
        </div>
      </div>
    </>
  );
};
export default InvoicePrint;
