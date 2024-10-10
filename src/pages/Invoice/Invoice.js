import { PictureOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Collapse,
  Popover,
  Progress,
  Row,
  Table,
  Tooltip,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { DetailInvoice } from "./Detail_Invoice/Detail_Invoice";
import { Instalments } from "./Instalments/Instalments";
import { CalculateMoney } from "./CalculateMoney/CalculateMoney";
import "./Invoice.css";
import { AddInvoice } from "./AddInvoice/AddInvoice";
import { EditInvoice } from "./EditInvoice/EditInvoice";
import { ModalMessage } from "./SendMessage/ModalMessage";
// import { data } from "../../utils/dataTableInvoice";
import { WaterStatus } from "./WaterStatus/WaterStatus";
import { AdvancedSearchForm as FormSearchInvoice } from "../../components/FormSearchInvoice/FormSearchInvoice";
import { FooterInvoice } from "../../components/Footer/FooterInvoice";
import { useMediaQuery } from "react-responsive";
import { ModalIndexBarInvoice } from "./ModalIndexBar/ModalIndexBar";
import { ViewInvoice } from "./ViewInvoice/ViewInvoice";
import LedgerPage from "./Ledger/Ledger";
import tabListInvoicePrintSlice from "../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  getInvoiceList,
  getStatisticForChart,
  getViewInvoiceDetail,
  isLoadingInvoiceListSelector,
  userIdSelector,
} from "../../redux/selector";
import { getRequest, postRequest } from "../../services";
import { gql } from "@apollo/client";
import apolloClient from "../../config/apolloClient";
import {
  fetchApiGetAllHoaDon,
  fetchFilterListInvoice,
  fetchFilterListInvoice2,
  fetchListContract,
  fetchListInvoice,
  fetchStatisticInvoice,
  invoiceSlice,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import {
  fetchViewInvoiceDetail,
  printInvoiceSlice,
} from "../../redux/slices/printInvoice/printInvoiceSlice";
import moment from "moment";
import dayjs from "dayjs";
import ApproveInvoice from "./ApproveInvoice/ApproveInvoice";
import PaymentInvoice from "./PaymentInvoice/PaymentInvoice";
import CancelPaymentInvoice from "./CancelPaymentInvoice/CancelPaymentInvoice";
import CreateSMSMultiple from "./SMSMultiple/CreateSMSMultiple";
import CreateSMS from "./SMS/CreateSMS";
import { fetchApiFilterSoDocBinhThuong } from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { PrintInvoice } from "../PrintInvoice/PrintInvoice";
import InvoiceImageModal from "./InvoiceImageModal/InvoiceImageModal";

const Invoice = () => {
  const dispatch = useDispatch();
  const pageSize = 10;
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [isOpenModalBill, setIsOpenModalBill] = useState(false);
  const [isOpenPrint, setIsOpenPrint] = useState(false);
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
  const [isOpenModalDuyetHoaDon, setIsOpenModalDuyetHoaDon] = useState(false);
  const [isOpenModalThanhToan, setIsOpenModalThanhToan] = useState(false);
  const [isOpenModalHuyThanhToan, setIsOpenModalHuyThanhToan] = useState(false);
  const [isOpenModalSMSDongLoat, setIsOpenModalSMSDongLoat] = useState(false);
  const [isOpenModalSMSRiengLe, setIsOpenModalSMSRiengLe] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [recordData, setRecordData] = useState(null);
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const invoiceListSelector = useSelector(getInvoiceList);
  const isLoadingInvoiceList = useSelector(isLoadingInvoiceListSelector);
  const userId = sessionStorage.getItem("userId");
  const statisticData = useSelector(getStatisticForChart);

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
    setIsOpenModalSMSDongLoat(false);
    setIsOpenModalSMSRiengLe(false);
    dispatch(invoiceSlice.actions.resetSMS());
    dispatch(fetchFilterListInvoice2());
    dispatch(
      fetchApiFilterSoDocBinhThuong({
        values: null,
        nhaMayId: null,
      })
    );
    setIsOpenPrint(false);
  };
  const paymentStatus = (status) => {
    switch (status) {
      case 1:
        return "Chưa thanh toán";
      case 2:
        return "Đã thanh toán";
      case 3:
        return "Chưa duyệt";
      default:
        return "";
    }
  };
  const sendStatus = (status) => {
    switch (status) {
      case 1:
        return "Chưa gửi";
      case 2:
        return "Thành Công";
      case 3:
        return "Thất bại";
      case 4:
        return "Đang gửi"
      default:
        return "";
    }
  };
  const handleShowImage = (record) => {
    setRecordData(record);
    setShowImageModal(true);
  };
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "",
      dataIndex: "icons",
      key: "icons",
      width: 90,
      render: (text, record) => {
        return(
          <PictureOutlined
          style={{ fontSize: "21px", marginRight: "5px" }}
          onClick={() => handleShowImage(record)}
        />
        )
      }
    },
    {
      title: "Đã TT",
      dataIndex: "paid",
      key: "paid",
      render: (text, record) => paymentStatus(record.paid),
    },
    {
      title: "Trạng thái gửi",
      dataIndex: "trangThaiGui",
      key: "trangThaiGui",
      render: (text, record) => sendStatus(record.trangThaiGui),
    },
    {
      title: "Ngày HĐ",
      dataIndex: "contractDate",
      key: "contractDate",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Số hợp đồng",
      dataIndex: "contractNumber",
      key: "contractNumber",
    },
    {
      title: "Mã ĐH",
      dataIndex: "codeClock",
      key: "codeClock",
    },
    {
      title: "Tuyến đọc",
      dataIndex: "readingRoute",
      key: "readingRoute",
    },
    {
      title: "Tên KH",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Mã ĐT giá",
      dataIndex: "codePrice",
      key: "codePrice",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Phí DTĐN",
      dataIndex: "phiDTDN",
      key: "phiDTDN",
    },
    {
      title: "Phí BVMT",
      dataIndex: "phiBVMT",
      key: "phiBVMT",
    },
    {
      title: "Phí VAT",
      dataIndex: "phiVAT",
      key: "phiVAT",
    },

    {
      title: "Số hóa đơn",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Seri hóa đơn",
      dataIndex: "invoiceSeri",
      key: "invoiceSeri",
    },
    {
      title: "Ngày lập HĐ",
      dataIndex: "createDate",
      key: "createDate",
    },

    {
      title: "Ngày đầu kỳ",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày cuối kỳ",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Người thu tiền",
      dataIndex: "collector",
      key: "collector",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const [openFooter, setOpenFooter] = useState(false);
  const [paramString, setParamString] = useState(null);
  const [selectedNewIndex, setNewIndex] = useState(null);
  const [selectedOldIndex, setOldIndex] = useState(null);

  const hide = () => {
    setOpenFooter(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpenFooter(newOpen);
  };

  const renderFooter = () => (
    <FooterInvoice
      setIsOpenPrint={setIsOpenPrint}
      setIsOpenModalHuyThanhToan={setIsOpenModalHuyThanhToan}
      setIsOpenModalSMSDongLoat={setIsOpenModalSMSDongLoat}
      setIsOpenModalSMSRiengLe={setIsOpenModalSMSRiengLe}
      setIsOpenModalBill={setIsOpenModalBill}
      setIsModalInstalmentsOpen={setIsModalInstalmentsOpen}
      setIsOpenModalAddInvoice={setIsOpenModalAddInvoice}
      setIsOpenModalEditInvoice={setIsOpenModalEditInvoice}
      setIsOpenModalWaterStatus={setIsOpenModalWaterStatus}
      setIsOpenModalThanhToan={setIsOpenModalThanhToan}
      setIsOpenModalDuyetHoaDon={setIsOpenModalDuyetHoaDon}
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

    return `${queryString}`;
  };

  // useEffect(() => {
  //   fetchInvoiceListByFactotyID();
  // }, []);

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  useEffect(() => {
    if (rowSelection) {
      const idHoaDon = rowSelection.id;
      dispatch(fetchViewInvoiceDetail(idHoaDon));
    }
  }, [rowSelection]);

  useEffect(() => {
    fetchInvoiceListByFactotyID();
  }, [clickReset]);

  const fetchInvoiceListByFactotyID = () => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
    const year = currentDate.getFullYear().toString();
    const thangnam1 = `${month}/${year}`;
    const thangNam = encodeURIComponent(thangnam1);
    const factoryURI = createFactoryQueryString().replaceAll(
      "nhaMayIds",
      "NhaMayIds"
    );
    const queryString = `ThangTaoHoaDon=${thangNam}&invoiceParameter.PageNumber=1&invoiceParameter.PageSize=${pageSize}&${factoryURI}`;
    dispatch(fetchFilterListInvoice(queryString));
    // dispatch(fetchListContract(createFactoryQueryString()));
    setParamString(queryString);
    // setIsFilter(false);
  };

  const fetchFilterInvoiceList = (formValue) => {
    const factoryURI = createFactoryQueryString();
    const formValueURI = createFilterQueryString(formValue);
    const queryString = `${formValueURI}&${factoryURI}&invoiceParameter.PageSize=10&invoiceParameter.PageNumber=1`;
    dispatch(fetchFilterListInvoice(queryString));
    dispatch(fetchStatisticInvoice(queryString));
    setParamString(queryString);
    dispatch(
      invoiceSlice.actions.setThangNamInvoice(
        decodeURIComponent(formValue.ThangTaoHoaDon)
      )
    );
    dispatch(invoiceSlice.actions.setTuyenDocIdInvoice(formValue.TuyenDocId));
    setThangTaoSoDocField(decodeURIComponent(formValue.ThangTaoHoaDon));
    setCurPage(1);
    // setIsFilter(true);
  };

  useEffect(() => {
    dispatch(fetchStatisticInvoice());
  }, []);

  function handleReset() {
    setClickReset(!clickReset);
    setCurPage(1);
  }

  useEffect(() => {
    handleReset();
  }, [factoryID]);

  const handlePageChange = (page) => {
    setCurPage(page);
    const newQueryString = paramString.replace(
      "PageNumber=1",
      `PageNumber=${page}`
    );
    dispatch(fetchFilterListInvoice(newQueryString));
  };
  const formatNumberWithCommas = (number) => {
    if (number !== undefined && number !== null) {
      return number.toLocaleString("en-US");
    } else {
      return ""; // or any default value you prefer
    }
  };

  console.log("statisticData", statisticData);
  
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
                    setRowSelection={setRowSelection}
                    setClickReset={handleReset}
                    fetchFilterInvoiceList={fetchFilterInvoiceList}
                    setCurPage={setCurPage}
                    setIsFilter={setIsFilter}
                    setFilterData={setFilterData}
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
                    paymentDate:
                        item.ngayThanhToan !== null
                            ? dayjs(item.ngayThanhToan).format("DD/MM/YYYY HH:mm:ss")
                            : null,
                    readingRoute: item.tuyenDoc,
                    username: item.tenKhachHang,
                    phoneNumber: item.dienThoai,
                    address: item.diaChi,
                    oldIndex: item.chiSoDongHo.chiSoCu,
                    newIndex: item.chiSoDongHo.chiSoMoi,
                    consumption: item.tieuThu,
                    codePrice: item.tenDoiTuongGia,
                    totalAmount: item.tongTienTruocVat?.toLocaleString("en-US"),
                    phiVAT: item.vat?.toLocaleString("en-US"),
                    invoiceNumber: item.soHoaDon,
                    invoiceSeri: item?.responseDanhMucSeriHoaDon?.soHoaDon,
                    phiBVMT: item.phiBvmt?.toLocaleString("en-US"),
                    phiDTDN: item.phiDtdn?.toLocaleString("en-US"),
                    totalPrice: item.tongTienPhiDuyTriSauVAT ? item.tongTienPhiDuyTriSauVAT.toLocaleString("en-US") : item.tongTienHoaDon?.toLocaleString("en-US"),
                    createDate: dayjs(item.ngayDoc).format("DD/MM/YYYY"),
                    contractDate:
                        item.ngayHoaDon === null
                            ? ""
                            : dayjs(item.ngayHoaDon).format("DD/MM/YYYY"),
                    startDate:
                        item.ngayDauKy === null
                            ? ""
                            : dayjs(item.ngayDauKy).format("DD/MM/YYYY"),
                    endDate:
                        item.ngayCuoiKy === null
                            ? ""
                            : dayjs(item.ngayCuoiKy).format("DD/MM/YYYY"),
                    paid: item.trangThai,
                    collector: item?.tenNguoiThuTien,
                    note: item?.ghiChu,
                    trangThaiGui: item?.trangThaiGui,
                    imageUrl: item?.chiSoDongHo?.imageUrl,
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
                          setClickReset(!clickReset);
                          setCurPage(1);
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
      <Row gutter={[16, 16]} style={{ marginTop: "20px", justifyContent:"space-between" }}>
        <Col span={4}>
          <Tooltip title="Tổng Tiền Chứa Vat">
            <Card style={{ backgroundColor: "#D37676" }} size="small">
              {statisticData
                ? formatNumberWithCommas(statisticData.tongTienChuaVat) +
                  " " +
                  "VNĐ"
                : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title="Tổng Tiêu Thụ">
            <Card style={{ backgroundColor: "#9BB0C1" }} size="small">
              {statisticData ? statisticData.tongTieuThu : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title="Tổng Phí VAT">
            <Card style={{ backgroundColor: "#C5EBAA" }} size="small">
              {statisticData
                ? formatNumberWithCommas(statisticData.tongPhiVat) +
                  " " +
                  "VNĐ"
                : ""}
            </Card>
          </Tooltip>
        </Col>

        <Col span={4}>
          <Tooltip title="Tổng Phí BVMT">
            <Card style={{ backgroundColor: "#FFBE98" }} size="small">
            {statisticData
                ? formatNumberWithCommas(statisticData.tongPhiBVMT) +
                  " " +
                  "VNĐ"
                : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title="Tổng Thanh Tiền">
            <Card style={{ backgroundColor: "#E493B3" }} size="small">
            {statisticData
                ? formatNumberWithCommas(statisticData.tongThanhTien) +
                  " " +
                  "VNĐ"
                : ""}
            </Card>
          </Tooltip>
        </Col>
      </Row>
      {/* Footer */}
      <div className="contract-bottom-func" style={{ zIndex: 999 }}>
        {isTabletOrMobile ? (
          <Popover
            placement="bottomRight"
            rootClassName="fix-popover-z-index"
            trigger="click"
            content={renderFooter()}
            open={openFooter}
            onOpenChange={handleOpenChange}
          >
            <PlusOutlined />
          </Popover>
        ) : (
          <div
            style={{
              zIndex: 999,
            }}
            className="contract-bottom"
          >
            {renderFooter()}
          </div>
        )}
      </div>
      <InvoiceImageModal
      setShowImageModal={setShowImageModal}
      showImageModal={showImageModal}
      recordData={recordData}
      ></InvoiceImageModal>
      <ApproveInvoice
        setIsOpenModalDuyetHoaDon={setIsOpenModalDuyetHoaDon}
        isOpenModalDuyetHoaDon={isOpenModalDuyetHoaDon}
        setRowSelection={setRowSelection}
        filterData={filterData}
        fetchFilterInvoiceList={fetchFilterInvoiceList}
      />
      <PaymentInvoice
        setIsOpenModalThanhToan={setIsOpenModalThanhToan}
        isOpenModalThanhToan={isOpenModalThanhToan}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        filterData={filterData}
        fetchFilterInvoiceList={fetchFilterInvoiceList}
      />

      <CancelPaymentInvoice
        setIsOpenModalHuyThanhToan={setIsOpenModalHuyThanhToan}
        isOpenModalHuyThanhToan={isOpenModalHuyThanhToan}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        filterData={filterData}
        fetchFilterInvoiceList={fetchFilterInvoiceList}
      />

      <CalculateMoney
        handleCancel={handleCancel}
        handleOk={handleOk}
        isOpen={isOpenModalBill}
        rowSelection={rowSelection}
      />
      <Instalments
        handleCancel={handleCancel}
        handleOk={handleOk}
        isOpen={isModalInstalmentsOpen}
      />
      <AddInvoice
        handleCancel={handleCancel}
        handleOk={handleOk}
        isOpen={isOpenModalAddInvoice}
        rowSelection={rowSelection}
      />
      <EditInvoice
        isOpenEdit={isOpenModalEditInvoice}
        setIsOpenModalEditInvoice={setIsOpenModalEditInvoice}
        rowSelection={rowSelection}
      />
      <ViewInvoice
        handleCancel={handleCancel}
        isOpen={isOpenModalViewInvoice}
        rowSelection={rowSelection}
      />
      <CreateSMSMultiple
        handleCancel={handleCancel}
        isOpen={isOpenModalSMSDongLoat}
      />
      <CreateSMS handleCancel={handleCancel} isOpen={isOpenModalSMSRiengLe} />
      <ModalMessage
        isModalEmail={isModalEmail}
        setIsModalEmail={setIsModalEmail}
        isModalSMS={isModalSMS}
        setIsModalSMS={setIsModalSMS}
      />
      <WaterStatus
        isOpen={isOpenModalWaterStatus}
        setIsOpen={setIsOpenModalWaterStatus}
      />
      <ModalIndexBarInvoice
        isOpen={isOpenModalInvoiceBar}
        setIsOpen={setIsOpenModalInvoiceBar}
      />
      <PrintInvoice
        handleCancel={handleCancel}
        isOpen={isOpenPrint}
        // rowSelection={rowSelection}
      />
      {isOpenModalLedger && (
        <LedgerPage setIsOpenModalLedger={setIsOpenModalLedger} />
      )}
    </>
  );
};
export default Invoice;
