import { createSelector } from "@reduxjs/toolkit";

/* ---------------------------------------------- GET DATA ---------------------------------------------- */
/* --- REDUCERS --- */
// click sidebar menu
export const btnClickSidebarMenuSelector = (state) => state.sidebarSlice.data;

// click option factory name
export const btnClickOptionFactorySelector = (state) =>
  state.reportContractSlice.factoryName;

// click tab list (Contract)
export const btnClickTabListContractSelector = (state) =>
  state.tabListContractSlice.tabList;

// click tab list  (Invoice Print)
export const btnClickTabListInvoicePrintSelector = (state) =>
  state.tabListInvoicePrintSlice.tabList;
export const btnClickTabListInvoiceSeriSelector = (state) =>
  state.tabListInvoiceSeriSlice.tabList;

  export const btnClickBlockPrintSelector = (state) =>
  state.tabListReadingSlice.rowSelected;

// click tab list  (Invoice Print)
export const btnClickTabListEnterIndexPageSelector = (state) =>
  state.tabListEnterIndexPageSlice.tabList;
  export const getDataTheoDongHoSelector = (state) =>
  state.tabListEnterIndexPageSlice.dataTheoDongHo;
  export const getChartDataTheoDongHoSelector = (state) =>
  state.tabListEnterIndexPageSlice.dataStatTheoDongHo;

// click get id factory
export const btnClickGetFactoryIdSelector = (state) =>
  state.factorySlice.factoryId;
export const btnClickGetViewInvoiceListSelector = (state) =>
  state.invoiceSlice.viewInvoiceList;

export const fetchBaoCaoSMSSelector = (state) =>
  state.invoiceSlice.thongBaoSMS;

// click reset get all customer
export const btnClickResetAllCustomerSelector = (state) =>
  state.customerSlice.actionClick;

export const btnClickRowClockWaterSelector = (state) =>
  state.waterClockSlice.rowSelected;

export const getDataForDropDownDongHoBlock = (state) =>
  state.waterClockSlice.dataForDropdownListDongHoBlock;

  export const getDataForDropDownDongHoTong = (state) =>
  state.waterClockSlice.dataForDropdownListDongHoTong;

export const btnClickTableWatchSelector = (state) => state.watchSlice.record;
export const btnClickTableSeriSelector = (state) => state.seriSlice.record;

// click tab author
export const btnClickTabAuthorSelector = (state) =>
  state.tabAuthorSlice.tabAuthor;

// click tab Reading Index
export const btnClickTabReadingIndexSelector = (state) =>
  state.readingIndexSlice.tabList;

// click row (Chuyển tuyến đọc)
export const btnClickCheckboxRowSelectedSelector = (state) =>
  state.tabListContractSlice.checkboxRowSelected;

export const btnClickFilterModalInfoCustomerSelector = (state) =>
  state.customerSlice.btnFilterModalInfoCustomer;

export const setRowSelectedSelector = (state) =>
  state.masterClockSlice.rowSelected;

export const btnClickThemDongHoNuocSelector = (state) =>
  state.waterClockSlice.isBtnThemDongHoNuoc;

export const btnClickMaDongHoMemSelector = (state) =>
  state.waterClockSlice.maDongHoMem;

export const setMaDongHoMemSelector = (state) =>
  state.waterClockSlice.setMaDongHoMem;

export const setOptionThangNamSelector = (state) =>
  state.readingIndexSlice.optionThangNam;

export const btnClickFilterSoDocSelector = (state) =>
  state.readingIndexSlice.actionFilter;

export const setImageGhiChiSoSelector = (state) =>
  state.readingIndexSlice.imageGhiChiSo;

export const btnClickDashboardData = (state) =>
  state.dashBoardSlice.dashBoardData;
export const btnClickDashboardDataTieuThu = (state) =>
  state.dashBoardSlice.dashBoardDataTieuThu;
export const btnClickTotalContract = (state) =>
  state.dashBoardSlice.tongSoHopDong;
export const btnClickTotalClock = (state) => state.dashBoardSlice.tongSoDongHo;
export const getListTuyenDoc = (state) => state.dashBoardSlice.listTuyenDoc;

export const btnClickFilterChiSoDongHoSelector = (state) =>
  state.readingIndexSlice.btnFilterDsChiSoDh;

/* --- END REDUCERS --- */

/* --- IS LOADING --- */
export const isLoadingAllCustomerSelector = (state) =>
  state.customerSlice.isLoading;

export const isLoadingAllAreaSelector = (state) => state.areaSlice.isLoading;

export const isLoadingAllRegionSelector = (state) =>
  state.regionSlice.isLoading;

export const getKhuVucAndVungSelector = (state) => state.areaSlice.khuVucAndVung;

  

export const isLoadingAllPaymentMethodSelector = (state) =>
  state.paymentMethodSlice.isLoading;

export const isLoadingAllPriceListObjectSelector = (state) =>
  state.priceListObjectSlice.isLoading;

export const isLoadingAllWardSelector = (state) => state.wardSlice.isLoading;

export const isLoadingAllListCancelSelector = (state) =>
  state.listCancelSlice.isLoading;

export const isLoadingTotalWatchSelector = (state) =>
  state.totalWatchSlice.isLoading;

export const isLoadingGetWaterClockSelector = (state) =>
  state.waterClockSlice.isLoading;

export const isLoadingDsSoDocSelector = (state) =>
  state.readingIndexSlice.isLoading;

export const isLoadingChiSoDongHoTuSoDocSelector = (state) =>
  state.readingIndexSlice.isLoadingChiSoDongHoTuSoDoc;

export const isLoadingFilterDsChiSoDHSelector = (state) =>
  state.readingIndexSlice.isLoadingFilterDsChiSoDH;

export const isLoadingGetMasterClockSelector = (state) =>
  state.masterClockSlice.isLoading;

export const isLoadingPaymentListSelector = (state) =>
  state.paymentSlice.isLoadingPaymentList;

export const isLoadingPaymentDetailSelector = (state) =>
  state.paymentSlice.isLoadingPaymentDetail;

export const isLoadingAreaSelector = (state) =>
  state.paymentSlice.isLoadingAreaSelect;

export const isLoadingRegionSelector = (state) =>
  state.paymentSlice.isLoadingRegionSelect;

export const isLoadingMeterReaderSelector = (state) =>
  state.paymentSlice.isLoadingMeterReaderSelect;

export const isLoadingBillCollectorSelector = (state) =>
  state.paymentSlice.isLoadingBillCollectorSelect;

export const isLoadingSeriesInvoiceSelector = (state) =>
  state.paymentSlice.isLoadingSeriesInvoiceSelect;

export const isLoadingLineReadingSelector = (state) =>
  state.paymentSlice.isLoadingLineReadingSelect;

export const isLoadingPaymentTypeSelector = (state) =>
  state.paymentSlice.isLoadingPaymentTypeSelect;

export const isLoadingPriceObjectSelector = (state) =>
  state.paymentSlice.isLoadingPriceObjectSelect;

export const isLoadingReadingIndexTotalSelector = (state) =>
  state.readingIndexTotalSlice.isLoading;

export const isLoadingInvoiceListSelector = (state) =>
  state.invoiceSlice.isLoadingInvoiceList;

  export const isLoadingSMSSelector = (state) =>
  state.invoiceSlice.isLoadingSMS;
  export const getSMSTypeSelector = (state) =>
  state.invoiceSlice.smsTypes;

  export const isLoadingInvoiceListLoadingSelector = (state) =>
  state.invoiceSlice.isLoadingInvoiceListModal;
  export const thangNamInvoiceSelector = (state) =>
  state.invoiceSlice.thangNamInvoice;
  export const tuyenDocInvoiceSelector = (state) =>
  state.invoiceSlice.tuyenDocId;
export const isLoadingInvoicePrintListSelector = (state) =>
  state.invoicePrintSlice.isLoadingInvoicePrintList;
export const isLoadingContractListSelector = (state) =>
  state.invoiceSlice.isLoadingContractList;
export const dataContractList = (state) => state.invoiceSlice.contractList;

export const allInvoiceDetailSelector = (state) =>
  state.invoiceSlice.allInvoiceDetail;

  export const getStatisticForChart = (state) =>
  state.invoiceSlice.statisticForChart;
  export const listWorkStatistic = (state) =>
  state.invoiceSlice.workStatictis;
  export const listWriteIndex = (state) =>
  state.invoiceSlice.writeIndexList;
  export const detailWriteIndex = (state) =>
  state.invoiceSlice.writeIndexDetail;
  export const listWorkStatisticDetail = (state) =>
  state.invoiceSlice.workStatictisDetail;

export const isLoadingIndexTableSelector = (state) =>
  state.tabListEnterIndexPageSlice.isLoadingIndexTable;

export const isLoadingNewEmployeeSelectSelector = (state) =>
  state.tuyendoc.isLoadingNewEmployeeSelect;

/* --- END IS LOADING --- */

/* --- API --- */
// get reason
export const fetchAllReasonSelector = (state) => state.reasonSlice.data;

// get list clock water (export .xlsx)
export const fetchApiExportListClockWaterSelector = (state) =>
  state.waterClockSlice.listClockWater;

// get all region
export const fetchApiAllRegionSelector = (state) => state.regionSlice.data;

// get all factory
export const fetchApiAllFactorySelector = (state) => state.factorySlice.data;

export const fetchDataByNhaMay = (state) => state.factorySlice.dataByNhaMay;

// get all price List Object
export const fetchApiAllPriceListObjectSelector = (state) =>
  state.priceListObjectSlice.data;

// get all area
export const fetchApiAllAreaSelector = (state) => state.areaSlice.data;
export const fetchApiAllAreaByNhaMayIdSelector = (state) =>
  state.areaSlice.khuVucById;

// get all reading
export const fetchApiAllReadingSelector = (state) => state.readingSlice.data;

// get all customer
export const setListCustomerSelector = (state) => state.customerSlice.data;

// get all price obj
export const fetchApiAllPriceObjSelector = (state) => state.priceObjSlice.data;

// get all payment method
export const fetchApiAllPaymentMethodSelector = (state) =>
  state.paymentMethodSlice.data;

// get create customer
export const fetchApiCreateCustomerSelector = (state) =>
  state.contractSlice.createCustomer;

// get all manager
export const fetchApiGetAllManagerSelector = (state) =>
  state.nguoidung.danhSachNguoiDung;
// export const fetchGetAllBlockSelector = (state) =>
//   state.blockSlice.danhSachBlock;
// get all bang gia
export const fetchApiAllBangGiaSelector = (state) => state.bangGiaSlice.data;

// get all chi tiet gia
export const fetchApiAllDetailPriceSelector = (state) =>
  state.detailPriceSlice.data;

// get all price obj
export const fetchApiAllPriceObjectSelector = (state) =>
  state.priceObjectSlice.data;

export const fetchApiAllPriceObject2Selector = (state) =>
  state.priceObjectSlice.doiTuongGia;

export const fetchApiAllWardSelector = (state) => state.wardSlice.data;
export const currentPageSelector = (state) =>
  state.currentPageSlice.currentPage;
export const filterSelector = (state) => state.currentPageSlice.filter;
export const filterDataSelector = (state) => state.currentPageSlice.dataFilter;
export const filterClickSelector = (state) =>
  state.currentPageSlice.filterClick;
export const nhaMayChangeSelector = (state) =>
  state.currentPageSlice.nhaMayChange;
export const refreshTableSelector = (state) =>
  state.currentPageSlice.refreshTable;
export const rowSelectSelector = (state) => state.currentPageSlice.rowSelect;
export const addClickSelector = (state) => state.currentPageSlice.addClick;
export const changeClickSelector = (state) =>
  state.currentPageSlice.changeClick;
export const openSelector = (state) => state.currentPageSlice.open;
export const loadingSelector = (state) => state.currentPageSlice.loading;
export const idFilterSelector = (state) => state.currentPageSlice.idFilter;

export const currentPageIndexSelector = (state) =>
  state.currentPageSlice.currentPageIndex;
export const filterIndexSelector = (state) =>
  state.currentPageSlice.filterIndex;
export const filterDataIndexSelector = (state) =>
  state.currentPageSlice.dataFilterIndex;
export const filterClickIndexSelector = (state) =>
  state.currentPageSlice.filterClickIndex;
export const fetchApiAllListCancelSelector = (state) =>
  state.listCancelSlice.data;

// get all dong ho nuoc excel
export const fetchApiTotalWatchExcelSelector = (state) =>
  state.totalWatchSlice.listTotalWatchExcel;

export const fetchApiGetWaterClockSelector = (state) =>
  state.waterClockSlice.data;

// get all dong ho nuoc
export const fetchApiTotalWatchSelector = (state) =>
  state.totalWatchSlice.listTotalWatch;

// get customer by keyId
export const fetchApiGetCustomerByKeyIdSelector = (state) =>
  state.customerSlice.customerByKeyId;

// get contract -> export to excel
export const fetchApiExportToExcelManagerContractSelector = (state) =>
  state.excelSlice.dataManagerContract;

// get contract -> export to pdf
export const fetchApiExportToPdfManagerContractSelector = (state) =>
  state.pdfSlice.exportPDF;

export const fetchApiWathList = (state) => state.watchSlice.watchList;

// ger permission data
export const fetchApiPermisson = (state) =>
  state.permissionSlice.permissionData;

// get id customer from select type
export const fetchApiGetCustomerIdFromOptionFactorySelector = (state) =>
  state.customerSlice.customerById;

// get create contract
export const fetchApiCreateContractSelector = (state) =>
  state.contractSlice.data;

export const getDetailHopDongSelector = (state) =>
  state.contractSlice.detailHopDong;
  export const getTuyenDocSelector = (state) =>
  state.contractSlice.tuyenDoc;
  export const getTuyenDocDataSelector = (state) =>
  state.contractSlice.tuyenDocDataForOthers;

export const getPrintData = (state) => state.contractSlice.printData;

// get report new customer
export const fetchApiGetReportListCustomerNewSelector = (state) =>
  state.customerSlice.reportNewCustomers;

// get list of customer
export const fetchApiGetListOfCustomerSelector = (state) =>
  state.customerSlice.listOfCustomer;

// get all DM Ky
export const getAllKySelector = (state) => state.ky_ghi_chi_so.danhSachKy;

export const getAllSeriInvoiceSelector = (state) =>
  state.seriSlice.danhSachSeri;

// get all DM Ky
export const getAllCitySelector = (state) => state.tinh.listCities;

export const fetchApiGetAllDMTotalByTypeSelector = (state) =>
  state.DMTotalSlice.data;

// chưa dùng đến
export const fetchApiGetAreaAndRegionSelector = (state) =>
  state.readingSlice.areaAndRegion;

// get by id Vùng
export const fetchApiGetByVungIdSelector = (state) =>
  state.areaSlice.getByVungId;

// get by id Khu vưc
export const fetchApiGetByKhuVucIdSelector = (state) =>
  state.regionSlice.getByKhuVucId;
export const fetchApiGetByKhuVucIdV2Selector = (state) =>
  state.regionSlice.getByKhuVucIdV2;

// get all Huyện
export const fetchApiGetAllDistrictSelector = (state) =>
  state.districtSlice.data;
// get clock from select row (InfoClock - modal Contract)
export const fetchApiWaterClockSelector = (state) =>
  state.waterClockSlice.getLoadWaterClock;
// get clock from select row (InfoClock - modal Contract)
export const fetchApiSelectRowWaterClockSelector = (state) =>
  state.waterClockSlice.getWaterClock;

// get (maDongHo from hopDongId)
export const fetchApiGetClockIdFromContractIdSelector = (state) =>
  state.waterClockSlice.getClockWaterId;

// get clock by seri
export const fetchApiGetClockWhenOnChangeInputSeriSelector = (state) =>
  state.waterClockSlice.getClockBySeri;

export const fetchApiGetAllClockWaterSelector = (state) =>
  state.waterClockSlice.getAllClock;

// get SDCS
export const readingIndexQuerySelector = (state) =>
  state.readingIndexSlice.listReadingIndex;
export const readingIndexBlockQuerySelector = (state) =>
  state.readingIndexBlockSlice.listReadingIndexBlock;

export const getAllBlockClockSelector = (state) =>
  state.blockSlice.allBlockClock;
// get SDCS theo nhà máy
export const fetchApiGetListSoDocTheoNhaMaySelector = (state) => {
  return state.readingIndexSlice.dsSoDocTheoNhaMay;
};

export const isLoadingGetListSoDocTheoNhaMaySelector = (state) =>
  state.readingIndexSlice.isLoading;

// get SDCS DH tổng
export const readingIndexTotalQuerySelector = (state) =>
  state.readingIndexTotalSlice.listReadingIndexTotal;

// get SDCS DH tổng
export const readingIndexTotalFilterSelector = (state) =>
  state.readingIndexTotalSlice.filterSoDocTotal;
// get state SDCS DH tổng FILTER
export const readingIndexTotalIsFilterSelector = (state) =>
  state.readingIndexTotalSlice.isFilter;
export const readingIndexTotalIsFilterBlockSelector = (state) =>
  state.readingIndexTotalSlice.isFilterBlock;
// get values of filter form
export const readingIndexTotalFilterValuesSelector = (state) =>
  state.readingIndexTotalSlice.filterValue;

// get files of contract
export const setDataFileOfContractSelector = (state) =>
  state.attachmentSlice.data;

// get list customer by nhaMayId
export const setListCustomerByNhaMayIdSelector = (state) =>
  state.customerSlice.customerByNhaMayId;

// get KGCS to create multiple books
export const getKGCSToCreateBookSelector = (state) =>
  state.readingIndexSlice.dataKGCS;

export const getListToCreateBookSelector = (state) =>
  state.readingIndexSlice.listToCreateBook;

// fetch all objects
export const fetchApiGetAllObjectSelector = (state) =>
  state.DMTotalSlice.listObjects;

// fetch all installer
export const fetchApiGetAllInstallerSelector = (state) =>
  state.DMTotalSlice.listInstaller;

// fetch all producing country
export const fetchApiGetAllProducingCountrySelector = (state) =>
  state.DMTotalSlice.listProducingCountry;

// fetch all manufacturer
export const fetchApiGetAllManufacturerSelector = (state) =>
  state.DMTotalSlice.listManufactuter;

// fetch all method payment
export const fetchApiGetAllNethodPaymentSelector = (state) =>
  state.DMTotalSlice.listMethodPayment;

// get list (lý do hủy)
export const fetchApiGetAllLyDoHuySelector = (state) =>
  state.DMTotalSlice.dsLyDoHuy;

// get list (lý do thay)
export const fetchApiGetAllLyDoThaySelector = (state) =>
  state.DMTotalSlice.dsLyDoThay;

// get list (kiểu đồng hồ)
export const fetchApiGetAllKieuDongHoSelector = (state) =>
  state.DMTotalSlice.dsKieuDongHo;

// get list member
export const getMemberSelector = (state) => state.member.members;
// get phong ban
export const getPhongBanSelector = (state) => state.phongBanSlice.listPhongBan;
// Phu Phuoc selector
// login
export const userIdSelector = (state) => state.user_login.userId;
export const userNameSelector = (state) => state.user_login.userName;
export const nameSelector = (state) => state.user_login.name;
export const accessTokenSelector = (state) => state.user_login.token;
export const refreshTokenSelector = (state) => state.user_login.refreshToken;
export const nhaMayIdsSelector = (state) => state.user_login.nhaMays;
export const userRoleSelector = (state) => state.user_login.role;
export const userIDPhongBanSelector = (state) => state.member.userID;
export const phongBanIdSelector = (state) => state.member.idPhongBan;

export const isChangePasswordOKSelector = (state) =>
  state.password.isChangePasswordOK;

export const fetchPhongBanSelector = (state) =>
  state.phongBanSlice.listPhongBan;
// register
export const isRegisterSuccessSelector = (state) =>
  state.register.isRegisterSuccess;
export const isVerifyEmailSuccessSelector = (state) =>
  state.register.isVerifyEmailSuccess;
// GQL for register (roles vs phongBans)
export const getRolesSelector = (state) => state.register.roles;
export const getPhongBansSelector = (state) => state.register.phongBans;

// filter list customer
export const setFilterCustomerSelector = (state) =>
  state.customerSlice.filterCustomer;

// clicked filter customer
export const btnClickFilterCustomerSelector = (state) =>
  state.customerSlice.btnFilterCustomer;

// filter (Bảng kê danh sách khách hàng)
export const btnFilterBangKeKHSelector = (state) =>
  state.customerSlice.filterBangKeKH;

// filter (Modal info customer)
export const setFilterModalInfoCustomerSelector = (state) =>
  state.customerSlice.filterModalInfoCustomer;

// get customer (Chuyển nhượng hợp đồng)
export const fetchApiGetByIdCustomerSelector = (state) =>
  state.customerSlice.customerTransferContract;

// Selector để lấy danh sách claims từ state
export const selectClaims = (state) => state.claims.listClaims;

// get (đồng hồ block theo tuyến đọc)
export const fetchApiGetDongHoBlockFromTuyenDocSelector = (state) =>
  state.waterClockSlice.clockBlock;

// get (đồng hồ tổng)
export const fetchApiGetMasterClockSelector = (state) =>
  state.masterClockSlice.data;

// get KH từ cmnd
export const fetchApiGetCustomerByCMNDSelector = (state) =>
  state.customerSlice.customerByCMND;

// get -> mã hợp đồng mới
export const fetchApiGetContractIdNewSelector = (state) =>
  state.contractSlice.newContractId;

// get -> mã hợp đồng mới
export const getTinhAndHuyenByXaIdSelector = (state) =>
  state.contractSlice.tinhAndHuyen;

// get -> sau khi chọn Kỳ ghi chỉ số
export const fetchApiGetNgayTrongSoDocTheoKySelector = (state) =>
  state.readingIndexSlice.dataOptionKyGhiChiSo;

// get list -> tuyến đọc chưa tạo sổ
export const fetchApiGetListTuyenDocChuaTaoSoSelector = (state) =>
  state.readingIndexSlice.tuyenDocChuaTaoSo;

export const fetchApiFilterSoDocSelector = (state) =>
  state.readingIndexSlice.filterSoDoc;

export const fetchApiFilterSoDocBinhThuongSelector = (state) =>
  state.readingIndexSlice.filterSoDocBinhThuong;

export const fetchApiGetChiSoDongHoTuSoDocSelector = (state) =>
  state.readingIndexSlice.chiSoDongHoTuSoDoc;

export const fetchApiDsTrangThaiGhiSelector = (state) =>
  state.readingIndexSlice.dsTrangThaiGhi;

export const fetchApiGetChiSoDongHoByIdSelector = (state) =>
  state.readingIndexSlice.chiSoDongHoById;

// ds đh block
export const fetchApiGetAllDongHoTheoLoaiSelector = (state) =>
  state.waterClockSlice.dsDongHoTheoLoai;

// filter ds đh
export const filterDsChiSoDongHoSelector = (state) =>
  state.readingIndexSlice.filterDsChiSoDongHo;

// get all payment
export const getListPaymentSelector = (state) => state.paymentSlice.paymentList;

// get payInfo of paymentList
export const getPayInfoSelector = (state) => state.paymentSlice.data.payInfo;

// get totalCount of paymentList
export const getTotalCountSelector = (state) =>
  state.paymentSlice.data.totalCount;

//get paymentDetails
export const getPaymentDetailSelector = (state) =>
  state.paymentSlice.paymentDetail;

//get select Area options
export const getSelectAreaOptions = (state) =>
  state.paymentSlice.selectAreaOptions;

//get select Region options
export const getSelectRegionOptions = (state) =>
  state.paymentSlice.selectRegionOptions;

//get select MeterReader options
export const getSelectMeterReaderOptions = (state) =>
  state.paymentSlice.selectMeterReaderOptions;

//get select BillCollector options
export const getSelectBillCollectorOptions = (state) =>
  state.paymentSlice.selectBillCollectorOptions;

//get select SeriesInvoice options
export const getSelectSeriesInvoiceOptions = (state) =>
  state.paymentSlice.selectSeriesInvoiceOptions;

//get total page of payment list
export const getTotalPageOfPaymentList = (state) =>
  state.paymentSlice.totalPageOfPaymentList;

//get query string of payment List
export const getQueryPaymentList = (state) =>
  state.paymentSlice.queryPaymentList;

//get select LineReading options
export const getSelectLineReadingOptions = (state) =>
  state.paymentSlice.selectLineReadingOptions;

//get select PaymentType options
export const getSelectPaymentTypeOptions = (state) =>
  state.paymentSlice.selectPaymentTypeOptions;

//get select PriceObject options
export const getSelectPriceObjectOptions = (state) =>
  state.paymentSlice.selectPriceObjectOptions;

//get select CustomerName options
export const getSelectCustomerNameOptions = (state) =>
  state.paymentSlice.selectCustomerNameOptions;

//get select PhoneNumber options
export const getSelectPhoneNumberOptions = (state) =>
  state.paymentSlice.selectPhoneNumberOptions;

//get queryReadingIndexList
export const getQueryReadingIndexList = (state) =>
  state.readingIndexSlice.queryReadingIndexList;

//get queryTenSoOptions
export const getTenSoOptions = (state) => state.readingIndexSlice.tenSoOptions;

//get queryInvoiceList
export const getQueryInvoiceList = (state) =>
  state.invoiceSlice.queryInvoiceList;
  export const getThangNam = (state) =>
  state.invoiceSlice.thangNam;
//get queryInvoicePrintList
export const getQueryInvoicePrintList = (state) =>
  state.invoicePrintSlice.queryInvoicePrintList;
//get invoiceList
export const getInvoiceList = (state) => state.invoiceSlice.invoiceList;
export const getInvoiceList2 = (state) => state.invoiceSlice.invoiceList2;
export const getInvoiceListModal = (state) => state.invoiceSlice.invoiceListModal;
export const getDataForMenuInvoice = (state) => state.invoiceSlice.dataForMenu;
export const getDataForMenuContract = (state) => state.contractSlice.dataForMenu;
export const getDataForMenuContractCreate = (state) => state.contractSlice.dataForMenuCreate;
export const getDataForMenuSoDoc = (state) => state.readingIndexSlice.dataForMenu;
//get invoicePrintList
export const getInvoicePrintList = (state) =>
  state.invoicePrintSlice.invoicePrintList;
//get Print Invoice
export const getPrintInvoice = (state) => state.printInvoiceSlice.printInvoice;

//get print Invoice Detail
export const getPrintInvoiceDetail = (state) =>
  state.printInvoiceSlice.printInvoiceDetail;

//get print Invoice Detail
export const getViewInvoiceDetail = (state) =>
  state.printInvoiceSlice.viewInvoiceDetail;

//getTuyenDocByID
export const getTuyenDocByID = (state) => state.tuyendoc.tuyenDocId;

export const getTuyenDocByNhaMaySelector = (state) =>
  state.tuyendoc.tuyenDocByNhaMay;
export const getTuyenDocGetAllSelector = (state) => state.tuyendoc.listTuyenDoc;

//getCanBoDoc
export const getCanBoDoc = (state) => state.tuyendoc.canBoDoc;
export const getCanBoDocThuTien = (state) => state.tuyendoc.canBoThuTien;
export const getUserByBieuMauSelector = (state) =>
  state.tuyendoc.nhanVienXemBieuMau;
export const getUserBySuaBieuMauSelector = (state) =>
  state.tuyendoc.nhanVienSuaBieuMau;
export const getUserNhaMaySelector = (state) =>
  state.tuyendoc.nhanVienByNhaMay;

//getFilterListIndexPage
export const getFilterListIndexPage = (state) =>
  state.tabListEnterIndexPageSlice.indexPageList;

  export const getThongKeListIndexPage = (state) =>
  state.tabListEnterIndexPageSlice.indexPageThongKeList;

//getReadingStatusOptions
export const getReadingStatusOptions = (state) =>
  state.tabListEnterIndexPageSlice.readingStatusOptions;

  export const getEnterIndexPageMenuData = (state) =>
  state.tabListEnterIndexPageSlice.dataForMenu;

//getReadingNameOptions
export const getReadingNameOptions = (state) =>
  state.tabListEnterIndexPageSlice.readingNameOptions;

export const getListContractData = (state) => state.contractSlice.contractW;
export const getListContractDataFilter = (state) =>
  state.contractSlice.newContractFilter;
export const getTinhData = (state) => state.contractSlice.tinh;
export const getHuyenData = (state) => state.contractSlice.huyen;
export const getXaData = (state) => state.contractSlice.xa;
export const getDataForMenuKeKhachHang = (state) => state.contractSlice.dataForMenuKeKhachHang;
export const getDataForMenuPhatTrienKhachHang = (state) => state.contractSlice.dataForMenuPhatTrienKhachHang;
//getContractKeyIdOptions
export const getContractKeyIdOptions = (state) =>
  state.tabListEnterIndexPageSlice.contractKeyIdOptions;

//getNameOrKeyIdOfCustomerOptions
export const getNameOrKeyIdOfCustomerOptions = (state) =>
  state.tabListEnterIndexPageSlice.nameOrKeyIdOfCustomerOptions;

//getInvoiceDetail for update
export const getInvoiceDetail = (state) => state.invoiceSlice.invoiceDetail;
export const getAllWaterLoss = (state) => state.waterLossSlice.dataWaterLoss;
export const isLoadingGetAllWaterLoss = (state) =>
  state.waterLossSlice.loadingWaterLoss;

export const getKeyIdTuyenDoc = (state) =>
  state.readingIndexSlice.keyIdTuyenDoc;

export const gettuyendocselection = (state) =>
  state.readingIndexSlice.tuyendocselection;

export const getTuyenDocOption = (state) => state.readingIndexSlice.tuyenDoc;
export const gettuyendocAddselection = (state) =>
  state.readingIndexSlice.tuyenDocAdd;
/* --- END API --- */

/* ---------------------------------------------- END GET DATA ---------------------------------------------- */

/* ---------------------------------------------- HANDLE SELECTOR ---------------------------------------------- */
// get list customers
const getListCustomers = createSelector(
  fetchApiCreateContractSelector,
  setListCustomerSelector,
  btnClickResetAllCustomerSelector,
  btnClickGetFactoryIdSelector,
  setListCustomerByNhaMayIdSelector,
  setFilterCustomerSelector,
  btnClickFilterCustomerSelector,
  (
    createContract,
    preListCustomer,
    resetPreListCustomer,
    optionNhaMay,
    listCustomerByNhaMayId,
    filterCustomer,
    btnFilterCustomer
  ) => {
    const factory_current = sessionStorage.getItem("current_factory_id");

    if (
      filterCustomer?.GetHopDongs?.nodes?.length >= 0 &&
      btnFilterCustomer === "FilterCustomer"
    ) {
      // custom
      const customNewContract = {
        GetHopDongs: {
          nodes: filterCustomer?.GetHopDongs?.nodes?.map(({ khachHang }) => {
            return {
              khachHang: {
                loaiKhachHang: khachHang?.loaiKhachHang,
                tenKhachHang: khachHang?.tenKhachHang,
                keyId: khachHang?.keyId,
                dienThoai: khachHang?.dienThoai,
                email: khachHang?.email,
                nhaMayId: khachHang?.nhaMayId,
              },
            };
          }),
        },
      };

      return customNewContract;
    }

    if (createContract && resetPreListCustomer === "createContract") {
      const newContract = [];

      newContract.push(createContract);

      // custom
      const customNewContract = {
        GetHopDongs: {
          nodes: newContract?.map((_newContract) => {
            return {
              khachHang: {
                loaiKhachHang: _newContract?.loaiKhachHang,
                tenKhachHang: _newContract?.tenKhachHang,
                keyId: _newContract?.keyId,
                dienThoai: _newContract?.dienThoai,
                email: _newContract?.email,
                nhaMayId: _newContract?.nhaMayId,
              },
            };
          }),
        },
      };

      return customNewContract;
    } else if (
      Object?.keys(optionNhaMay)?.length > 0 &&
      optionNhaMay !== "all" &&
      listCustomerByNhaMayId?.GetHopDongs?.nodes?.length >= 0 &&
      factory_current !== "all"
      // && !filterCustomer
    ) {
      const customersByNhaMayId = listCustomerByNhaMayId;

      return customersByNhaMayId;
    } else if (optionNhaMay === "all" && factory_current === "all") {
      return preListCustomer ?? [];
    }
  }
);

// get list -> Sổ đọc
export const getAllSoDocSelector = (state) =>
  state.readingIndexSlice.listAllSoDoc;
export const getAllSoDocFilterSelector = (state) =>
  state.readingIndexSlice.listAllSoDocFilter;

const getListSoDocChiSo = createSelector(
  readingIndexQuerySelector,
  fetchApiGetListSoDocTheoNhaMaySelector,
  btnClickGetFactoryIdSelector,
  fetchApiFilterSoDocSelector,
  btnClickFilterSoDocSelector,
  (
    listSoDoc,
    listSoDocTheoNhaMay,
    optionNhaMay,
    listFilterSoDoc,
    actionFilterSoDoc
  ) => {
    // Filter
    if (actionFilterSoDoc === "FILTER") {
      return listFilterSoDoc;
    }
    if (optionNhaMay === "all") {
      return listSoDocTheoNhaMay;
    } else {
      console.log("listSoDocTheoNhaMay", listSoDocTheoNhaMay);
      return listSoDocTheoNhaMay;
    }
  }
);

// filter list -> Chỉ số đh
const getListChiSoDongHo = createSelector(
  fetchApiGetChiSoDongHoTuSoDocSelector,
  filterDsChiSoDongHoSelector,
  btnClickFilterChiSoDongHoSelector,
  (listChiSoDongHo, listFilterChiSoDongHo, actionFilter) => {
    if (actionFilter === "FILTER") {
      return listFilterChiSoDongHo;
    }

    return listChiSoDongHo;
  }
);

// get list -> Sổ đọc block
const getListSoDocChiSoBlock = createSelector(
  readingIndexBlockQuerySelector,
  fetchApiGetListSoDocTheoNhaMaySelector,
  btnClickGetFactoryIdSelector,
  fetchApiFilterSoDocSelector,
  btnClickFilterSoDocSelector,
  (
    listSoDoc,
    listSoDocTheoNhaMay,
    optionNhaMay,
    listFilterSoDoc,
    actionFilterSoDoc
  ) => {
    // Filter
    if (actionFilterSoDoc === "FILTER") {
      return listFilterSoDoc;
    }

    if (optionNhaMay === "all") {
      return listSoDoc;
    } else {
      return listSoDocTheoNhaMay;
    }
  }
);

// get list -> đh tổng
const getListDongHoTong = createSelector(
  fetchApiGetMasterClockSelector,
  fetchApiGetAllDongHoTheoLoaiSelector,
  btnClickGetFactoryIdSelector,
  (dsDongHoTongTheoNhaMay, dsTatCaDongHoTong, option) => {
    if (option === "all") {
      return dsDongHoTongTheoNhaMay;
    } else {
      return dsDongHoTongTheoNhaMay;
    }
  }
);

export {
  getListCustomers,
  getListSoDocChiSo,
  getListChiSoDongHo,
  getListSoDocChiSoBlock,
  getListDongHoTong,
};
/* ---------------------------------------------- END HANDLE SELECTOR ---------------------------------------------- */
