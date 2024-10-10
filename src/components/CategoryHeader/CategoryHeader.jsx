import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Input, DatePicker, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import viVN from "antd/es/date-picker/locale/vi_VN";
import "./CategoryHeader.css";
import { useMediaQuery } from "react-responsive";
import { CategoryHeaderAction } from "./CategoryHeaderAction";

const Header = ({ setViewTableDetail, onChange }) => {
   const dispatch = useDispatch();
   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
   const tabList = useSelector((state) => state.tabListContractSlice.tabList);
   const sidebarMenu = useSelector((state) => state.sidebarSlice.data);
   const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
   const [openPopover, setOpenPopover] = useState(false);

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
            handleViewTableDetail={handleViewTableDetail}
            tabList={tabList}
         />
      );
   };

   return (
      <div className="category-header-wrapper">
         <div className="category-header-content" style={{
            zIndex: 999
         }}>
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
               <Input placeholder="Nhập và Enter để tìm kiếm" onChange={onChange} allowClear />
            </div>
            {sidebarMenu === "CATEGORY_MANAGEMENT_PRICE_LIST" && (
               <div className="filter-datetime">
                  <DatePicker locale={viVN} format={dateFormatList} />
               </div>
            )}
         </div>
      </div>
   );
};

export default Header;
