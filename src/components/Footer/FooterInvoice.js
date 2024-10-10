import { Button, Dropdown, Space, Tabs } from "antd";
import {
  getRequest,
  getRequestParams,
  putRequest,
  putRequestMultipartFormData,
} from "../../../src/services";
import {
  BarChartOutlined,
  CalculatorOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExportOutlined,
  FileExcelOutlined,
  FileOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  MailFilled,
  MailOutlined,
  MessageOutlined,
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
import {
  btnClickGetFactoryIdSelector,
  getInvoiceList,
  thangNamInvoiceSelector,
  tuyenDocInvoiceSelector,
} from "../../redux/selector";
import {
  fetchApiGetAllHoaDon,
  fetchInvoiceDetail,
  fetchViewInvoiceList,
  sendSMS,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import { useEffect, useState } from "react";
import { fetchApiExportToExcelHoaDon } from "../../redux/slices/excelSlice/excelSlice";
import { isUndefined } from "lodash";
import { fetchDataByFactory } from "../../redux/slices/factorySlice/factorySlice";

export const FooterInvoice = (props) => {
  const {
    setIsOpenPrint,
    setIsOpenModalDuyetHoaDon,
    setIsOpenModalBill,
    setIsOpenModalEditInvoice,
    setIsOpenModalWaterStatus,
    setIsModalEmail,
    setIsModalSMS,
    isTabletOrMobile,
    setIsOpenModalViewInvoice,
    hide,
    setIsOpenModalLedger,
    rowSelection,
    isFilter,
    thangTaoSoDocField,
    setIsOpenModalHuyThanhToan,
    setIsOpenModalThanhToan,
    setIsOpenModalSMSDongLoat,
    setIsOpenModalSMSRiengLe,
  } = props;

  const dispatch = useDispatch();
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const invoiceListSelector = useSelector(getInvoiceList);
  const [loading, setLoading] = useState(false);
  const month = useSelector(thangNamInvoiceSelector);
  const tuyenDocId = useSelector(tuyenDocInvoiceSelector);
  const nhaMayIds = sessionStorage.getItem("current_factory_id");
  console.log("isFilter", isFilter);
  const handleViewInvoice = () => {
    const createString = () => {
      let hoaDonString = [rowSelection.id];

      // if (rowSelection.length > 0) {
      //   hoaDonString = rowSelection.id.map((hoaDon) => hoaDon.id);
      // }

      // console.log("hoaDonString",hoaDonString);
      // console.log("rowSelection",rowSelection);
      return JSON.stringify(hoaDonString); // Convert array to JSON string
    };

    const hoaDonIdsString = createString();

    // Định nghĩa hàm values và truyền hoaDonString vào đó
    const values = (hoaDonString) => {
      // Do something with hoaDonString in the values function
      console.log("Values function:", hoaDonString);
    };

    // Gọi hàm values và truyền hoaDonIdsString vào đó
    values(hoaDonIdsString);

    // Dispatching the action with the JSON string of IDs
    dispatch(fetchViewInvoiceList(hoaDonIdsString));
    console.log("hoaDonIdsString", hoaDonIdsString);
    // console.log("Data invoice", dataViewInvoiceList);
  };

console.log("tuyenDoc", isUndefined(tuyenDocId));

  const handleXuatExcel = () => {
    setLoading(true); 
    const encodedMonth = encodeURIComponent(month);
    console.log(tuyenDocId);
    const url = `${process.env.REACT_APP_BASE_URL}hoa-don/export-excel-bao-cao-xuat-hoa-don-ke-toan?nhaMayIds=${nhaMayIds}&month=${encodedMonth}${isUndefined(tuyenDocId) ? "" : `&tuyenId=${tuyenDocId}`} `;
    window.location.href = url;
    setLoading(false);
  };
  const handleXuatExcelDoanhThu = () => {
    setLoading(true); 
    const encodedMonth = encodeURIComponent(month);
    console.log(tuyenDocId);
    const url = `${process.env.REACT_APP_BASE_URL}hoa-don/export-excel-bao-cao-doanh-thu?nhaMayIds=${nhaMayIds}&month=${encodedMonth}${isUndefined(tuyenDocId) ? ""  : `&tuyenDocId=${tuyenDocId}`} `;
    window.location.href = url;
    setLoading(false);
  };

  const handleXuatExceldsHoaDon = () => {
    setLoading(true); 
    const encodedMonth = encodeURIComponent(month);
    console.log(tuyenDocId);
    const url = `${process.env.REACT_APP_BASE_URL}hoa-don/export-excel-danh-sach-hoa-don?nhaMayIds=${nhaMayIds}&month=${encodedMonth}${isUndefined(tuyenDocId) ? ""  : `&tuyenDocId=${tuyenDocId}`} `;
    window.location.href = url;
    setLoading(false);
  };

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
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.antgroup.com"
    //     >
    //       Đồng bộ từ hồ sơ
    //     </a>
    //   ),
    //   key: "0",
    //   icon: <SyncOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Xuất hóa đơn theo mẫu
    //     </a>
    //   ),
    //   key: "1",
    //   icon: <FileExcelOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Xuất hóa đơn theo nhà mạng
    //     </a>
    //   ),
    //   key: "2",
    //   icon: <FileExcelOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       In phiếu báo tiền nước
    //     </a>
    //   ),
    //   key: "3",
    //   icon: <FileTextOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Cập nhật trạng thái thu hộ
    //     </a>
    //   ),
    //   key: "4",
    //   icon: <FileSyncOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Cập nhật TT thu hộ theo tuyến
    //     </a>
    //   ),
    //   key: "5",
    //   icon: <UnorderedListOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Cập nhật hóa đơn hủy
    //     </a>
    //   ),
    //   key: "6",
    //   icon: <StopOutlined style={{ color: "#ff4d4f" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Bỏ hóa đơn hủy
    //     </a>
    //   ),
    //   key: "7",
    //   icon: <StopOutlined style={{ color: "#1677ff" }} />,
    // },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //     >
    //       Cập nhật hóa đơn chưa in
    //     </a>
    //   ),
    //   key: "8",
    //   icon: <CloseCircleOutlined style={{ color: "#1677ff" }} />,
    // },
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

  const smsExtension = [
    // {
    //   label: (
    //     <div
    //       onClick={() => {
    //         setIsOpenModalSMSRiengLe(true);
    //         hide();
    //       }}
    //     >
    //       Gửi riêng lẻ
    //     </div>
    //   ),
    //   key: "1",
    //   icon: <MessageOutlined style={{ color: "#1677ff" }} />,
    // },
    {
      label: (
        <div
          onClick={() => {
            setIsOpenModalSMSDongLoat(true);
            hide();
          }}
        >
          Gửi đồng loạt
        </div>
      ),
      key: "2",
      icon: <MessageOutlined style={{ color: "#1677ff" }} />,
    },
  ];
  const excelExtension = [
    {
      label: (
        <div
          onClick={() => {
            handleXuatExcelDoanhThu()
          }}
        >
          Báo cáo doanh thu
        </div>
      ),
      key: "1",
      icon: <MessageOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <div
          onClick={() => {
           handleXuatExcel()
          }}
        >
          Hóa đơn kế toán
        </div>
      ),
      key: "2",
      icon: <MessageOutlined style={{ color: "#1677ff" }} />,
    },
    {
      label: (
        <div
          onClick={() => {
            handleXuatExceldsHoaDon()
          }}
        >
          Danh sách hóa đơn
        </div>
      ),
      key: "3",
      icon: <MessageOutlined style={{ color: "#1677ff" }} />,
    },
  ];

  console.log("month", month );
  console.log("td", tuyenDocId);
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
      id: "1",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${1}`}
          onClick={() => {
            setIsOpenModalDuyetHoaDon(true);
          }}
        >
          <CheckOutlined /> <span>Duyệt Đơn</span>
        </div>
      ),
    },
    {
      id: "2",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${2} ${
            !rowSelection && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            if (rowSelection) {
              setIsOpenModalThanhToan(true);
              hide();
            }
          }}
        >
          <CalculatorOutlined /> <span>Thanh Toán</span>
        </div>
      ),
    },
    {
      id: "3",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${3} ${
            !rowSelection && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            if (rowSelection) {
              setIsOpenModalHuyThanhToan(true);
              hide();
            }
          }}
        >
          <CalculatorOutlined /> <span>Hủy Thanh Toán</span>
        </div>
      ),
    },
    {
      id: "4",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${4} ${
            !rowSelection && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            if (rowSelection) {
              setIsOpenModalBill(true);
              hide();
            }
          }}
        >
          <CalculatorOutlined /> <span>Tính tiền</span>
        </div>
      ),
    },
    {
      // id: "4",
      // label: (
      //   <span onClick={() => setIsOpenModalEditInvoice(true)}>Sửa hóa đơn</span>
      // ),
      // icon: <PlusCircleOutlined />,
      id: "5",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${5} ${
            !rowSelection && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            if (rowSelection) {
              const SoTrang = 1;
              const SoLuong = 10;
              const ThangHoaDon = month;
              const NhaMayID = factoryID;
              const MaHopDong = rowSelection?.contractNumber;
              const data = { SoTrang, SoLuong, NhaMayID, MaHopDong,ThangHoaDon };
              dispatch(fetchApiGetAllHoaDon(data));
              setIsOpenModalEditInvoice(true);
              hide();
            }
          }}
        >
          <PlusCircleOutlined /> <span>Sửa hóa đơn</span>
        </div>
      ),
    },
    // {
    //   // id: "5",
    //   // label: (
    //   //   <Dropdown
    //   //     menu={{
    //   //       items: items,
    //   //     }}
    //   //   >
    //   //     <a href="#!" onClick={(e) => e.preventDefault()}>
    //   //       <Space>
    //   //         Hóa đơn điện tử
    //   //         <DownOutlined />
    //   //       </Space>
    //   //     </a>
    //   //   </Dropdown>
    //   // ),
    //   // icon: <FileOutlined />,
    //   id: "5",
    //   button: (
    //     <div
    //       className={`tab-item-Invoice tab-item-Invoice-${5}`}
    //       onClick={() => {
    //         // setIsModalOpenMCreate(true);
    //         // hide();
    //       }}
    //     >
    //       <FileOutlined />{" "}
    //       <span>
    //         <Dropdown
    //           menu={{
    //             items: items,
    //           }}
    //         >
    //           <a href="#!" onClick={(e) => e.preventDefault()}>
    //             <Space>
    //               Hóa đơn điện tử
    //               <DownOutlined />
    //             </Space>
    //           </a>
    //         </Dropdown>
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    {
      id: "6",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${6} ${
            !rowSelection && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            if (rowSelection) {
              setIsOpenModalViewInvoice(true);
              hide();
              handleViewInvoice();
            }
          }}
        >
          <FileSearchOutlined /> <span>Xem hóa đơn</span>
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
      id: "11",
      button: (
        <div
          className={`tab-item tab-item-${4} ${
            !isFilter && !month && "tab-item-Invoice-disabled"
          }`}
        
        >
          <ExportOutlined />{" "}
          <span>
            <Dropdown
            disabled={!isFilter}
              menu={{
                items: excelExtension,
              }}
            >
              <a href="#!" onClick={(e) => e.preventDefault()}>
                <Space>
                  Xuất Excel
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        </div>
        // <Button
        //   className={`tab-item tab-item-${4}`}
        //   onClick={handleXuatExcel}
        //   type="text"
        //   icon={<FileExcelOutlined />}
        //   loading={loading}
        //   disabled={!isFilter}
        // >
        //   Xuất Excel
        // </Button>
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
          className={`tab-item-Invoice tab-item-Invoice-${7}`}
          // onClick={() => {
          //   handleSendSMS();
          // }}
        >
          <MailOutlined />{" "}
          <span>
            <Dropdown
              menu={{
                items: smsExtension,
              }}
            >
              <a href="#!" onClick={(e) => e.preventDefault()}>
                <Space>
                  Gửi SMS
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        </div>
      ),
    },
    {
      id: "8",
      button: (
        <Button
          className={`tab-item-Invoice tab-item-Invoice-${8} ${
            !isFilter && "tab-item-Invoice-disabled"
          }`}
          onClick={() => {
            setIsOpenModalWaterStatus(true);
          }}
          disabled={!isFilter}
        >
          <UnorderedListOutlined /> <span>Xem TH SD</span>
        </Button>
      ),
    },
    
    {
      id: "10",
      button: (
        <div
          className={`tab-item-Invoice tab-item-Invoice-${10}`}
          onClick={() => {
            setIsOpenPrint(true);
          }}
        >
          <UnorderedListOutlined /> <span>In hóa đơn </span>
        </div>
      ),
    },
    
  ];
  useEffect(() => {
    dispatch(fetchDataByFactory(factoryID));
  }, [factoryID]);

  return (
    <Tabs
      type={isTabletOrMobile ? "line" : "card"}
      tabPosition={isTabletOrMobile ? "left" : "top"}
      activeKey="0"
      items={tabs.map((_tab) => {
        return {
          label: <>{_tab.button}</>,
          key: _tab.id,
        };
      })}
    />
  );
};
