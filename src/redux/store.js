import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "./slices/sidebarSlice/sidebarSlice";
import reportContractSlice from "./slices/reportContractSlice/reportContractSlice";
import tabListContractSlice from "./slices/tabListContractSlice/tabListContractSlice";
import tabListInvoicePrintSlice from "./slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import tabListEnterIndexPageSlice from "./slices/tabListEnterIndexPageSlice/tabListEnterIndexPageSlice";
import regionSlice from "./slices/regionSlice/regionSlice";
import factorySlice from "./slices/factorySlice/factorySlice";
import priceListObjectSlice from "./slices/priceListObjectSlice/priceListObjectSlice";
import areaSlice from "./slices/areaSlice/areaSlice";
import bangGiaSlice from "./slices/bangGiaSlice/bangGiaSlice";
import tuyenDocSlice from "./slices/DMTuyenDoc/tuyenDocSlice";
import nguoidungSlice from "./slices/NguoiDungSlice/nguoidungSlice";
import priceObjSlice from "./slices/priceObjSlice/priceObjSlice";
import paymentMethodSlice from "./slices/paymentMethodSlice/paymentMethodSlice";
import contractSlice from "./slices/contractSlice/contractSlice";
import detailPriceSlice from "./slices/detailPriceSlice/detailPriceSlice";
import tabListReadingSlice from "./slices/tabListReading/tabListReaingSlice";
import readingSlice from "./slices/readingSlice/readingSlice";
import priceObjectSlice from "./slices/priceObjectSlice/priceObjectSlice";
import trangThaiChiSo from "./slices/DMTrangThaiChiSo/trangThaiChiSoSlice";
import kySlice from "./slices/DMKy/kySlice";
import wardSlice from "./slices/wardSlice/wardSlice";
import listCancelSlice from "./slices/listCancelSlice/listCancelSlice";
import citySlice from "./slices/citySlice/citySlice";
import totalWatchSlice from "./slices/totalWatchSlice/totalWatchSlice";
import watchSlice from "./slices/watchSlice/watchSlice";
import waterClockSlice from "./slices/waterClockSlice/waterClockSlice";
import excelSlice from "./slices/excelSlice/excelSlice";
import customerSlice from "./slices/customerSlice/customerSlice";
import pdfSlice from "./slices/pdfSlice/pdfSlice";
import reasonSlice from "./slices/reasonSlice/reasonSlice";
import DmTotalSlice from "./slices/DmTotalSlice/DmTotalSlice";
import districtSlice from "./slices/districtSlice/districtSlice";
import tabAuthorSlice from "./slices/tabAuthorSlice/tabAuthorSlice";
import readingIndexSlice from "./slices/readingIndexSlice/readingIndexSlice";
import attachmentSlice from "./slices/attachmentSlice/attachmentSlice";
import userLoginSlice from "./slices/userLoginSlice/userLoginSlice";
import registerSlice from "./slices/registerSlice/registerSlice";
import claimsSlice from "./slices/claimSlice/claimSlice";
import thanhVienSlice from "./slices/thanhVienSlice/thanhVienSlice";
import permissionSlice from "./slices/permissionSlice/permissionSlice";
import masterClockSlice from "./slices/masterClockSlice/masterClockSlice";
import passwordSlice from "./slices/forgotChangePasswordSlice/passwordSlice";
import { blockSlice } from "./slices/blockSlice/blockSlice";
import readingIndexBlockSlice from "./slices/readingIndexBlockSlice/readingIndexBlockSlice";
import phongBanSlice from "./slices/phongBanSlice/phongBanSlice";
import readingIndexTotalSlice from "./slices/readingIndexTotalSlice/readingIndexTotalSlice";
import { paymentSlice } from "./slices/paymentSlice/paymentSlice";
import { invoiceSlice } from "./slices/invoiceSlice/invoiceSlice";
import { printInvoiceSlice } from "./slices/printInvoice/printInvoiceSlice";
import { invoicePrintSlice } from "./slices/invoicePrintSlice/invoicePrintSlice";
import currentPageSlice from "./slices/currentPageSlice/currentPageSlice";
import { waterLossSlice } from "./slices/waterLossSlice/waterLossSlice";

import dashBoardSlice from "./slices/dashBoardSlice/dashBoardSlice";
import seriInvoiceSlice from "./slices/CHSeriInvoiceSlice/CHSeriInvoiceSlice";
import seriSlice from "./slices/seriInvoiceSlice/seriInvoiceSlice";
import tabListInvoiceSeriSlice from "./slices/tabListInvoiceSeriSlice/tabListInvoiceSeriSlice";
const store = configureStore({
  reducer: {
    reasonSlice: reasonSlice.reducer,
    sidebarSlice: sidebarSlice.reducer,
    reportContractSlice: reportContractSlice.reducer,
    tabListContractSlice: tabListContractSlice.reducer,
    tabListInvoicePrintSlice: tabListInvoicePrintSlice.reducer,
    tabListInvoiceSeriSlice: tabListInvoiceSeriSlice.reducer,
    tabListEnterIndexPageSlice: tabListEnterIndexPageSlice.reducer,
    regionSlice: regionSlice.reducer,
    factorySlice: factorySlice.reducer,
    priceListObjectSlice: priceListObjectSlice.reducer,
    areaSlice: areaSlice.reducer,
    bangGia: bangGiaSlice.reducer,
    tuyendoc: tuyenDocSlice.reducer,
    blockSlice: blockSlice.reducer,
    ky_ghi_chi_so: kySlice.reducer,
    seriInvoiceSlice: seriInvoiceSlice.reducer,
    nguoidung: nguoidungSlice.reducer,
    priceObjSlice: priceObjSlice.reducer,
    paymentMethodSlice: paymentMethodSlice.reducer,
    contractSlice: contractSlice.reducer,
    detailPriceSlice: detailPriceSlice.reducer,
    tabListReadingSlice: tabListReadingSlice.reducer,
    readingSlice: readingSlice.reducer,
    priceObjectSlice: priceObjectSlice.reducer,
    trangThaiChiSo: trangThaiChiSo.reducer,
    wardSlice: wardSlice.reducer,
    listCancelSlice: listCancelSlice.reducer,
    tinh: citySlice.reducer,
    watchSlice: watchSlice.reducer,
    seriSlice: seriSlice.reducer,
    totalWatchSlice: totalWatchSlice.reducer,
    waterClockSlice: waterClockSlice.reducer,
    excelSlice: excelSlice.reducer,
    customerSlice: customerSlice.reducer,
    pdfSlice: pdfSlice.reducer,
    DMTotalSlice: DmTotalSlice.reducer,
    districtSlice: districtSlice.reducer,
    tabAuthorSlice: tabAuthorSlice.reducer,
    readingIndexSlice: readingIndexSlice.reducer,
    readingIndexBlockSlice: readingIndexBlockSlice.reducer,
    attachmentSlice: attachmentSlice.reducer,
    user_login: userLoginSlice.reducer,
    register: registerSlice.reducer,
    claims: claimsSlice.reducer,
    member: thanhVienSlice.reducer,
    permissionSlice: permissionSlice.reducer,
    masterClockSlice: masterClockSlice.reducer,
    password: passwordSlice.reducer,
    phongBanSlice: phongBanSlice.reducer,
    readingIndexTotalSlice: readingIndexTotalSlice.reducer,
    paymentSlice: paymentSlice.reducer,
    invoiceSlice: invoiceSlice.reducer,
    printInvoiceSlice: printInvoiceSlice.reducer,
    invoicePrintSlice: invoicePrintSlice.reducer,
    currentPageSlice: currentPageSlice.reducer,
    waterLossSlice: waterLossSlice.reducer,
    dashBoardSlice: dashBoardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
