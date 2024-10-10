import { Modal, Popover, Tabs, message } from "antd";
import {
  DeleteOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  WarningOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../InvoicePrint.css";
import { btnClickTabListInvoicePrintSelector } from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import FromPrintButton from "./PrintButton/PrintButton";
import FormTwoButtonPrint from "./TwoButtonPrint/TwoButtonPrint";
import FormReprintButton from "./ReprintButton/ReprintButton";
import FormPrintCodeKH from "./PrintCodeKH/PrintCodeKH";
import FormProgress from "./ProgressBarExample/ProgressBarExample.jsx";
// Tabs bottom
const tabs = [
  {
    id: "1",
    label: "Đã in xong",
    icon: <CheckCircleOutlined />,
  },
  {
    id: "2",
    label: "In hóa đơn",
    icon: <PrinterOutlined />,
  },
  {
    id: "3",
    label: "In kẹt hóa đơn",
    icon: <WarningOutlined />,
  },
  {
    id: "4",
    label: "In lại hóa đơn theo số hóa đơn",
    icon: <RedoOutlined />,
  },
  {
    id: "5",
    label: "In hóa đơn theo mã KH",
    icon: <UserOutlined />,
  },
  {
    id: "6",
    label: "Trạng thái",
    icon: <BarChartOutlined />,
  },
  {
    id: "7",
    label: "Xóa",
    icon: <DeleteOutlined />,
  },
];

function TableListIP({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalPrintButton, setPrintButton] = useState(false);
  const [modalTwoButtonPrint, setTwoButtonPrint] = useState(false);
  const [modalReprintButton, setReprintButton] = useState(false);
  const [modalPrintCodeKH, setPrintCodeKH] = useState(false);
  const [modalProgress, setProgess] = useState(false);
  const dispatch = useDispatch();

  const tabList = useSelector(btnClickTabListInvoicePrintSelector);
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      message.error("Tính năng chưa khả dụng!");
    } else if (key === "2") {
      setPrintButton(true);
    } else if (key === "3") {
      setTwoButtonPrint(true);
    } else if (key === "4") {
      setReprintButton(true);
    } else if (key === "5") {
      setPrintCodeKH(true);
    } else if (key === "6") {
      setProgess(true);
    } else if (key === "7") {
      message.error("Tính năng chưa khả dụng!");
      // console.log("deleted.");
      // dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setPrintButton(false);
    setTwoButtonPrint(false);
    setReprintButton(false);
    setPrintCodeKH(false);
    setProgess(false);
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
        items={tabs.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-ip tab-item-ip-${_tab.id} ${
                  tabList === null && _tab.id === "2"
                    ? "tab-item-ip-disabled"
                    : tabList === null && _tab.id === "3"
                    ? "tab-item-ip-disabled"
                    : tabList === null && _tab.id === "6"
                    ? "tab-item-ip-disabled"
                    : tabList === null && _tab.id === "5"
                    ? "tab-item-ip-disabled"
                    : ""
                }`}
              >
                {_tab.id === "7" ? (
                  <>
                    <Popover
                      rootClassName=".fix-popover-z-index_ip"
                      placement={isTabletOrMobile ? "right" : "topRight"}
                      className={tabList === null ? "popover-debt" : null}
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

      {/* Modal (In hóa đơn) */}
      <Modal
        open={modalPrintButton ? modalPrintButton : openModal}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h2 className="title-update-info-contract">In hóa đơn</h2>
        {/* Form Print Button */}
        <FromPrintButton tabList={tabList} hideModal={hideModal} />
      </Modal>
      {/* Modal ( In kẹt hóa đơn) */}
      <Modal
        open={modalTwoButtonPrint ? modalTwoButtonPrint : openModal}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h2 className="title-update-info-contract">In kẹt hóa đơn</h2>
        {/* Form Two Button */}
        <FormTwoButtonPrint tabList={tabList} hideModal={hideModal} />
      </Modal>
      {/* Modal (In lại hóa đơn theo số hóa đơn) */}
      <Modal
        open={modalReprintButton ? modalReprintButton : openModal}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h2 className="title-update-info-contract">
          In hóa đơn theo số hóa đơn
        </h2>
        {/* Form Reprint Button */}
        <FormReprintButton tabList={tabList} hideModal={hideModal} />
      </Modal>
      {/* Modal (In lại hóa đơn theo số hóa đơn) */}
      <Modal
        open={modalPrintCodeKH ? modalPrintCodeKH : openModal}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h2 className="title-update-info-contract">In hóa đơn theo mã KH</h2>
        {/* Form Reprint Button */}
        <FormPrintCodeKH tabList={tabList} hideModal={hideModal} />
      </Modal>
      {/* Modal (Progress) */}
      <Modal
        open={modalProgress ? modalProgress : openModal}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h2 className="title-update-info-contract">Tình hình trạng thái </h2>
        {/* Form Reprint Button */}
        <FormProgress tabList={tabList} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableListIP;
