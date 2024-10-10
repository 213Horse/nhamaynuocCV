import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table, Tooltip } from "antd";
import { RedoOutlined, UnlockOutlined } from "@ant-design/icons";

import "./TableListPayment.css";
import { dataOnModalDoubleClick, dataPayment } from "../../utils/dataPayment";
import CustomRowTooltip from "../CustomRowTooltip/CustomRowTooltip";
import tabListContractSlice from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListContractSelector,
  getListPaymentSelector,
  getPaymentDetailSelector,
  getQueryPaymentList,
  getSelectBillCollectorOptions,
  getSelectPaymentTypeOptions,
  getTotalPageOfPaymentList,
  isLoadingPaymentDetailSelector,
  isLoadingPaymentListSelector,
} from "../../redux/selector";
import { formatPrice } from "../../utils/formatPrice";
import {
  fetchFilterListPayment,
  fetchPaymentDetail,
} from "../../redux/slices/paymentSlice/paymentSlice";
import { formatDate } from "../../utils/formatDateToString";
import dayjs from "dayjs";

function TableListPayment() {
  const dispatch = useDispatch();

  const pageSize = 10;

  //get selector
  const listPaymentSelector = useSelector(getListPaymentSelector);
  const queryPaymentListSelector = useSelector(getQueryPaymentList);
  const paymentDetailSelector = useSelector(getPaymentDetailSelector);
  const selectBillCollectorOptionsSelector = useSelector(
    getSelectBillCollectorOptions
  );
  const selectPaymentTypeOptionsSelector = useSelector(
    getSelectPaymentTypeOptions
  );
  const tabList = useSelector(btnClickTabListContractSelector);
  const totalPageOfPaymentListSelector = useSelector(getTotalPageOfPaymentList);

  //get loading data status
  const isLoadingPaymentList = useSelector(isLoadingPaymentListSelector);
  const isLoadingPaymentDetail = useSelector(isLoadingPaymentDetailSelector);

  //State
  const [paymentList, setPaymentList] = useState([]);
  const [paymentTableTotalPage, setPaymentTableTotalPage] = useState("1");
  const [modalDoubleClick, setModalDoubleClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      title: "",
      render: () => {
        return (
          <Button className="contract-tbl-icon-btn">
            <UnlockOutlined />
          </Button>
        );
      },
    },
    {
      key: "status_payment",
      title: "Thanh toán",
      dataIndex: "status_payment",
    },
    {
      key: "fall_day",
      title: "Ngày thu",
      dataIndex: "fall_day",
    },
    {
      key: "collector",
      title: "Người thu",
      dataIndex: "collector",
    },
    {
      key: "total",
      title: "Tổng tiền",
      dataIndex: "total",
    },
    {
      key: "amount_spent",
      title: "Số tiền đã TT",
      dataIndex: "amount_spent",
    },
    {
      key: "code_contract",
      title: "Số hợp đồng",
      dataIndex: "code_contract",
    },
    {
      key: "line_reading",
      title: "Tuyến đọc",
      dataIndex: "line_reading",
    },
    {
      key: "fullName",
      title: "Tên khách hàng",
      dataIndex: "fullName",
    },
    {
      key: "phoneNumber",
      title: "Điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      key: "address",
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      key: "phone",
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      key: "payments",
      title: "Hình thức TT",
      dataIndex: "payments",
    },
    {
      key: "seri_bill",
      title: "Seri hóa đơn",
      dataIndex: "seri_bill",
    },
    {
      key: "num_bill",
      title: "Số hóa đơn",
      dataIndex: "num_bill",
    },
    {
      key: "consume",
      title: "Tiêu thụ",
      dataIndex: "consume",
    },
    {
      key: "into_money",
      title: "Thành tiền",
      dataIndex: "into_money",
    },
    {
      key: "dtdn",
      title: "Phí DTĐN",
      dataIndex: "dtdn",
    },
    {
      key: "bvmt",
      title: "Phí BVMT",
      dataIndex: "bvmt",
    },
    {
      key: "vat",
      title: "Phí VAT",
      dataIndex: "vat",
    },
    {
      key: "date_of_contract",
      title: "Ngày lập HĐ",
      dataIndex: "date_of_contract",
    },
    {
      key: "note",
      title: "Ghi chú TT",
      dataIndex: "note",
    },
  ];

  const colsTblModalDoubleClick = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "category",
      title: "Hạng mục",
      dataIndex: "category",
    },
    {
      key: "quantity",
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      key: "price",
      title: "Đơn giá",
      dataIndex: "price",
    },
    {
      key: "into_money",
      title: "Thành tiền",
      dataIndex: "into_money",
    },
  ];

  // The first load data list payment
  useEffect(() => {
    setPaymentList(listPaymentSelector);
    setPaymentTableTotalPage(totalPageOfPaymentListSelector);
    console.log(listPaymentSelector);
  }, [listPaymentSelector]);

  // Function to find the name based on an id
  const getBillCollectorName = (id) => {
    const billCollector = selectBillCollectorOptionsSelector.nodes.find(
      (element) => element.id === id
    );

    if (billCollector) {
      return billCollector.normalizedUserName;
    } else {
      return "";
    }
  };

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
    const newQuery = queryPaymentListSelector.replace(
      "pageNumber=1",
      `pageNumber=${page}`
    );
    dispatch(fetchFilterListPayment(newQuery));
  };

  // hide modal double clicked
  const hideModalDoubleClick = () => {
    setModalDoubleClick(false);
  };

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListContractSlice.actions.btnClickTabListContract(selectedRows[0])
    );
  };

  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
  };

  const handleShowPaymentDetail = (paymentDetail) => {
    console.log(paymentDetail);
    const testId = "006581a6-be0a-4d33-bbb5-e8439cc049e1";
    dispatch(fetchPaymentDetail(paymentDetail.id));
    console.log(paymentDetailSelector);
    setModalDoubleClick(true);
  };

  //get status payment name by status payment id
  const getStatusPayementName = (id) => {
    if (id === 1) {
      return "Chưa TT";
    } else if (id === 2) {
      return "Đã TT";
    }
  };

  const getPaymentNameById = (id) => {
    const paymentName = selectPaymentTypeOptionsSelector.find(
      (element) => element.id === id
    );

    if (paymentName) {
      return paymentName.moTaPhuongThuc;
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="container-tbl-payment">
        {/* Table payment main */}
        <Table
          columns={cols}
          dataSource={
            paymentList &&
            paymentList.map((_pay, index) => ({
              index: pageSize * (currentPage - 1) + (index + 1), //set index table
              status_payment: getStatusPayementName(_pay.trangThaiThanhToan),
              fall_day: dayjs(_pay.ngayThu).format("DD/MM/YYYY") == "Invalid Date" ? "" :  dayjs(_pay.ngayThu).format("DD/MM/YYYY"),
              collector: getBillCollectorName(_pay.nguoiThuTienId),
              total: formatPrice(_pay.tongTien),
              amount_spent: formatPrice(_pay.tienDaThanhToan),
              code_contract: _pay.hopDongKeyId,
              line_reading: _pay.tuyenDocKeyId,
              fullName: _pay.tenKhachHang,
              phoneNumber: _pay.dienThoai,
              address: _pay.diaChi,
              phone: _pay.dienThoai,
              payments: getPaymentNameById(_pay.phuongThucThanhToanId),
              seri_bill: _pay.seriHoaDon,
              num_bill: _pay.hoaDonKeyId.split(".")[0],
              consume: _pay.tieuThu,
              into_money: formatPrice(_pay.tongTienTruocVat),
              dtdn: _pay.phiBvmt,
              bvmt: _pay.phiDtdn,
              vat: _pay.phiVAT,
              date_of_contract: formatDate(new Date(_pay.ngayLapHD)),
              note: _pay.ghiChu,
              id: _pay.id,
            }))
          }
          rowKey="index"
          components={{
            body: {
              row: CustomRowTooltip,
            },
          }}
          onRow={(record, index) => {
            return {
              onDoubleClick: () => {
                handleShowPaymentDetail(record);
              },
              onClick: () => {
                dispatch(
                  tabListContractSlice.actions.btnClickTabListContract({
                    ...record,
                  }) // clicked row to check radio
                );
              },
            };
          }}
          loading={isLoadingPaymentList}
          pagination={{
            pageSize: pageSize,
            onChange: (page) => handlePageChange(page),
            total: pageSize * paymentTableTotalPage,
            currentPage: currentPage,
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
            selectedRowKeys: tabList ? [tabList.index] : [],
          }}
          size="small"
          scroll={{
            x: 2600,
          }}
        ></Table>
      </div>

      {/* Show modal when double click on row (Thanh toán)  */}
      <Modal
        open={modalDoubleClick}
        onCancel={hideModalDoubleClick}
        width={1600}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {/* render table */}
        <Table
          columns={colsTblModalDoubleClick}
          dataSource={
            paymentDetailSelector &&
            paymentDetailSelector.map((_payChild, index) => ({
              index: index + 1,
              category: _payChild.hangMuc,
              quantity: _payChild.soLuong,
              price: formatPrice(_payChild.donGia),
              into_money: formatPrice(_payChild.thanhTien),
            }))
          }
          pagination={false}
          loading={isLoadingPaymentDetail}
          rowKey="index"
          size="small"
        ></Table>
      </Modal>
    </>
  );
}

export default TableListPayment;
