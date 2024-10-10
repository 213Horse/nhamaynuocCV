import { Modal, Popconfirm, Tabs } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { btnClickTabListInvoicePrintSelector } from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./CategoryWard.css";
import AddWard from "./AddWard";
import EditWard from "./EditWard";
import {
  fetchApiAllWard,
  fetchApiDeleteWard,
} from "../../../redux/slices/wardSlice/wardSlice";
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

function TableListWard({ isTabletOrMobile, refetch = () => { } }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddLRL, setAddLRL] = useState(false);
  const [modalEditLRL, setEditLRL] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const dispatch = useDispatch();

  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);

  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      refetch();
      // dispatch(fetchApiAllWard());
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    } else if (key === "2") {
      setAddLRL(true);
    } else if (key === "3") {
      setEditLRL(true);
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setAddLRL(false);
    setEditLRL(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  // handle delete region
  const handleConfirmDeleteRegion = () => {
    console.log(tabListbc);
    if (tabListbc) {
      dispatch(fetchApiDeleteWard(tabListbc?.keyId));
      setIsCaptcha(false);
      captchaRef.current.reset();
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
                className={`tab-item-bc tab-item-bc-${_tab.id} ${tabListbc === null && _tab.id === "3"
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
                    title={
                      <>
                        <div>Bạn có chắc chắn muốn xóa Phường/Xã này không?</div>
                        <div style={{ margin: "20px 0" }}>
                          <Captcha
                            onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                            ref={captchaRef}
                          />
                        </div>
                      </>
                    }
                    okButtonProps={{ disabled: !isCaptcha }}
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
        open={modalAddLRL ? modalAddLRL : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={720}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddWard hideModal={hideModal} />
      </Modal>
      <Modal
        open={modalEditLRL ? modalEditLRL : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={720}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditWard tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>

    </>
  );
}

export default TableListWard;
