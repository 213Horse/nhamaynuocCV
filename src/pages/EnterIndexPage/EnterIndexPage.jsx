import { React, useCallback, useEffect, useState } from "react";
// import { initialData } from "../../utils/dataEnterIndexPage/data/data";
import TabListEP from "./FormEnterIndexPage/TableListEP";
import ImageModal from "./FormEnterIndexPage/ImageModel/ImageModel";
import "../../components/GlobalStyles/GlobalStyles.css";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

import viVN from "antd/es/date-picker/locale/vi_VN";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Select,
  InputNumber,
  Table,
  Popover,
  Collapse,
  Tooltip,
  AutoComplete,
  Card,
} from "antd";
import {
  SearchOutlined,
  RedoOutlined,
  PlusOutlined,
  PictureOutlined,
  LockOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./EnterIndexPage.css";
import "moment/locale/vi";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import tabListEnterIndexPageSlice, {
  fetchFilterListIndexPage,
} from "../../redux/slices/tabListEnterIndexPageSlice/tabListEnterIndexPageSlice";
import {
  btnClickTabListEnterIndexPageSelector,
  getContractKeyIdOptions,
  getFilterListIndexPage,
  getNameOrKeyIdOfCustomerOptions,
  getReadingNameOptions,
  getReadingStatusOptions,
  getSelectLineReadingOptions,
  getSelectMeterReaderOptions,
  getThongKeListIndexPage,
  isLoadingIndexTableSelector,
  refreshTableSelector,
} from "../../redux/selector";
import {
  fetchSelectLineReadingOptions,
  fetchSelectMeterReaderOptions,
} from "../../redux/slices/paymentSlice/paymentSlice";
import {
  setRefreshTable,
  setRowSelect,
} from "../../redux/slices/currentPageSlice/currentPageSlice";
import { AdvancedSearchForm } from "./FormFilter/FormFilterEnterIndex";

moment.locale("vi");
function renderDayformat(data) {
  if (!data) return "";
  return moment(data).format("DD/MM/YYYY - HH:mm:ss");
}
function EnterIndexPage() {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState(null);
  const nhaMayID = useSelector((state) => state.factorySlice.factoryId);
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [rowSelection, setRowSelection] = useState(null);
  const [rowSelectionKey, setRowSelectionKey] = useState(null);
  const tabList = useSelector(btnClickTabListEnterIndexPageSelector);
  const thongKeData = useSelector(getThongKeListIndexPage);
  console.log("thongke", thongKeData);
  const [params, setParams] = useState({
    nhaMayIds: "",
    pageNumber: 1,
    pageSize: pageSize,
  });

  //get data selector
  const indexPageList = useSelector(getFilterListIndexPage);

  //get loading data status
  const isLoadingIndexTable = useSelector(isLoadingIndexTableSelector);


  useEffect(() => {
    setIsLoadingTable(isLoadingIndexTable);
  }, [isLoadingIndexTable]);

  //

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  // const { token } = theme.useToken();
  const [form] = Form.useForm();
  // xu ly hinh anh
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [recordData, setRecordData] = useState(null);

  const handleShowImage = (imagePath, record) => {
    setSelectedImagePath(imagePath);
    setRecordData(record);
    setShowImageModal(true);
  };

  const handleMonthChange = (date) => {
    if (date) {
      form.setFieldsValue({ month: date.format("M/YYYY") });
    } else {
      form.setFieldsValue({ month: undefined });
    }
  };

  const { Option } = Select;

  const columns = [
    {
      title: "#",
      dataIndex: "order",
      key: "order",
      width: 40,
    },
    {
      title: "",
      dataIndex: "icons",
      key: "icons",
      width: 90,
      render: (text, record) => {
        const iconType = record?.tiLeTangGiamTieuThu;
        const iconTypeWithoutDecimals = String(iconType).replace(/(\.\d+)/, "");
        const info = `Sản lượng theo tháng ${
          iconType > 0 ? "giảm" : "tăng"
        } ${iconTypeWithoutDecimals}%`;

        return (
          <>
            <PictureOutlined
              style={{ fontSize: "21px", marginRight: "5px" }}
              onClick={() => handleShowImage(record.imagePath, record)}
            />
            <Tooltip title={info.includes("-") ? info.replace("-", "") : info}>
              {record?.tiLeTangGiamTieuThu < 0 ? (
                <CaretUpOutlined style={{ fontSize: "21px", color: "green" }} />
              ) : record?.tiLeTangGiamTieuThu > 0 ? (
                <CaretDownOutlined style={{ fontSize: "21px", color: "red" }} />
              ) : null}
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Tuyến đọc",
      dataIndex: "tenTuyen",
      key: "tenTuyen",
      width: "12%",
    },
    {
      title: "Seri đồng hồ",
      dataIndex: "seriDongHo",
      key: "seriDongHo",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
      width: "12%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
      width: "15%",
    },

    {
      title: "Chỉ số cũ",
      dataIndex: "chiSoCu",
      key: "chiSoCu",
      width: "4%",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "chiSoMoi",
      key: "chiSoMoi",
      width: "4%",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "tthu",
      key: "tthu",
      width: "4%",
    },
    {
      title: "Ngày đọc",
      dataIndex: "ngayDoc",
      key: "ngayDoc",
    },

    {
      title: "Ngày đầu kì",
      dataIndex: "ngayDauKy",
      key: "ngayDauKy",
    },
    {
      title: "Ngày cuối kì",
      dataIndex: "ngayCuoiKy",
      key: "ngayCuoiKy",
    },
    {
      title: "Trạng thái Ghi",
      dataIndex: "tenTrangThai",
      key: "tenTrangThai",
    },
    // {
    //   title: "Trạng thái ĐH",
    //   dataIndex: "trangThaiSuDung",
    //   key: "trangThaiSuDung",
    // },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
  ];

  const item = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: (
        <AdvancedSearchForm
          setDataFilter={setDataFilter}
          setCurPage={setCurPage}
        />
      ),
    },
  ];

  //get ten from trang thai id
  const getTenTrangThaiDongHo = (trangThaiId) => {
    switch (trangThaiId) {
      case 1:
        return "Đang sử dụng";
      case 2:
        return "Ngưng";
      case 3:
        return "Huỷ";
      default:
        return "";
    }
  };
  const createFilterFactoryString = () => {
    let factoryQueryString = "";
    if (nhaMayID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayID}`;
    }
    return `${factoryQueryString}`;
  };
  console.log(dataFilter);
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
  const handlePageChange = (page) => {
    setCurPage(page);
    const nhaMayIds = createFilterFactoryString();
    dataFilter.pageNumber = page;
    dataFilter.pageSize = 10;
    const formString = createFilterQueryString(dataFilter);
    const queryString = `${formString}&${nhaMayIds}`;
    dispatch(fetchFilterListIndexPage(queryString));
  };
  console.log("tabList", tabList);
  return (
    <>
      {/* <AdvancedSearchForm /> */}
      <Collapse defaultActiveKey={["1"]} size="small" items={item} />
      {/* <div
        style={{
          textAlign: "center",
          padding: "10px 10px",
          height: "450px",
          position: "relative",
        }}
      > */}
      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="order"
        scroll={{ x: 3000, y: 440 }}
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={indexPageList?.items?.map((item, index) => ({
          imagePath: item.imageUrl || "",
          imageAndStatus: ``,
          key: index,
          dongHoNuocId: item.dongHoNuocId,
          order: pageSize * (curPage - 1) + (index + 1), //set index table
          tenTuyen: item.soDocChiSo.tenTuyenDoc,
          ngayCuoiKy: renderDayformat(item.soDocChiSo.ngayCuoiKy),
          ngayDauKy: renderDayformat(item.soDocChiSo.ngayDauKy),
          seriDongHo: item.seridongho,
          tenKhachHang: item.tenKhachHang,
          diaChi: item.diaChi,
          tthu: item.tthu || "0",
          chiSoCu: item.chiSoCu,
          id: item.id,
          chiSoMoi: item.chiSoMoi,
          ngayDoc: renderDayformat(item.ngayDoc),
          trangThaiSuDung: getTenTrangThaiDongHo(item.trangThaiDongHo),
          tenTrangThai: item.tenTrangThaiGhi,
          doiTuongGiaId: item.doiTuongGiaId,
          ghiChu: item.ghiChu,
          tiLeTangGiamTieuThu: item.tiLeTangGiamTieuThu,
        }))}
        rowSelection={{
          type: "radio",
          selectedRowKeys: rowSelection ? [rowSelection.order] : [],
          onChange: (selectedRowKeys, selectedRows) => {
            dispatch(
              tabListEnterIndexPageSlice.actions.btnClickTabListEnterIndexPage(
                selectedRows[0]
              )
            );
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
              dispatch(
                tabListEnterIndexPageSlice.actions.btnClickTabListEnterIndexPage(
                  record
                )
              );
              setRowSelection(record);
            },
          };
        }}
        loading={isLoadingTable}
        pagination={{
          total: indexPageList?.totalPages * 10,
          pageSize: 10,
          current: curPage,
          onChange(page, pageSize) {
            handlePageChange(page);
          },
        }}
        // onChange={handleData1Change}
      />
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Tooltip title="Tổng Tiêu Thụ">
            <Card style={{ backgroundColor: "#D37676", }} size="small">
              {thongKeData ? thongKeData.tongTieuThu : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title="Tổng Chỉ Số Đồng Hồ Chưa Ghi">
            <Card style={{ backgroundColor: "#9BB0C1" }} size="small">
              {thongKeData ? thongKeData.tongChiSoDongHoChuaGhi : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={8}>
          <Tooltip title="Tổng Chỉ Số Đồng Hồ Đã Ghi">
            <Card style={{ backgroundColor: "#C5EBAA" }} size="small">
              {thongKeData ? thongKeData.tongChiSoDaGhi : ""}
            </Card>
          </Tooltip>
        </Col>
      </Row>
      <ImageModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        imagePath={selectedImagePath}
        recordData={recordData}
      />
      {/* func bottom */}
      <div className="contract-bottom">
        {/* check mobile */}
        {isTabletOrMobile ? (
          <Popover
            size="small"
            rootClassName="fix-popover-z-index"
            placement="bottomRight"
            trigger="click"
            content={<TabListEP isTabletOrMobile={isTabletOrMobile} />}
          >
            <div className="contract-bottom-func">
              <PlusOutlined />
            </div>
          </Popover>
        ) : (
          <div className="contract-bottom-func">
            <TabListEP />
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
export default EnterIndexPage;
