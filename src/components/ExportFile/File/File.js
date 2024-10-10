import { Button } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { exportToExcel, exportToPDF } from "../../../utils/exportFile";
import {
  btnFilterBangKeKHSelector,
  fetchApiGetListOfCustomerSelector,
  fetchApiGetReportListCustomerNewSelector,
} from "../../../redux/selector";
import { formatDate } from "../../../utils/formatDateToString";

function File() {
  const [btnPdf, setBtnPdf] = useState(false);
  const [btnExcel, setBtnExcel] = useState(false);

  // get data
  const isSuccessExportFileKhachHangMoi = useSelector(
    fetchApiGetReportListCustomerNewSelector
  );
  const isSuccessExportFileBangKeKhachHang = useSelector(
    fetchApiGetListOfCustomerSelector
  );
  const listNhaMayId = useSelector(btnFilterBangKeKHSelector);
  const sidebarMenu = sessionStorage.getItem("currentPage");

  // console.log("listNhaMayId", listNhaMayId);

  // handle export file (Khách hàng mới)
  useEffect(() => {
    if (
      isSuccessExportFileKhachHangMoi?.statusCode === 200 &&
      sidebarMenu === "DEV_CUSTOMER" &&
      btnExcel
    ) {
      // custom heading
      const resCustom = isSuccessExportFileKhachHangMoi?.data?.map(
        (__cus, index) => ({
          STT: index + 1,
          "Mã khách hàng": __cus.keyId,
          "Tên khách hàng": __cus.tenKhachHang,
          "Số hợp đồng": __cus.keyId, // đúng vs quan hệ 1-1 (1-n thì sai "Mã hợp đồng")
          "Địa chỉ": __cus.diaChi,
          "Số hộ dùng chung": __cus.soHo,
          "Số nhân khẩu": __cus.soKhau,
          "Điện thoại": __cus.dienThoai,
          "Số CMT": __cus.soCmnd,
          "Ngày cấp":
            __cus.ngayCapCmnd === ""
              ? ""
              : dayjs(__cus.ngayCapCmnd).format("DD/MM/YYYY"),
          "Nơi cấp": __cus.noiCapCmnd,
          ngayLapDat:
            __cus?.hopDongs[0]?.ngayLapDat === ""
              ? ""
              : dayjs(__cus?.hopDongs[0]?.ngayLapDat).format("DD/MM/YYYY"),
        })
      );

      exportToExcel(
        resCustom,
        `BAO_CAO_PHAT_TRIEN_KHACH_HANG_MOI_${dayjs(new Date()).format(
          "DD-MM-YYYY"
        )}`
      );
      setBtnExcel(false);
    } else if (
      isSuccessExportFileKhachHangMoi?.statusCode === 200 &&
      sidebarMenu === "DEV_CUSTOMER" &&
      btnPdf
    ) {
      // define the columns we want and their titles
      const tableColumn = [
        "STT",
        "Mã khách hàng",
        "Tên khách hàng",
        "Số hợp đồng",
        "Địa chỉ",
        "Số hộ dùng chung",
        "Số nhân khẩu",
        "Điện thoại",
        "Số CMT",
        "Ngày cấp",
        "Nơi cấp",
        "Ngày lắp đặt",
      ];
      // define an empty array of rows
      const tableRows = [];

      // custom heading
      isSuccessExportFileKhachHangMoi?.data?.forEach((__cus, index) => {
        const _res = [
          index + 1,
          __cus.keyId,
          __cus.tenKhachHang,
          __cus.keyId, // đúng vs quan hệ 1-1 (1-n thì sai "Mã hợp đồng")
          __cus.diachi,
          __cus.soHo,
          __cus.soKhau,
          __cus.dienThoai,
          __cus.soCmnd,
          __cus.ngayCapCmnd === ""
            ? ""
            : dayjs(__cus.ngayCapCmnd).format("DD/MM/YYYY"),
          __cus.noiCapCmnd,
          __cus?.hopDongs[0]?.ngayLapDat === ""
            ? ""
            : dayjs(__cus?.hopDongs[0]?.ngayLapDat).format("DD/MM/YYYY"),
        ];
        tableRows.push(_res);
      });

      // Lấy ngày đầu tiên của tháng hiện tại
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      // Lấy ngày cuối cùng của tháng hiện tại
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const firstDayFormatted = formatDate(firstDayOfMonth);
      const lastDayFormatted = formatDate(lastDayOfMonth);

      exportToPDF(
        tableColumn,
        tableRows,
        `BAO_CAO_PHAT_TRIEN_KHACH_HANG_MOI_${dayjs(new Date()).format(
          "DD-MM-YYYY"
        )}`,
        {
          options: {
            nameCompany: "CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM",
            titleFile: "BÁO CÁO PHÁT TRIỂN KHÁCH HÀNG MỚI",
            anyString: `Từ ${firstDayFormatted} - Đến ${lastDayFormatted}`,
          },
        }
      );
      setBtnPdf(false);
    }
  }, [
    btnExcel,
    btnPdf,
    isSuccessExportFileKhachHangMoi?.data,
    isSuccessExportFileKhachHangMoi?.statusCode,
    sidebarMenu,
  ]);

  // handle export file (Bảng kê danh sách khách hàng)
  useEffect(() => {
    if (
      isSuccessExportFileBangKeKhachHang?.statusCode === 200 &&
      sidebarMenu === "LIST_CUSTOMER" &&
      btnExcel
    ) {
      // custom heading
      const resCustom = isSuccessExportFileBangKeKhachHang?.data?.map(
        (__contract, index) => ({
          STT: index + 1,
          "Mã khách hàng": __contract.khachHang.keyId,
          "Tên khách hàng": __contract.khachHang.tenKhachHang,
          "Số hợp đồng": __contract.keyId,
          "Điện thoại": __contract.khachHang.dienThoai,
          "Đối tượng giá": __contract.doiTuongGia,
          "Kích cỡ": __contract?.dongHoNuocs[0]?.duongKinh,
          "Tình trạng":
            __contract?.dongHoNuocs[0]?.trangThaiSuDung === 1
              ? "Đang sử dụng"
              : __contract?.dongHoNuocs[0]?.trangThaiSuDung === 2
              ? "Ngưng sử dụng"
              : "Hủy",
          "Loại đồng hồ":
            __contract?.dongHoNuocs[0]?.loaiDongHoId === 1
              ? "Tổng"
                ? __contract?.dongHoNuocs[0]?.loaiDongHoId === 2
                : "Block"
              : "Hộ dân",
          "Hãng sản xuất": __contract?.dongHoNuocs[0]?.hangSX,
          "Mã đồng hồ": __contract?.dongHoNuocs[0]?.keyId,
          "Ghi chú": __contract?.dongHoNuocs[0]?.ghiChu,
          "Cán bộ đọc": __contract?.dongHoNuocs[0]?.canBoDoc, // chưa có,
          "Tuyến đọc": "",
          "CS cuối": __contract?.dongHoNuocs[0]?.chiSoCuoi,
          "Ngày lắp đặt":
            __contract?.ngayLapDat === ""
              ? ""
              : dayjs(__contract?.ngayLapDat).format("DD/MM/YYYY"),
        })
      );

      exportToExcel(
        resCustom,
        `BANG_KE_DANH_SACH_KHACH_HANG_MOI_${dayjs(new Date()).format(
          "DD-MM-YYYY"
        )}`
      );
      setBtnExcel(false);
    } else if (
      isSuccessExportFileBangKeKhachHang?.statusCode === 200 &&
      btnPdf &&
      sidebarMenu === "LIST_CUSTOMER"
    ) {
      // define the columns we want and their titles
      const tableColumn = [
        "STT",
        "Mã khách hàng",
        "Tên khách hàng",
        "Số hợp đồng",
        "Điện thoại",
        "Đối tượng giá",
        "Kích cỡ",
        "Tình trạng",
        "Loại đồng hồ",
        "Hãng sản xuất",
        "Mã đồng hồ",
        "Ngày lắp",
        "CS cuối",
        "Ghi chú",
        "Cán bộ đọc",
        "Tuyến đọc",
      ];
      // define an empty array of rows
      const tableRows = [];

      // custom heading
      isSuccessExportFileBangKeKhachHang?.data?.forEach((__contract, index) => {
        const _res = [
          index + 1,
          __contract.khachHang.keyId,
          __contract.khachHang.tenKhachHang,
          __contract.keyId,
          __contract.khachHang.dienThoai,
          __contract.doiTuongGia,
          __contract?.dongHoNuocs[0]?.duongKinh,
          __contract?.dongHoNuocs[0]?.trangThaiSuDung === 1
            ? "Đang sử dụng"
            : __contract?.dongHoNuocs[0]?.trangThaiSuDung === 2
            ? "Ngưng sử dụng"
            : "Hủy",
          __contract?.dongHoNuocs[0]?.loaiDongHoId === 1
            ? "Tổng"
              ? __contract?.dongHoNuocs[0]?.loaiDongHoId === 2
              : "Block"
            : "Hộ dân",
          __contract?.dongHoNuocs[0]?.hangSX,
          __contract?.dongHoNuocs[0]?.keyId,
          __contract?.ngayLapDat === ""
            ? ""
            : dayjs(__contract?.ngayLapDat).format("DD/MM/YYYY"),
          __contract?.dongHoNuocs[0]?.chiSoCuoi,
          __contract?.dongHoNuocs[0]?.ghiChu,
          __contract?.dongHoNuocs[0]?.canBoDoc, // chưa có
          // tuyến đọc,
        ];
        tableRows.push(_res);
      });

      exportToPDF(
        tableColumn,
        tableRows,
        `BANG_KE_DANH_SACH_KHACH_HANG_MOI_${dayjs(new Date()).format(
          "DD-MM-YYYY"
        )}`,
        {
          options: {
            nameCompany: "CÔNG TY TNHH & CN AMAZINGTECH VIỆT NAM",
            titleFile: "BẢNG KÊ DANH SÁCH KHÁCH HÀNG",
            anyString: `Đối tượng giá: Tất cả`,
          },
        }
      );
      setBtnPdf(false);
    }
  }, [
    btnExcel,
    btnPdf,
    isSuccessExportFileBangKeKhachHang?.data,
    isSuccessExportFileBangKeKhachHang?.statusCode,
    sidebarMenu,
  ]);

  // handle export file to excel (.xlsx)
  const handleExportToExcel = () => {
    setBtnExcel(true);
  };

  // handle export file pdf (.pdf)
  const handleExportToPdf = () => {
    setBtnPdf(true);
  };

  return (
    <div className="wrapper-file">
      <Button
        onClick={handleExportToPdf}
        disabled={listNhaMayId ? false : true}
      >
        Pdf
      </Button>
      <Button
        onClick={handleExportToExcel}
        disabled={listNhaMayId ? false : true}
      >
        Excel
      </Button>
    </div>
  );
}

export default File;
