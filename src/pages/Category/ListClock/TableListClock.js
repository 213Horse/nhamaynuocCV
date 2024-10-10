import { Modal, Popconfirm, Tabs, message } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  btnClickTabListInvoicePrintSelector,
  fetchApiTotalWatchSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import "./ListClock.css";
import AddListWatch from "./AddListClock";
import EditListLocation from "./EditListClock";
import {
  fetchApiAllTotalWatch,
  fetchApiDeleteTotalWatch,
} from "../../../redux/slices/totalWatchSlice/totalWatchSlice";
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
  {
    id: "5",
    label: "Gán tuyến",
    icon: <FormOutlined />,
  },
];

function TableListClock({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddList_TotalWatch, setAddList_TotalWatch] = useState(false);
  const [modalEdit_List_TotalWatch, setEdit_List_TotalWatch] = useState(false);
  const dispatch = useDispatch();
  const tabListTotalWatch = useSelector(btnClickTabListInvoicePrintSelector);
  const listTotalWatch = useSelector(fetchApiTotalWatchSelector);
  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      dispatch(fetchApiAllTotalWatch());
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    } else if (key === "2") {
      setAddList_TotalWatch(true);
    } else if (key === "3") {
      setEdit_List_TotalWatch(true);
    } else if (key === "5") {
      message.error("Tính năng chưa khả dụng!");
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setAddList_TotalWatch(false);
    setEdit_List_TotalWatch(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };
  // handle delete totalWatch
  const handleConfirmDeleteTotalWatch = () => {
    console.log(tabListTotalWatch);
    if (tabListTotalWatch) {
      const { maDH } = tabListTotalWatch;
      dispatch(fetchApiDeleteTotalWatch(maDH));
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
                  tabListTotalWatch === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabListTotalWatch === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" && tabListTotalWatch !== null ? (
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
                    onConfirm={handleConfirmDeleteTotalWatch}
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
              (tabListTotalWatch === null && _tab.id === "3") ||
              (tabListTotalWatch === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddList_TotalWatch ? modalAddList_TotalWatch : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddListWatch tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>
      <Modal
        open={modalEdit_List_TotalWatch ? modalEdit_List_TotalWatch : openModal}
        // onCancel={hideModal}
        closeIcon={false}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditListLocation
          tabListTotalWatch={tabListTotalWatch}
          listTotalWatch={listTotalWatch}
          hideModal={hideModal}
        />
      </Modal>
    </>
  );
}

export default TableListClock;
