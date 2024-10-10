/* eslint-disable react/jsx-pascal-case */
import { Button, Modal, Popconfirm, Popover, Tabs, message } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  btnClickTabListInvoicePrintSelector,
  btnClickGetFactoryIdSelector,
  fetchApiAllPaymentMethodSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./listpayment.css";
import { ToastContainer } from "react-toastify";
import AddList_Payment_Method from "./AddList_Payment_Method";
import EditPaymentMethod from "./EditList_Payment_Method";
import {
  fetchApiAllPaymentMethod,
  fetchApiDeletePaymentMethod,
} from "../../../redux/slices/paymentMethodSlice/paymentMethodSlice";
import Captcha from "../../../components/Captcha/Captcha";
import {
  deleteDMTotalByType,
  getAllDMTotalByType,
} from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { deleteRequest } from "../../../services";

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

function TableListPC({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [isOpenPayment, setPaymentMethod] = useState(false);
  const [isOpenEditPaymentMethod, setEditPaymentMethod] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(true); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();

  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  const listPayment = useSelector(fetchApiAllPaymentMethodSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  // console.log("regions", regions);

  // handle change tabs
  // useEffect(() => {
  //   dispatch(fetchApiAllPaymentMethod());
  // }, []);
  const handleChangeTabs = (key) => {
    if (key === "1") {
      // dispatch(getAllDMTotalByType(8));
      const createFilterQueryString = () => {
        let factoryQueryString = "";
        if (nhaMayId === "all") {
          const factoryIdArr = JSON.parse(
            sessionStorage.getItem("nhaMaysData")
          );
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
      dispatch(fetchApiAllPaymentMethod(queryString));
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    } else if (key === "2") {
      setPaymentMethod(true);
    } else if (key === "3") {
      setEditPaymentMethod(true);
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setPaymentMethod(false);
    setEditPaymentMethod(false);

    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };
  
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(
        sessionStorage.getItem("nhaMaysData")
      );
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

  const handleConfirmDeletePaymentMethod = async () => {
    const queryString = createFilterQueryString();
    if (tabListbc) {
      try {
        // Wait for the deletion to complete
        await deleteRequest("phuong-thuc-thanh-toan/delete/" + tabListbc.keyId);
        message.success("Xóa thành công");
  
        // Update UI after successful deletion
        dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null));
        dispatch(fetchApiAllPaymentMethod(queryString));
        setIsCaptcha(false);
        captchaRef.current.reset();
      } catch (error) {
        // Handle error if deletion fails
        console.error("Error deleting:", error);
        // Potentially show an error message to the user
      }
    }
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
                    title={
                      <>
                        <div>Bạn có chắc chắn muốn xóa vùng này không?</div>
                        <div style={{ margin: "20px 0" }}>
                          <Captcha
                            onChangeReCaptcha={(value) => {
                              setIsCaptcha(value != null);
                            }}
                            ref={captchaRef}
                          />
                        </div>
                      </>
                    }
                    okButtonProps={{ disabled: !isCaptcha }}
                    // description={description}
                    okText="Có"
                    cancelText="Không"
                    onConfirm={handleConfirmDeletePaymentMethod}
                    onCancel={() => {
                      setIsCaptcha(false);
                      captchaRef.current.reset();
                    }}
                  >
                    {_tab.icon} {_tab.label}
                  </Popconfirm>
                ) : _tab.id === "1" ? (
                  <div
                  // onClick={() => {
                  //   dispatch(fetchApiAllPaymentMethod());
                  // }}
                  >
                    {_tab.icon} {_tab.label}
                  </div>
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
        open={isOpenPayment ? isOpenPayment : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>
        <AddList_Payment_Method tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>

      <Modal
        open={isOpenEditPaymentMethod ? isOpenEditPaymentMethod : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditPaymentMethod tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>
      {/* Notification */}
      {/* <ToastContainer position="top-right" autoClose="1000" /> */}
    </>
  );
}

export default TableListPC;
