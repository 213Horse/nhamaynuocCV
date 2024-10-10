/* eslint-disable react/jsx-pascal-case */
import { Modal, Popover, Popconfirm, Tabs, message } from "antd";
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
  fetchAllReasonSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./listscope.css";
import EditListReasons from "./EditListReasons";
import AddListReasons from "./AddListReasons";
import Captcha from "../../../components/Captcha/Captcha";
import {
  fetchDeleteReason,
  fetchReasonData,
} from "../../../redux/slices/reasonSlice/reasonSlice";
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
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();

  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
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
  const handleChangeTabs = (key) => {
    const queryString = createFilterQueryString();
    if (key === "1") {
      dispatch(fetchReasonData(queryString));
    } else if (key === "2") {
      setIsOpenModalAdd(true);
    } else if (key === "3") {
      setIsOpenModalEdit(true);
    }
    // else if (key === "4") {
    //   message.error("Tính năng chưa khả dụng!");
    // }
  };

  const handleConfirmDeleteReason = () => {
    dispatch(fetchDeleteReason(tabListbc));
    setIsCaptcha(false);
    captchaRef.current.reset();
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setIsOpenModalAdd(false);
    setIsOpenModalEdit(false);

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
                  <>
                    <Popconfirm
                      placement="bottom"
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
                      okText="Có"
                      cancelText="Không"
                      onConfirm={handleConfirmDeleteReason}
                      disabled={tabListbc === null}
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
              (tabListbc === null && _tab.id === "3") ||
              (tabListbc === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={isOpenModalAdd ? isOpenModalAdd : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddListReasons tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>

      <Modal
        open={isOpenModalEdit ? isOpenModalEdit : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditListReasons tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableListPC;
