const constants = {
  // menu 1
  DASHBOARD_FORM_PARENT: {
    label: "Thống kê",
    key: "DASHBOARD_FORM_PARENT",
  },
  DASHBOARD_FORM_CHILD: {
    label: "Thống kê số liệu",
    key: "DASHBOARD_FORM_CHILD",
  },
  DASHBOARD_FORM_WORK: {
    label: "Thống kê công việc",
    key: "DASHBOARD_FORM_WORK",
  },
  REGISTRATION_FORM_PARENT: {
    label: "Hợp đồng và đăng ký",
    key: "REGISTRATION_FORM_PARENT",
  },
  CONTRACT_MANAGER: {
    label: "Quản lý hợp đồng",
    key: "CONTRACT_MANAGER",
  },
  // sub menu 1.1
  REGISTRATION_FORM_CHILD: {
    label: "Báo cáo hợp đồng",
    key: "REGISTRATION_FORM_CHILD",
  },
  DEV_CUSTOMER: {
    label: "Phát triển KH mới",
    key: "DEV_CUSTOMER",
  },
  LIST_CUSTOMER: {
    label: "Bảng kê danh sách KH",
    key: "LIST_CUSTOMER",
  },
  // menu 2
  RECORD_INDEX_PARENT: {
    label: "Ghi chỉ số & hóa đơn",
    key: "RECORD_INDEX_PARENT",
  },
  REPORT_BILL: {
    label: "Báo cáo",
    key: "REPORT_BILL",
  },
  KH_CHUA_DOC_SO: {
    label: "Báo cáo SMS",
    key: "KH_CHUA_DOC_SO",
  },
  BANG_KE_CHI_SO_DONG_HO: {
    label: "Bảng kê CS đồng hồ",
    key: "BANG_KE_CHI_SO_DONG_HO",
  },
  KH_CO_MUC_TT_LON: {
    label: "KH có mức tiêu thụ lớn",
    key: "KH_CO_MUC_TT_LON",
  },
  KH_DUNG_NUOC_BT: {
    label: "KH SD nước bất thường",
    key: "KH_DUNG_NUOC_BT",
  },
  KH_DUNG_NUOC_TRONG_KHOANG: {
    label: "KH SD nước trong khoảng",
    key: "KH_DUNG_NUOC_TRONG_KHOANG",
  },
  KH_KHONG_SD_NUOC: {
    label: "KH không SD nước",
    key: "KH_KHONG_SD_NUOC",
  },
  PT_DOANH_THU_THEO_DTG: {
    label: "PT doanh thu theo DTG",
    key: "PT_DOANH_THU_THEO_DTG",
  },
  TONG_HOP_SAN_LUONG_NUOC: {
    label: "Tổng hợp SL nước",
    key: "TONG_HOP_SAN_LUONG_NUOC",
  },
  TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC: {
    label: "Tổng hợp DT nước theo KV",
    key: "TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC",
  },
  HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN: {
    label: "HĐ tiền nước theo NV",
    key: "HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN",
  },
  TONG_HOP_HOA_DON: {
    label: "Tổng hợp hóa đơn",
    key: "TONG_HOP_HOA_DON",
  },
  INITIAL_PAYMENT_TRACKING_LIST: {
    label: "Danh sách theo dõi TT khởi thủy",
    key: "INITIAL_PAYMENT_TRACKING_LIST",
  },
  READINGS_INDEX: {
    label: "Sổ đọc chỉ số",
    key: "READINGS_INDEX",
  },
  READINGS_INDEX_TONG: {
    label: "Tạo sổ đọc chỉ số DH tổng",
    key: "READINGS_INDEX_TONG",
  },
  READINGS_INDEX_BLOCK: {
    label: "Tạo sổ đọc chỉ số DH block",
    key: "READINGS_INDEX_BLOCK",
  },
  ENTER_INDEX: {
    label: "Nhập chỉ số",
    key: "ENTER_INDEX",
  },
  BILL_ORDER: {
    label: "Hóa đơn",
    key: "BILL_ORDER",
  },
  // PRINT_BILL_ORDER: {
  //   label: "In hóa đơn",
  //   key: "PRINT_BILL_ORDER",
  // },
  // menu 3
  CATEGORY: {
    label: "Cấu hình",
    key: "CATEGORY",
  },
  CATEGORY_MANAGEMENT_PRICE_SUBJECT: {
    label: "CH Đối tượng giá",
    key: "CATEGORY_MANAGEMENT_PRICE_SUBJECT",
  },
  CATEGORY_MANAGEMENT_LRL: {
    label: "CH Vùng, địa bàn",
    key: "CATEGORY_MANAGEMENT_LRL",
  },
  CATEGORY_MANAGEMENT_READING: {
    label: "CH Tuyến đọc",
    key: "CATEGORY_MANAGEMENT_READING",
  },
  CATEGORY_MANAGEMENT_PRICE_LIST: {
    label: "CH Bảng giá",
    key: "CATEGORY_MANAGEMENT_PRICE_LIST",
  },

  CATEGORY_MANAGEMENT_LOCATION: {
    label: "CH Khu vực",
    key: "CATEGORY_MANAGEMENT_LOCATION",
  },
  CATEGORY_PAYMENT_METHOD: {
    label: "CH Phương thức TT",
    key: "CATEGORY_PAYMENT_METHOD",
  },
  CATEGORY_CUSTOMER_TYPE: {
    label: "CH Loại KH",
    key: "CATEGORY_CUSTOMER_TYPE",
  },
  CATEGORY_SCOPE: {
    label: "CH Phạm vi",
    key: "CATEGORY_SCOPE",
  },
  CATEGORY_STATUS_READ_NUMBER: {
    label: "CH Trạng thái chỉ số",
    key: "CATEGORY_STATUS_READ_NUMBER",
  },
  CATEGORY_MANAGEMEN_REASONS_INSTEAD: {
    label: "CH Lý do thay",
    key: "CATEGORY_MANAGEMEN_REASONS_INSTEAD",
  },
  CATEGORY_MANAGEMEN_REASONS_CANCEL: {
    label: "CH Lý do hủy",
    key: "CATEGORY_MANAGEMEN_REASONS_CANCEL",
  },
  CATEGORY_WATCH: {
    label: "CH Kiểu đồng hồ",
    key: "CATEGORY_WATCH",
  },
  CATEGORY_CLOCK: {
    label: "CH Đồng hồ tổng",
    key: "CATEGORY_CLOCK",
  },
  CATEGORY_SIGNING: {
    label: "CH Kỳ",
    key: "CATEGORY_SIGNING",
  },
  CATEGORY_ADMINISTRATIVE: {
    label: "CH Hành chính",
    key: "CATEGORY_ADMINISTRATIVE",
  },
  CATEGORY_CITY: {
    label: "Thành phố/Tỉnh",
    key: "CATEGORY_CITY",
  },
  CATEGORY_DISTRICT: {
    label: "Quận/Huyện",
    key: "CATEGORY_DISTRICT",
  },
  CATEGORY_WARD: {
    label: "Phường/Xã",
    key: "CATEGORY_WARD",
  },
  COLLECT_MONEY: {
    label: "Thu tiền",
    key: "COLLECT_MONEY",
  },
  COLLECT_MONEY_REPORT_PAY: {
    label: "Báo cáo thanh toán",
    key: "COLLECT_MONEY_REPORT_PAY",
  },
  KH_NO_TIEN_NUOC: {
    label: "KH nợ tiền nước",
    key: "KH_NO_TIEN_NUOC",
  },
  SAN_LUONG_DOANH_THU_TIEN_NUOC: {
    label: "Sản lượng DT tiền nước",
    key: "SAN_LUONG_DOANH_THU_TIEN_NUOC",
  },
  BANG_KE_THU_TIEN_NUOC: {
    label: "Bảng kê thu tiền nước",
    key: "BANG_KE_THU_TIEN_NUOC",
  },
  CATEGORY_INSTALLER: {
    label: "CH Người lắp đặt",
    key: "CATEGORY_INSTALLER",
  },
  CATEGORY_OBJECT: {
    label: "CH Đối tượng",
    key: "CATEGORY_OBJECT",
  },
  CATEGORY_PRODUCING_COUNTRY: {
    label: "CH Nước sản xuất",
    key: "CATEGORY_PRODUCING_COUNTRY",
  },
  CATEGORY_MANUFACTURER: {
    label: "CH Hãng sản xuất",
    key: "CATEGORY_MANUFACTURER",
  },
  CATEGORY_SERIINVOICE: {
    label: "CH Seri hóa đơn",
    key: "CATEGORY_SERIINVOICE",
  },
  // menu 4
  PAYMENT: {
    label: "Thanh toán",
    key: "PAYMENT",
  },
  //menu 5
  FAILURE: {
    label: "Thất thoát",
    key: "FAILURE",
  },
  WATER_LOSS: {
    label: "Quản lý thất thoát",
    key: "WATER_LOSS",
  },
  BLOCK_CLOCK_MANAGEMENT: {
    label: "Quản lý đồng hồ block",
    key: "BLOCK_CLOCK_MANAGEMENT",
  },
  QL_DONG_HO_TONG: {
    label: "Quản lý đồng hồ tổng",
    key: "QL_DONG_HO_TONG",
  },
  //MENU 6
  LOG_NOTICE: {
    label: "Nhật ký thông báo",
    key: "LOG_NOTICE",
  },
  NOTICE_OF_CUSTOMS: {
    label: "Thông báo CSKH",
    key: "NOTICE_OF_CUSTOMS",
  },
  // MENU 7
  ADMINISTRATION_PARENT: {
    label: "Quản trị",
    key: "ADMINISTRATION",
  },
  // sub 7.1
  DECENTRALIZATION_CHILD: {
    label: "Phân quyền chức năng",
    key: "DECENTRALIZATION_CHILD",
  },
  // sub 7.2
  ORGANIZATION: {
    label: "Phân quyền tổ chức",
    key: "ORGANIZATION",
  },
  // sub 7.2.1
  ORGANIZATION_MEMBER: {
    label: "Thành viên",
    key: "ORGANIZATION_MEMBER",
  },
  // sub 7.2.0 DEFAULT
  ORGANIZATION_INFORMATION: {
    label: "Thông tin tổ chức",
    key: "ORGANIZATION_INFORMATION",
  },

  // sub 7.2.2
  ORGANIZATION_DEPARTMENT: {
    label: "Phòng ban/đơn vị",
    key: "ORGANIZATION_DEPARTMENT",
  },
  // sub 7.2.3
  ORGANIZATION_JOBTYPE: {
    label: "Loại/công việc",
    key: "ORGANIZATION_JOBTYPE",
  },
  // sub 7.2.4
  ORGANIZATION_WORKGROUP: {
    label: "Nhóm công việc/dự án",
    key: "ORGANIZATION_WORKGROUP",
  },
  // sub 7.2.5
  ORGANIZATION_DATABASE: {
    label: "Cơ sở dữ liệu",
    key: "ORGANIZATION_DATABASE",
  },
  // sub 7.2.6
  ORGANIZATION_FOLDER: {
    label: "Thư mục/tệp",
    key: "ORGANIZATION_FOLDER",
  },
  // sub 7.2.7
  ORGANIZATION_APPLICATION: {
    label: "Ứng dụng",
    key: "ORGANIZATION_APPLICATION",
  },
  // sub 7.2.8
  ORGANIZATION_MAP: {
    label: "Bản đồ",
    key: "ORGANIZATION_MAP",
  },
  // sub 7.2.9
  ORGANIZATION_REPORT: {
    label: "Báo cáo",
    key: "ORGANIZATION_REPORT",
  },
  // sub 7.2.10
  ORGANIZATION_AUTHORIZATION: {
    label: "Quyền truy cập",
    key: "ORGANIZATION_AUTHORIZATION",
  },
  // sub 7.2.11
  ORGANIZATION_ACTIVITYDIARY: {
    label: "Nhật ký hoạt động",
    key: "ORGANIZATION_ACTIVITYDIARY",
  },
  // sub 7.2.11
  ORGANIZATION_PERMISSION: {
    label: "Phân nhóm quyền",
    key: "ORGANIZATION_PERMISSION",
  },
  // sub 7.3
  FACTORY_MANAGER_PARENT: {
    label: "Quản lý nhà máy",
    key: "FACTORY_MANAGER_PARENT",
  },
  // MENU 7.3.1
  FACTORY_MANAGER: {
    label: "Nhà máy",
    key: "FACTORY_MANAGER",
  },
  // MENU 7.3.2
  FACTORY_MANAGER_USER: {
    label: "Người dùng",
    key: "FACTORY_MANAGER_USER",
  },
};
export default constants;
