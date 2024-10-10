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
import "./ListObject.css";
import AddListObject from "./AddListObject";
import EditListObject from "./EditListObject";
import Captcha from "../../../components/Captcha/Captcha";
import {
  deleteDMTotalByType,
  getAllDMTotalByType,
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

function TableListObject({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddListObject, setModalAddListObject] = useState(false);
  const [modalEditListObject, setModalEditListObject] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();

  const tabListObject = useSelector(btnClickTabListInvoicePrintSelector);
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
    type: 1,
    queryString: queryString,
  };
  const handleChangeTabs = (key) => {
    if (key === "1") {
      dispatch(getAllDMTotalByType(filterData));
    } else if (key === "2") {
      setModalAddListObject(true);
    } else if (key === "3") {
      setModalEditListObject(true);
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddListObject(false);
    setModalEditListObject(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const handleConfirmDeleteObject = () => {
    dispatch(
      deleteDMTotalByType({
        action: 3,
        id: tabListObject.key,
        keyId: tabListObject.ma,
        kyHieu: tabListObject.kyHieu,
        type: 1,
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
                  tabListObject === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabListObject === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" && tabListObject !== null ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title={
                        <>
                          <div>
                            Bạn có chắc chắn muốn xóa đối tượng này không?
                          </div>
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
                      okText="Có"
                      cancelText="Không"
                      onConfirm={handleConfirmDeleteObject}
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
              (tabListObject === null && _tab.id === "3") ||
              (tabListObject === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddListObject ? modalAddListObject : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddListObject tabListObject={tabListObject} hideModal={hideModal} />
      </Modal>

      <Modal
        open={modalEditListObject ? modalEditListObject : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditListObject tabListObject={tabListObject} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableListObject;
