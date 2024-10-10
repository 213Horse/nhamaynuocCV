import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SwapOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Modal, Popconfirm } from "antd";

import {
  deleteDMTuyenDoc,
  fetchTuyenDocByID,
  getAllDMTuyenDoc,
  getAllTuyenDoc,
} from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { getAllDetailPrice } from "../../redux/slices/detailPriceSlice/detailPriceSlice";
import { fetchApiAllPriceObj } from "../../redux/slices/priceObjSlice/priceObjSlice";
import ModalAddReading from "../../pages/Category/ManagementReading/components/ModalAddReading/ModalAddReading";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";
import ModalEditReading from "../../pages/Category/ManagementReading/components/ModalEditReading/ModalEditReading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import ModalTransferEmployee from "../../pages/Category/ManagementReading/components/ModalTransferEmployee/ModalTransferEmployee";
import Captcha from "../Captcha/Captcha";
import { btnClickGetFactoryIdSelector } from "../../redux/selector";

export const CategoryHeaderAction = ({ sidebarMenu, tabList }) => {
  const [isOpenModalAddReading, setIsOpenModalAddReading] = useState(false);
  const [isOpenModalEditReading, setIsOpenModalEditReading] = useState(false);
  // const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  const [openTransferManagers, setOpenTransferManagers] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const [factoryIdArr, setFactoryIdArr] = useState([]);
  const captchaRef = useRef();

  const dispatch = useDispatch();
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );
  const factoryId = useSelector(btnClickGetFactoryIdSelector);

  //get array nhaMayId
  useEffect(() => {
    let factory = [];
    if (factoryId === "all") {
      factory = JSON.parse(sessionStorage.getItem("nhaMaysData")).map(
        (factory) => factory.nhaMayId
      );
    } else {
      factory = [factoryId];
    }
    console.log(factory);
    setFactoryIdArr(factory);
  }, [factoryId]);

  useEffect(() => {
    console.log("rowSelected", rowSelected);
  }, [rowSelected]);

  const handleOpenModalTransfer = (e, typeTransfer) => {
    e.preventDefault();
    if (sidebarMenu === "CATEGORY_MANAGEMENT_READING") {
      setIsOpenModalTransfer(true);
    }
    if (typeTransfer === "manager") {
      console.log(typeTransfer);
      setIsOpenModalTransfer(true);
      setOpenTransferManagers(true);
    } else if (typeTransfer === "billCollector") {
      setOpenTransferManagers(false);
      setIsOpenModalTransfer(true);
    }
    rowSelected && dispatch(fetchTuyenDocByID(rowSelected.id));
    // setOpenPopover(false);
  };

  const handleOk = (type) => {
      setOpenTransferManagers(false);
      setIsOpenModalTransfer(false);
  };

  const handleCancel = (type) => {
    setIsOpenModalTransfer(false);
    setOpenTransferManagers(false);
  };
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const hanldeRefresh = () => {
    const queryString = createFilterQueryString();
    dispatch(getAllTuyenDoc(queryString));
    dispatch(getAllDetailPrice());
    dispatch(fetchApiAllPriceObj());
  };

  const handleConfirmDelete = () => {
    if (rowSelected) {
      dispatch(deleteDMTuyenDoc(rowSelected?.keyId));
      setIsCaptcha(false);
      captchaRef.current.reset();
    }
  };

  return (
    <div className="category-header-actions">
      <div className="button-refresh">
        <Button
          className="button"
          type="primary"
          icon={<RetweetOutlined />}
          style={{
            height: "32px",
            borderRadius: "6px",
          }}
          size="small"
          onClick={hanldeRefresh}
        >
          Làm mới
        </Button>
      </div>
      <div className="button-add-1">
        <Button
          className="button"
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsOpenModalAddReading(true)}
          style={{
            backgroundColor: "#FA896B",
            height: "32px",
            borderRadius: "6px",
          }}
          size="small"
        >
          Thêm mới
        </Button>
      </div>
      <div className="button-update-1">
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsOpenModalEditReading(true)}
          className={
            rowSelected
              ? "category-reading-edit-button"
              : "category-reading-edit-button__disabled"
          }
          disabled={!rowSelected}
        >
          Sửa
        </Button>
      </div>

      <Popconfirm
        placement="bottom"
        disabled={rowSelected === null}
        title={
          <>
            <div>Bạn có chắc chắn muốn xóa vùng này không?</div>
            <div style={{ margin: "20px 0" }}>
              <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
              />
            </div>
          </>
        }
        okButtonProps={{ disabled: !isCaptcha }}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsCaptcha(false);
          captchaRef.current.reset();
        }}
        okText="Có"
        cancelText="Không"
      >
        <div className="button-delete">
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            // onClick={() => setIsOpenModalDelete(true)}
            disabled={!rowSelected}
            danger
            className={
              rowSelected
                ? "category-reading-delete-button"
                : "category-reading-delete-button__disabled"
            }
            style={{ width: "100%" }}
          >
            Xóa
          </Button>
        </div>
      </Popconfirm>

      {/* <div className="button-delete">
            <Button
               type="primary"
               icon={<DeleteOutlined />}
               // onClick={() => setIsOpenModalDelete(true)}
               disabled={!rowSelected}
               danger
               className={
                  rowSelected
                     ? "category-reading-delete-button"
                     : "category-reading-delete-button__disabled"
               }
              style={{width : '100%'}}
        >
               Xóa
            </Button>
         </div> */}
      {(sidebarMenu === "CATEGORY_MANAGEMENT_READING" ||
        sessionStorage.getItem("currentPage") ===
          "CATEGORY_MANAGEMENT_READING") && (
        <>
          <div className="button-transfer-managers">
            <Button
              className="button"
              type="primary"
              icon={<SwapOutlined />}
              onClick={(e) => {
                handleOpenModalTransfer(e, "manager");
              }}
              size="small"
              style={{
                backgroundColor: "#5D87FF",
                color: "#FFFFFF",
                height: "34px",
                borderRadius: "6px",
              }}
              disabled={!rowSelected}
            >
              Chuyển cán bộ quản lý
            </Button>
          </div>
          <div className="button-transfer-bill-collectors">
            <Button
              className="button"
              type="primary"
              icon={<RetweetOutlined />}
              onClick={(e) => handleOpenModalTransfer(e, "billCollector")}
              size="small"
              style={{
                backgroundColor: "#5D87FF",
                color: "#FFFFFF",
                height: "34px",
                borderRadius: "6px",
              }}
              disabled={!rowSelected}
            >
              Chuyển cán bộ thu
            </Button>
          </div>
        </>
      )}

      <Modal
        title={"Thêm dữ liệu"}
        open={isOpenModalAddReading}
        closeIcon={false}
        className="popup-add-reading"
        width={1200}
        footer={null}
        centered
        destroyOnClose
      >
        <ModalAddReading
          setIsOpenModalAddReading={setIsOpenModalAddReading}
          isOpenModalAddReading={isOpenModalAddReading}
        />
      </Modal>

      <Modal
        title={"Sửa dữ liệu"}
        open={isOpenModalEditReading}
        closeIcon={false}
        // className="popup-add-reading"
        width={1200}
        footer={null}
        destroyOnClose
      >
        <ModalEditReading
          isOpenModalEditReading={isOpenModalEditReading}
          setIsOpenModalEditReading={setIsOpenModalEditReading}
        />
      </Modal>
      {/* 
         <ModalConfirmDelete
            isModalOpen={isOpenModalDelete}
            setIsOpenModalDelete={setIsOpenModalDelete}
         /> */}

      <ModalTransferEmployee
        isOpenBillCollector={isOpenModalTransfer}
        openTransferManagers={openTransferManagers}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
};
