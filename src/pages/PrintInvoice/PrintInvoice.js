import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  btnClickGetFactoryIdSelector,
  btnClickGetViewInvoiceListSelector,
  fetchApiFilterSoDocBinhThuongSelector,
  fetchApiGetNgayTrongSoDocTheoKySelector,
  getAllKySelector,
  getCanBoDoc,
  getInvoiceList,
  getInvoiceList2,
  getKeyIdTuyenDoc,
  isLoadingInvoiceListSelector,
  setOptionThangNamSelector,
} from "../../redux/selector";
import { getAllKy } from "../../redux/slices/DMKy/kySlice";
import { fetchCanBoDoc } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import dayjs from "dayjs";
import { fetchApiTaoSoDocBinhThuong } from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { toast } from "react-toastify";
import { SearchForm } from "../ReadingIndex/CreateBook/SearchForm";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { AdvancedSearchForm as FormSearchInvoice } from "../../components/FormSearchPrintInvoice/FormSearchPrintInvoice";
import {
  fetchFilterListInvoice,
  fetchFilterListInvoice2,
  fetchListInvoice,
  fetchViewInvoiceList,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import ViewPrintInvoice from "../Invoice/ViewPrintInvoice/ViewPrintInvoice";
export const PrintInvoice = (props) => {
  const { isOpen, canBoDocs, handleCancel } = props;
  const [formMain] = Form.useForm();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const invoiceListSelector = useSelector(getInvoiceList2);
  const isLoadingInvoiceList = useSelector(isLoadingInvoiceListSelector);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowSelection, setRowSelection] = useState([]);
  const [paramString, setParamString] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const pageSize = 10;
  const dispatch = useDispatch();
  const dsSoDocBinhThuong = useSelector(fetchApiFilterSoDocBinhThuongSelector);
  const optionThangNam = useSelector(setOptionThangNamSelector);
  const dataOptionThangNam = useSelector(
    fetchApiGetNgayTrongSoDocTheoKySelector
  );
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dataViewInvoiceList = useSelector(btnClickGetViewInvoiceListSelector);
  const { token } = theme.useToken();
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const createFilter = (formData) => {
    let factoryQueryString = `ThangTaoHoaDon=${formData.ThangTaoHoaDon}`;
    if (formData.TuyenDocId) {
      factoryQueryString += `&TuyenDocId=${formData.TuyenDocId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(getAllKy(queryString));
    dispatch(fetchCanBoDoc(queryString));
  }, [nhaMayId]);

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Đã TT",
      dataIndex: "paid",
      key: "paid",
    },
    {
      title: "Ngày HĐ",
      dataIndex: "contractDate",
      key: "contractDate",
      width: 150,
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
      width:200,
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
      // width: 'auto',
      ellipsis: true,
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
      ellipsis: true,
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
      width:80,
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
      width:80,

    },
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
      width:80,
    },
    {
      title: "Mã ĐT giá",
      dataIndex: "codePrice",
      key: "codePrice",
      width:80,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width:80,
    },
    {
      title: "Phí DTĐN",
      dataIndex: "phiDTDN",
      key: "phiDTDN",
      width:80,
    },
    {
      title: "Phí BVMT",
      dataIndex: "phiBVMT",
      key: "phiBVMT",
      width:80,
    },
    {
      title: "Phí VAT",
      dataIndex: "phiVAT",
      key: "phiVAT",
      width:80,
    },
    {
      title: "Số hóa đơn",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width:90,
    },
    {
      title: "Seri hóa đơn",
      dataIndex: "invoiceSeri",
      key: "invoiceSeri",
      width:90,
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
      width:100,
    },
    {
      title: "Ngày cuối kỳ",
      dataIndex: "endDate",
      key: "endDate",
      width:100,
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

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys); // list hợp đồng id.
    // setTuyenDocId(selectedRows[0]?.tuyenDocId); // tuyến đọc id.
    setRowSelection(selectedRows);
  };

  const rowSelection1 = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [clickReset, setClickReset] = useState(false);
  const [curPage, setCurPage] = useState(1);

  function handleReset() {
    setClickReset(!clickReset);
    setCurPage(1);
  }
  const [isFilter, setIsFilter] = useState(false);
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

  const fetchFilterInvoiceList = (formValue) => {
    const factoryURI = createFilterQueryString();
    const formValueURI = createFilter(formValue);
    const queryString = `${formValueURI}&${factoryURI}&invoiceParameter.PageSize=10000&invoiceParameter.PageNumber=1`;
    dispatch(fetchFilterListInvoice2(queryString));
    setParamString(queryString);
    setIsFilter(true);
  };

  const handleViewInvoice = () => {
    const createString = () => {
      let hoaDonString = [];

      if (rowSelection.length > 0) {
        hoaDonString = rowSelection.map((hoaDon) => hoaDon.id);
      }

      console.log(hoaDonString);
      return JSON.stringify(hoaDonString); // Convert array to JSON string
    };

    const hoaDonIdsString = createString();

    // Định nghĩa hàm values và truyền hoaDonString vào đó
    const values = (hoaDonString) => {
      // Do something with hoaDonString in the values function
      console.log("Values function:", hoaDonString);
    };

    // Gọi hàm values và truyền hoaDonIdsString vào đó
    values(hoaDonIdsString);

    // Dispatching the action with the JSON string of IDs
    dispatch(fetchViewInvoiceList(hoaDonIdsString));

    console.log("Data invoice", dataViewInvoiceList);
  };

  return (
    <Modal
      title="In hóa đơn"
      open={isOpen}
      onOk={props.handleOk}
      onCancel={handleCancel}
      width={1700}
      footer={null}
      centered
    >
      <Collapse
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
        defaultActiveKey="1"
        size="small"
      />
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
            marginTop: "10px",
          }}
          columns={columns}
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
              totalPrice: item.tongTienHoaDon?.toLocaleString("en-US"),
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
              paid: item.trangThaiHoaDon,
              collector: item?.tenNguoiThuTien,
              note: item?.ghiChu,
            };
          })}
          pagination={false}
          size="small"
          tableLayout="auto"
          scroll={{
            x: 3500,
            y: 400,
          }}
          rowSelection={rowSelection1}
        />
      </div>

      <Row
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 16,
          width: "100%",
        }}
      >
        <Col
          style={{
            // marginTop: `${isMobile ? "10px" : ""}`,
            textAlign: "end",
          }}
          sm={24}
          md={24}
          lg={12}
        >
          {/* <Button
              onClick={props.handleCancel}
              style={{
                marginRight: 5,
                width: `${isMobile ? "100%" : ""}`,
                marginTop: `${isMobile ? "10px" : ""}`,
              }}
              icon={<FilePdfOutlined />}
              className="custom-btn-export"
            >
              Xuất bảng kê
            </Button> */}
          {/* <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              style={{
                marginRight: 5,
                width: `${isMobile ? "100%" : ""}`,
                marginTop: `${isMobile ? "10px" : ""}`,
              }}
              className="create-modal tab-item-readingIndex-1"
              onClick={handleTaoSoVaTaoTiep}
            >
              Tạo sổ và tạo tiếp
            </Button> */}
          <Button
            type="primary"
            key="TaoSoVaDong"
            onClick={() => {
              setOpenModal(true);
              handleViewInvoice();
            }}
            icon={<PlusCircleOutlined />}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isTabletOrMobile ? "10px" : ""}`,
            }}
            className="create-modal tab-item-readingIndex-1"
          >
            Xem hóa đơn
          </Button>
          <Button
            className="custom-btn-close"
            onClick={props.handleCancel}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
          >
            <CloseOutlined />
            Đóng
          </Button>
        </Col>
      </Row>
      <ViewPrintInvoice
        isOpen={openModal}
        setOpenModal={setOpenModal}
      ></ViewPrintInvoice>
    </Modal>
  );
};
