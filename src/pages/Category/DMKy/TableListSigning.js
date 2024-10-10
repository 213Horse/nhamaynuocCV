import { Modal, Popconfirm, Tabs } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  btnClickTabListInvoicePrintSelector,
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./ListSigning.css";
import AddListWatch from "./AddListSigning";
import { getAllKy, deleteKy } from "../../../redux/slices/DMKy/kySlice.js";
import EditListSigning from "./EditListSigning";
import Captcha from "../../../components/Captcha/Captcha";
import { toast } from "react-toastify";
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

function TableListWatch({ isTabletOrMobile }) {
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
  useEffect(() => {
    if (nhaMayId) {
      console.log("Data nha may:", nhaMayId);
      const queryString = createFilterQueryString();
      dispatch(getAllKy(queryString));
    }
  }, [nhaMayId]);

  const [openModal, setOpenModal] = useState(false);
  const [modalAddKy, setModalAddKy] = useState(false);
  const [modalEditKy, setModalEditKy] = useState(false);
  const dispatch = useDispatch();
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const tabKy = useSelector(btnClickTabListInvoicePrintSelector);
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      const queryString = createFilterQueryString();
      dispatch(getAllKy(queryString));
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    } else if (key === "2") {
      setModalAddKy(true);
    } else if (key === "3") {
      setModalEditKy(true);
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddKy(false);
    setModalEditKy(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  // handle delete region
  const handleConfirmDeleteRegion = async () => {
    console.log(tabKy.keyId);
    const queryString = createFilterQueryString();
    if (tabKy) {
      await dispatch(deleteKy(tabKy.keyId));
      toast?.success("Xóa Kỳ thành công.");
      dispatch(getAllKy(queryString));
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
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
        items={tabs_bc?.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-bc tab-item-bc-${_tab.id} ${
                  tabKy === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabKy === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" && tabKy !== null ? (
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
                    onConfirm={handleConfirmDeleteRegion}
                    okText="Có"
                    cancelText="Không"
                    onCancel={() => {
                      captchaRef.current.reset();
                      setIsCaptcha(!isCaptcha);
                    }}
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
              (tabKy === null && _tab.id === "3") ||
              (tabKy === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddKy ? modalAddKy : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddListWatch tabKy={tabKy} hideModal={hideModal} />
      </Modal>
      <Modal
        open={modalEditKy ? modalEditKy : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditListSigning tabKy={tabKy} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TableListWatch;
