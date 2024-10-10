import {
  CloseOutlined,
  RedoOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Modal, Form, Input, Table, Button, theme, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  fetchFilterInHoaDon,
  fetchFilterInKetHoaDon,
  fetchListInvoicePrint,
} from "../../../../redux/slices/invoicePrintSlice/invoicePrintSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  btnClickGetFactoryIdSelector,
  getInvoicePrintList,
  isLoadingInvoicePrintListSelector,
} from "../../../../redux/selector";
import moment from "moment";
import { PrintBill } from "../PrintBill/PrintBill";

const ListInvoicePrint = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  // const columns = [
  //   {
  //     title: "#",
  //     dataIndex: "order",
  //     key: "order",
  //     width: 70,
  //   },
  //   {
  //     title: "Mã tuyến đọc",
  //     dataIndex: "mtd",
  //     key: "mtd",
  //   },
  //   {
  //     title: "Số hợp đồng",
  //     dataIndex: "contractNumber",
  //     key: "contractNumber",
  //   },
  //   {
  //     title: "Mã ĐH",
  //     dataIndex: "mdh",
  //     key: "mdh",
  //   },
  //   {
  //     title: "Tên KH",
  //     dataIndex: "customerName",
  //     key: "customerName",
  //   },
  //   {
  //     title: "Địa chỉ",
  //     dataIndex: "address",
  //     key: "address",
  //   },
  //   {
  //     title: "Tiêu thụ",
  //     dataIndex: "consumption",
  //     key: "consumption",
  //   },
  //   {
  //     title: "Thành tiền",
  //     dataIndex: "amountDue",
  //     key: "amountDue",
  //   },
  //   {
  //     title: "Phí ĐTĐN",
  //     dataIndex: "dtdn",
  //     key: "dtdn",
  //   },
  //   {
  //     title: "Phí VAT",
  //     dataIndex: "vatFee",
  //     key: "vatFee",
  //   },
  //   {
  //     title: "Phí BVMT",
  //     dataIndex: "environmentalFee",
  //     key: "environmentalFee",
  //   },
  //   {
  //     title: "Tổng tiền",
  //     dataIndex: "totalAmountDue",
  //     key: "totalAmountDue",
  //   },
  //   {
  //     title: "Ghi chú",
  //     dataIndex: "notes",
  //     key: "notes",
  //   },
  // ];
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Ngày đầu kỳ",
      dataIndex: "ngayDauKy",
      key: "ngayDauKy",
    },
    {
      title: "Ngày cuối kỳ",
      dataIndex: "ngayCuoiKy",
      key: "ngayCuoiKy",
    },
    {
      title: "Số hóa đơn",
      dataIndex: "soHoaDon",
      key: "soHoaDon",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Tuyến",
      dataIndex: "tuyen",
      key: "tuyen",
    },
    {
      title: "Địa chỉ nhà máy",
      dataIndex: "diaChiNhaMay",
      key: "diaChiNhaMay",
    },
    {
      title: "Mã số khách hàng",
      dataIndex: "maSoKhachHang",
      key: "maSoKhachHang",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "chiSoMoi",
      key: "chiSoMoi",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "chiSoCu",
      key: "chiSoCu",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "tieuThu",
      key: "tieuThu",
    },
    {
      title: "Vat",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Vat",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Phí Vat",
      dataIndex: "phiVat",
      key: "phiVat",
    },
    {
      title: "Tổng tiền thanh toán",
      dataIndex: "phtongTienThanhToaniVat",
      key: "tongTienThanhToan",
    },
  ];
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCancel = (_, type) => {
    setIsOpenModal(false);
  };
  const pageSize = 10;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isFilter, setIsFilter] = useState(false);
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const invoicePrintListSelector = useSelector(getInvoicePrintList);
  const isLoadingInvoicePrintList = useSelector(
    isLoadingInvoicePrintListSelector
  );
  const [paramString, setParamString] = useState(null);
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

  const fetchFilterInvoiceList = (formValue) => {
    const factoryURI = createFactoryQueryString();
    const formValueURI = createFilterQueryString(formValue);
    const queryString = `${formValueURI}&${factoryURI}&invoiceParameter.pageSize=10&invoiceParameter.PageNumber=1`;
    dispatch(fetchFilterInKetHoaDon(queryString));
    setParamString(queryString);
    setIsFilter(true);
  };
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
      dispatch(fetchFilterInHoaDon(newQueryString));
    } else {
      dispatch(fetchListInvoicePrint(newQueryString));
    }
  };
  return (
    <Modal
      title="Danh sách hóa đơn in"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      height={500}
    >
      <Table
        style={{
          whiteSpace: "nowrap",
        }}
        loading={isLoadingInvoicePrintList}
        rowKey="stt"
        bordered
        dataSource={invoicePrintListSelector?.items?.map((item, index) => {
          return {
            id: item.id,
            keyId: item.keyId,
            stt: pageSize * (curPage - 1) + (index + 1),
            ngayDauKy: item.ngayDauKy
              ? moment(item.ngayDauKy).format("DD/MM/YYYY")
              : null,
            ngayCuoiKy: item.ngayCuoiKy
              ? moment(item.ngayCuoiKy).format("DD/MM/YYYY")
              : null,
            soHoaDon: item.soHoaDon,
            tenKhachHang: item.tenKhachHang,
            diaChi: item.diaChi,
            tuyen: item.tuyen,
            diaChiNhaMay: item.diaChiNhaMay,
            tenKhachHmaSoKhachHangang: item.maSoKhachHang,
            dienThoaiKhachHang: item.dienThoaiKhachHang,
            chiSoMoi: item.chiSoMoi,
            chiSoCu: item.chiSoCu,
            tieuThu: item.tieuThu,
            vat: item.vat,
            phiVat: item.phiVat,
            tongTienThanhToan: item.tongTienThanhToan,
          };
        })}
        pagination={{
          total: invoicePrintListSelector?.totalCount,
          pageSize: 10,
          current: curPage,
          onChange: (page, pageSize) => {
            handlePageChange(page);
          },
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
              setIsOpenModal(true);
            },
          };
        }}
        size="small"
        scroll={{ x: 2000, y: 400 }}
        columns={columns}
      />

      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          icon={<CloseOutlined />}
          className="custom-btn-close-d"
          onClick={onCancel}
          style={{ marginLeft: "10px" }}
        >
          Đóng
        </Button>
      </Row>
      <PrintBill
        handleCancel={handleCancel}
        isOpen={isOpenModal}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};
export default ListInvoicePrint;
