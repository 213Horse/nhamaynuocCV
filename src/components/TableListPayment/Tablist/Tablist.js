import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Popover, Tabs, message } from "antd";
import {
  MoreOutlined,
  CaretDownOutlined,
  CreditCardOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";

import { btnClickTabListContractSelector } from "../../../redux/selector";
import tabListContractSlice from "../../../redux/slices/tabListContractSlice/tabListContractSlice";
import FormPayForOneBillSelect from "./FormPayForOneBillSelect/FormPayForOneBillSelect";
import FormPayDebt from "./FormPayDebt/FormPayDebt";
import FormPayByBill from "./FormPayByBill/FormPayByBill";
import StatisticalPay from "./StatisticalPay/StatisticalPay";
import FormPayCounter from "./FormPayCounter/FormPayCounter";

// Tabs bottom
const tabs = [
  {
    id: "1",
    label: "Thanh toán",
    icon: <CreditCardOutlined />,
  },
  // {
  //   id: "2",
  //   label: "Thanh toán công nợ",
  //   icon: <CreditCardOutlined />,
  // },
  // {
  //   id: "3",
  //   label: "Thanh toán tại quầy (in biên lai)",
  //   icon: <CreditCardOutlined />,
  // },
  // {
  //   id: "4",
  //   label: "Thanh toán theo số hóa đơn",
  //   icon: <CreditCardOutlined />,
  // },
  // {
  //   id: "5",
  //   label: "Chỉ số thống kê",
  //   icon: <BoxPlotOutlined />,
  // },
  {
    id: "6",
    label: "Tiện ích",
    icon: <MoreOutlined />,
    iconRight: <CaretDownOutlined />,
  },
];

function TabList({ isTabletOrMobile }) {
  const [modalPayForOneBillSelected, setModalPayForOneBillSelected] =
    useState(false);
  const [modalDebt, setModalDebt] = useState(false);
  const [modalPayCounter, setPayCounter] = useState(false);
  const [modalPayByBill, setModalPayByBill] = useState(false);
  const [modalWatchStatistical, setModalWatchStatistical] = useState(false);

  const dispatch = useDispatch();

  const tabList = useSelector(btnClickTabListContractSelector);
  //   const menuSidebar = useSelector(btnClickSidebarMenuSelector);

  // console.log("tabList", tabList);
  // console.log("menuSidebar", menuSidebar);

  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      setModalPayForOneBillSelected(true);
    } else if (key === "2") {
      setModalDebt(true);
    } else if (key === "3") {
      setPayCounter(true);
    } else if (key === "4") {
      setModalPayByBill(true);
    } else if (key === "5") {
      setModalWatchStatistical(true);
    } else if (key === "6") {
      message.error("Tính năng chưa khả dụng!");
    }
  };

  // hide modal
  const hideModal = () => {
    setModalPayForOneBillSelected(false);
    setModalDebt(false);
    setPayCounter(false);
    setModalPayByBill(false);
    setModalWatchStatistical(false);
    dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
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
                className={`tab-item tab-item-${_tab.id} tab-pay-${_tab.id} ${
                  tabList === null && _tab.id === "1"
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "2"
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : tabList === null && _tab.id === "6"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "5" ? (
                  <>
                    <Popover
                      rootClassName="fix-popover-z-index"
                      placement={isTabletOrMobile ? "right" : "topRight"}
                      className={tabList === null ? "popover-debt" : null}
                      //   content={<TableListDebt tabList={tabList} />}
                    >
                      {_tab.icon} {_tab.label} {_tab.iconRight}
                    </Popover>
                  </>
                ) : (
                  <>
                    {_tab.icon}
                    {_tab.label}
                  </>
                )}
              </div>
            ),
            key: _tab.id,
            disabled:
              (tabList === null && _tab.id === "1") ||
              (tabList === null && _tab.id === "2") ||
              (tabList === null && _tab.id === "3") ||
              (tabList === null && _tab.id === "4") ||
              (tabList === null && _tab.id === "6")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      {/* show modal payment (Thanh toán cho 1 hóa đơn được chọn) */}
      <Modal
        open={modalPayForOneBillSelected}
        onCancel={hideModal}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h3>Thanh toán</h3>

        {/* render form */}
        <FormPayForOneBillSelect hideModal={hideModal} />
      </Modal>

      {/* show modal payment (Thanh toán công nợ) */}
      <Modal
        open={modalDebt}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h3>Thanh toán công nợ</h3>

        {/* render form */}
        <FormPayDebt hideModal={hideModal} />
      </Modal>

      {/* Show modal payment (Thanh toán tại quầy in biên lai) */}
      <Modal
        open={modalPayCounter}
        width={1600}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={hideModal}
      >
        <div className="pay-counter-header">
          <h3>Thanh toán tại quầy</h3>
          <p>Nguyễn Nam - 11/02/2023</p>
        </div>

        {/* render form  */}
        <FormPayCounter hideModal={hideModal} />
      </Modal>

      {/* Show modal payment (Thanh toán theo số hóa đơn) */}
      <Modal
        open={modalPayByBill}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h3>Thanh toán</h3>

        {/* render form */}
        <FormPayByBill hideModal={hideModal} />
      </Modal>

      {/* Show modal (Xem các chỉ số thống kê) */}
      <Modal
        open={modalWatchStatistical}
        onCancel={hideModal}
        // width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h3>Các chỉ số</h3>

        {/* render statistical */}
        <StatisticalPay />
      </Modal>
    </>
  );
}

export default TabList;
