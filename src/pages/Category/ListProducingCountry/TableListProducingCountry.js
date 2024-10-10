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
import "./ListProducingCountry.css";
import AddListProducingCountry from "./AddListProducingCountry";
import EditListProducingCountry from "./EditListProducingCountry";
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

function TableListProducingCountry({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddListProducingCountry, setModalAddListProducingCountry] =
    useState(false);
  const [modalEditListProducingCountry, setModalEditListProducingCountry] =
    useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();

  const tabListProducingCountry = useSelector(
    btnClickTabListInvoicePrintSelector
  );
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
    type: 5,
    queryString: queryString,
  };
  const handleChangeTabs = (key) => {
    if (key === "1") {
      dispatch(getAllDMTotalByType(filterData));
    } else if (key === "2") {
      setModalAddListProducingCountry(true);
    } else if (key === "3") {
      setModalEditListProducingCountry(true);
    }
    // else if (key === "4") {
    //   message.error("Tính năng không khả dụng");
    // }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddListProducingCountry(false);
    setModalEditListProducingCountry(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const handleConfirmDeleteProducingCountry = () => {
    dispatch(
      deleteDMTotalByType({
        action: 3,
        id: tabListProducingCountry.key,
        keyId: tabListProducingCountry.ma,
        type: 5,
        kyHieu: tabListProducingCountry.kyHieu,
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
                  tabListProducingCountry === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabListProducingCountry === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" && tabListProducingCountry !== null ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title={
                        <>
                          <div>Bạn có chắc chắn muốn xóa mã này không?</div>
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
                      onConfirm={handleConfirmDeleteProducingCountry}
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
              (tabListProducingCountry === null && _tab.id === "3") ||
              (tabListProducingCountry === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={
          modalAddListProducingCountry
            ? modalAddListProducingCountry
            : openModal
        }
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddListProducingCountry
          tabListProducingCountry={tabListProducingCountry}
          hideModal={hideModal}
        />
      </Modal>

      <Modal
        open={
          modalEditListProducingCountry
            ? modalEditListProducingCountry
            : openModal
        }
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditListProducingCountry
          tabListProducingCountry={tabListProducingCountry}
          hideModal={hideModal}
        />
      </Modal>
    </>
  );
}

export default TableListProducingCountry;
