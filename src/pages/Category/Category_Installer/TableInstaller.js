import { Modal, Tabs, message, Popconfirm } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./categoryInstaller.css";
import AddInstaller from "./AddInstaller";
import EditInstaller from "./EditInstaller";
import Captcha from "../../../components/Captcha/Captcha";
import {
  getAllDMTotalByType,
  deleteDMTotalByType,
} from "../../../redux/slices/DmTotalSlice/DmTotalSlice";

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

function TableInstaller({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddInstaller, setModalAddInstaller] = useState(false);
  const [modalEditInstaller, setModalEditInstaller] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();

  const tabInstaller = useSelector(btnClickTabListInvoicePrintSelector);
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
  const filterData = {
    type: 2,
    queryString: queryString,
  };
  const handleChangeTabs = (key) => {
    if (key === "1") {
      // message.error('Tính năng không khả dụng')
      dispatch(getAllDMTotalByType(filterData));
    } else if (key === "2") {
      setModalAddInstaller(true);
    } else if (key === "3") {
      setModalEditInstaller(true);
    }
    // else if (key === "4") {
    //   message.error("Tính năng không khả dụng");
    // }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddInstaller(false);
    setModalEditInstaller(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const handleConfirmDeleteInstaller = () => {
    dispatch(
      deleteDMTotalByType({
        action: 3,
        id: tabInstaller.key,
        keyId: tabInstaller.ma,
        type: 2,
        kyHieu: tabInstaller.kyHieu,
      })
    );
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
    setIsCaptcha(false);
    captchaRef.current.reset();
  };

  return (
    <>
      <Tabs
        type={isTabletOrMobile ? "line" : "card"}
        tabPosition={isTabletOrMobile ? "left" : "top"}
        activeKey="0"
        items={tabs_bc?.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-bc tab-item-bc-${_tab.id} ${
                  tabInstaller === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabInstaller === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      disabled={tabInstaller === null}
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
                      okButtonProps={{ disabled: !isCaptcha }}
                      // description={description}
                      onConfirm={handleConfirmDeleteInstaller}
                      okText="Có"
                      cancelText="Không"
                      onCancel={() => {
                        setIsCaptcha(false);
                        captchaRef.current.reset();
                      }}
                    >
                      {_tab.icon} {_tab.label}
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    {_tab.icon} {_tab.label}
                  </>
                )}
              </div>
            ),
            key: _tab.id,
            disabled:
              (tabInstaller === null && _tab.id === "3") ||
              (tabInstaller === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddInstaller ? modalAddInstaller : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddInstaller tabInstaller={tabInstaller} hideModal={hideModal} />
      </Modal>

      <Modal
        open={modalEditInstaller ? modalEditInstaller : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditInstaller tabInstaller={tabInstaller} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableInstaller;
