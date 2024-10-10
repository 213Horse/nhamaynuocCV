import {
  CloseCircleOutlined,
  DashboardOutlined,
  DownloadOutlined,
  PlusCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Table, Tooltip } from "antd";
import { useMediaQuery } from "react-responsive";
import { memo, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import waterClockSlice, {
  fetchApiDeleteClockWithContract,
  fetchApiSelectRowWaterClock,
} from "../../../../../redux/slices/waterClockSlice/waterClockSlice";
import {
  btnClickMaDongHoMemSelector,
  btnClickRowClockWaterSelector,
  getDetailHopDongSelector,
  openSelector,
  rowSelectSelector,
} from "../../../../../redux/selector";
import { exportToExcel } from "../../../../../utils/exportFile";
import {
  setAddClick,
  setChangeClick,
} from "../../../../../redux/slices/currentPageSlice/currentPageSlice";

function InfoClock({ customer, formMain, isUpdate }) {
  const [dongHoNuocs, setDongHoNuocs] = useState(
    customer?.hopDongs?.length > 0 ? customer?.hopDongs[0]?.dongHoNuocs : []
  ); // arrays
  // const [count, setCount] = useState(
  //   customer?.hopDongs?.length > 0
  //     ? customer?.hopDongs[0]?.dongHoNuocs[0]?.keyId
  //     : {}
  // );
  const [btnExport, setBtnExport] = useState(false);

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const selectedHopDong = useSelector(getDetailHopDongSelector);
  const rowSelected = useSelector(btnClickRowClockWaterSelector);
  const maDongHoMem = useSelector(btnClickMaDongHoMemSelector);
  console.log("customer", customer);
  console.log("maDongHoMem ->", maDongHoMem);
  console.log("rowSelected ->", rowSelected);
  console.log("selectedHopDong ->", selectedHopDong);

  const colsClock = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "6%",
    },
    {
      key: "trangThaiSuDung",
      title: "Trạng thái",
      dataIndex: "trangThaiSuDung",
      defaultFilteredValue: [1],
      render: (record) => {
        if (record === 1) {
          return <p>Đang sử dụng</p>;
        } else if (record === 2) {
          return <p>Ngưng sử dụng</p>;
        } else {
          return <p>Hủy</p>;
        }
      },
    },
    {
      key: "keyId",
      title: "Mã",
      dataIndex: "keyId",
    },
    {
      key: "seriDongHo",
      title: "Seri",
      dataIndex: "seriDongHo",
    },
    {
      key: "ngaySuDung",
      title: "Ngày sử dụng",
      dataIndex: "ngaySuDung",
      render: (record) => {
        if(record === null){
          return null
        } else{
          return dayjs(record).format("DD/MM/YYYY")
        }
      }
    },
    // {
    //   title: "",
    //   render: (record) => {
    //     return (
    //       <Button
    //         className="info-clock-edit-file"
    //         onClick={() => handleFile(record)}
    //       >
    //         <Tooltip title="Thông tin tệp đính kèm">
    //           <FormOutlined />
    //         </Tooltip>
    //       </Button>
    //     );
    //   },
    // },
  ];

  // handle export list clock water (.xlsx)
  useEffect(() => {
    if (customer && customer?.hopDongs?.length >= 0 && btnExport) {
      // custom heading
      
      const resCustom = customer?.hopDongs[0]?.dongHoNuocs?.map(
        (__contract, index) => ({
          STT: index + 1,
          "Mã đồng hồ": __contract.keyId,
          "Đơn vị hành chính": __contract.donViHC,
          "Tuyến đọc": __contract.tuyenDoc.tenTuyen,
          "Nhân viên": __contract?.tuyenDoc?.nhanVienXem,
          "Đồng hồ Block": __contract.loaiDongHoId,
          "Thứ tự": __contract.soThuTu,
          Seri: __contract.seriDongHo,
          "Chỉ chì": __contract.seriChi,
          "Chỉ số đầu": __contract.chiSoDau,
          "Chỉ số cuối": __contract.chiSoCuoi,
          // "Ngày lắp đặt": dayjs(__contract.hopDong.ngayLapDat).format(
          //   "DD/MM/YYYY"
          // ),
          "Ngày sử dụng": dayjs(__contract.ngaySuDung).format("DD/MM/YYYY"),
          "Địa chỉ": __contract.diaChi,
          "Trạng thái sử dụng":
            __contract.trangThaiSuDung === 1
              ? "Đang sử dụng"
              : __contract.trangThaiSuDung === 2
              ? "Ngưng sử dụng"
              : "Hủy",
          "Lý do hủy": __contract.lyDoHuy,
          "Nước sản xuất": __contract.nuocSX,
          "Hãng sản xuất": __contract.hangSX,
          "Kiểu đồng hồ": __contract.kieuDongHo,
          "Đường kính": __contract.duongKinh,
          "Hộp bảo vệ": __contract.hopBaoVe,
          "Vị trí lắp đặt": __contract.viTriLapDat,
          "Ngày kiểm định": dayjs(__contract.ngayKiemDinh).format("DD/MM/YYYY"),
          "Hiệu lực kiểm định": dayjs(__contract.hieuLucKD).format(
            "DD/MM/YYYY"
          ),
          "Lý do kiểm định":
            __contract.lyDoKiemDinh === 1
              ? "Khách hàng yêu cầu"
              : __contract.lyDoKiemDinh === 2
              ? "Công ty yêu cầu"
              : "Lịch kiểm định",
          "Van 1 chiều": __contract.vanMotChieu === true ? "Có" : "Không",
          "Số tem": __contract.soTem,
          "Số phiếu thay": __contract.soPhieuThay,
          // "Hình thức xử lý":   __contract.hinhThucXuLy,
          "Mã đồng hồ thay": __contract.maDHThay,
          "Người thay": __contract.nguoiThay,
          // "Loại khuyến mãi":   __contract.nguoiThayId,
          "Khuyến mãi": __contract.khuyenMai,
          "Ống dẫn": __contract.ongDan,
          "Đai khởi thủy": __contract.daiKhoiThuy,
        })
      );

      exportToExcel(
        resCustom,
        `DANH_SACH_DONG_HO_NUOC_${dayjs(new Date()).format("DD-MM-YYYY")}`
      );

      setBtnExport(false);
    }
  }, [btnExport, customer, customer?.hopDongs]);

  // handle reset
  const handleClickGetAllClockWater = () => {
    dispatch(waterClockSlice.actions.btnClickThemDongHoNuoc(false));
    dispatch(waterClockSlice.actions.btnClickRowClockWater(null));
    setSelectedRowKeys(null);
  };

  
  const [createCLick, setCreateClick] = useState(false);

  const handleCreateClockWithContract = () => {
    if (rowSelected.trangThaiSuDung === 1) {
      dispatch(setAddClick(true));
      formMain.resetFields([
        "tuyenDocId",
        "donViHCTinh",
        "donViHCHuyen",
        "nguoiQuanLyId",
        "keyIdOfClockDetail",
        "dongHoChaId",
        "soThuTu",
        "seriDongHo",
        "chiSoDau",
        "chiSoCuoi",
        "seriChi",
        "ngayLapDat",
        "ngaySuDung",
        "diachiOfDetailClock",
        "trangThaiSuDung",
        "lyDoHuy",
        "ngayHuy",
        "nuocSXId",
        "hangSXId",
        "kieuDongHoId",
        "loaiDongHo",
        "toaDo",
        "kinhDo",
        "viDo",
        "duongKinh",
        "hopBaoVe",
        "viTriLapDat",
        "ngayKiemDinh",
        "hieuLucKD",
        "lyDoKiemDinh",
        "vanMotChieu",
        "soTem",
        "soPhieuThay",
        "hinhThucXL",
        "lyDoThay",
        "maDHThay",
        "nguoiThayId",
        "donViHC",
        "vungId",
        "khuVucID",
        "loaiKM",
        "trangThaiDHLap",
        "khuyenMai",
        "ongDan",
        "daiKhoiThuy",
        "chipDongHoNuocId",
        "loaiDiemId",
      ]);
      setCreateClick(true);
    } else {
      toast.error("Trạng thái đồng hồ phải là đang sử dụng");
    }
  };

  const [newData, setNewData] = useState([]);

  const handleChangeId = (values) => {
    const existingNumber = parseInt(rowSelected?.maDongHoNuoc.split('_')[2] || 0);
    const newNumber = existingNumber + 1;
    const newID = rowSelected?.maDongHoNuoc.replace(/_\d+$/, '') + `_${newNumber}`;
  
    return newID;
  };

  useEffect(() => {
    if (createCLick) {
      const newClock = {
        id:
          selectedHopDong?.mDongHo[0].maDongHoNuoc +
          "_" +
          selectedHopDong?.mDongHo.length,
        maDongHoNuoc: handleChangeId(selectedHopDong),
        maDongHo:
          selectedHopDong?.mDongHo[0].maDongHoNuoc +
          "_" +
          selectedHopDong?.mDongHo.length,
        trangThaiSuDung: rowSelected?.trangThaiSuDung,
        seriDongHo: rowSelected?.seriDongHo,
        ngaySuDung: dayjs().format("YYYY-MM-DD"),
        donViHC: rowSelected?.donViHC,
        phamVi: rowSelected?.phamVi,
        nguoiQuanLyId: rowSelected?.nguoiQuanLyId,
        loaiDongHo: rowSelected?.loaiDongHo,
        kieuDongHo: rowSelected?.kieuDongHo,
        tuyenDocId: rowSelected?.tuyenDocId,
        ngayLapDat: rowSelected?.ngayLapDat,
        diaChi: rowSelected?.diaChi,
        nuocSX: rowSelected?.nuocSX,
        hangSX: rowSelected?.hangSX,
        duongKinh: rowSelected?.duongKinh,
        hopBaoVe: rowSelected?.hopBaoVe,
        viTriLapDat: rowSelected?.viTriLapDat,
        ngayKiemDinh: rowSelected?.ngayKiemDinh,
        hieuLucKD: rowSelected?.hieuLucKD,
        lyDoKiemDinh: rowSelected?.lyDoKiemDinh,
        vanMotChieu: rowSelected?.vanMotChieu,
        soTem: rowSelected?.soTem,
        hinhThucXL: rowSelected?.hinhThucXL,
        soPhieuThay: rowSelected?.soPhieuThay,
        lyDoThay: rowSelected?.lyDoThay,
        lyDoHuy: rowSelected?.lyDoHuy,
        ngayHuy: rowSelected?.ngayHuy,
        soThuTu: rowSelected?.soThuTu,
        chiSoDau: rowSelected?.chiSoDau,
        chiSoCuoi: rowSelected?.chiSoCuoi,
        dongHoChaId: rowSelected?.dongHoChaId,
        maDHThay: rowSelected?.maDHThay,
        nguoiThayId: rowSelected?.nguoiThayId, // nguoiThayId
        khuyenMai: rowSelected?.khuyenMai,
        loaiKM: rowSelected?.loaiKM,
        ongDan: rowSelected?.ongDan,
        daiKhoiThuy: rowSelected?.daiKhoiThuy,
        trangThaiDHLap: rowSelected?.trangThaiDHLap,
        tenTinh: rowSelected?.tenTinh,
        tenHuyen: rowSelected?.tenHuyen,
        tenXa: rowSelected?.tenXa,
        tenVung: rowSelected?.tenVung,
        khuVucID: rowSelected?.khuVucID,
        seriChi: rowSelected?.seriChi,
        tenNhanVienQuanLy: rowSelected?.tenNhanVienQuanLy,
        tenKhuVuc: rowSelected?.tenKhuVuc,
        maDongHoNhanh: rowSelected?.maDongHoNhanh,
        chipDongHoNuocId: rowSelected?.chipDongHoNuocId,
        toaDo: rowSelected?.toaDo,
        kinhDo: rowSelected?.kinhDo,
        viDo: rowSelected?.viDo,
        nuocSXId: rowSelected?.nuocSXId,
        hangSXId: rowSelected?.hangSXId,
        kieuDongHoId: rowSelected?.kieuDongHoId,
      };
      setNewData([newClock, ...selectedHopDong?.mDongHo]);
      setSelectedRowKeys(null);
    }
  }, [createCLick]);

  // handle delete clock with contract
  const handleDeleteClockWithContract = () => {
    if (rowSelected) {
      if (rowSelected.id === undefined) {
        const _updateDongHoNuocs = dongHoNuocs.filter(
          (_dongHo) => _dongHo.keyId !== rowSelected.keyId
        );

        setDongHoNuocs(_updateDongHoNuocs);

        dispatch(waterClockSlice.actions.btnClickRowClockWater(null));
        toast.success("Xóa thành công đồng hồ nước.");
      } else {
        dispatch(fetchApiDeleteClockWithContract({ keyId: rowSelected.keyId }));
      }
    } else {
      toast.error("Bạn cần phải chọn đồng hồ để xóa.");
    }
  };


  const [changeData, setChangeData] = useState(false);

  const handleChangeClockNew = () => {
    if (rowSelected.trangThaiSuDung === 1) {
      dispatch(setChangeClick(true));
      formMain.resetFields([
        "tuyenDocId",
        "donViHCTinh",
        "donViHCHuyen",
        "nguoiQuanLyId",
        "keyIdOfClockDetail",
        "dongHoChaId",
        "soThuTu",
        "seriDongHo",
        "chiSoDau",
        "chiSoCuoi",
        "seriChi",
        "ngayLapDat",
        "ngaySuDung",
        "diachiOfDetailClock",
        "trangThaiSuDung",
        "lyDoHuy",
        "ngayHuy",
        "nuocSXId",
        "hangSXId",
        "kieuDongHoId",
        "loaiDongHo",
        "toaDo",
        "kinhDo",
        "viDo",
        "duongKinh",
        "hopBaoVe",
        "viTriLapDat",
        "ngayKiemDinh",
        "hieuLucKD",
        "lyDoKiemDinh",
        "vanMotChieu",
        "soTem",
        "soPhieuThay",
        "hinhThucXL",
        "lyDoThay",
        "maDHThay",
        "nguoiThayId",
        "donViHC",
        "vungId",
        "khuVucID",
        "loaiKM",
        "trangThaiDHLap",
        "khuyenMai",
        "ongDan",
        "daiKhoiThuy",
        "chipDongHoNuocId",
        "loaiDiemId",
      ]);
      setCreateClick(true);
      setChangeData(true);
      setSelectedRowKeys(null);
    } else {
      toast.error("Trạng thái đồng hồ phải là đang sử dụng");
    }
  };

  // handle select row of table clock water
  // const handleRowSelection = (selectedRowKeys, selectedRows) => {

  // };

  // handle export list clock water
  const handleExportListClockWater = () => {
    setBtnExport(true);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState();

  useEffect(() => {
    if (
      selectedHopDong !== undefined &&
      selectedHopDong.mDongHo !== undefined
    ) {
      // Lọc mảng chỉ giữ lại các phần tử có trangThaiSuDung === 1
      const filteredArray = selectedHopDong.mDongHo.filter(
        (item) => item.trangThaiSuDung === 1
      );

      // Lấy chỉ mục của các phần tử trong mảng đã lọc
      const indexes = filteredArray.map((item) =>
        selectedHopDong.mDongHo.indexOf(item)
      );

      // Lấy chỉ mục đầu tiên và cộng thêm 1
      const firstIndex = indexes.shift();
      const adjustedIndex =
        firstIndex !== undefined ? firstIndex + 1 : undefined;
      const selectedData =
        adjustedIndex !== undefined
          ? selectedHopDong.mDongHo[adjustedIndex - 1]
          : undefined;
      dispatch(waterClockSlice.actions.btnClickRowClockWater(selectedData));
      //Quân sửa
      // dispatch(fetchApiSelectRowWaterClock(selectedData?.maDongHoNuoc));
      setSelectedRowKeys([adjustedIndex]);
    }
  }, [selectedHopDong]);

  const onSelectChange = (selectedKeys, row) => {
    setSelectedRowKeys(selectedKeys);
    console.log("row[0]", row[0]);
    dispatch(waterClockSlice.actions.btnClickRowClockWater(row[0]));
    dispatch(fetchApiSelectRowWaterClock(selectedKeys.keyId));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="container-info-clock">
      <Row>
        {/* Table */}
        <Col xs={24} sm={24} md={24} lg={20}>
          <div className="tablist-tbl-clock-on-modal">
            <Table
              columns={colsClock}
              dataSource={
                isUpdate
                  ? createCLick === true
                    ? newData.map(
                        // ?.hopDongs[0]?.dongHoNuocs?
                        (_waterClock, index) => ({
                          index: index + 1,
                          id: _waterClock?.id,
                          keyId: _waterClock?.maDongHoNuoc,
                          ngayLapDatOfDetailClock: _waterClock?.ngayLapDat,
                          trangThaiSuDung:
                            index === 1
                              ? changeData === true
                                ? 3
                                : 2 // Set trangThaiSuDung to 2 for the first element
                              : _waterClock?.trangThaiSuDung,
                          seriDongHo:
                            _waterClock?.trangThaiSuDung === 3 ||
                            (changeData === true && index === 1)
                              ? "_H"
                              : _waterClock?.seriDongHo,
                          ngaySuDung: _waterClock?.ngaySuDung,
                          donViHC: _waterClock?.donViHC,
                          phamVi: _waterClock?.phamVi,
                          nguoiQuanLyId: _waterClock?.nguoiQuanLyId,
                          loaiDongHo: _waterClock?.loaiDongHo,
                          kieuDongHo: _waterClock?.kieuDongHo,
                          tuyenDocId: _waterClock?.tuyenDocId,
                          ngayLapDat: _waterClock?.hopDong?.ngayLapDat,
                          diaChi: _waterClock?.diaChi,
                          nuocSX: _waterClock?.nuocSX,
                          hangSX: _waterClock?.hangSX,
                          duongKinh: _waterClock?.duongKinh,
                          hopBaoVe: _waterClock?.hopBaoVe,
                          viTriLapDat: _waterClock?.viTriLapDat,
                          ngayKiemDinh: _waterClock?.ngayKiemDinh,
                          hieuLucKD: _waterClock?.hieuLucKD,
                          lyDoKiemDinh: _waterClock?.lyDoKiemDinh,
                          vanMotChieu: _waterClock?.vanMotChieu,
                          soTem: _waterClock?.soTem,
                          hinhThucXL: _waterClock?.hinhThucXL,
                          soPhieuThay: _waterClock?.soPhieuThay,
                          lyDoThay: _waterClock?.lyDoThay,
                          lyDoHuy: _waterClock?.lyDoHuy,
                          ngayHuy: _waterClock?.ngayHuy,
                          soThuTu: _waterClock?.soThuTu,
                          chiSoDau: _waterClock?.chiSoDau,
                          chiSoCuoi: _waterClock?.chiSoCuoi,
                          dongHoChaId: _waterClock?.dongHoChaId,
                          maDHThay: _waterClock?.maDHThay,
                          nguoiThayId: _waterClock?.nguoiThayId, // nguoiThayId
                          khuyenMai: _waterClock?.khuyenMai,
                          loaiKM: _waterClock?.loaiKM,
                          ongDan: _waterClock?.ongDan,
                          daiKhoiThuy: _waterClock?.daiKhoiThuy,
                          trangThaiDHLap: _waterClock?.trangThaiDHLap,
                          tenTinh: _waterClock?.tenTinh,
                          tenHuyen: _waterClock?.tenHuyen,
                          tenXa: _waterClock?.tenXa,
                          tenVung: _waterClock?.tenVung,
                          khuVucID: _waterClock?.khuVucID,
                          seriChi: _waterClock?.seriChi,
                          tenNhanVienQuanLy: _waterClock?.tenNhanVienQuanLy,
                          tenKhuVuc: _waterClock?.tenKhuVuc,
                          maDongHoNhanh: _waterClock?.maDongHoNhanh,
                          chipDongHoNuocId: _waterClock?.chipDongHoNuocId,
                          toaDo: _waterClock?.toaDo,
                          kinhDo: _waterClock?.kinhDo,
                          viDo: _waterClock?.viDo,
                          maDongHoNuoc: _waterClock?.maDongHoNuoc,
                          nuocSXId: _waterClock?.nuocSXId,
                          hangSXId: _waterClock?.hangSXId,
                          kieuDongHoId: _waterClock?.kieuDongHoId,
                        })
                      )
                    : selectedHopDong?.mDongHo?.map(
                        // ?.hopDongs[0]?.dongHoNuocs?
                        (_waterClock, index) => ({
                          index: index + 1,
                          id: _waterClock?.id,
                          keyId: _waterClock?.maDongHoNuoc,
                          trangThaiSuDung: _waterClock?.trangThaiSuDung,
                          ngayLapDat: _waterClock?.ngayLapDat,
                          
                          seriDongHo:
                            _waterClock?.trangThaiSuDung === 3
                              ? "_H"
                              : _waterClock?.seriDongHo,
                          ngaySuDung: _waterClock?.ngaySuDung ,
                          donViHC: _waterClock?.donViHC,
                          phamVi: _waterClock?.phamVi,
                          nguoiQuanLyId: _waterClock?.nguoiQuanLyId,
                          loaiDongHo: _waterClock?.loaiDongHo,
                          kieuDongHo: _waterClock?.kieuDongHo,
                          tuyenDocId: _waterClock?.tuyenDocId,
                          ngayLapDatOfDetailClock: _waterClock?.ngayLapDat,
                          diaChi: _waterClock?.diaChi,
                          nuocSX: _waterClock?.nuocSX,
                          hangSX: _waterClock?.hangSX,
                          duongKinh: _waterClock?.duongKinh,
                          hopBaoVe: _waterClock?.hopBaoVe,
                          viTriLapDat: _waterClock?.viTriLapDat,
                          ngayKiemDinh: _waterClock?.ngayKiemDinh,
                          hieuLucKD: _waterClock?.hieuLucKD,
                          lyDoKiemDinh: _waterClock?.lyDoKiemDinh,
                          vanMotChieu: _waterClock?.vanMotChieu,
                          soTem: _waterClock?.soTem,
                          hinhThucXL: _waterClock?.hinhThucXL,
                          soPhieuThay: _waterClock?.soPhieuThay,
                          lyDoThay: _waterClock?.lyDoThay,
                          lyDoHuy: _waterClock?.lyDoHuy,
                          ngayHuy: _waterClock?.ngayHuy,
                          soThuTu: _waterClock?.soThuTu,
                          chiSoDau: _waterClock?.chiSoDau,
                          chiSoCuoi: _waterClock?.chiSoCuoi,
                          dongHoChaId: _waterClock?.dongHoChaId,
                          maDHThay: _waterClock?.maDHThay,
                          nguoiThayId: _waterClock?.nguoiThayId, // nguoiThayId
                          khuyenMai: _waterClock?.khuyenMai,
                          loaiKM: _waterClock?.loaiKM,
                          ongDan: _waterClock?.ongDan,
                          daiKhoiThuy: _waterClock?.daiKhoiThuy,
                          trangThaiDHLap: _waterClock?.trangThaiDHLap,
                          tenTinh: _waterClock?.tenTinh,
                          tenHuyen: _waterClock?.tenHuyen,
                          tenXa: _waterClock?.tenXa,
                          tenVung: _waterClock?.tenVung,
                          khuVucID: _waterClock?.khuVucID,
                          seriChi: _waterClock?.seriChi,
                          tenNhanVienQuanLy: _waterClock?.tenNhanVienQuanLy,
                          tenKhuVuc: _waterClock?.tenKhuVuc,
                          maDongHoNhanh: _waterClock?.maDongHoNhanh,
                          chipDongHoNuocId: _waterClock?.chipDongHoNuocId,
                          toaDo: _waterClock?.toaDo,
                          kinhDo: _waterClock?.kinhDo,
                          viDo: _waterClock?.viDo,
                          maDongHoNuoc: _waterClock?.maDongHoNuoc,
                          nuocSXId: _waterClock?.nuocSXId,
                          hangSXId: _waterClock?.hangSXId,
                          kieuDongHoId: _waterClock?.kieuDongHoId,
                        })
                      )
                  : []
              }
              pagination={{
                pageSize: 5,
              }}
              rowKey="index"
              size="small"
              scroll={{
                x: 540,
              }}
              style={{ marginRight: "10px" }}
              rowSelection={{
                type: "radio",
                ...rowSelection,
                columnTitle: () => {
                  return (
                    isUpdate && (
                      <Tooltip title="Làm mới">
                        <RedoOutlined
                          className="icon-reset-rad-btn"
                          onClick={handleClickGetAllClockWater}
                        />
                      </Tooltip>
                    )
                  );
                },
                // onChange: (selectedRowKeys, selectedRows) =>
                //   handleRowSelection(selectedRowKeys, selectedRows),
                // selectedRowKeys: rowSelected ? [rowSelected.index] : [],
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    // dispatch(
                    //   waterClockSlice.actions.btnClickRowClockWater(record)
                    // );
                    // dispatch(fetchApiSelectRowWaterClock(record.keyId));
                    const selectedKeys = [record.index];
                    onSelectChange(selectedKeys, [record]);
                  },
                };
              }}
            ></Table>
          </div>
        </Col>

        {/* Func */}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          className={isTabletOrMobile ? "func-info-clock-btn-mobile" : ""}
        >
          <Button
            block={isTabletOrMobile ? false : true}
            disabled={isUpdate && rowSelected ? false : true}
            key="createClock"
            className={
              isTabletOrMobile
                ? "tablist-func-clock-btn-mobile custom-btn-add"
                : "tablist-func-clock-btn custom-btn-add"
            }
            onClick={handleCreateClockWithContract}
          >
            <PlusCircleOutlined />
            Thêm
          </Button>
          <Button
            block={isTabletOrMobile ? false : true}
            className={
              isTabletOrMobile
                ? "tablist-func-clock-btn-mobile custom-btn-update"
                : "tablist-func-clock-btn custom-btn-update"
            }
            onClick={handleChangeClockNew}
            disabled={isUpdate && rowSelected ? false : true}
          >
            <DashboardOutlined />
            Thay
          </Button>
          {/* <Button
            block={isTabletOrMobile ? false : true}
            disabled={isUpdate && rowSelected ? false : true}
            className={
              isTabletOrMobile
                ? "tablist-func-clock-btn-mobile space-top-10 custom-btn-export"
                : "tablist-func-clock-btn custom-btn-export"
            }
            onClick={handleExportListClockWater}
          >
            <DownloadOutlined />
            Xuất
          </Button> */}
          {/* <Popconfirm
            placement="left"
            title="Bạn có chắc chắn xóa đồng hồ này không?"
            onConfirm={handleDeleteClockWithContract}
          >
            <Button
              block={isTabletOrMobile ? false : true}
              key="deleteClockWithContract"
              className={
                isTabletOrMobile
                  ? "tablist-func-clock-btn-mobile custom-btn-del"
                  : "tablist-func-clock-btn custom-btn-del"
              }
            >
              <CloseCircleOutlined />
              Xóa
            </Button>
          </Popconfirm> */}
        </Col>
      </Row>
    </div>
  );
}

export default memo(InfoClock);
