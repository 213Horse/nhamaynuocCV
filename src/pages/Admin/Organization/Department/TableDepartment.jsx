import { Modal, Tabs, Popconfirm, message } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import Captcha from "../../../../components/Captcha/Captcha";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import { fetchDeletePhongBan } from "../../../../redux/slices/phongBanSlice/phongBanSlice";
import { setRefreshTable } from "../../../../redux/slices/currentPageSlice/currentPageSlice";

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

function TableDepartment({ isTabletOrMobile, refresh = () => {} }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddDepartment, setModalAddDepartment] = useState(false);
  const [modalEditDepartment, setModalEditDepartment] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();

  const tabDepartment = useSelector(btnClickTabListInvoicePrintSelector);
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      message.success("Làm mới thành công");
      dispatch(setRefreshTable(true));
    } else if (key === "2") {
      setModalAddDepartment(true);
    } else if (key === "3") {
      setModalEditDepartment(true);
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddDepartment(false);
    setModalEditDepartment(false);
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
        items={tabs_bc?.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-bc tab-item-bc-${_tab.id} ${
                  tabDepartment === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabDepartment === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" && tabDepartment !== null ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title={
                        <>
                          <div>
                            Bạn có chắc chắn muốn xóa phòng ban này không?
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
                      onCancel={() => {
                        setIsCaptcha(false);
                        captchaRef.current.reset();
                      }}
                      onConfirm={(record) => {
                        dispatch(fetchDeletePhongBan(tabDepartment.key));
                        dispatch(setRefreshTable(true));
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
              (tabDepartment === null && _tab.id === "3") ||
              (tabDepartment === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddDepartment ? modalAddDepartment : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddDepartment tabDepartment={tabDepartment} hideModal={hideModal} />
      </Modal>

      <Modal
        open={modalEditDepartment ? modalEditDepartment : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditDepartment tabDepartment={tabDepartment} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableDepartment;
