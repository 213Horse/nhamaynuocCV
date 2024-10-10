import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons/lib/icons";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import {
  Button,
  Menu,
  Drawer,
  Dropdown,
  Form,
  Layout,
  Popover,
  Select,
} from "antd";
import { EllipsisOutlined, EnvironmentOutlined } from "@ant-design/icons";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import "./DefaultLayout.css";
import { btnClickSidebarMenuSelector } from "../../redux/selector";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import { primaryLogo } from "../../asset/images";
import endPoints from "../../routers";
import factorySlice, {
  fetchApiAllFactory,
} from "../../redux/slices/factorySlice/factorySlice";
import customerSlice, {
  fetchApiGetCustomerIdFromOptionFactory,
} from "../../redux/slices/customerSlice/customerSlice";
import { handleDangXuat } from "../../config/axiosInterceptor";
import { fetchApiExportToExcelManagerContract } from "../../redux/slices/excelSlice/excelSlice";
import tabListContractSlice from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import readingIndexSlice from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { setNhaMayChange } from "../../redux/slices/currentPageSlice/currentPageSlice";

const { Header, Sider, Content } = Layout;

function DefaultLayout({ children, currentPage }) {
  const buttonRef = useRef(null);

  // Lấy refresh token từ sessionStorage
  const token = sessionStorage.getItem("token");

  const handleMenuClick = () => {
    window.open(`https://nmn-dev-map.amazingtech.vn/?token=${token}`, "_blank");
  };

  // Tiếp tục với phần JSX của bạn
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="vercel" icon={<EnvironmentOutlined />}>
        {" "}
        {/* Sử dụng biểu tượng EnvironmentOutlined */}
        Bản đồ
      </Menu.Item>
    </Menu>
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTimeout, setMenuTimeout] = useState(null);
  const [formOptionNhaMay] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  const firstInputRef = useRef(null);

  const dispatch = useDispatch();

  // get data from redux
  const sidebarMenu = useSelector(btnClickSidebarMenuSelector);
  const userName = sessionStorage.getItem("username");
  const name = sessionStorage.getItem("name");
  const factoryNames1 = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  const factory_current = sessionStorage.getItem("current_factory_id");
  const factoryWhenLogin = sessionStorage.getItem("nhaMay_user_Select");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  useEffect(() => {
    dispatch(fetchApiAllFactory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The first when run -> set default field (nhaMayId)
  useEffect(() => {
    factoryNames1?.length > 0 &&
      formOptionNhaMay.setFieldsValue({
        nhaMayId: factory_current
          ? factory_current
          : factoryWhenLogin
          ? factoryWhenLogin
          : factoryNames1[0].nhaMayId,
      });
  }, [factoryNames1, factory_current, formOptionNhaMay, factoryWhenLogin]);

  // auto focus input
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // when click create contract -> get maKH...
  useEffect(() => {
    if (factoryNames1?.length > 0) {
      dispatch(
        fetchApiGetCustomerIdFromOptionFactory(
          factory_current
            ? factory_current
            : factoryWhenLogin
            ? factoryWhenLogin
            : factoryNames1[0].nhaMayId
        ) //(factoryNames1[0].nhaMayId)
      );
      dispatch(
        factorySlice.actions.btnClickGetFactoryId(
          // factory_current ? factory_current : factoryNames1[0].nhaMayId
          factory_current
            ? factory_current
            : factoryWhenLogin
            ? factoryWhenLogin
            : factoryNames1[0].nhaMayId
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factoryNames1, factoryWhenLogin, factory_current]);

  const showDrawer = () => {
    setOpen(true);
    setCollapsed(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setOpen(false);
  };

  // handle get id factory
  const handleSelectGetFactoryId = (value) => {
    const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
    let factoryQueryString = "";

    if (value === "all") {
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${value}`;
    }

    // Now, replace occurrences of 'nhaMayIds' with ','
    factoryQueryString = factoryQueryString.replace(/nhaMayIds=/g, ",");

    // Remove leading and trailing commas
    factoryQueryString = factoryQueryString.replace(/^,|,$/g, "");

    console.log(factoryQueryString);
    sessionStorage.setItem("current_factory_id", value);
    dispatch(setNhaMayChange(1));
    console.log(value);
    // sessionStorage.setItem("nhaMay_user_Select", value);
    // console.log("value id fac ->", value);
    dispatch(factorySlice.actions.btnClickGetFactoryId(value));
    dispatch(fetchApiGetCustomerIdFromOptionFactory(value));
    dispatch(customerSlice.actions.btnClickFilterCustomer("null"));
    dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
    dispatch(readingIndexSlice.actions.btnClickFilterSoDoc("UN_FILTER"));
    // dispatch(fetchApiExportToExcelManagerContract({ listNhaMayId: value }));
  };

  const queryParams = new URLSearchParams();
  queryParams.append("userName", userName);
  const items = [
    {
      key: "1",
      label: (
        <a href={`/ change_password ? ${queryParams.toString()}`}>
          Đổi Mật Khẩu
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a href="/" onClick={handleDangXuat}>
          Đăng xuất
        </a>
      ),
    },
  ];

  const handleMouseEnter = () => {
    if (menuTimeout) {
      clearTimeout(menuTimeout); // Xóa timeout nếu có
    }
    setMenuVisible(true); // Mở menu khi trỏ chuột vào nút
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setMenuVisible(false); // Đóng menu sau khoảng thời gian trễ
    }, 180); // Đợi 300ms trước khi đóng menu (có thể điều chỉnh thời gian này)

    setMenuTimeout(timeout);
  };

  // Xóa timeout khi component bị unmount
  useEffect(() => {
    return () => {
      if (menuTimeout) {
        clearTimeout(menuTimeout);
      }
    };
  }, [menuTimeout]);

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose="1000" />

      {/* Screen tablet */}
      {!isTabletOrMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={270}
          className="sidebar"
        >
          {!collapsed && (
            // <Link to={endPoints.PUBLIC}>
            <img
              src={primaryLogo.logo}
              className="primary-logo"
              alt="logo-awater"
            />
            // </Link>
          )}
          <SidebarMenu />
        </Sider>
      )}

      <Layout className="site-layout">
        <Header className="header-top position-relative">
          {/* Tablet or mobile */}
          {isTabletOrMobile && (
            <>
              <MenuOutlined onClick={showDrawer} className="custom-menu-icon" />

              {/* show option menu */}
              <Drawer
                placement={placement}
                width={400}
                onClose={onClose}
                open={open}
              >
                <Form form={formOptionNhaMay} className="select-form-fac">
                  <Form.Item name="nhaMayId">
                    <Select
                      fieldNames="nhaMayId"
                      ref={firstInputRef}
                      onSelect={handleSelectGetFactoryId}
                    >
                      {factoryNames1?.length > 0
                        ? factoryNames1?.map((_factory) => {
                            return (
                              <Select.Option
                                key={_factory.nhaMayId}
                                value={_factory.nhaMayId}
                              >
                                {_factory.tenNhaMay}
                              </Select.Option>
                            );
                          })
                        : []}
                    </Select>
                  </Form.Item>
                </Form>
                <SidebarMenu
                  onCloseDrawer={onClose}
                  isTabletOrMobile={isTabletOrMobile}
                />
              </Drawer>
            </>
          )}

          {!isTabletOrMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 60,
                height: 60,
              }}
            />
          )}

          {!isTabletOrMobile && (
            <Form form={formOptionNhaMay} className="select-form-fac">
              <Form.Item name="nhaMayId">
                <Select
                  style={{ width: 420 }}
                  fieldNames="nhaMayId"
                  ref={firstInputRef}
                  onSelect={handleSelectGetFactoryId}
                >
                  {factoryNames1?.length > 0
                    ? factoryNames1?.map((_factory) => {
                        return (
                          <Select.Option
                            key={_factory.nhaMayId}
                            value={_factory.nhaMayId}
                          >
                            {_factory.tenNhaMay}
                          </Select.Option>
                        );
                      })
                    : []}
                  <Select.Option key="all" value="all">
                    Tất cả
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form>
          )}

          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={buttonRef}
            className="custom-ellipsis-button-container"
          ></div>

          <div
            className={
              isTabletOrMobile ? "site-layout-info-mobile" : "site-layout-info"
            }
            style={{ marginTop: "16px" }}
          >
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              visible={menuVisible}
              onVisibleChange={(visible) => setMenuVisible(visible)}
              placement="bottomCenter" // Hiện menu bên trái
            >
              <Button
                type="text"
                icon={<EllipsisOutlined />}
                className="custom-ellipsis-button"
              />
            </Dropdown>
            <Popover>
              {/* Đổi thành img */}
              <UserOutlined />
            </Popover>

            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow
            >
              <Button type="text">{name}</Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "13px",
          }}
        >
          {sidebarMenu === null &&
          currentPage === null &&
          currentPage !== "" ? (
            <h1 className="text-welcome">
              CHÀO MỪNG BẠN ĐẾN VỚI AWATER CỦA CHÚNG TÔI.
            </h1>
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
