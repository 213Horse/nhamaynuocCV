import {
  CommentOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  ProfileOutlined,
  WarningOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons/lib/icons";
import { Menu, Tooltip } from "antd";
import { useDispatch } from "react-redux";

import "./SidebarMenu.css";
import constants from "../../utils/constants";
import sidebarSlice from "../../redux/slices/sidebarSlice/sidebarSlice";
import tabListContractSlice from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import customerSlice from "../../redux/slices/customerSlice/customerSlice";

function SidebarMenu({ onCloseDrawer, isTabletOrMobile }) {
  const dispatch = useDispatch();

  return (
    <Menu
      theme="light"
      mode="inline"
      style={{ fontSize: "1.5rem", fontWeight: "600" }}
      className="custom-sidebar-menu"
      defaultSelectedKeys={[sessionStorage.getItem("currentPage")]}
      defaultOpenKeys={[
        constants.DASHBOARD_FORM_PARENT.key,
        constants.REGISTRATION_FORM_PARENT.key,
        constants.REGISTRATION_FORM_CHILD.key,
        constants.RECORD_INDEX_PARENT.key,
        constants.COLLECT_MONEY.key,
        constants.FAILURE.key,
        constants.NOTICE_OF_CUSTOMS.key,
        constants.CATEGORY.key,
        constants.CATEGORY_ADMINISTRATIVE.key,
        constants.ADMINISTRATION_PARENT.key,
        constants.DECENTRALIZATION_CHILD.key,
        constants.ORGANIZATION.key,
        constants.COLLECT_MONEY_REPORT_PAY.key,
        constants.REPORT_BILL.key,
      ]}
      items={[
        {
          key: constants.REGISTRATION_FORM_PARENT.key,
          icon: <FileDoneOutlined />,
          label: constants.REGISTRATION_FORM_PARENT.label,
          children: [
            {
              label: constants.CONTRACT_MANAGER.label,
              key: constants.CONTRACT_MANAGER.key,
            },
            {
              key: constants.REGISTRATION_FORM_CHILD.key,
              label: constants.REGISTRATION_FORM_CHILD.label,
              children: [
                {
                  label: constants.DEV_CUSTOMER.label,
                  key: constants.DEV_CUSTOMER.key,
                },
                {
                  label: constants.LIST_CUSTOMER.label,
                  key: constants.LIST_CUSTOMER.key,
                },
              ],
            },
          ],
        },
        {
          key: constants.DASHBOARD_FORM_PARENT.key,
          icon: <FileDoneOutlined />,
          label: constants.DASHBOARD_FORM_PARENT.label,
          children: [
            {
              label: constants.DASHBOARD_FORM_CHILD.label,
              key: constants.DASHBOARD_FORM_CHILD.key,
            },
            {
              label: constants.DASHBOARD_FORM_WORK.label,
              key: constants.DASHBOARD_FORM_WORK.key,
            },
          ],
        },
        {
          key: constants.RECORD_INDEX_PARENT.key,
          icon: <FileExcelOutlined />,
          label: constants.RECORD_INDEX_PARENT.label,
          children: [
            {
              label: constants.READINGS_INDEX.label,
              key: constants.READINGS_INDEX.key,
            },
            {
              label: constants.READINGS_INDEX_TONG.label,
              key: constants.READINGS_INDEX_TONG.key,
            },
            {
              label: (
                <Tooltip
                  className="tooltip_mobile_hidden"
                  title="Tạo sổ đọc chỉ số đồng hồ block"
                  placement="top"
                >
                  {constants.READINGS_INDEX_BLOCK.label}
                </Tooltip>
              ),
              key: constants.READINGS_INDEX_BLOCK.key,
            },
            {
              label: constants.ENTER_INDEX.label,
              key: constants.ENTER_INDEX.key,
            },
            {
              label: constants.BILL_ORDER.label,
              key: constants.BILL_ORDER.key,
            },
            // {
            //   label: constants.PRINT_BILL_ORDER.label,
            //   key: constants.PRINT_BILL_ORDER.key,
            // },
            // Báo cáo hóa đơn
            {
              label: constants.REPORT_BILL.label,
              key: constants.REPORT_BILL.key,
              children: [
                {
                  label: constants.KH_CHUA_DOC_SO.label,
                  key: constants.KH_CHUA_DOC_SO.key,
                },
                // {
                //   label: constants.BANG_KE_CHI_SO_DONG_HO.label,
                //   key: constants.BANG_KE_CHI_SO_DONG_HO.key,
                // },
                // {
                //   label: constants.KH_CO_MUC_TT_LON.label,
                //   key: constants.KH_CO_MUC_TT_LON.key,
                // },
                // {
                //   label: (
                //     <Tooltip
                //       className="tooltip_mobile_hidden"
                //       title="KH sử dụng nước bất thường"
                //       placement="top"
                //     >
                //       {constants.KH_DUNG_NUOC_BT.label}
                //     </Tooltip>
                //   ),
                //   key: constants.KH_DUNG_NUOC_BT.key,
                // },
                // {
                //   label: (
                //     <Tooltip
                //       className="tooltip_mobile_hidden"
                //       title="KH sử dụng nước trong khoảng"
                //       placement="top"
                //     >
                //       {constants.KH_DUNG_NUOC_TRONG_KHOANG.label}
                //     </Tooltip>
                //   ),
                //   key: constants.KH_DUNG_NUOC_TRONG_KHOANG.key,
                // },
                // {
                //   label: constants.KH_KHONG_SD_NUOC.label,
                //   key: constants.KH_KHONG_SD_NUOC.key,
                // },
                // {
                //   label: (
                //     <Tooltip
                //       className="tooltip_mobile_hidden"
                //       title="Phương thức doanh thu theo đối tượng giá"
                //       placement="top"
                //     >
                //       {constants.PT_DOANH_THU_THEO_DTG.label}
                //     </Tooltip>
                //   ),
                //   key: constants.PT_DOANH_THU_THEO_DTG.key,
                // },
                // {
                //   label: constants.TONG_HOP_SAN_LUONG_NUOC.label,
                //   key: constants.TONG_HOP_SAN_LUONG_NUOC.key,
                // },
                // {
                //   label: (
                //     <Tooltip
                //       className="tooltip_mobile_hidden"
                //       title="Tổng hợp doanh thu nước theo khu vực"
                //       placement="top"
                //     >
                //       {constants.TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC.label}
                //     </Tooltip>
                //   ),
                //   key: constants.TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC.key,
                // },
                // {
                //   label: constants.HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN.label,
                //   key: constants.HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN.key,
                // },
                // {
                //   label: constants.TONG_HOP_HOA_DON.label,
                //   key: constants.TONG_HOP_HOA_DON.key,
                // },
                // {
                //   label: (
                //     <Tooltip
                //       className="tooltip_mobile_hidden"
                //       title="Danh sách theo dõi thu tiền khởi thủy"
                //       placement="top"
                //     >
                //       {constants.INITIAL_PAYMENT_TRACKING_LIST.label}
                //     </Tooltip>
                //   ),
                //   key: constants.INITIAL_PAYMENT_TRACKING_LIST.key,
                // },
              ],
            },
          ],
        },
        // {
        //   key: constants.COLLECT_MONEY.key,
        //   icon: <DollarCircleOutlined />,
        //   label: constants.COLLECT_MONEY.label,
        //   children: [
        //     {
        //       label: constants.PAYMENT.label,
        //       key: constants.PAYMENT.key,
        //     },
        //     // {
        //     //   label: constants.COLLECT_MONEY_REPORT_PAY.label,
        //     //   key: constants.COLLECT_MONEY_REPORT_PAY.key,
        //     //   children: [
        //     //     {
        //     //       label: constants.KH_NO_TIEN_NUOC.label,
        //     //       key: constants.KH_NO_TIEN_NUOC.key,
        //     //     },
        //     //     {
        //     //       label: constants.SAN_LUONG_DOANH_THU_TIEN_NUOC.label,
        //     //       key: constants.SAN_LUONG_DOANH_THU_TIEN_NUOC.key,
        //     //     },
        //     //     {
        //     //       label: constants.BANG_KE_THU_TIEN_NUOC.label,
        //     //       key: constants.BANG_KE_THU_TIEN_NUOC.key,
        //     //     },
        //     //   ],
        //     // },
        //   ],
        // },
        JSON.parse(sessionStorage.getItem("user_role"))?.includes(
          "Giám đốc/Chủ tịch/ Admin"
         ) 
        // JSON.parse(sessionStorage.getItem("user_role"))?.includes(
        //   "NV ghi số/Thu tiền"
        // )
          ? {
              key: constants.FAILURE.key,
              icon: <WarningOutlined />,
              label: constants.FAILURE.label,
              children: [
                {
                  label: constants.QL_DONG_HO_TONG.label,
                  key: constants.QL_DONG_HO_TONG.key,
                },
                {
                  label: constants.WATER_LOSS.label,
                  key: constants.WATER_LOSS.key,
                },
                {
                  label: constants.BLOCK_CLOCK_MANAGEMENT.label,
                  key: constants.BLOCK_CLOCK_MANAGEMENT.key,
                },
              ],
            }
          : null,
        // {
        //   key: constants.NOTICE_OF_CUSTOMS.key,
        //   icon: <CommentOutlined />,
        //   label: constants.NOTICE_OF_CUSTOMS.label,
        //   children: [
        //     {
        //       label: constants.LOG_NOTICE.label,
        //       key: constants.LOG_NOTICE.key,
        //     },
        //   ],
        // },
        {
          key: constants.CATEGORY.key,
          icon: <ProfileOutlined />,
          label: constants.CATEGORY.label,
          children: [
            {
              label: constants.CATEGORY_MANAGEMENT_PRICE_SUBJECT.label,
              key: constants.CATEGORY_MANAGEMENT_PRICE_SUBJECT.key,
            },
            {
              label: constants.CATEGORY_MANAGEMENT_LRL.label,
              key: constants.CATEGORY_MANAGEMENT_LRL.key,
            },
            {
              label: constants.CATEGORY_MANAGEMENT_LOCATION.label,
              key: constants.CATEGORY_MANAGEMENT_LOCATION.key,
            },
            {
              label: constants.CATEGORY_MANAGEMENT_READING.label,
              key: constants.CATEGORY_MANAGEMENT_READING.key,
            },

            {
              label: constants.CATEGORY_MANAGEMENT_PRICE_LIST.label,
              key: constants.CATEGORY_MANAGEMENT_PRICE_LIST.key,
            },
            // {
            //   label: constants.CATEGORY_CUSTOMER_TYPE.label,
            //   key: constants.CATEGORY_CUSTOMER_TYPE.key,
            // },
            {
              label: constants.CATEGORY_PAYMENT_METHOD.label,
              key: constants.CATEGORY_PAYMENT_METHOD.key,
            },
            {
              label: constants.CATEGORY_STATUS_READ_NUMBER.label,
              key: constants.CATEGORY_STATUS_READ_NUMBER.key,
            },
            {
              label: constants.CATEGORY_SIGNING.label,
              key: constants.CATEGORY_SIGNING.key,
            },
            // {
            //   label: constants.CATEGORY_CLOCK.label,
            //   key: constants.CATEGORY_CLOCK.key,
            // },
            // {
            //   label: constants.CATEGORY_SCOPE.label,
            //   key: constants.CATEGORY_SCOPE.key,
            // },
            {
              label: constants.CATEGORY_MANAGEMEN_REASONS_INSTEAD.label,
              key: constants.CATEGORY_MANAGEMEN_REASONS_INSTEAD.key,
            },
            {
              label: constants.CATEGORY_MANAGEMEN_REASONS_CANCEL.label,
              key: constants.CATEGORY_MANAGEMEN_REASONS_CANCEL.key,
            },
            {
              label: constants.CATEGORY_WATCH.label,
              key: constants.CATEGORY_WATCH.key,
            },
            {
              label: constants.CATEGORY_INSTALLER.label,
              key: constants.CATEGORY_INSTALLER.key,
            },
            {
              label: constants.CATEGORY_OBJECT.label,
              key: constants.CATEGORY_OBJECT.key,
            },
            {
              label: constants.CATEGORY_PRODUCING_COUNTRY.label,
              key: constants.CATEGORY_PRODUCING_COUNTRY.key,
            },
            {
              label: constants.CATEGORY_MANUFACTURER.label,
              key: constants.CATEGORY_MANUFACTURER.key,
            },
            {
              label: constants.CATEGORY_SERIINVOICE.label,
              key: constants.CATEGORY_SERIINVOICE.key,
            },
            // {
            //   label: constants.CATEGORY_ADMINISTRATIVE.label,
            //   key: constants.CATEGORY_ADMINISTRATIVE.key,
            //   children: [
            //     {
            //       label: constants.CATEGORY_CITY.label,
            //       key: constants.CATEGORY_CITY.key,
            //     },
            //     {
            //       label: constants.CATEGORY_DISTRICT.label,
            //       key: constants.CATEGORY_DISTRICT.key,
            //     },
            //     {
            //       label: constants.CATEGORY_WARD.label,
            //       key: constants.CATEGORY_WARD.key,
            //     },
            //   ],
            // },
          ],
        },
        JSON.parse(sessionStorage.getItem("user_role"))?.includes(
          "Giám đốc/Chủ tịch/ Admin"
        ) 
     
          ? {
              key: constants.ADMINISTRATION_PARENT.key,
              label: constants.ADMINISTRATION_PARENT.label,
              icon: <UserSwitchOutlined />,
              children: [
                {
                  key: constants.DECENTRALIZATION_CHILD.key,
                  label: constants.DECENTRALIZATION_CHILD.label,
                },
                {
                  key: constants.ORGANIZATION.key,
                  label: constants.ORGANIZATION.label,
                  children: [
                    // {
                    //   key: constants.ORGANIZATION_INFORMATION.key,
                    //   label: constants.ORGANIZATION_INFORMATION.label,
                    // },
                    {
                      key: constants.ORGANIZATION_MEMBER.key,
                      label: constants.ORGANIZATION_MEMBER.label,
                    },
                    {
                      key: constants.ORGANIZATION_PERMISSION.key,
                      label: constants.ORGANIZATION_PERMISSION.label,
                    },
                    {
                      key: constants.ORGANIZATION_DEPARTMENT.key,
                      label: constants.ORGANIZATION_DEPARTMENT.label,
                    },
                    // {
                    //   key: constants.ORGANIZATION_JOBTYPE.key,
                    //   label: constants.ORGANIZATION_JOBTYPE.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_WORKGROUP.key,
                    //   label: constants.ORGANIZATION_WORKGROUP.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_DATABASE.key,
                    //   label: constants.ORGANIZATION_DATABASE.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_FOLDER.key,
                    //   label: constants.ORGANIZATION_FOLDER.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_APPLICATION.key,
                    //   label: constants.ORGANIZATION_APPLICATION.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_MAP.key,
                    //   label: constants.ORGANIZATION_MAP.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_REPORT.key,
                    //   label: constants.ORGANIZATION_REPORT.label,
                    // },
                    // {
                    //   key: constants.ORGANIZATION_AUTHORIZATION.key,
                    //   label: constants.ORGANIZATION_AUTHORIZATION.label,
                    // },
                    {
                      key: constants.ORGANIZATION_ACTIVITYDIARY.key,
                      label: constants.ORGANIZATION_ACTIVITYDIARY.label,
                    },
                  ],
                },
                {
                  key: constants.FACTORY_MANAGER_PARENT.key,
                  label: constants.FACTORY_MANAGER_PARENT.label,
                  children: [
                    {
                      key: constants.FACTORY_MANAGER.key,
                      label: constants.FACTORY_MANAGER.label,
                    },
                    {
                      key: constants.FACTORY_MANAGER_USER.key,
                      label: constants.FACTORY_MANAGER_USER.label,
                    },
                  ],
                },
              ],
            }
          : null,
      ]}
      // Change layout
      onSelect={(item) => {
        // menu 1
        if (item.key === constants.CONTRACT_MANAGER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          dispatch(tabListContractSlice.actions.btnClickTabListContract(null)); // clear
          sessionStorage.setItem("currentPage", constants.CONTRACT_MANAGER.key); // save to session
          isTabletOrMobile && onCloseDrawer(); // when click item menu -> auto close
        }
        // sub menu 1.1
        else if (item.key === constants.DEV_CUSTOMER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          dispatch(customerSlice.actions.btnFilterBangKeKH(null));
          sessionStorage.setItem("currentPage", constants.DEV_CUSTOMER.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.LIST_CUSTOMER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          dispatch(customerSlice.actions.btnFilterBangKeKH(null));
          sessionStorage.setItem("currentPage", constants.LIST_CUSTOMER.key);
          isTabletOrMobile && onCloseDrawer();
        }
        // menu 2
        else if (item.key === constants.RECORD_INDEX_PARENT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.RECORD_INDEX_PARENT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.READINGS_INDEX.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.READINGS_INDEX.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.DASHBOARD_FORM_CHILD.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.DASHBOARD_FORM_CHILD.key
          );
          isTabletOrMobile && onCloseDrawer();
        }
        else if (item.key === constants.DASHBOARD_FORM_WORK.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.DASHBOARD_FORM_WORK.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.READINGS_INDEX_TONG.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.READINGS_INDEX_TONG.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.READINGS_INDEX_BLOCK.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.READINGS_INDEX_BLOCK.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ENTER_INDEX.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.ENTER_INDEX.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.BILL_ORDER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.BILL_ORDER.key);
          isTabletOrMobile && onCloseDrawer();
        }
        // else if (item.key === constants.PRINT_BILL_ORDER.key) {
        //   dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
        //   sessionStorage.setItem("currentPage", constants.PRINT_BILL_ORDER.key);
        //   isTabletOrMobile && onCloseDrawer();
        // }
        // menu 4
        else if (item.key === constants.PAYMENT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
          sessionStorage.setItem("currentPage", constants.PAYMENT.key);
          isTabletOrMobile && onCloseDrawer();
        }
        // menu 3
        else if (item.key === constants.CATEGORY.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (
          item.key === constants.CATEGORY_MANAGEMENT_PRICE_SUBJECT.key
        ) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMENT_PRICE_SUBJECT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_MANAGEMENT_READING.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMENT_READING.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_MANAGEMENT_PRICE_LIST.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMENT_PRICE_LIST.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_MANAGEMENT_LRL.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMENT_LRL.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_MANAGEMENT_LOCATION.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMENT_LOCATION.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (
          item.key === constants.CATEGORY_MANAGEMEN_REASONS_INSTEAD.key
        ) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMEN_REASONS_INSTEAD.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (
          item.key === constants.CATEGORY_MANAGEMEN_REASONS_CANCEL.key
        ) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANAGEMEN_REASONS_CANCEL.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_WATCH.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_WATCH.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_PAYMENT_METHOD.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_PAYMENT_METHOD.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_SIGNING.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_SIGNING.key);
          isTabletOrMobile && onCloseDrawer();
        }
        // else if (item.key === constants.CATEGORY_CLOCK.key) {
        //   dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
        //   sessionStorage.setItem("currentPage", constants.CATEGORY_CLOCK.key);
        //   isTabletOrMobile && onCloseDrawer();
        // }
        else if (item.key === constants.CATEGORY_SCOPE.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_SCOPE.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_WATCH.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_WATCH.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_CUSTOMER_TYPE.key) {
          // dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          // sessionStorage.setItem(
          //   "currentPage",
          //   constants.CATEGORY_CUSTOMER_TYPE.key
          // );
          // isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_INSTALLER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_INSTALLER.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_CITY.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_CITY.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_DISTRICT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_DISTRICT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_WARD.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_WARD.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_OBJECT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.CATEGORY_OBJECT.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_PRODUCING_COUNTRY.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_PRODUCING_COUNTRY.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_MANUFACTURER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_MANUFACTURER.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_SERIINVOICE.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_SERIINVOICE.key
          );
          isTabletOrMobile && onCloseDrawer();
        }
        // menu 5
        else if (item.key === constants.FAILURE.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.FAILURE.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.BLOCK_CLOCK_MANAGEMENT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.BLOCK_CLOCK_MANAGEMENT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.WATER_LOSS.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.WATER_LOSS.key);
          isTabletOrMobile && onCloseDrawer();
        }
        // menu 6
        else if (item.key === constants.NOTICE_OF_CUSTOMS.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.NOTICE_OF_CUSTOMS.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.LOG_NOTICE.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.LOG_NOTICE.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.CATEGORY_STATUS_READ_NUMBER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.CATEGORY_STATUS_READ_NUMBER.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ADMINISTRATION_PARENT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ADMINISTRATION_PARENT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.DECENTRALIZATION_CHILD.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.DECENTRALIZATION_CHILD.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_INFORMATION.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_INFORMATION.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_MEMBER.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_MEMBER.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_DEPARTMENT.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_DEPARTMENT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_JOBTYPE.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_JOBTYPE.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_WORKGROUP.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_WORKGROUP.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_DATABASE.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_DATABASE.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_FOLDER.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_FOLDER.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_APPLICATION.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_APPLICATION.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_MAP.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.ORGANIZATION_MAP.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_REPORT.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_REPORT.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_AUTHORIZATION.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_AUTHORIZATION.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_ACTIVITYDIARY.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_ACTIVITYDIARY.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.ORGANIZATION_PERMISSION.key) {
          // new
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.ORGANIZATION_PERMISSION.key
          );
          isTabletOrMobile && onCloseDrawer();
        }
        // Menu (Thu tiền)
        else if (item.key === constants.KH_NO_TIEN_NUOC.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.KH_NO_TIEN_NUOC.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.SAN_LUONG_DOANH_THU_TIEN_NUOC.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.SAN_LUONG_DOANH_THU_TIEN_NUOC.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.BANG_KE_THU_TIEN_NUOC.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.BANG_KE_THU_TIEN_NUOC.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.KH_CHUA_DOC_SO.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.KH_CHUA_DOC_SO.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.BANG_KE_CHI_SO_DONG_HO.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.BANG_KE_CHI_SO_DONG_HO.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.KH_CO_MUC_TT_LON.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.KH_CO_MUC_TT_LON.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.KH_DUNG_NUOC_BT.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.KH_DUNG_NUOC_BT.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.KH_DUNG_NUOC_TRONG_KHOANG.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.KH_DUNG_NUOC_TRONG_KHOANG.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.KH_KHONG_SD_NUOC.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.KH_KHONG_SD_NUOC.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.PT_DOANH_THU_THEO_DTG.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.PT_DOANH_THU_THEO_DTG.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.FACTORY_MANAGER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.FACTORY_MANAGER.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.FACTORY_MANAGER_USER.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.FACTORY_MANAGER_USER.key
          );
          isTabletOrMobile && onCloseDrawer();
        }
        // Đồng hồ tổng
        else if (item.key === constants.QL_DONG_HO_TONG.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.QL_DONG_HO_TONG.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.TONG_HOP_SAN_LUONG_NUOC.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.TONG_HOP_SAN_LUONG_NUOC.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (
          item.key === constants.TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC.key
        ) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (
          item.key === constants.HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN.key
        ) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN.key
          );
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.TONG_HOP_HOA_DON.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem("currentPage", constants.TONG_HOP_HOA_DON.key);
          isTabletOrMobile && onCloseDrawer();
        } else if (item.key === constants.INITIAL_PAYMENT_TRACKING_LIST.key) {
          dispatch(sidebarSlice.actions.btnClickSidebarMenu(item.key));
          sessionStorage.setItem(
            "currentPage",
            constants.INITIAL_PAYMENT_TRACKING_LIST.key
          );
          isTabletOrMobile && onCloseDrawer();
        }
      }}
    />
  );
}

export default SidebarMenu;
