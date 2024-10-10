import { Modal, Popconfirm, Popover, Tabs, message } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  btnClickTabListInvoicePrintSelector,
  btnClickTableWatchSelector,
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./ListWatch.css";
import AddListWatch from "./AddListWatch";
import EditListLocation from "./EditListWatch";
import {
  fetchDeleteWatch,
  fetchWatchData,
} from "../../../redux/slices/watchSlice/watchSlice";
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

function TableListWatch({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddList_Location, setAddList_Location] = useState(false);
  const [modalEdit_List_Location, setEdit_List_Location] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();
  const rowSelected = useSelector(btnClickTableWatchSelector);

  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
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
  const queryString = createFilterQueryString();
  const handleChangeTabs = (key) => {
    if (key === "1") {
      dispatch(fetchWatchData(queryString));
    } else if (key === "2") {
      setAddList_Location(true);
    } else if (key === "3") {
      setEdit_List_Location(true);
    }
  };

  const handleConfirmDeleteWatch = () => {
    if (rowSelected) {
      dispatch(
        fetchDeleteWatch({
          keyId: rowSelected.maDH,
          key: rowSelected.key,
          kyHieu: rowSelected.kyHieu,
        })
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
                  (rowSelected === null && _tab.id === "3") ||
                  (rowSelected === null && _tab.id === "4")
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {/* {_tab.id === "7" ? (
                           <>
                              <Popover
                                 rootClassName="fix-popover-z-index"
                                 placement={isTabletOrMobile ? "right" : "topRight"}
                                 className={tabListbc === null ? "popover-debt" : null}
                              >
                                 {_tab.icon} {_tab.label} {_tab.iconRight}
                              </Popover>
                           </>
                        ) : (
                           <>
                              {_tab.icon} {_tab.label}
                           </>
                        )} */}
                {_tab.id === "4" && rowSelected !== null ? (
                  <Popconfirm
                    placement="bottom"
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
                    onConfirm={handleConfirmDeleteWatch}
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
              (rowSelected === null && _tab.id === "3") ||
              (rowSelected === null && _tab.id === "4")
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

        <AddListWatch tabListbc={tabListbc} hideModal={hideModal} />
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

        <EditListLocation tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableListWatch;
