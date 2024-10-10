import { Button, Col, Collapse, Form, Row } from "antd";
import { CloseOutlined, FormOutlined, SaveOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import InfoContract from "./InfoContract/InfoContract";
import InfoClock from "./InfoClock/InfoClock";
import InfoDetailClock from "./InfoDetailClock/InfoDetailClock";
import InfoCustomer from "./InfoCustomer/InfoCustomer";
import {
  fetchApiCreateContract,
  fetchApiUpdateContract,
  fetchApiUpdateContractVer2,
  fetchDataForMenuContractCreate,
  fetchTuyenDocDataForOther,
  getDetailHopDong,
  getTinhAndHuyenByXaId,
} from "../../../../redux/slices/contractSlice/contractSlice";
import {
  addClickSelector,
  btnClickGetFactoryIdSelector,
  btnClickRowClockWaterSelector,
  btnClickTabListContractSelector,
  changeClickSelector,
  dataContractList,
  fetchApiAllPaymentMethodSelector,
  fetchApiGetByIdCustomerSelector,
  fetchApiGetCustomerIdFromOptionFactorySelector,
  fetchApiGetWaterClockSelector,
  fetchApiSelectRowWaterClockSelector,
  getDataForMenuContractCreate,
  getDetailHopDongSelector,
  getTinhAndHuyenByXaIdSelector,
  openSelector,
  rowSelectSelector,
} from "../../../../redux/selector";
import waterClockSlice, {
  fetchApiGetAllDongHoTheoLoai,
  fetchApiGetClockIdFromContractId,
} from "../../../../redux/slices/waterClockSlice/waterClockSlice";
import customerSlice, {
  fetchApiGetCustomerIdFromOptionFactory,
} from "../../../../redux/slices/customerSlice/customerSlice";
import CustomWord from "../../../CustomWord/CustomWord";
import InfoFile from "./InfoFile/InfoFile";
import { fetchApiAllPriceObject } from "../../../../redux/slices/priceObjectSlice/priceObjectSlice";
// import { GetTinhAndHuyenByXaId } from "../../../../graphql/wards/wardQuery";
// import { useQuery } from "@apollo/client";
import {
  setAddClick,
  setChangeClick,
  setNhaMayChange,
  setOpen,
  setRefreshTable,
} from "../../../../redux/slices/currentPageSlice/currentPageSlice";
import { fetchListContract } from "../../../../redux/slices/invoiceSlice/invoiceSlice";

function FormCreateContract({ hideModal, isUpdate }) {
  const [formMain] = Form.useForm();
  const [modalFile, setModalFile] = useState(false);
  const handleReset = () => {
    formMain.resetFields();
  };
  const dispatch = useDispatch();
  const selectedDH = useSelector(btnClickRowClockWaterSelector);
  const waterClocks = useSelector(fetchApiGetWaterClockSelector);
  const rowSelected = useSelector(fetchApiSelectRowWaterClockSelector);
  const dongHoMem = useSelector(btnClickRowClockWaterSelector);
  const selectedHopDong = useSelector(getDetailHopDongSelector);
  const rowSelected1 = useSelector(rowSelectSelector);
  const primaryId = useSelector(fetchApiGetCustomerIdFromOptionFactorySelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const paymentMethods = useSelector(fetchApiAllPaymentMethodSelector);
  const customer = useSelector(fetchApiGetByIdCustomerSelector); // get info customer -> load to fields
  // const primaryClockId = useSelector(fetchApiGetClockIdFromContractIdSelector); // get (Để thay đồng hồ nước mới)

  // console.log("waterClocks", waterClocks);
  // console.log("customer create modal", customer);
  // console.log("dongHoMem create modal", dongHoMem);
  // console.log("rowSelected", rowSelected);
  // console.log("clockBySeri", clockBySeri);
  // console.log("customerInfo", customerInfo);
  // console.log("primaryClockId", primaryClockId);
  // console.log("primaryId", primaryId);
  // console.log("factoryId", factoryId);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  // console.log("ki mo chi", customer, rowSelected);

  //get tinh and huyen by xaId
  // const { data: tinhHuyen } = useQuery(GetTinhAndHuyenByXaId, {
  //   variables: {
  //     id:
  //       customer && Object.entries(customer)?.length > 0
  //         ? customer?.hopDongs[0]?.dongHoNuocs[0]?.donViHC
  //         : "",
  //   },
  // });
  // console.log(tinhHuyen);

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  // get maDongHo (để thay đồng hồ nước mới)
  useEffect(() => {
    // console.log("customer ->", customer);
    if (isUpdate) {
      customer &&
        customer?.hopDongs?.length > 0 &&
        dispatch(fetchApiGetClockIdFromContractId(customer?.hopDongs[0]?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);
  const open = useSelector(openSelector);
  //Quân sửa
  useEffect(() => {
    if (isUpdate && rowSelected1) {
      dispatch(getDetailHopDong(rowSelected1.maHopDong));
      dispatch(setOpen(false));
    }
  }, [dispatch, rowSelected1, open]);

  // handle reset customer Id
  const handleResetCustomerId = () => {
    dispatch(fetchApiGetCustomerIdFromOptionFactory(factoryId));
  };

  // get all đh block
  useEffect(() => {
    dispatch(fetchApiGetAllDongHoTheoLoai(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle get all (đối tượng giá)
  // useEffect(() => {
  //   dispatch(fetchApiAllPriceObject());

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //handle get Tinh, Huyen by xaId
  // useEffect(() => {
  //   if (isUpdate && tinhHuyen) {
  //     formMain.setFieldValue(
  //       "donViHCTinh",
  //       tinhHuyen.GetPhuongXas.nodes[0]?.quanHuyen.tinhThanh.id || ""
  //     );
  //     formMain.setFieldValue(
  //       "donViHCHuyen",
  //       tinhHuyen.GetPhuongXas.nodes[0]?.quanHuyen.id || ""
  //     );
  //   }
  // }, []);

  // handle create contract
  const handleSaveContract = () => {
    formMain
      .validateFields()
      .then((values) => {
        if (values) {
          if (values.ngayKiemDinh === null) {
            delete values.ngayKiemDinh;
          }
          if (values.hieuLucKD === null) {
            delete values.hieuLucKD;
          }
          values.nhaMayId = createFilterQueryString2();
          dispatch(fetchApiCreateContract(values))
            .unwrap()
            .then(() => {
              dispatch(setRefreshTable(true));
            });
          dispatch(
            customerSlice.actions.btnClickResetAllCustomer("createContract")
          );
          dispatch(customerSlice.actions.btnClickFilterCustomer("null"));
          formMain.resetFields();
          hideModal();
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // handle create contract save and add
  const handleSaveAndAddContract = () => {
    formMain
      .validateFields()
      .then((values) => {
        if (values) {
          if (values.ngayKiemDinh === null) {
            delete values.ngayKiemDinh;
          }
          if (values.hieuLucKD === null) {
            delete values.hieuLucKD;
          }
          values.nhaMayId = createFilterQueryString2();
          dispatch(fetchApiCreateContract(values))
            .unwrap()
            .then(() => {
              formMain.resetFields();
              dispatch(setRefreshTable(true));
            });
          dispatch(
            customerSlice.actions.btnClickResetAllCustomer("createContract")
          );
          dispatch(customerSlice.actions.btnClickFilterCustomer("null"));
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  console.log("selectedHopDong", selectedHopDong);
  const addClick = useSelector(addClickSelector);

  useEffect(() => {
    if (addClick === true) {
      formMain
        .validateFields()
        .then((values) => {
          if (values) {
            values.trangThaiSuDung = 2;
            values.khuyenMai = Number(values.khuyenMai);
            values.maDongHoDetail = selectedDH.maDongHoNuoc;
            dispatch(fetchApiUpdateContractVer2(values))
              .unwrap()
              .then(() => {
                dispatch(setChangeClick(false));
                dispatch(setAddClick(false));
                dispatch(waterClockSlice.actions.btnClickRowClockWater(null));
              });
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }, [addClick]);

  const changeClick = useSelector(changeClickSelector);
  useEffect(() => {
    if (changeClick === true) {
      formMain
        .validateFields()
        .then((values) => {
          if (values) {
            values.trangThaiSuDung = 3;
            values.khuyenMai = Number(values.khuyenMai);
            values.maDongHoDetail = selectedDH.maDongHoNuoc;
            dispatch(fetchApiUpdateContractVer2(values))
              .unwrap()
              .then(() => {
                dispatch(setAddClick(false));
                dispatch(setChangeClick(false));
                dispatch(waterClockSlice.actions.btnClickRowClockWater(null));
              });
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }, [changeClick]);

  // handle update contract
  const handleUpdateContract = () => {
    formMain
      .validateFields()
      .then((values) => {
        if (values) {
          if (values.ngayKiemDinh === null) {
            delete values.ngayKiemDinh;
          }
          if (values.hieuLucKD === null) {
            delete values.hieuLucKD;
          }
          values.khuyenMai = Number(values.khuyenMai);
          values.maDongHoDetail = selectedDH.maDongHoNuoc;
          console.log(values);
          dispatch(fetchApiUpdateContractVer2(values))
            .unwrap()
            .then(() => {
              dispatch(setRefreshTable(true));
            });
          hideModal();
          formMain.resetFields();
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  // useEffect(()=>{
  //   dispatch(waterClockSlice.actions.btnClickRowClockWater(selectedHopDong.m[0]));
  // })

  // handle file (Thông tin tệp đính kèm)
  // const handleFile = useCallback((record) => {
  //   // console.log(record);
  //   setModalFile(true);
  // }, []);

  const hideModalFile = useCallback(() => {
    setModalFile(false);
  }, []);

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const createFilterQueryString2 = () => {
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
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const dataContract = useSelector(dataContractList);

  useEffect(() => {
    const queryString = createFilterQueryString();
    // dispatch(fetchListContract(queryString));
  }, [factoryId]);

  const hopDongId = dataContract.find(
    (data) => data.keyId === selectedHopDong?.mHopDong?.maHopDong
  )?.id;
  const handlePrintBienBanThoaThuan = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}hop-dong/in-bien-ban-thoa-thuan?hopDongId=${hopDongId}`;
    window.open(url, "_blank");
  };

  const handleChangeToEnum = (value) => {
    switch (value) {
      case "THONG_KE":
        return 1;
      case "LAP_KH_MOI":
        return 2;
      case "KHACH_HANG_MUA":
        return 3;
      case "THAY_BAO_HANH":
        return 4;
      case "CONG_TY_CAP":
        return 5;
      case "LAP_LAI_DONG_HO":
        return 6;
      default:
        return "";
    }
  };

  useEffect(() => {
    dispatch(fetchDataForMenuContractCreate(createFilterQueryString2()));
  }, [factoryId]);

  return (
    <>
      <div className="wrapper-tab-modal-create-contract">
        {/* Tabs options */}
        <Form
          form={formMain}
          onFinishFailed={handleFailed}
          fields={[
            // Customer
            {
              name: "keyIdOfCustomer",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.maKhachHang
                  : null,
            },
            {
              name: "loaiKhachHang",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.loaiKhachHang
                  : null,
            },
            {
              name: "addressOfCustomer",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.diaChi
                  : null,
            },
            {
              name: "nhaMayIdOfCustomer",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.nhaMayId
                  : factoryId,
            },
            {
              name: "nguonNuoc",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.nguonNuoc
                  : null,
            },
            {
              name: "tenKhachHang",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.tenKhachHang
                  : null,
            },
            {
              name: "tenThuongGoi",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.tenThuongGoi
                  : null,
            },
            {
              name: "soHo",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.soHo
                  : null,
            },
            {
              name: "soKhau",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.soKhau
                  : null,
            },
            {
              name: "email",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.email
                  : null,
            },
            {
              name: "dienThoai",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.dienThoai
                  : null,
            },
            {
              name: "doiTuong",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.doiTuong
                  : null,
            },
            {
              name: "soCMND",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.soCMND
                  : null,
            },
            {
              name: "ngayCapCMND",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.ngayCapCMND
                    ? dayjs(selectedHopDong?.ngayCapCMND)
                    : null
                  : null,
            },
            {
              name: "noiCapCMND",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.noiCapCMND
                  : null,
            },
            {
              name: "maSoThue",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.maSoThue
                  : null,
            },
            {
              name: "ghiChuOfCustomer",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.ghiChu
                  : null,
            },
            {
              name: "nguoiDaiDien",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.nguoiDaiDien
                  : null,
            },
            {
              name: "idTheDienLuc",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mKhachHang?.idTheDienLuc
                  : null,
            },
            // Contract
            {
              name: "maHopDong",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.maHopDong
                  : null,
            },
            {
              name: "maVach",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.maVach
                  : primaryId
                  ? primaryId // when open modal the first
                  : null,
            },
            {
              name: "nhaMayIdOfContract",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.nhaMayId
                  : factoryId
                  ? factoryId // when open modal the first
                  : null,
            },
            {
              name: "doiTuongGiaId",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.doiTuongGiaId
                  : null,
            },
            {
              name: "mucDichSuDung",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.mucDichSuDung
                  : null,
            },
            {
              name: "phuongThucThanhToanId",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.phuongThucThanhToanId
                  : paymentMethods[0]?.id,
            },
            {
              name: "khuVucThanhToan",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.khuVucThanhToan
                  : null,
            },
            {
              name: "ngayKyHopDong",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.ngayKyHopDong !== null
                    ? dayjs(selectedHopDong?.mHopDong?.ngayKyHopDong)
                    : null
                  : null,
            },
            {
              name: "ngayLapDat",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.ngayLapDat !== null
                    ? dayjs(selectedHopDong?.mHopDong?.ngayLapDat)
                    : null
                  : null,
            },
            {
              name: "nguoiLapDatId",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.nguoiLapDatId
                  : null,
            },
            {
              name: "ngayNopTien",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.ngayNopTien !== null
                    ? dayjs(selectedHopDong?.mHopDong?.ngayNopTien)
                    : null
                  : null,
            },
            {
              name: "tienLapDat",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.tienLapDat
                  : null,
            },
            {
              name: "nguoiNop",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.nguoiNop
                  : null,
            },
            {
              name: "tienDatCoc",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.tienDatCoc
                  : null,
            },
            {
              name: "ngayDatCoc",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.ngayDatCoc !== null
                    ? dayjs(selectedHopDong?.mHopDong?.ngayDatCoc)
                    : null
                  : null,
            },
            {
              name: "camKetSuDungNuoc",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.camKetSuDungNuoc
                  : null,
            },
            {
              name: "khoiLuongNuocCamKet",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.khoiLuongNuocCamKet
                  : null,
            },

            {
              name: "ghiChuOfContract",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.ghiChu
                  : null,
            },
            {
              name: "ngayCoHieuLuc",
              value:
                selectedHopDong && isUpdate
                  ? selectedHopDong?.mHopDong?.ngayCoHieuLuc === null
                    ? null
                    : dayjs(selectedHopDong?.mHopDong?.ngayCoHieuLuc)
                  : null,
            },

            // Detail clock

            {
              name: "keyIdOfClockDetail",
              value: selectedDH && isUpdate ? selectedDH?.maDongHoNuoc : null,
            },

            {
              name: "donViHC",
              value: selectedDH && isUpdate ? selectedDH?.tenXa : null,
            },
            {
              name: "donViHCHuyen",
              value: selectedDH && isUpdate ? selectedDH?.tenHuyen : null,
            },
            {
              name: "donViHCTinh",
              value: selectedDH && isUpdate ? selectedDH?.tenTinh : null,
            },
            {
              name: "tuyenDocId",
              value: selectedDH && isUpdate ? selectedDH?.tuyenDocId : null,
            },
            {
              name: "khuVucID",
              value: selectedDH && isUpdate ? selectedDH?.tenKhuVuc : null,
            },
            {
              name: "vungId",
              value: selectedDH && isUpdate ? selectedDH?.tenVung : null,
            },

            {
              name: "nguoiQuanLyId",
              value:
                selectedDH && isUpdate ? selectedDH?.tenNhanVienQuanLy : null,
            },
            {
              name: "kieuDongHoId",
              value: selectedDH && isUpdate ? selectedDH?.kieuDongHoId : null,
            },
            {
              name: "loaiDongHo",
              value: selectedDH && isUpdate ? selectedDH?.loaiDongHo : 3,
            },
            {
              name: "toaDo",
              value: selectedDH && isUpdate ? selectedDH?.toaDo : null,
            },
            {
              name: "kinhDo",
              value: selectedDH && isUpdate ? selectedDH?.kinhDo : null,
            },
            {
              name: "viDo",
              value: selectedDH && isUpdate ? selectedDH?.viDo : null,
            },
            {
              name: "loaiDiemId",
              value: 3,
            },
            {
              name: "ngayLapDatOfDetailClock",
              value:
                selectedDH && isUpdate
                  ? selectedDH?.ngayLapDat !== null
                    ? dayjs(selectedDH?.ngayLapDat)
                    : null
                  : null,
            },
            {
              name: "ngayHuy",
              value:
                selectedDH && isUpdate
                  ? selectedDH?.ngayHuy !== null
                    ? dayjs(selectedDH?.ngayHuy)
                    : null
                  : null,
            },
            {
              name: "ngaySuDung",
              value:
                selectedDH && isUpdate
                  ? selectedDH?.ngaySuDung !== null
                    ? dayjs(selectedDH?.ngaySuDung)
                    : null
                  : null,
            },
            {
              name: "diachiOfDetailClock",
              value: selectedDH && isUpdate ? selectedDH?.diaChi : null,
            },
            {
              name: "nuocSXId",
              value: selectedDH && isUpdate ? selectedDH?.nuocSXId : null,
            },

            {
              name: "hangSXId",
              value: selectedDH && isUpdate ? selectedDH?.hangSXId : null,
            },
            {
              name: "duongKinh",
              value: selectedDH && isUpdate ? selectedDH?.duongKinh : null,
            },
            {
              name: "hopBaoVe",
              value: selectedDH && isUpdate ? selectedDH?.hopBaoVe : null,
            },
            {
              name: "viTriLapDat",
              value: selectedDH && isUpdate ? selectedDH?.viTriLapDat : null,
            },
            {
              name: "ngayKiemDinh",
              value:
                selectedDH && isUpdate
                  ? selectedDH?.ngayKiemDinh !== null
                    ? dayjs(selectedDH?.ngayKiemDinh)
                    : null
                  : null,
            },
            {
              name: "hieuLucKD",
              value:
                selectedDH && isUpdate
                  ? selectedDH?.hieuLucKD !== null
                    ? dayjs(selectedDH?.hieuLucKD)
                    : null
                  : null,
            },
            {
              name: "lyDoKiemDinh",
              value: selectedDH && isUpdate ? selectedDH?.lyDoKiemDinh : null,
            },
            {
              name: "vanMotChieu",
              value: selectedDH && isUpdate ? selectedDH?.vanMotChieu : null,
            },
            {
              name: "soTem",
              value: selectedDH && isUpdate ? selectedDH?.soTem : null,
            },
            {
              name: "hinhThucXL",
              value: selectedDH && isUpdate ? selectedDH?.hinhThucXL : null,
            },
            {
              name: "soPhieuThay",
              value: selectedDH && isUpdate ? selectedDH?.soPhieuThay : null,
            },
            {
              name: "lyDoThay",
              value: selectedDH && isUpdate ? selectedDH?.lyDoThay : null,
            },
            {
              name: "lyDoHuy",
              value: selectedDH && isUpdate ? selectedDH?.lyDoHuy : null,
            },
            {
              name: "seriDongHo",
              value: selectedDH && isUpdate ? selectedDH?.seriDongHo : null,
            },
            {
              name: "seriChi",
              value: selectedDH && isUpdate ? selectedDH?.seriChi : null,
            },
            {
              name: "trangThaiSuDung",
              value:
                selectedDH && isUpdate ? selectedDH?.trangThaiSuDung : null,
            },

            {
              name: "soThuTu",
              value: selectedDH && isUpdate ? selectedDH?.soThuTu : 0,
            },
            {
              name: "chiSoDau",
              value: selectedDH && isUpdate ? selectedDH?.chiSoDau : null,
            },
            {
              name: "chiSoCuoi",
              value: selectedDH && isUpdate ? selectedDH?.chiSoCuoi : null,
            },
            {
              name: "dongHoChaId",
              value: selectedDH && isUpdate ? selectedDH?.maDongHoNhanh : null,
            },
            {
              name: "maDHThay",
              value: selectedDH && isUpdate ? selectedDH?.maDHThay : null,
            },
            {
              name: "nguoiThayId",
              value: selectedDH && isUpdate ? selectedDH?.nguoiThayId : null,
            },
            {
              name: "loaiKM",
              value: selectedDH && isUpdate ? selectedDH?.loaiKM : null,
            },
            {
              name: "khuyenMai",
              value: selectedDH && isUpdate ? selectedDH?.khuyenMai : null,
            },
            {
              name: "ongDan",
              value: selectedDH && isUpdate ? selectedDH?.ongDan : null,
            },
            {
              name: "daiKhoiThuy",
              value: selectedDH && isUpdate ? selectedDH?.daiKhoiThuy : null,
            },
            {
              name: "chipDongHoNuocId",
              value:
                selectedDH && isUpdate ? selectedDH?.chipDongHoNuocId : null,
            },
            {
              name: "trangThaiDHLap",
              value: selectedDH && isUpdate ? selectedDH?.trangThaiDHLap : null,
            },
          ]}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Collapse
                key="collapse1"
                size="small"
                items={[
                  {
                    key: "1",
                    label: "Thông tin khách hàng",
                    children: (
                      <InfoCustomer
                        handleResetCustomerId={handleResetCustomerId}
                        isUpdate={isUpdate}
                        formMain={formMain}
                      />
                    ),
                  },
                  {
                    key: "2",
                    label: "Thông tin hợp đồng",
                    children: <InfoContract isUpdate={isUpdate} />,
                  },
                ]}
                accordion={false}
                defaultActiveKey={["1", "2"]}
              />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className={
                !isTabletOrMobile ? "" : "collapse-space-top-mobile-item"
              }
            >
              <Collapse
                className="collapse-space-left-item"
                key="collapse2"
                size="small"
                items={[
                  {
                    key: "3",
                    label: "Đồng hồ",
                    children: (
                      <InfoClock
                        customer={customer}
                        formMain={formMain}
                        // handleChangeClockNew={handleChangeClockNew}
                        isUpdate={isUpdate}
                      />
                    ),
                  },
                  {
                    key: "4",
                    label: "Chi tiết đồng hồ",
                    children: (
                      <InfoDetailClock
                        formMain={formMain}
                        isUpdate={isUpdate}
                      />
                    ),
                  },
                ]}
                accordion={false}
                defaultActiveKey={["3", "4"]}
              />
            </Col>
          </Row>

          {/* Bottom buttons */}
          <Row className="form-create-contract-btns">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              className={
                isTabletOrMobile ? "func-form-create-contract-mobile" : ""
              }
            >
              {/*  <Button
                size="small"
                className="custom-btn-attachment"
                onClick={handleFile}
                disabled={isUpdate ? false : true}
              >
                <FormOutlined />
                Tệp đính kèm
            </Button>*/}
            </Col>

            {/* Buttons */}
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              className={
                isTabletOrMobile ? "func-form-create-contract-mobile" : ""
              }
            >
              <Row gutter={[10, 10]}>
                <Button
                  className={
                    isTabletOrMobile
                      ? "footer-func-btn-item-report custom-btn-agreement"
                      : "gutter-item custom-btn-agreement"
                  }
                  onClick={handlePrintBienBanThoaThuan}
                  disabled={isUpdate ? false : true}
                >
                  <FormOutlined />
                  Biên bản thỏa thuận
                </Button>

                {/* Custom word */}
                <CustomWord
                  waterClocks={waterClocks}
                  isTabletOrMobile={isTabletOrMobile}
                  isUpdate={isUpdate}
                />

                <Button
                  disabled={isUpdate ? true : false}
                  key="createContractSaveAndAdd"
                  onClick={handleSaveAndAddContract}
                  className={
                    isTabletOrMobile
                      ? "footer-func-btn-item-save-add custom-btn-save-and-add"
                      : "gutter-item custom-btn-save-and-add"
                  }
                >
                  <SaveOutlined />
                  Lưu và thêm tiếp
                </Button>

                <Button
                  key="createContract"
                  onClick={isUpdate ? handleUpdateContract : handleSaveContract}
                  className={
                    isTabletOrMobile
                      ? "footer-func-btn-item-save custom-btn-add"
                      : "gutter-item custom-btn-add"
                  }
                  disabled={isUpdate ? (!selectedDH ? true : false) : false}
                >
                  <SaveOutlined />
                  {isUpdate ? "Cập nhật" : "Lưu"}
                </Button>

                <Button
                  className={
                    isTabletOrMobile
                      ? "footer-func-btn-item-close custom-btn-close"
                      : "gutter-item custom-btn-close"
                  }
                  onClick={() => hideModal()}
                >
                  <CloseOutlined />
                  Đóng
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Show modal (Tệp đính kèm) */}
      {modalFile && (
        <InfoFile
          modalFile={modalFile}
          hideModalFile={hideModalFile}
          customer={customer}
          waterClocks={waterClocks}
        />
      )}
    </>
  );
}

export default FormCreateContract;
