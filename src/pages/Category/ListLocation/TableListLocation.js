import { Modal, Popconfirm, Popover, Tabs, message } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchApiAllRegionSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./ListLocation.css";
import AddListLocation from "./AddListLocation";
import EditListLocation from "./EditListLocation";
import { fetchApiAllRegion } from "../../../redux/slices/regionSlice/regionSlice";
import areaSlice, {
  fetchApiAllArea,
  fetchApiDeleteArea,
  fetchApiGetKhuVucAndVung,
} from "../../../redux/slices/areaSlice/areaSlice";
import Captcha from "../../../components/Captcha/Captcha";

// Tabs bottom
const tabs_bc = [
  {
    id: "1",
    label: "Làm mới",
    icon: <RetweetOutlined />,
  },
  {
    id: "2",
    label: "Thêm mới",

    icon: <PlusCircleOutlined />,
  },
  {
    id: "3",
    label: "Sửa",
    icon: <EditOutlined />,
  },
  {
    id: "4",
    label: "Xóa",
    icon: <DeleteOutlined />,
  },
];

function TableListLocation({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddList_Location, setAddList_Location] = useState(false);
  const [modalEdit_List_Location, setEdit_List_Location] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();

  // const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  const tabListbc = useSelector(
    (state) => state.areaSlice.rowSelected
  );
  const regions = useSelector(fetchApiAllRegionSelector);

  // console.log("regions", regions);

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    if (nhaMayId) {
      console.log("Data nha may:", nhaMayId);
      const queryString = createFilterQueryString();
      dispatch(fetchApiAllRegion(queryString));
    }
  }, [nhaMayId]);

  // // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      dispatch(fetchApiAllArea());
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    } else if (key === "2") {
      setAddList_Location(true);
    } else if (key === "3") {
      setEdit_List_Location(true);
    }
  };

  const createFilterQueryString2 = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const handleConfirmDeleteRegion = async  () => {
    if (tabListbc) {
      await dispatch(fetchApiDeleteArea(tabListbc));
      const queryString = createFilterQueryString2()
      dispatch(fetchApiGetKhuVucAndVung(queryString));
      dispatch(
        areaSlice.actions.btnClickTabListArea(null)
      );
      setIsCaptcha(false);
      captchaRef.current.reset();
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setAddList_Location(false);
    setEdit_List_Location(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  return (
    <>
      <Tabs
        type={isTabletOrMobile ? "line" : "card"}
        tabPosition={isTabletOrMobile ? "left" : "top"}
        activeKey="0"
        items={tabs_bc.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-bc tab-item-bc-${_tab.id} ${
                  tabListbc === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabListbc === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" ? (
                  <Popconfirm
                    placement="bottom"
                    disabled={tabListbc === null}
                    okButtonProps={{ disabled: !isCaptcha }}
                    title={
                      <>
                        <div>Bạn có chắc chắn muốn xóa vùng này không?</div>
                        <div style={{ margin: "20px 0" }}>
                          <Captcha
                            onChangeReCaptcha={(value) =>
                              setIsCaptcha(value != null)
                            }
                            ref={captchaRef}
                          />
                        </div>
                      </>
                    }
                    // description={description}
                    onConfirm={handleConfirmDeleteRegion}
                    onCancel={() => {
                      setIsCaptcha(false);
                      captchaRef.current.reset();
                    }}
                    okText="Có"
                    cancelText="Không"
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
              (tabListbc === null && _tab.id === "3") ||
              (tabListbc === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddList_Location ? modalAddList_Location : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddListLocation
          // tabListbc={tabListbc}
          hideModal={hideModal}
          regions={regions}
        />
      </Modal>
      <Modal
        open={modalEdit_List_Location ? modalEdit_List_Location : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditListLocation
          tabListbc={tabListbc}
          hideModal={hideModal}
          regions={regions}
        />
      </Modal>

      {/* Notification */}
      {/* <ToastContainer position="top-right" autoClose="1000" /> */}
    </>
  );
}

export default TableListLocation;
