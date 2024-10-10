import { RedoOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import masterClockSlice, {
  fetchApiGetMasterClock,
} from "../../../redux/slices/masterClockSlice/masterClockSlice";
import {
  btnClickGetFactoryIdSelector,
  getListDongHoTong,
  isLoadingGetMasterClockSelector,
  setRowSelectedSelector,
} from "../../../redux/selector";
import dayjs from "dayjs";
import { fetchApiGetAllDongHoTheoLoai } from "../../../redux/slices/waterClockSlice/waterClockSlice";

function TableMasterClock({ formMain, isUpdate }) {
  const dispatch = useDispatch();

  const rowSelected = useSelector(setRowSelectedSelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const masterClock = useSelector(getListDongHoTong); //(fetchApiGetMasterClockSelector);
  const isLoading = useSelector(isLoadingGetMasterClockSelector);

  // console.log("rowSelected", rowSelected);
  // console.log("factoryId", factoryId);
  // console.log("masterClock", masterClock);

  // set default fields (Form update master clock)
  // console.log()
  useEffect(() => {
    if (rowSelected) {
      formMain.setFieldsValue({ keyId: isUpdate ? rowSelected?.keyId : "" });
      formMain.setFieldsValue({
        tenDongHo: isUpdate ? rowSelected?.tenDongHo : "",
      });
      formMain.setFieldsValue({
        seriDongHo: isUpdate ? rowSelected?.seriDongHo : "",
      });
      formMain.setFieldsValue({
        ngayLapDat: isUpdate
          ? rowSelected?.ngayLapDat !== null
            ? dayjs(rowSelected?.ngayLapDat)
            : null
          : "",
      });
      formMain.setFieldsValue({
        hieuLucKD: isUpdate
          ? rowSelected?.hieuLucKD !== null
            ? dayjs(rowSelected?.hieuLucKD)
            : null
          : "",
      });
      formMain.setFieldsValue({
        ngayKiemDinh: isUpdate
          ? rowSelected?.ngayKiemDinh !== null
            ? dayjs(rowSelected?.ngayKiemDinh)
            : null
          : "",
      });
      formMain.setFieldsValue({
        ngayKetThuc: isUpdate
          ? rowSelected?.ngayKetThuc !== null
            ? dayjs(rowSelected?.ngayKetThuc)
            : null
          : "",
      });
      formMain.setFieldsValue({
        dongHoChaId: isUpdate ? rowSelected?.dongHoChaId : "",
      });
      formMain.setFieldsValue({
        trangThaiSuDung: isUpdate
          ? rowSelected?.trangThaiSuDung === "DangSuDung"
            ? 1
            : rowSelected?.trangThaiSuDung === "NgungSuDung"
            ? 2
            : rowSelected?.trangThaiSuDung === "Huy"
            ? 3
            : 1
          : 1,
      });

      formMain.setFieldsValue({ nuocSX: isUpdate ? rowSelected?.nuocSX : "" });
      formMain.setFieldsValue({ hangSX: isUpdate ? rowSelected?.hangSX : "" });
      formMain.setFieldsValue({
        kieuDongHo: isUpdate ? rowSelected?.kieuDongHo : "",
      });
      formMain.setFieldsValue({
        duongKinh: isUpdate ? rowSelected?.duongKinh : "",
      });
      formMain.setFieldsValue({
        duongKinh: isUpdate ? rowSelected?.duongKinh : "",
      });
      formMain.setFieldsValue({
        ngaySuDung: isUpdate
          ? rowSelected?.ngaySuDung !== null
            ? dayjs(rowSelected?.ngaySuDung)
            : null
          : "",
      });
      formMain.setFieldsValue({
        soPhieuThay: isUpdate ? rowSelected?.soPhieuThay : "",
      });
      formMain.setFieldsValue({
        soPhieuThay: isUpdate ? rowSelected?.soPhieuThay : "",
      });
      formMain.setFieldsValue({ kinhDo: isUpdate ? rowSelected?.kinhDo : "" });
      formMain.setFieldsValue({ viDo: isUpdate ? rowSelected?.viDo : "" });
      formMain.setFieldsValue({
        hopBaoVe: isUpdate ? rowSelected?.hopBaoVe : "",
      });
      formMain.setFieldsValue({
        viTriLapDat: isUpdate ? rowSelected?.viTriLapDat : "",
      });
      formMain.setFieldsValue({ soHieu: isUpdate ? rowSelected?.soTem : "" });
      formMain.setFieldsValue({
        chiSoDau: isUpdate ? rowSelected?.chiSoDau : "",
      });
      formMain.setFieldsValue({
        chiSoCuoi: isUpdate ? rowSelected?.chiSoCuoi : "",
      });
      formMain.setFieldsValue({
        tuyenDocId: isUpdate ? rowSelected?.tuyenDocId : "",
      });
    }
  }, [formMain, rowSelected, isUpdate]);

  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "keyId",
      title: "Mã đồng hồ",
      dataIndex: "keyId",
    },
    {
      key: "tenDongHo",
      title: "Tên đồng hồ",
      dataIndex: "tenDongHo",
    },
    {
      key: "loaiDongHoId",
      title: "Loại đồng hồ",
      dataIndex: "loaiDongHoId",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "chiSoDau",
      title: "Chỉ số đầu",
      dataIndex: "chiSoDau",
    },
    {
      key: "chiSoCuoi",
      title: "Chỉ số cuối",
      dataIndex: "chiSoCuoi",
    },
    {
      key: "seriDongHo",
      title: "Seri",
      dataIndex: "seriDongHo",
    },
    {
      key: "trangThaiSuDung",
      title: "Tình trạng",
      dataIndex: "trangThaiSuDung",
    },
  ];

  // load master clock by nhaMayId
  useEffect(() => {
    if (factoryId) {
      //handle get line reading by factory id
      let factoryQueryString = "";
      if (factoryId === "all") {
        const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
        factoryIdArr.map((factory) => {
          if (factoryQueryString === "") {
            factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
          } else {
            factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
          }
        });
      } else {
        factoryQueryString = `nhaMayId=${factoryId}`;
      }
      dispatch(fetchApiGetMasterClock(factoryQueryString));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factoryId]);

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
    dispatch(masterClockSlice.actions.setRowSelected(selectedRows[0]));
  };

  // reset list master clock
  const handleResetListMasterClock = () => {
    if (factoryId) {
      //handle get line reading by factory id
      let factoryQueryString = "";
      if (factoryId === "all") {
        const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
        factoryIdArr.map((factory) => {
          if (factoryQueryString === "") {
            factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
          } else {
            factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
          }
        });
      } else {
        factoryQueryString = `nhaMayId=${factoryId}`;
      }
      dispatch(fetchApiGetMasterClock(factoryQueryString));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(masterClockSlice.actions.setRowSelected(null));
  };

  return (
    <Table
      scroll={{ x: 1500 }}
      rowKey="index"
      columns={cols}
      loading={isLoading}
      dataSource={
        masterClock?.data?.length === 1 || masterClock?.length === 1
          ? [
              {
                index: 1,
                id: masterClock?.data[0]?.id,
                keyId: masterClock?.data[0]?.keyId,
                loaiDongHo: masterClock?.data[0]?.loaiDongHo,
                ngaySuDung: masterClock?.data[0]?.ngaySuDung,
                donViHC: masterClock?.data[0]?.donViHC,
                nguoiQuanLyId: masterClock?.data[0]?.nguoiQuanLyId,
                tuyenDocId: masterClock?.data[0]?.tuyenDocId,
                dongHoChaId: masterClock?.data[0]?.dongHoChaId,
                soThuTu: masterClock?.data[0]?.soThuTu,
                seriChi: masterClock?.data[0]?.seriChi,
                toaDo: masterClock?.data[0]?.toaDo,
                kinhDo: masterClock?.data[0]?.kinhDo,
                viDo: masterClock?.data[0]?.viDo,
                nuocSX: masterClock?.data[0]?.nuocSX,
                hangSX: masterClock?.data[0]?.hangSX,
                kieuDongHo: masterClock?.data[0]?.kieuDongHo,
                duongKinh: masterClock?.data[0]?.duongKinh,
                hopBaoVe: masterClock?.data[0]?.hopBaoVe,
                viTriLapDat: masterClock?.data[0]?.viTriLapDat,
                ngayKiemDinh: masterClock?.data[0]?.ngayKiemDinh,
                hieuLucKD: masterClock?.data[0]?.hieuLucKD,
                lyDoKiemDinh: masterClock?.data[0]?.lyDoKiemDinh,
                vanMotChieu: masterClock?.data[0]?.vanMotChieu,
                trangThaiDHLap: masterClock?.data[0]?.trangThaiDHLap,
                soTem: masterClock?.data[0]?.soTem,
                soPhieuThay: masterClock?.data[0]?.soPhieuThay,
                lyDoThay: masterClock?.data[0]?.lyDoThay,
                lyDoHuy: masterClock?.data[0]?.lyDoHuy,
                maDHThay: masterClock?.data[0]?.maDHThay,
                nguoiThayId: masterClock?.data[0]?.nguoiThayId,
                khuyenMai: masterClock?.data[0]?.khuyenMai,
                ongDan: masterClock?.data[0]?.ongDan,
                daiKhoiThuy: masterClock?.data[0]?.daiKhoiThuy,
                loaiDiemId: masterClock?.data[0]?.loaiDiemId,
                hopDongId: masterClock?.data[0]?.hopDongId,
                ngayKetThuc: masterClock?.data[0]?.ngayKetThuc,
                tenDongHo: masterClock?.data[0]?.tenDongHo,
                loaiDongHoId: masterClock?.data[0]?.loaiDongHoId,
                diaChi: masterClock?.data[0]?.diaChi,
                chiSoDau: masterClock?.data[0]?.chiSoDau,
                chiSoCuoi: masterClock?.data[0]?.chiSoCuoi,
                seriDongHo: masterClock?.data[0]?.seriDongHo,
                trangThaiSuDung:
                  masterClock?.data[0]?.trangThaiSuDung === "DangSuDung" ? ( // DangSuDung
                    <p className="status-normal-water-clock">Đang sử dụng</p>
                  ) : masterClock?.data[0]?.trangThaiSuDung ===
                    "NgungSuDung" ? ( // NgungSuDung
                    <p className="status-cancel-water-clock">Ngưng sử dụng</p>
                  ) : masterClock?.data[0]?.trangThaiSuDung === "Huy" ? (
                    <p className="status-cancel-water-clock">Hủy</p>
                  ) : (
                    ""
                  ),
              },
            ]
          : masterClock?.length > 0 && factoryId === "all"
          ? masterClock?.map((_masterClock, index) => ({
              index: index + 1,
              id: _masterClock?.id,
              keyId: _masterClock?.keyId,
              loaiDongHo: _masterClock?.loaiDongHo,
              ngaySuDung: _masterClock?.ngaySuDung,
              donViHC: _masterClock?.donViHC,
              nguoiQuanLyId: _masterClock?.nguoiQuanLyId,
              tuyenDocId: _masterClock?.tuyenDocId,
              dongHoChaId: _masterClock?.dongHoChaId,
              soThuTu: _masterClock?.soThuTu,
              seriChi: _masterClock?.seriChi,
              toaDo: _masterClock?.toaDo,
              kinhDo: _masterClock?.kinhDo,
              viDo: _masterClock?.viDo,
              nuocSX: _masterClock?.nuocSX,
              hangSX: _masterClock?.hangSX,
              kieuDongHo: _masterClock?.kieuDongHo,
              duongKinh: _masterClock?.duongKinh,
              hopBaoVe: _masterClock?.hopBaoVe,
              viTriLapDat: _masterClock?.viTriLapDat,
              ngayKiemDinh: _masterClock?.ngayKiemDinh,
              hieuLucKD: _masterClock?.hieuLucKD,
              lyDoKiemDinh: _masterClock?.lyDoKiemDinh,
              vanMotChieu: _masterClock?.vanMotChieu,
              trangThaiDHLap: _masterClock?.trangThaiDHLap,
              soTem: _masterClock?.soTem,
              soPhieuThay: _masterClock?.soPhieuThay,
              lyDoThay: _masterClock?.lyDoThay,
              lyDoHuy: _masterClock?.lyDoHuy,
              maDHThay: _masterClock?.maDHThay,
              nguoiThayId: _masterClock?.nguoiThayId,
              khuyenMai: _masterClock?.khuyenMai,
              ongDan: _masterClock?.ongDan,
              daiKhoiThuy: _masterClock?.daiKhoiThuy,
              loaiDiemId: _masterClock?.loaiDiemId,
              hopDongId: _masterClock?.hopDongId,
              ngayKetThuc: _masterClock?.ngayKetThuc,
              tenDongHo: _masterClock?.tenDongHo,
              loaiDongHoId: _masterClock?.loaiDongHoId,
              diaChi: _masterClock?.diaChi,
              chiSoDau: _masterClock?.chiSoDau,
              chiSoCuoi: _masterClock?.chiSoCuoi,
              seriDongHo: _masterClock?.seriDongHo,
              trangThaiSuDung:
                _masterClock?.trangThaiSuDung === "DangSuDung" ? ( // DangSuDung
                  <p className="status-normal-water-clock">Đang sử dụng</p>
                ) : _masterClock?.trangThaiSuDung === "NgungSuDung" ? ( // NgungSuDung
                  <p className="status-cancel-water-clock">Ngưng sử dụng</p>
                ) : _masterClock?.trangThaiSuDung === "Huy" ? (
                  <p className="status-cancel-water-clock">Hủy</p>
                ) : (
                  ""
                ),
            }))
          : []
      }
      onRow={(record, index) => {
        return {
          onClick: () => {
            dispatch(masterClockSlice.actions.setRowSelected(record));
          },
        };
      }}
      rowSelection={{
        type: "radio",
        columnTitle: () => {
          return (
            <Tooltip title="Làm mới">
              <RedoOutlined
                className="icon-reset-rad-btn"
                onClick={handleResetListMasterClock}
              />
            </Tooltip>
          );
        },
        onChange: (selectedRowKeys, selectedRows) =>
          handleRowSelection(selectedRowKeys, selectedRows),
        selectedRowKeys: rowSelected ? [rowSelected.index] : [],
      }}
    ></Table>
  );
}

export default TableMasterClock;
