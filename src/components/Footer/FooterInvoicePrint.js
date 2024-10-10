import { Dropdown, Space, Tabs } from "antd";
import {
  BarChartOutlined,
  CalculatorOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileExcelOutlined,
  FileOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  MailFilled,
  MailOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SettingOutlined,
  StopOutlined,
  SyncOutlined,
  ToTopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./FooterInvoice.css";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceList } from "../../redux/selector";
import {
  fetchInvoiceDetail,
  sendSMS,
} from "../../redux/slices/invoiceSlice/invoiceSlice";

export const FooterInvoice = (props) => {
  const {
    setIsOpenModalBill,
    setIsModalInstalmentsOpen,
    setIsOpenModalAddInvoice,
    setIsOpenModalEditInvoice,
    setIsOpenModalWaterStatus,
    setIsModalEmail,
    setIsModalSMS,
    isTabletOrMobile,
    setIsOpenModalInvoiceBar,
    setIsOpenModalViewInvoice,
    hide,
    setIsOpenModalLedger,
    rowSelection,
    isFilter,
    thangTaoSoDocField,
  } = props;

  const dispatch = useDispatch();

  const invoiceListSelector = useSelector(getInvoiceList);

  const hanldeOpen = (isOpen, type) => {
    if (type === "email") {
      setIsModalEmail(isOpen);
    }
    if (type === "sms") {
      setIsModalSMS(isOpen);
    }
  };

  //get id of invoice filter list
  const getIdString = () => {
    const idStringArr = invoiceListSelector?.items?.map((item) => item.id);
    return idStringArr;
  };

  const handleSendSMS = () => {
    if (invoiceListSelector?.items.length > 0) {
      const userId = sessionStorage.getItem("userId");
      const idStringArr = getIdString();
      const params = {
        listHoaDonId: idStringArr,
        nguoiGuiId: userId,
        thangTaoSoDoc: thangTaoSoDocField,
      };
      console.log("params", params);
      dispatch(sendSMS(params));
    }
  };

  const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#!">
          Hủy hóa đơn
        </a>
      ),
      key: "0",
      icon: <DeleteOutlined style={{ color: "red" }} />,
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#!">
          Điều chỉnh hóa đơn
        </a>
      ),
      key: "1",
      icon: <EditOutlined style={{ color: "blue" }} />,
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#!">
          Thay thế hóa đơn
        </a>
      ),
      key: "2",
      icon: <RedoOutlined style={{ color: "blue" }} />,
    },
  ];

  const extension = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Đồng bộ từ hồ sơ
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
          Xuất hóa đơn theo mẫu
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
          Xuất hóa đơn theo nhà mạng
        </a>
      ),
      key: "2",
      icon: <FileExcelOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          In phiếu báo tiền nước
        </a>
      ),
      key: "3",
      icon: <FileTextOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Cập nhật trạng thái thu hộ
        </a>
      ),
      key: "4",
      icon: <FileSyncOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Cập nhật TT thu hộ theo tuyến
        </a>
      ),
      key: "5",
      icon: <UnorderedListOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Cập nhật hóa đơn hủy
        </a>
      ),
      key: "6",
      icon: <StopOutlined style={{ color: "#ff4d4f" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Bỏ hóa đơn hủy
        </a>
      ),
      key: "7",
      icon: <StopOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Cập nhật hóa đơn chưa in
        </a>
      ),
      key: "8",
      icon: <CloseCircleOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <div
          onClick={() => {
            setIsOpenModalLedger(true);
            hide();
          }}
        >
          Sổ thanh toán
        </div>
      ),
      key: "9",
      icon: <ToTopOutlined style={{ color: "#1677ff" }} />,
    },
  ];

  const itemEmail = [
    {
      label: (
        <span
          onClick={() => {
            hanldeOpen(true, "email");
          }}
        >
          Gửi Email
        </span>
      ),
      key: "0",
      icon: <MailFilled style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <span
          onClick={() => {
            hanldeOpen(true, "sms");
          }}
        >
          Gửi SMS
        </span>
      ),
      key: "1",
      icon: <MailFilled style={{ color: "#1677ff" }} />,
    },
  ];

  const tabs = [
    {
      // id: "1",
      // label: <span onClick={() => setIsOpenModalBill(true)}>Tính tiền</span>,
      // icon: <CalculatorOutlined />,
      id: "1",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${1}`}
          onClick={() => {
            setIsOpenModalBill(true);
            hide();
          }}
        >
          <CalculatorOutlined /> <span>Tính tiền</span>
        </div>
      ),
    },
    {
      // id: "2",
      // label: (
      //   <span onClick={() => setIsModalInstalmentsOpen(true)}>
      //     Tính tiền trả góp
      //   </span>
      // ),
      // icon: <CalculatorOutlined />,
      id: "2",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${2}`}
          onClick={() => {
            setIsModalInstalmentsOpen(true);
            hide();
          }}
        >
          <CalculatorOutlined /> <span>Tính tiền trả góp</span>
        </div>
      ),
    },
    // {
    //   // id: "3",
    //   // label: (
    //   //   <span onClick={() => setIsOpenModalAddInvoice(true)}>Thêm hóa đơn</span>
    //   // ),
    //   // icon: <PlusCircleOutlined />,
    //   id: "3",
    //   button: (
    //     <div
    //       className={`tab-item-Invoice tab-item-Invoice-${3}`}
    //       style={{
    //         userSelect: "none",
    //       }}
    //       onClick={() => {
    //         if (rowSelection) {
    //           setIsOpenModalAddInvoice(true);
    //           hide();
    //         }
    //       }}
    //     >
    //       <PlusCircleOutlined /> <span>Thêm hóa đơn</span>
    //     </div>
    //   ),
    // },
    {
      // id: "4",
      // label: (
      //   <span onClick={() => setIsOpenModalEditInvoice(true)}>Sửa hóa đơn</span>
      // ),
      // icon: <PlusCircleOutlined />,
      id: "4",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${4} ${
            !rowSelection && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            if (rowSelection) {
              dispatch(fetchInvoiceDetail(rowSelection.id));
              setIsOpenModalEditInvoice(true);
              hide();
            }
          }}
        >
          <PlusCircleOutlined /> <span>Sửa hóa đơn</span>
        </div>
      ),
    },
    {
      // id: "5",
      // label: (
      //   <Dropdown
      //     menu={{
      //       items: items,
      //     }}
      //   >
      //     <a href="#!" onClick={(e) => e.preventDefault()}>
      //       <Space>
      //         Hóa đơn điện tử
      //         <DownOutlined />
      //       </Space>
      //     </a>
      //   </Dropdown>
      // ),
      // icon: <FileOutlined />,
      id: "5",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${5}`}
          onClick={() => {
            // setIsModalOpenMCreate(true);
            // hide();
          }}
        >
          <FileOutlined />{" "}
          <span>
            <Dropdown
              menu={{
                items: items,
              }}
            >
              <a href="#!" onClick={(e) => e.preventDefault()}>
                <Space>
                  Hóa đơn điện tử
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        </div>
      ),
    },
    {
      // id: "6",
      // label: (
      //   <span
      //     onClick={() => setIsOpenModalViewInvoice(true)}
      //   >
      //     Xem hóa đơn
      //   </span>
      // ),
      // icon: <FileSearchOutlined />,
      id: "6",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${6}`}
          onClick={() => {
            setIsOpenModalViewInvoice(true);
            hide();
          }}
        >
          <FileSearchOutlined /> <span>Xem hóa đơn</span>
        </div>
      ),
    },
    {
      // id: "7",
      // label: (
      //   <span
      //   // onClick={() => setIsOpenModalEditInvoice(true)}
      //   >
      //     <Dropdown menu={{ items: itemEmail }}>
      //       <a href="#!" onClick={(e) => e.preventDefault()}>
      //         <Space>
      //           Gửi tin
      //           <DownOutlined />
      //         </Space>
      //       </a>
      //     </Dropdown>
      //   </span>
      // ),
      // icon: <MailOutlined />,
      id: "7",
      // button: (
      //   <div
      //     className={`tab-item-Invoice tab-item-Invoice-${7}`}
      //     onClick={() => {
      //       // setIsModalOpenMCreate(true);
      //       // hide();
      //     }}
      //   >
      //     <MailOutlined />{" "}
      //     <span>
      //       <Dropdown menu={{ items: itemEmail }}>
      //         <a href="#!" onClick={(e) => e.preventDefault()}>
      //           <Space>
      //             Gửi tin
      //             <DownOutlined />
      //           </Space>
      //         </a>
      //       </Dropdown>
      //     </span>
      //   </div>
      // ),
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${7} ${
            !isFilter && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            handleSendSMS();
          }}
        >
          <span>
            <MailOutlined /> <span>Gửi SMS</span>
          </span>
        </div>
      ),
    },
    {
      // id: "8",
      // label: (
      //   <span onClick={() => setIsOpenModalWaterStatus(true)}>Xem TH SD</span>
      // ),
      // icon: <UnorderedListOutlined />,
      id: "8",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${8}`}
          onClick={() => {
            setIsOpenModalWaterStatus(true);
          }}
        >
          <UnorderedListOutlined /> <span>Xem TH SD</span>
        </div>
      ),
    },
    {
      // id: "9",
      // label: (
      //   <span>
      //     <Dropdown
      //       menu={{
      //         items: extension,
      //       }}
      //     >
      //       <a href="#!" onClick={(e) => e.preventDefault()}>
      //         <Space>
      //           Tiện ích
      //           <DownOutlined />
      //         </Space>
      //       </a>
      //     </Dropdown>
      //   </span>
      // ),
      // icon: <SettingOutlined />,
      id: "9",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${9}`}
          onClick={() => {
            // setIsModalOpenMCreate(true);
            // hide();
          }}
        >
          <SettingOutlined />{" "}
          <span>
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
          </span>
        </div>
      ),
    },
    {
      // id: "10",
      // label: <span onClick={() => setIsOpenModalInvoiceBar(true)}>Chỉ số</span>,
      // icon: <BarChartOutlined />
      id: "10",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${10}`}
          onClick={() => {
            setIsOpenModalInvoiceBar(true);
          }}
        >
          <BarChartOutlined /> <span>Chỉ số</span>
        </div>
      ),
    },
    // {
    //   id: "11",
    //   button:
    //     <div
    //       className={`tab-item-Invoice tab-item-Invoice-${11}`}
    //       onClick={() => {
    //         setIsOpenModalLedger(true);
    //         hide();
    //       }}
    //     >
    //       <ToTopOutlined />  <span>Sổ thanh toán</span>
    //     </div>
    // },
  ];

  return (
    <Tabs
      type={isTabletOrMobile ? "line" : "card"}
      tabPosition={isTabletOrMobile ? "left" : "top"}
      activeKey="0"
      items={tabs.map((_tab) => {
        return {
          label: (
            // <div
            //   className={`tab-item-Invoice tab-item-Invoice-${_tab.id}`}
            // >
            //   {_tab.icon} {_tab.label}
            // </div>
            <>{_tab.button}</>
          ),
          key: _tab.id,
        };
      })}
    />
  );
};
