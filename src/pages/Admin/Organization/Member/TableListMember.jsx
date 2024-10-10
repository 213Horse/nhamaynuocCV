import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Popconfirm, Tabs, message } from "antd";
import { btnClickGetFactoryIdSelector, btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import Captcha from "../../../../components/Captcha/Captcha";
import AddListMember from "./AddListMember";
import EditListMember from "./EditListMember/EditListMember";
import AddMemberStep from "./AddMemberStep";
import { deleteRequest } from "../../../../services";
import { fetchGetMember } from "../../../../redux/slices/thanhVienSlice/thanhVienSlice";
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

const TableListMember = ({ isTabletOrMobile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddListMember, setModalAddListMember] = useState(false);
  const [modalEditListMember, setModalEditListMember] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const tabListMember = useSelector(btnClickTabListInvoicePrintSelector);

  const createFilterQueryString2 = () => {
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



  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      const nhaMayIds = createFilterQueryString2();
      dispatch(fetchGetMember(nhaMayIds))
    } else if (key === "2") {
      setModalAddListMember(true);
    } else if (key === "3") {
      setModalEditListMember(true);
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddListMember(false);
    setModalEditListMember(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const handleConfirmDeleteObject = () => {
    deleteRequest(`auth/user/delete/${tabListMember?.userId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("Xóa thành công");
          hideModal();
          dispatch(fetchGetMember());
        } else {
          message.error("Xóa thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Xóa thất bại");
      });
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
                  tabListMember === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabListMember === null && _tab.id === "4"
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
                      disabled={!tabListMember}
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
              (tabListMember === null && _tab.id === "3") ||
              (tabListMember === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddListMember ? modalAddListMember : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
        maskClosable={false}
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddMemberStep
          hideModal={hideModal}
          isTabletOrMobile={isTabletOrMobile}
        />
      </Modal>

      <Modal
        open={modalEditListMember ? modalEditListMember : openModal}
        onCancel={hideModal}
        width={800}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract" style={{ fontSize: 18 }}>
          Cập nhật tài khoản {tabListMember?.email} cho tô chức
        </h2>

        <EditListMember tabListMember={tabListMember} hideModal={hideModal} />
      </Modal>
    </>
  );
};

export default TableListMember;
