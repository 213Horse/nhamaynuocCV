import { React, useEffect, useState } from "react";
// import ReactToPrint from "react-to-print";
// import { initialData } from "../../utils/dataInvoicePrint/data";
import "../../components/GlobalStyles/GlobalStyles.css";
import InvoicingDetailsModal from "./FormInvoicePrint/InvoicingDetailsModal/InvoicingDetailsModal.jsx";
import TabListIP from "./FormInvoicePrint/TableListIP.js";
import PrintButton from "./PrintButton.js";
import { Button, Table, Popover, Collapse, theme } from "antd";
import {
  SearchOutlined,
  FormOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "chart.js/dist/plugins/plugin.tooltip.js";
import { useDispatch, useSelector } from "react-redux";
import { gql } from "@apollo/client";
import apolloClient from "../../config/apolloClient.js";
import {
  btnClickGetFactoryIdSelector,
  getInvoiceList,
  isLoadingInvoiceListSelector,
} from "../../redux/selector.js";
import {
  fetchFilterListInvoice,
  fetchListInvoice,
} from "../../redux/slices/invoiceSlice/invoiceSlice.js";
import { FooterInvoice } from "../../components/Footer/FooterInvoice.js";
import { AdvancedSearchForm as FormSearchInvoice } from "../../components/FormSearchInvoice/FormSearchInvoice.js";
import { DetailInvoice } from "../Invoice/Detail_Invoice/Detail_Invoice.js";
moment.locale("vi");

function InvoicePrint() {
  const columns = [
    {
      title: "#",
      dataIndex: "order",
      key: "order",
      width: 70,
    },
    {
      title: "Tuyến đọc",
      dataIndex: "readingLine",
      key: "readingLine",
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
    {
      title: "",
      key: "actions",
      width: 120,

      // render: (text, record) => {
      //   return (
      //     <>
      //       <Button
      //         icon={<FormOutlined />}
      //         onClick={() => handleButtonClick(record)}
      //       ></Button>
      //       <PrintButton record={record} />
      //       {/* <Button icon={<PrinterOutlined />}> In </Button> */}
      //     </>
      //   );
      // },
    },
  ];
  const dispatch = useDispatch();
  const pageSize = 10;
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [isOpenModalBill, setIsOpenModalBill] = useState(false);
  const [isModalInstalmentsOpen, setIsModalInstalmentsOpen] = useState(false);
  const [isOpenModalAddInvoice, setIsOpenModalAddInvoice] = useState(false);
  const [isOpenModalEditInvoice, setIsOpenModalEditInvoice] = useState(false);
  const [isModalEmail, setIsModalEmail] = useState(false);
  const [isModalSMS, setIsModalSMS] = useState(false);
  const [isOpenModalWaterStatus, setIsOpenModalWaterStatus] = useState(false);
  const [isOpenModalInvoiceBar, setIsOpenModalInvoiceBar] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isOpenModalViewInvoice, setIsOpenModalViewInvoice] = useState(false);
  const [isOpenModalLedger, setIsOpenModalLedger] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [thangTaoSoDocField, setThangTaoSoDocField] = useState("");

  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const invoiceListSelector = useSelector(getInvoiceList);
  const isLoadingInvoiceList = useSelector(isLoadingInvoiceListSelector);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleOk = (_, type) => {
    setIsOpenModalBill(false);
    if (type === "instalments") {
      setIsModalInstalmentsOpen(false);
    }
    if (type === "addInvoice") {
      setIsOpenModalAddInvoice(false);
    }
  };

  const handleCancel = (_, type) => {
    setIsOpenModalBill(false);
    if (type === "instalments") {
      setIsModalInstalmentsOpen(false);
    }
    if (type === "addInvoice") {
      setIsOpenModalAddInvoice(false);
    }
    setIsOpenModalViewInvoice(false);
  };

  const [openFooter, setOpenFooter] = useState(false);
  const [paramString, setParamString] = useState(null);

  const hide = () => {
    setOpenFooter(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpenFooter(newOpen);
  };

  const renderFooter = () => (
    <FooterInvoice
      setIsOpenModalBill={setIsOpenModalBill}
      setIsModalInstalmentsOpen={setIsModalInstalmentsOpen}
      setIsOpenModalAddInvoice={setIsOpenModalAddInvoice}
      setIsOpenModalEditInvoice={setIsOpenModalEditInvoice}
      setIsOpenModalWaterStatus={setIsOpenModalWaterStatus}
      setIsModalEmail={setIsModalEmail}
      setIsModalSMS={setIsModalSMS}
      setIsOpenModalInvoiceBar={setIsOpenModalInvoiceBar}
      isTabletOrMobile={isTabletOrMobile}
      setIsOpenModalViewInvoice={setIsOpenModalViewInvoice}
      hide={hide}
      isFilter={isFilter}
      setIsOpenModalLedger={setIsOpenModalLedger}
      rowSelection={rowSelection}
      thangTaoSoDocField={thangTaoSoDocField}
    />
  );

  const [dataTableInvoice, setDataTableInvoice] = useState(null);
  const [dataTuyenDoc, setDataTuyenDoc] = useState(null);
  const [dataDongHo, setDataDongHo] = useState(null);
  const [dataHopDong, setDataHopDong] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
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
    fetchInvoiceListByFactotyID();
  }, [clickReset]);

  const fetchInvoiceListByFactotyID = () => {
    const factoryURI = createFactoryQueryString().replaceAll(
      "nhaMayIds",
      "nhaMays"
    );
    const queryString = `${factoryURI}&PageSize=${pageSize}&PageNumber=1`;
    dispatch(fetchListInvoice(queryString));
    setParamString(queryString);
    setIsFilter(false);
  };

  const fetchFilterInvoiceList = (formValue) => {
    const factoryURI = createFactoryQueryString();
    const formValueURI = createFilterQueryString(formValue);
    const queryString = `${formValueURI}&${factoryURI}&invoiceParameter.PageSize=10&invoiceParameter.PageNumber=1`;
    dispatch(fetchFilterListInvoice(queryString));
    setParamString(queryString);
    setThangTaoSoDocField(decodeURIComponent(formValue.ThangTaoHoaDon)); //save ThangTaoSoDoc for send SMS
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
      "PageNumber=1",
      `PageNumber=${page}`
    );
    if (isFilter) {
      dispatch(fetchFilterListInvoice(newQueryString));
    } else {
      dispatch(fetchListInvoice(newQueryString));
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
                  <FormSearchInvoice
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
              loading={isLoadingInvoiceList}
              rowKey="stt"
              bordered
              dataSource={invoiceListSelector?.items?.map((item, index) => {
                return {
                  id: item.id,
                  keyId: item.keyId,
                  stt: pageSize * (curPage - 1) + (index + 1),
                  contractNumber: item.maHopDong,
                  codeClock: item.maDongHo,
                  readingRoute: item.tuyenDoc,
                  username: item.tenKhachHang,
                  phoneNumber: item.dienThoai,
                  address: item.diaChi,
                  oldIndex: item.chiSoDongHo.chiSoCu,
                  newIndex: item.chiSoDongHo.chiSoMoi,
                  consumption: item.tieuThu,
                  codePrice: item.tenDoiTuongGia,
                };
              })}
              columns={columns}
              pagination={{
                total: invoiceListSelector?.totalCount,
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
            <DetailInvoice open={open} onClose={onClose} />
          </div>
        </>
      )}

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
      {/* </div> */}
      {/* <InvoicingDetailsModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        data={initialData}
      /> */}
    </>
  );
}
export default InvoicePrint;
