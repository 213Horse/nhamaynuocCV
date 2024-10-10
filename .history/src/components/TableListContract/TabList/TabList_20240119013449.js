import React from "react";
import { Collapse, Divider, Modal, Popconfirm, Popover, Tabs } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
  FileExcelOutlined,
  RetweetOutlined,
  BarsOutlined,
  DashboardOutlined,
  MoreOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import {
  btnClickGetFactoryIdSelector,
  btnClickMaDongHoMemSelector,
  btnClickTabListContractSelector,
  fetchApiExportToExcelManagerContractSelector,
  fetchApiGetByIdCustomerSelector,
  fetchApiGetWaterClockSelector,
  nhaMayChangeSelector,
  rowSelectSelector,
} from "../../../redux/selector";
import tabListContractSlice from "../../../redux/slices/tabListContractSlice/tabListContractSlice";
import { exportToExcel } from "../../../utils/exportFile";
import Reporter from "../../Reporter/Reporter";
import TableHistoryUseWater from "./TableHistoryUseWater/TableHistoryUseWater";
import FormCreateContract from "./FormCreateContract/FormCreateContract";
import FormHistoryUseWater from "./FormHistoryUseWater/FormHistoryUseWater";
import FormUpdateClock from "./FormUpdateClock/FormUpdateClock";
import { fetchApiExportToExcelManagerContract } from "../../../redux/slices/excelSlice/excelSlice";
import {
  fetchApiDeleteContractAndClock,
  getTinhAndHuyenByXaId,
} from "../../../redux/slices/contractSlice/contractSlice";
import waterClockSlice, {
  fetchApiGetWaterClock,
  fetchApiSelectRowWaterClock,
} from "../../../redux/slices/waterClockSlice/waterClockSlice";
import TransferSwitch from "./TransferSwitch/TransferSwitch";
import {
  fetchApiDeleteCustomer,
  fetchApiGetCustomerByCMND,
} from "../../../redux/slices/customerSlice/customerSlice";
import { fetchApiAllRegion } from "../../../redux/slices/regionSlice/regionSlice";
import {
  GetHuyenTuTinh,
  GetTinhAndHuyenByXaId,
  GetXaTuHuyen,
} from "../../../graphql/wards/wardQuery";
import {
  setAddClick,
  setChangeClick,
  setNhaMayChange,
  setOpen,
  setRefreshTable,
} from "../../../redux/slices/currentPageSlice/currentPageSlice";

// Tabs bottom
const tabs = [
  {
    id: "1",
    label: "Lập hợp đồng",
    icon: <PlusCircleOutlined />,
  },
  {
    id: "2",
    label: "Sửa hợp đồng",
    icon: <EditOutlined />,
  },
  {
    id: "3",
    label: "Xóa",
    icon: <CloseCircleOutlined />,
  },
  {
    id: "4",
    label: "Xuất excel",
    icon: <FileExcelOutlined />,
  },
  {
    id: "5",
    label: "Chuyển",
    icon: <RetweetOutlined />,
    iconRight: <CaretDownOutlined />,
  },
  {
    id: "6",
    label: "Lịch sử SD nước",
    icon: <BarsOutlined />,
  },
  {
    id: "7",
    label: "Thay đồng hồ",
    icon: <DashboardOutlined />,
  },
  {
    id: "8",
    label: "Tiện ích",
    icon: <MoreOutlined />,
    iconRight: <CaretDownOutlined />,
  },
];

function TabList({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalUpdateContract, setModalUpdateContract] = useState(false);
  const [modalHistoryWater, setModalHistoryWater] = useState(false);
  const [modalChangeClock, setModalChangeClock] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [btnExcel, setBtnExcel] = useState(false);

  const dispatch = useDispatch();

  const tabList = useSelector(btnClickTabListContractSelector);
  const isSuccessToExcel = useSelector(
    fetchApiExportToExcelManagerContractSelector
  );
  const listNhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const waterClocks = useSelector(fetchApiGetWaterClockSelector);
  const customer = useSelector(fetchApiGetByIdCustomerSelector); // get info customer -> load to fields
  const maDongHoMem = useSelector(btnClickMaDongHoMemSelector);
  const keyId = useSelector(rowSelectSelector);
  // console.log("customer -> tablist", customer);
  // console.log("customer -> tablist", customer);
  // console.log("tabList", tabList);
  // console.log("menuSidebar", menuSidebar);
  // console.log("isSuccessToExcel", isSuccessToExcel);
  // console.log("listNhaMayId", listNhaMayId);
  const nhaMayChange = useSelector(nhaMayChangeSelector);
  const [factory, setFactory] = useState();
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (listNhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `listNhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&listNhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `listNhaMayId=${listNhaMayId}`;
    }
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    const values = createFilterQueryString();
    setFactory(values);
    dispatch(setNhaMayChange(0));
  }, [listNhaMayId, nhaMayChange, dispatch]);


  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormHistoryUseWater tabList={tabList} />,
    },
  ];

  // handle export to excel
  useEffect(() => {
    if (isSuccessToExcel?.statusCode === 200 && btnExcel) {
      // custom heading
      const resCustom = isSuccessToExcel?.data?.map((__contract, index) => ({
        STT: index + 1,
        Vùng: "", // chưa có tên vùng
        "Mã khu vực": __contract?.tuyenDoc?.khuVuc.keyId,
        "Tên khu vực": __contract?.tuyenDoc?.khuVuc.tenKhuVuc,
        "Tuyến đọc": __contract?.tuyenDoc?.keyId,
        "Loại khách hàng": __contract.khachHang.loaiKhachHang,
        "Mã khách hàng": __contract.khachHang.keyId,
        "Tên khách hàng": __contract.khachHang.tenKhachHang,
        "Số CMT": __contract.khachHang.soCmnd,
        "Ngày cấp": dayjs(__contract.khachHang.ngayCapCmnd).format(
          "DD/MM/YYYY"
        ),
        "Mã số thuế": __contract.khachHang.maSoThue,
        "Số hợp đồng": __contract.keyId,
        "Bảng giá": "", // chưa thấy
        "Tên đối tượng giá": __contract?.doiTuongGia?.keyId,
        "Mã đồng hồ": __contract?.dongHoNuocs[0]?.keyId,
        "Địa chỉ": __contract.diachi,
        "Địa chỉ sử dụng nước": __contract?.dongHoNuocs[0]?.diaChi,
        "Điện thoại": __contract.khachHang.dienThoai,
        "Người đại diện": __contract.khachHang.nguoiDaiDien,
        "Số nhân khẩu": __contract.khachHang.soKhau,
        "Số hộ dùng chung": __contract.khachHang.soHo,
        "Mã đồng hồ block": __contract?.dongHoNuocs[0]?.dongHoChaId,
        "Số sản xuất": "", // chưa thấy
        "Tem kiểm định": __contract?.dongHoNuocs[0]?.soTem,
        "Ngày kiểm định": dayjs(
          __contract?.dongHoNuocs[0]?.ngayKiemDinh
        ).format("DD/MM/YYYY"),
        "Hạn kiểm định": dayjs(__contract?.dongHoNuocs[0]?.hieuLucKD).format(
          "DD/MM/YYYY"
        ),
        "Ngày lắp đặt": dayjs(__contract.ngayLapDat).format("DD/MM/YYYY"),
        "Ngày ký hợp đồng": dayjs(__contract.ngayKyHopDong).format(
          "DD/MM/YYYY"
        ),
        "Người lắp đặt": __contract.nguoiLapDat,
        "Ngày nghiệm thu": dayjs(__contract.ngayNT).format("DD/MM/YYYY"),
      }));

      exportToExcel(
        resCustom,
        `QUAN_LY_HOP_DONG_${dayjs(new Date()).format("DD-MM-YYYY")}`
      );
      setBtnExcel(false);
    }
  }, [
    isSuccessToExcel?.data?.length,
    isSuccessToExcel?.data,
    isSuccessToExcel?.statusCode,
    btnExcel,
  ]);
  const [tinhId, setTinhId] = useState("");
  const [huyenId, setHuyenId] = useState("");
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      setOpenModal(true);
      setIsUpdate(false);
      // reset store
      dispatch(fetchApiGetWaterClock(null));
      dispatch(fetchApiGetCustomerByCMND(null));
    } else if (key === "2") {
      setModalUpdateContract(true);
      setIsUpdate(true);
      dispatch(setOpen(true));
      dispatch(getTinhAndHuyenByXaId(null));
      if (
        customer?.hopDongs?.length > 0 &&
        customer?.hopDongs[0]?.dongHoNuocs?.length > 0 &&
        maDongHoMem
      ) {
        dispatch(
          waterClockSlice.actions.btnClickMaDongHoMem(
            customer?.hopDongs[0]?.dongHoNuocs[0]?.keyId
          )
        );
      } else if (customer?.hopDongs?.length === 0) {
        dispatch(
          waterClockSlice.actions.btnClickMaDongHoMem(
            maDongHoMem ? maDongHoMem : customer?.keyId
          )
        );
      }
      // } else if (customer?.hopDongs[0]?.dongHoNuocs?.length === 0) {
      //   dispatch(
      //     waterClockSlice.actions.btnClickMaDongHoMem(
      //       maDongHoMem ? maDongHoMem : customer?.hopDongs[0]?.keyId
      //     )
      //   );
      // }
    } else if (key === "4") {
      listNhaMayId && dispatch(fetchApiExportToExcelManagerContract(factory));
      setBtnExcel(true);
    } else if (key === "6") {
      setModalHistoryWater(true);
    } else if (key === "7") {
      setModalChangeClock(true);
    } else if (key === "8") {
      console.log("Tien ich.");
    }
  };
  // handle delete contract + clock
  const handleDeleteContractAndClock = () => {
    dispatch(fetchApiDeleteContractAndClock(keyId.keyId))
      .unwrap()
      .then(() => {
        dispatch(setRefreshTable(true));
      });
    dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalUpdateContract(false);
    setModalHistoryWater(false);
    setModalChangeClock(false);
    dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
    dispatch(waterClockSlice.actions.btnClickRowClockWater(null));
    dispatch(fetchApiSelectRowWaterClock(null));
    dispatch(waterClockSlice.actions.btnClickThemDongHoNuoc(false));
    dispatch(setRefreshTable(true));
    dispatch(setAddClick(false));
    dispatch(setChangeClick(false));
    dispatch(waterClockSlice.actions.btnClickMaDongHoMem(null));
    dispatch(setOpen(false));
  };

  return (
    <>
      <Tabs
        type={isTabletOrMobile ? "line" : "card"}
        tabPosition={isTabletOrMobile ? "left" : "top"}
        activeKey="0"
        items={tabs.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item tab-item-${_tab.id} ${
                  tabList === null && _tab.id === "2"
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "5"
                    ? "tab-item-disabled"
                    : _tab.id === "6" // tabList === null &&
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "7"
                    ? "tab-item-disabled"
                    : _tab.id === "8" // tabList === null &&
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {/* _tab.id === "8" ? (
                  <>
                    <Popover
                      rootClassName="fix-popover-z-index"
                      placement={isTabletOrMobile ? "right" : "topRight"}
                      className={tabList === null ? "popover-debt" : null}
                      content={<TableListDebt tabList={tabList} />}
                    >
                      {_tab.icon} {_tab.label} {_tab.iconRight}
                    </Popover>
                  </>
                ) :  */}
                {_tab.id === "5" ? (
                  <>
                    <Popover
                      rootClassName="fix-popover-z-index"
                      placement={isTabletOrMobile ? "right" : "topRight"}
                      className={tabList === null ? "popover-debt" : null}
                      content={<TransferSwitch />}
                    >
                      {_tab.icon} {_tab.label} {_tab.iconRight}
                    </Popover>
                  </>
                ) : _tab.id === "3" ? (
                  <Popconfirm
                    placement="top"
                    title="Bạn có chắc chắn xóa hợp đồng của khách hàng này không?"
                    onConfirm={handleDeleteContractAndClock}
                  >
                    {_tab.icon} {_tab.label}
                  </Popconfirm>
                ) : (
                  <>
                    {_tab.icon} {_tab.label}
                  </>
                )}
              </div>
            ),
            key: _tab.id,
            disabled:
              (tabList === null && _tab.id === "2") ||
              (tabList === null && _tab.id === "3") ||
              (tabList === null && _tab.id === "5") ||
              _tab.id === "6" || // (tabList === null &&
              (tabList === null && _tab.id === "7") ||
              _tab.id === "8"
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      {/* Modal (Lập hợp đồng) */}
      {(openModal || modalUpdateContract) && (
        <Modal
          open={modalUpdateContract ? modalUpdateContract : openModal}
          onCancel={hideModal}
          width={2000}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <h2 className="title-update-info-contract">
            {isUpdate
              ? "Cập nhật thông tin hợp đồng"
              : "Thêm thông tin hợp đồng"}
          </h2>

          <FormCreateContract hideModal={hideModal} isUpdate={isUpdate} />
        </Modal>
      )}

      {/* Modal (Lịch sử sử dụng nước) */}
      {modalHistoryWater && (
        <Modal
          open={modalHistoryWater}
          onCancel={hideModal}
          width={2000}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          {/* Form history use water */}
          <Collapse
            key="1"
            size="small"
            items={items}
            accordion={false}
            defaultActiveKey={["1"]}
            style={{
              marginTop: "3rem",
            }}
          />

          <Divider />

          <Reporter />

          <Divider />

          {/* Render table */}
          <TableHistoryUseWater />
        </Modal>
      )}

      {/* Modal (Thay đồng hồ) */}
      {modalChangeClock && (
        <Modal
          open={modalChangeClock}
          onCancel={hideModal}
          width={2000}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          {/* Form update clock */}
          <FormUpdateClock tabList={tabList} hideModal={hideModal} />
        </Modal>
      )}
    </>
  );
}

export default TabList;

