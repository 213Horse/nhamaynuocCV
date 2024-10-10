/* eslint-disable react/jsx-pascal-case */
import { Modal, Popover, Tabs, message } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { btnClickTabListInvoicePrintSelector } from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./listCustomerType.css";
import EditCustomerType from "./Edit_Customer_Type";
import AddCustomerType from "./Add_Customer_Type";
// import AddList_Payment_Method from "./AddList_Payment_Method";
// import EditPaymentMethod from "./EditList_Payment_Method";

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
  const [isCustomerType, setAddCustomerType] = useState(false);
  const [isOpenEditPaymentMethod, setEditPaymentMethod] = useState(false);

  const dispatch = useDispatch();

  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      message.error("Tính năng chưa khả dụng!");
    } else if (key === "2") {
      setAddCustomerType(true);
    } else if (key === "3") {
      setEditPaymentMethod(true);
    } else if (key === "4") {
      message.error("Tính năng chưa khả dụng!");
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setAddCustomerType(false);
    setEditPaymentMethod(false);

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
                className={`tab-item-bc tab-item-bc-${_tab.id} ${tabListbc === null && _tab.id === "2"
                  }`}
              >
                {_tab.id === "7" ? (
                  <>
                    <Popover
                      rootClassName="fix-popover-z-index"
                      placement={isTabletOrMobile ? "right" : "topRight"}
                      className={tabListbc === null ? "popover-debt" : null}
                      okText="Có"
                      cancelText="Không"
                    >
                      {_tab.icon} {_tab.label} {_tab.iconRight}
                    </Popover>
                  </>
                ) : (
                  <>
                    {_tab.icon} {_tab.label}
                  </>
                )}
              </div>
            ),
            key: _tab.id,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={isCustomerType ? isCustomerType : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>
        <AddCustomerType tabListbc={tabListbc} hideModal={hideModal} />

        {/* <AddListLocation tabListbc={tabListbc} hideModal={hideModal} /> */}
      </Modal>

      <Modal
        open={isOpenEditPaymentMethod ? isOpenEditPaymentMethod : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditCustomerType tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableListPC;
