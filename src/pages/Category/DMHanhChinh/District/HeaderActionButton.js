/* eslint-disable react/jsx-pascal-case */
import { Modal, Popconfirm, Tabs } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import AddDistrict from "./AddDistrict";
import Captcha from "../../../../components/Captcha/Captcha";
import EditDistrict from "./EditDistrict";
import {
  fetchApiGetAllDistrict,
  fetchDeleteDistrict,
} from "../../../../redux/slices/districtSlice/districtSlice";

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

const HeaderActionButton = ({ isTabletOrMobile, refetch }) => {
  const dispatch = useDispatch();
  const [isOpenModalAdd, setModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const rowSelected = useSelector(btnClickTabListInvoicePrintSelector);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  // handle change tabs
  const handleChangeTabs = (key) => {
    console.log(key);
    if (key === "1") {
      refetch();
      // dispatch(fetchApiGetAllDistrict());
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    } else if (key === "2") {
      setModalAdd(true);
    } else if (key === "3") {
      setIsOpenModalEdit(true);
    }
  };

  const handleConfirmDeleteDistrict = () => {
    if (!rowSelected) {
      return;
    }
    dispatch(fetchDeleteDistrict(rowSelected?.keyId));
    setIsCaptcha(false);
    captchaRef.current.reset();
  };

  // hide modal
  const hideModal = () => {
    setModalAdd(false);
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
                  (rowSelected === null && _tab.id === "3") ||
                  (rowSelected === null && _tab.id === "4")
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" ? (
                  <Popconfirm
                    disabled={!rowSelected}
                    placement="bottom"
                    title={
                      <>
                        <div>
                          Bạn có chắc chắn muốn xóa Quận/Huyện này không?
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
                    onConfirm={handleConfirmDeleteDistrict}
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
              (rowSelected === null && _tab.id === "3") ||
              (rowSelected === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={isOpenModalAdd}
        onCancel={hideModal}
        width={700}
        centered
        footer={false}
        title="Thêm dữ liệu"
        destroyOnClose
      >
        <AddDistrict hideModal={hideModal} />
      </Modal>

      <Modal
        open={isOpenModalEdit}
        onCancel={hideModal}
        width={700}
        centered
        footer={false}
        title="Sửa dữ liệu"
        destroyOnClose
      >
        <EditDistrict hideModal={hideModal} tabDistrict={rowSelected} />
      </Modal>
    </>
  );
};

export default HeaderActionButton;
