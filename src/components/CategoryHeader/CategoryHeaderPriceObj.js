import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Input, Button, Popover } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  RetweetOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import viVN from "antd/es/date-picker/locale/vi_VN";
import "./CategoryHeader.css";
import { btnClickTabListContract } from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import { useMediaQuery } from "react-responsive";
import { getAllDetailPrice } from "../../redux/slices/detailPriceSlice/detailPriceSlice";
import { fetchApiAllPriceObj } from "../../redux/slices/priceObjSlice/priceObjSlice";
import ModalAddPriceList from "../../pages/Category/ManagementPriceList/components/ModalAddPriceList/ModalAddPriceList";
import { btnClickGetFactoryIdSelector, btnClickTabListInvoicePrintSelector } from "../../redux/selector";
import { fetchApiAllPriceObject } from "../../redux/slices/priceObjectSlice/priceObjectSlice";
import ModalDelete from "../../pages/Category/ManagementPriceList/components/ModalAddPriceList/ModalDelete";
import ModalEditPriceList from "../../pages/Category/ManagementPriceList/components/ModalAddPriceList/ModalUpdatePriceList";
import tabListInvoicePrintSlice from "../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";

const CategoryHeaderAction = ({
  sidebarMenu,
  handleOpenModalAdd,
  handleOpenModalTransfer,
  tabList,
}) => {
  const [isOpenModalAddPriceList, setIsOpenModalAddPriceList] = useState(false);
  const [isOpenModalEditPriceList, setIsOpenModalEditPriceList] =
    useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const dispatch = useDispatch();
  const tabListPO = useSelector(btnClickTabListInvoicePrintSelector);
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
  const hanldeRefresh = () => {
    // dispatch(getAllDetailPrice());
    // dispatch(fetchApiAllPriceObj());
    const queryString = createFilterQueryString();
    // dispatch(fetchApiAllPriceObject(queryString));
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  return (
    <div className="category-header-actions">
      <div className="button-refresh">
        <Button
          className="button"
          type="primary"
          icon={<RetweetOutlined />}
          style={{
            height: "34px",
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
          onClick={() => setIsOpenModalAddPriceList(true)}
          style={{
            backgroundColor: "#FA896B",
            height: "34px",
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
          onClick={() => setIsOpenModalEditPriceList(true)}
          // className="category-reading-edit-button"
          className={
            tabListPO
              ? "category-reading-edit-button"
              : "category-reading-edit-button__disabled"
          }
          disabled={!tabListPO}
        >
          Sửa
        </Button>
      </div>
      <div className="button-delete">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => setIsOpenModalDelete(true)}
          className={
            tabListPO
              ? "category-reading-edit-button"
              : "category-reading-edit-button__disabled"
          }
          disabled={!tabListPO}
          danger
        >
          Xóa
        </Button>
      </div>
      <ModalDelete
        isModalOpen={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        tabListPO={tabListPO}
      />
      {/* ModalAddPriceList */}
      <ModalAddPriceList
        setIsOpenModalAddPriceList={setIsOpenModalAddPriceList}
        isOpenModalAddPriceList={isOpenModalAddPriceList}
      />

      {/* moda/ ModalEditPriceList. */}
      <ModalEditPriceList
        setIsOpenModalEditPriceList={setIsOpenModalEditPriceList}
        isOpenModalEditPriceList={isOpenModalEditPriceList}
        tabListPO={tabListPO}
      />
    </div>
  );
};

const HeaderPriceObj = ({
  setIsOpenModalDelete,
  setViewTableDetail,
  setIsOpenModalAddPriceList,
  onSearchChange,
  onDateChange,
}) => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const sidebarMenu = useSelector((state) => state.sidebarSlice.data);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenModalAdd = (e, isEdit) => {
    e.preventDefault();
    if (sidebarMenu === "CATEGORY_MANAGEMENT_PRICE_LIST") {
      setIsOpenModalAddPriceList(true);
    }
    if (!isEdit) {
      dispatch(btnClickTabListContract(null));
    }
    setOpenPopover(false);
  };

  const handleViewTableDetail = (e) => {
    e.preventDefault();
    setViewTableDetail(true);
  };

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const renderCategoryAction = () => {
    return (
      <CategoryHeaderAction
        sidebarMenu={sidebarMenu}
        handleOpenModalAdd={handleOpenModalAdd}
        handleViewTableDetail={handleViewTableDetail}
        setIsOpenModalDelete={setIsOpenModalDelete}
        tabList={tabList}
      />
    );
  };

  return (
    <div className="category-header-wrapper">
      <div className="category-header-content">
        {isTabletOrMobile ? (
          <Popover
            rootClassName="fix-popover-z-index"
            placement="bottomRight"
            trigger="click"
            open={openPopover}
            onOpenChange={handleOpenChange}
            content={renderCategoryAction()}
          >
            <PlusOutlined />
          </Popover>
        ) : (
          renderCategoryAction()
        )}
      </div>
      <div className="category-header-filter">
        <div className="filter-input">
          <Input
            placeholder="Nhập và Enter để tìm kiếm"
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderPriceObj;
