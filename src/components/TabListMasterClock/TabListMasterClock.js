import {
  CloseOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Form, Modal, Tabs } from "antd";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableMasterClock from "./TableMasterClock/TableMasterClock";
import FormMasterClock from "./FormMasterClock/FormMasterClock";
import {
  btnClickGetFactoryIdSelector,
  setRowSelectedSelector,
} from "../../redux/selector";
import masterClockSlice, {
  fetchApiGetMasterClock,
} from "../../redux/slices/masterClockSlice/masterClockSlice";
import ViewDetailMasterClock from "./FormMasterClock/ViewDetailMasterClock";

// Tabs bottom
const tabs = [
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
    label: "Thất thoát",
    icon: <CloseOutlined />,
  },
];

function TabListMasterClock() {
  const [formMain] = Form.useForm();
  const [modalForm, setModalForm] = useState(false);
  const [modalViewDetail, setViewDetail] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const rowSelected = useSelector(setRowSelectedSelector);

  // handle change tab
  const handleChangeTabs = (key) => {
    if (key === "2") {
      setModalForm(true);
      setIsUpdate(false);
    } else if (key === "3") {
      setIsUpdate(true);
      setModalForm(true);
    } else if (key === "4") {
      setViewDetail(true);
    } else if (key === "1") {
      if (factoryId) {
        //handle get line reading by factory id
        let factoryQueryString = "";
        if (factoryId === "all") {
          const factoryIdArr = JSON.parse(
            sessionStorage.getItem("nhaMaysData")
          );
          factoryIdArr.map((factory) => {
            if (factoryQueryString === "") {
              factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
            } else {
              factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
            }
          });
        } else {
          factoryQueryString = `nhaMayId=${factoryId}`;
        }
        dispatch(fetchApiGetMasterClock(factoryQueryString));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch(masterClockSlice.actions.setRowSelected(null));
    }
  };

  // handle hide modal
  const hideModal = () => {
    setModalForm(false);
    setViewDetail(false);
    setIsUpdate(false);
    formMain.resetFields()
  };

  return (
    <div className="wrapper-contract">
      <TableMasterClock formMain={formMain} isUpdate={isUpdate} />

      <div className="contract-bottom">
        <Tabs
          type={isTabletOrMobile ? "line" : "card"}
          tabPosition={isTabletOrMobile ? "left" : "top"}
          activeKey="0"
          items={tabs.map((_tab) => {
            return {
              label: (
                <div
                  className={`tab-item tab-item-${_tab.id} ${
                    rowSelected === null && _tab.id === "3"
                      ? "tab-item-disabled"
                      : ""
                  }`}
                >
                  {
                    <>
                      {_tab.icon} {_tab.label}
                    </>
                  }
                </div>
              ),
              key: _tab.id,
              disabled: rowSelected === null && _tab.id === "3" ? true : false,
            };
          })}
          onChange={handleChangeTabs}
        />
      </div>

      <Modal
        open={modalViewDetail}
        onCancel={hideModal}
        width={1100}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Xem thông tin thất thoát</h2>

        <ViewDetailMasterClock hideModal={hideModal} />
      </Modal>

      {/* Show modal form */}
      {modalForm && (
        <Modal
          title={isUpdate ? "Sửa thông tin đồng hồ tổng" : "Thêm mới thông tin đồng hồ tổng"}
          open={modalForm}
          onCancel={hideModal}
          width={2000}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <FormMasterClock
            formMain={formMain}
            isUpdate={isUpdate}
            hideModal={hideModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default TabListMasterClock;
