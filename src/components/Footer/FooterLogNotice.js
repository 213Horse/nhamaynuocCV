import {
  BarChartOutlined,
  DownOutlined,
  FileExcelOutlined,
  MailOutlined,
  MoreOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Tabs } from "antd";
import React from "react";
import "./FooterLogNotice.css";

export const FooterLogNotice = (props) => {
  const {
    isTabletOrMobile,
    setIsOpenMoneyWater,
    setIsOpenModalCskh,
    setIsOpenModalNoticeMoneyWater,
    setIsOpenTakeCareCustomer,
    setIsOpenModalIndexBar,
  } = props;

  const extension = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Cập nhật nhà mạng
        </a>
      ),
      key: "0",
      icon: <SyncOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Gửi lại tất cả
        </a>
      ),
      key: "1",
      icon: <FileExcelOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Gửi thông báo theo tuyến
        </a>
      ),
      key: "2",
      icon: <FileExcelOutlined style={{ color: "#1677ff" }} />,
    },
  ];

  const tabs = [
    {
      id: "1",
      label: (
        <span onClick={() => setIsOpenMoneyWater(true)}>Gửi SMS tiền nước</span>
      ),
      icon: <MailOutlined />,
    },
    {
      id: "2",
      label: <span onClick={() => setIsOpenModalCskh(true)}>Gửi SMS CSKH</span>,
      icon: <MailOutlined />,
    },
    {
      id: "3",
      label: (
        <span onClick={() => setIsOpenModalNoticeMoneyWater(true)}>
          Gửi thông báo tiền nước
        </span>
      ),
      icon: <MailOutlined />,
    },
    {
      id: "4",
      label: (
        <span onClick={() => setIsOpenTakeCareCustomer(true)}>
          Gửi thông báo CSKH
        </span>
      ),
      icon: <MailOutlined />,
    },
    {
      id: "5",
      label: (
        <Dropdown
          menu={{
            items: extension,
          }}
        >
          <a href="#!" onClick={(e) => e.preventDefault()}>
            <Space>
              Tiện ích
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
      icon: <MoreOutlined />,
    },
    {
      id: "6",
      label: (
        <div
          style={{ display: "inline-block" }}
          onClick={() => setIsOpenModalIndexBar(true)}
        >
          Chỉ số
        </div>
      ),
      icon: <BarChartOutlined />,
    },
  ];

  return (
    <>
      <Tabs
        type={isTabletOrMobile ? "line" : "card"}
        tabPosition={isTabletOrMobile ? "left" : "top"}
        activeKey="0"
        items={tabs.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-LogNotice tab-item-LogNotice-${_tab.id}`}
              >
                {_tab.icon}
                {_tab.label}
              </div>
            ),
            key: _tab.id,
          };
        })}
      />
    </>
  );
};
