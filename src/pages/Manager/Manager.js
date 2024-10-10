import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import { btnClickSidebarMenuSelector } from "../../redux/selector";
import constants from "../../utils/constants";
import Contract from "./Contract/Contract";
import ReadingIndex from "../ReadingIndex/ReadingIndex";
import CustomerDevelop from "./CustomerDevelop/CustomerDevelop";
import CustomerList from "./CustomerList/CustomerList";
import EnterIndexPage from "../EnterIndexPage/EnterIndexPage.jsx";
import Invoice from "../Invoice/Invoice";
import InvoicePrint from "../InvoicePrint/InvoicePrint";
import ManagementReading from "../Category/ManagementReading/ManagementReading";
import ManagementPriceList from "../Category/ManagementPriceList/ManagementPriceList";
import Payment from "./Payment/Payment";
import BlockClock from "../BlockClock/BlockClock";
import LogNotice from "../LogNotice/LogNotice";
import ListRegionsLocation from "../Category/ListRegionsLocation/ListRegionsLocation";
import ListPriceObject from "../Category/ListPriceObject/ListPriceObject";
import ListPaymentMethod from "../Category/List_Payment_Method/List_Payment_Method";
import ListClock from "../Category/ListClock/ListClock";
import ListLocation from "../Category/ListLocation/ListLocation";
import CustomerType from "../Category/Category_Customer_Type/CustomerType";
import ListReasons from "../Category/ListReasons/ListReasons";
import ListCancel from "../Category/ListCancel/ListCancel";
import ListWatch from "../Category/ListWatch/ListWatch";
import DMKy from "../Category/DMKy/DMKy";
import Category_Status_ReadNumber from "../Category/DMTrangThaiChiSo/Category_Status_ReadNumber";
import CategoryInstaller from "../Category/Category_Installer/CategoryInstaller";
import CategoryCity from "../Category/Category_City/CategoryCity";
import CategoryWard from "../Category/Category_Ward/CategoryWard";
import DistrictCatogory from "../Category/DMHanhChinh/District/DistrictCategory.jsx";
import ListObject from "../Category/ListObject/ListObject";
import ListProducingCountry from "../Category/ListProducingCountry/ListProducingCountry";
import ListManufacturer from "../Category/ListManufacturer/ListManufacturer";
import Decentralization from "../Admin/Decentralization/Decentralization";
import Information from "../Admin/Organization/Information/Information";
import Member from "../Admin/Organization/Member/Member";
import Department from "../Admin/Organization/Department/Department";
import JobType from "../Admin/Organization/JobType/JobType";
import Workgroup from "../Admin/Organization/Workgroup/Workgroup";
import Database from "../Admin/Organization/Database/Database";
import Folder from "../Admin/Organization/Folder/Folder";
import Application from "../Admin/Organization/Application/Application";
import Map from "../Admin/Organization/Map/Map";
import Report from "../Admin/Organization/Report/Report";
import Authorization from "../Admin/Organization/Authorization/Authorization";

import ThongBaoLoi from "../Login/ThongBaoLoi";
import OweMoneyWater from "./ReportPayment/OweMoneyWater/OweMoneyWater";
import RevenueMoneyWater from "./ReportPayment/RevenueMoneyWater/RevenueMoneyWater";
import CollectionBillMoneyWater from "./ReportPayment/CollectionBillMoneyWater/CollectionBillMoneyWater";
import Permission from "../Admin/Organization/Permission/Permission";
import NotReadNumber from "./ReportBill/NotReadNumber/NotReadNumber";
import ClockIndex from "./ReportBill/ClockIndex/ClockIndex";
import ConsumptionLarge from "./ReportBill/ConsumptionLarge/ConsumptionLarge";
import AbnormalWater from "./ReportBill/AbnormalWater/AbnormalWater";
import AboutUseWater from "./ReportBill/AboutUseWater/AboutUseWater";
import NotUseWater from "./ReportBill/NotUseWater/NotUseWater";
import RevenueAnalysis from "./ReportBill/RevenueAnalysis/RevenueAnalysis";
import MasterClock from "./MasterClock/MasterClock";
import FactoryTable from "../Admin/Organization/Factory/FactoryTable";
import FactoryTableUser from "../Admin/Organization/Factory_User/FactoryTableUser";
import TotalWaterYield from "./ReportBill/TotalWaterYield/TotalWaterYield";
import TotalWaterYieldArea from "./ReportBill/TotalWaterYieldArea/TotalWaterYieldArea";
import BillFollowByEmployee from "./ReportBill/BillFollowByEmployee/BillFollowByEmployee";
import TotalBill from "./ReportBill/TotalBill/TotalBill";
import InititalPaymentTrackingList from "./ReportBill/InitialPaymentTrackingList/InitialPaymentTrackingList";
import ReadingIndexTong from "../ReadingIndexTong/ReadingIndexTong";
import ActivityLog from "../Admin/Organization/ActivityLog/ActivityLog";
import ReadingIndexBlock from "../ReadingIndexBlock/ReadingIndexBlock";
import Dashboard from "../Category/Dasboard/Dashboard";

import WaterLoss from "../WaterLoss/WaterLoss.js";
import SeriInvoice from "../Category/SeriInvoice/SeriInvoice";
import TabStatisticWork from "../../components/WorkStatistic/TabStatisticWork.jsx";

function Manager() {
  const nav = useNavigate();
  const [statusLogin, setStatusLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === "" || token === null || token === undefined) {
      message.error("Bạn Cần Phải Đăng Nhập Để Sử Dụng Hệ Thống");
      nav("/");
    } else {
      setStatusLogin(true);
    }
  }, []);

  const currentPage = sessionStorage.getItem("currentPage");

  // change layout
  const sidebarMenu = useSelector(btnClickSidebarMenuSelector);

  return (
    <DefaultLayout currentPage={currentPage}>
      {sidebarMenu === constants.CONTRACT_MANAGER.key || // menu 1
      currentPage === constants.CONTRACT_MANAGER.key ? (
        <Contract />
      ) : sidebarMenu === constants.DEV_CUSTOMER.key || // sub menu 1.1
        currentPage === constants.DEV_CUSTOMER.key ? (
        <CustomerDevelop />
      ) : sidebarMenu === constants.LIST_CUSTOMER.key ||
        currentPage === constants.LIST_CUSTOMER.key ? (
        <CustomerList />
      ) : sidebarMenu === constants.RECORD_INDEX_PARENT.key ||
        currentPage === constants.RECORD_INDEX_PARENT.key ? ( // menu 2
        <h1>RECORD_INDEX_PARENT</h1>
      ) : sidebarMenu === constants.READINGS_INDEX.key ||
        currentPage === constants.READINGS_INDEX.key ? (
        <ReadingIndex />
      ) : sidebarMenu === constants.READINGS_INDEX_TONG.key ||
        currentPage === constants.READINGS_INDEX_TONG.key ? (
        <ReadingIndexTong />
      ) : sidebarMenu === constants.READINGS_INDEX_BLOCK.key ||
        currentPage === constants.READINGS_INDEX_BLOCK.key ? (
        <ReadingIndexBlock />
      ) : sidebarMenu === constants.ENTER_INDEX.key ||
        currentPage === constants.ENTER_INDEX.key ? (
        <EnterIndexPage />
      ) : sidebarMenu === constants.BILL_ORDER.key ||
        currentPage === constants.BILL_ORDER.key ? (
        <Invoice />
      // ) 
      // : sidebarMenu === constants.PRINT_BILL_ORDER.key ||
      //   currentPage === constants.PRINT_BILL_ORDER.key ? (
      //   <InvoicePrint />
      ) : sidebarMenu === constants.CATEGORY_MANAGEMENT_PRICE_SUBJECT.key ||
        currentPage === constants.CATEGORY_MANAGEMENT_PRICE_SUBJECT.key ? ( //menu 3
        <ListPriceObject />
      ) : sidebarMenu === constants.CATEGORY_MANAGEMENT_LRL.key ||
        currentPage === constants.CATEGORY_MANAGEMENT_LRL.key ? (
        <ListRegionsLocation />
      ) : sidebarMenu === constants.CATEGORY_MANAGEMENT_READING.key ||
        currentPage === constants.CATEGORY_MANAGEMENT_READING.key ? (
        <ManagementReading />
      ) : sidebarMenu === constants.CATEGORY_MANAGEMENT_PRICE_LIST.key ||
        currentPage === constants.CATEGORY_MANAGEMENT_PRICE_LIST.key ? (
        <ManagementPriceList />
      ) : sidebarMenu === constants.CATEGORY_MANAGEMENT_LOCATION.key ||
        currentPage === constants.CATEGORY_MANAGEMENT_LOCATION.key ? (
        <ListLocation />
      ) : sidebarMenu === constants.CATEGORY_PAYMENT_METHOD.key ||
        currentPage === constants.CATEGORY_PAYMENT_METHOD.key ? (
        <ListPaymentMethod />
      ) : // ) : sidebarMenu === constants.CATEGORY_SCOPE.key ||
      //   currentPage === constants.CATEGORY_SCOPE.key ? (
      //   <ListScope />
      sidebarMenu === constants.CATEGORY_MANAGEMEN_REASONS_INSTEAD.key ||
        currentPage === constants.CATEGORY_MANAGEMEN_REASONS_INSTEAD.key ? (
        <ListReasons />
      ) : sidebarMenu === constants.CATEGORY_MANAGEMEN_REASONS_CANCEL.key ||
        currentPage === constants.CATEGORY_MANAGEMEN_REASONS_CANCEL.key ? (
        <ListCancel />
      ) : sidebarMenu === constants.CATEGORY_WATCH.key ||
        currentPage === constants.CATEGORY_WATCH.key ? (
        <ListWatch />
      ) : sidebarMenu === constants.CATEGORY_STATUS_READ_NUMBER.key ||
        currentPage === constants.CATEGORY_STATUS_READ_NUMBER.key ? (
        <Category_Status_ReadNumber />
      ) : sidebarMenu === constants.CATEGORY_SIGNING.key ||
        currentPage === constants.CATEGORY_SIGNING.key ? (
        <DMKy />
      ) : sidebarMenu === constants.CATEGORY_CUSTOMER_TYPE.key ||
        currentPage === constants.CATEGORY_CUSTOMER_TYPE.key ? (
        <CustomerType />
      ) : sidebarMenu === constants.CATEGORY_CLOCK.key ||
        currentPage === constants.CATEGORY_CLOCK.key ? (
        <ListClock />
      ) : sidebarMenu === constants.CATEGORY_PAYMENT_METHOD.key ||
        currentPage === constants.CATEGORY_PAYMENT_METHOD.key ? (
        <ListPaymentMethod />
      ) : sidebarMenu === constants.CATEGORY_INSTALLER.key ||
        currentPage === constants.CATEGORY_INSTALLER.key ? (
        <CategoryInstaller />
      ) : sidebarMenu === constants.CATEGORY_CITY.key ||
        currentPage === constants.CATEGORY_CITY.key ? (
        <CategoryCity />
      ) : sidebarMenu === constants.CATEGORY_DISTRICT.key ||
        currentPage === constants.CATEGORY_DISTRICT.key ? (
        <DistrictCatogory />
      ) : sidebarMenu === constants.CATEGORY_WARD.key ||
        currentPage === constants.CATEGORY_WARD.key ? (
        <CategoryWard />
      ) : sidebarMenu === constants.CATEGORY_OBJECT.key ||
        currentPage === constants.CATEGORY_OBJECT.key ? (
        <ListObject />
      ) : sidebarMenu === constants.CATEGORY_PRODUCING_COUNTRY.key ||
        currentPage === constants.CATEGORY_PRODUCING_COUNTRY.key ? (
        <ListProducingCountry />
      ) : sidebarMenu === constants.CATEGORY_MANUFACTURER.key ||
        currentPage === constants.CATEGORY_MANUFACTURER.key ? (
        <ListManufacturer />
      ) : sidebarMenu === constants.CATEGORY_SERIINVOICE.key ||
        currentPage === constants.CATEGORY_SERIINVOICE.key ? (
        <SeriInvoice />
      ) : sidebarMenu === constants.PAYMENT.key ||
        currentPage === constants.PAYMENT.key ? (
        <Payment />
      ) : sidebarMenu === constants.BLOCK_CLOCK_MANAGEMENT.key ||
        currentPage === constants.BLOCK_CLOCK_MANAGEMENT.key ? ( // menu 5
        <BlockClock />
      ) : sidebarMenu === constants.WATER_LOSS.key ||
        currentPage === constants.WATER_LOSS.key ? ( // menu 6
        <WaterLoss />
      ) : sidebarMenu === constants.LOG_NOTICE.key ||
        currentPage === constants.LOG_NOTICE.key ? ( // menu 6
        <LogNotice />
      ) : sidebarMenu === constants.DECENTRALIZATION_CHILD.key ||
        currentPage === constants.DECENTRALIZATION_CHILD.key ? ( // menu 7
        <Decentralization />
      ) : sidebarMenu === constants.ORGANIZATION_INFORMATION.key ||
        currentPage === constants.ORGANIZATION_INFORMATION.key ? ( // menu 7
        <Information />
      ) : sidebarMenu === constants.ORGANIZATION_MEMBER.key ||
        currentPage === constants.ORGANIZATION_MEMBER.key ? ( // menu 7
        <Member />
      ) : sidebarMenu === constants.ORGANIZATION_DEPARTMENT.key ||
        currentPage === constants.ORGANIZATION_DEPARTMENT.key ? ( // menu 7
        <Department />
      ) : sidebarMenu === constants.ORGANIZATION_JOBTYPE.key ||
        currentPage === constants.ORGANIZATION_JOBTYPE.key ? ( // menu 7
        <JobType />
      ) : sidebarMenu === constants.ORGANIZATION_WORKGROUP.key ||
        currentPage === constants.ORGANIZATION_WORKGROUP.key ? ( // menu 7
        <Workgroup />
      ) : sidebarMenu === constants.ORGANIZATION_DATABASE.key ||
        currentPage === constants.ORGANIZATION_DATABASE.key ? ( // menu 7
        <Database />
      ) : sidebarMenu === constants.ORGANIZATION_FOLDER.key ||
        currentPage === constants.ORGANIZATION_FOLDER.key ? ( // menu 7
        <Folder />
      ) : sidebarMenu === constants.ORGANIZATION_APPLICATION.key ||
        currentPage === constants.ORGANIZATION_APPLICATION.key ? ( // menu 7
        <Application />
      ) : sidebarMenu === constants.ORGANIZATION_MAP.key ||
        currentPage === constants.ORGANIZATION_MAP.key ? ( // menu 7
        <Map />
      ) : sidebarMenu === constants.ORGANIZATION_REPORT.key ||
        currentPage === constants.ORGANIZATION_REPORT.key ? ( // menu 7
        <Report />
      ) : sidebarMenu === constants.ORGANIZATION_AUTHORIZATION.key ||
        currentPage === constants.ORGANIZATION_AUTHORIZATION.key ? ( // menu 7
        <Authorization />
      ) : sidebarMenu === constants.ORGANIZATION_ACTIVITYDIARY.key ||
        currentPage === constants.ORGANIZATION_ACTIVITYDIARY.key ? ( // menu 7
        <ActivityLog />
      ) : sidebarMenu === constants.ORGANIZATION_PERMISSION.key ||
        currentPage === constants.ORGANIZATION_PERMISSION.key ? ( // menu 7
        <Permission />
      ) : // Menu (Thu tiền)
      sidebarMenu === constants.KH_NO_TIEN_NUOC.key ||
        currentPage === constants.KH_NO_TIEN_NUOC.key ? (
        <OweMoneyWater />
      ) : sidebarMenu === constants.SAN_LUONG_DOANH_THU_TIEN_NUOC.key ||
        currentPage === constants.SAN_LUONG_DOANH_THU_TIEN_NUOC.key ? (
        <RevenueMoneyWater />
      ) : sidebarMenu === constants.BANG_KE_THU_TIEN_NUOC.key ||
        currentPage === constants.BANG_KE_THU_TIEN_NUOC.key ? (
        <CollectionBillMoneyWater />
      ) : // Menu (Báo cáo hóa đơn)
      sidebarMenu === constants.KH_CHUA_DOC_SO.key ||
        currentPage === constants.KH_CHUA_DOC_SO.key ? (
        <NotReadNumber />
      ) : sidebarMenu === constants.BANG_KE_CHI_SO_DONG_HO.key ||
        currentPage === constants.BANG_KE_CHI_SO_DONG_HO.key ? (
        <ClockIndex />
      ) : sidebarMenu === constants.KH_CO_MUC_TT_LON.key ||
        currentPage === constants.KH_CO_MUC_TT_LON.key ? (
        <ConsumptionLarge />
      ) : sidebarMenu === constants.KH_DUNG_NUOC_BT.key ||
        currentPage === constants.KH_DUNG_NUOC_BT.key ? (
        <AbnormalWater />
      ) : sidebarMenu === constants.KH_DUNG_NUOC_TRONG_KHOANG.key ||
        currentPage === constants.KH_DUNG_NUOC_TRONG_KHOANG.key ? (
        <AboutUseWater />
      ) : sidebarMenu === constants.KH_KHONG_SD_NUOC.key ||
        currentPage === constants.KH_KHONG_SD_NUOC.key ? (
        <NotUseWater />
      ) : sidebarMenu === constants.PT_DOANH_THU_THEO_DTG.key ||
        currentPage === constants.PT_DOANH_THU_THEO_DTG.key ? (
        <RevenueAnalysis />
      ) : sidebarMenu === constants.TONG_HOP_SAN_LUONG_NUOC.key ||
        currentPage === constants.TONG_HOP_SAN_LUONG_NUOC.key ? (
        <TotalWaterYield />
      ) : sidebarMenu === constants.TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC.key ||
        currentPage === constants.TONG_HOP_DOANH_THU_NUOC_THEO_KHU_VUC.key ? (
        <TotalWaterYieldArea />
      ) : sidebarMenu === constants.HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN.key ||
        currentPage === constants.HOA_DON_TIEN_NUOC_THEO_NHAN_VIEN.key ? (
        <BillFollowByEmployee />
      ) : sidebarMenu === constants.TONG_HOP_HOA_DON.key ||
        currentPage === constants.TONG_HOP_HOA_DON.key ? (
        <TotalBill />
      ) : sidebarMenu === constants.INITIAL_PAYMENT_TRACKING_LIST.key ||
        currentPage === constants.INITIAL_PAYMENT_TRACKING_LIST.key ? (
        <InititalPaymentTrackingList />
      ) : sidebarMenu === constants.FACTORY_MANAGER.key ||
        currentPage === constants.FACTORY_MANAGER.key ? (
        <FactoryTable />
      ) : sidebarMenu === constants.FACTORY_MANAGER_USER.key ||
        currentPage === constants.FACTORY_MANAGER_USER.key ? (
        <FactoryTableUser />
      ) : // Đồng hồ tổng
      sidebarMenu === constants.QL_DONG_HO_TONG.key ||
        currentPage === constants.QL_DONG_HO_TONG.key ? (
        <MasterClock />
      ) : // Đồng hồ tổng
      sidebarMenu === constants.DASHBOARD_FORM_CHILD.key ||
        currentPage === constants.DASHBOARD_FORM_CHILD.key ? (
        <Dashboard />
      ): // Đồng hồ tổng
      sidebarMenu === constants.DASHBOARD_FORM_WORK.key ||
        currentPage === constants.DASHBOARD_FORM_WORK.key ? (
        <TabStatisticWork />
      ) : null}
    </DefaultLayout>
  );
}
export default Manager;
