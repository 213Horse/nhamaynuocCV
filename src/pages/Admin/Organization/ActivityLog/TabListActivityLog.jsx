import { Modal, Tabs, Popconfirm, message } from "antd";
import * as XLSX from "xlsx";
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  ExportOutlined,
  AppstoreOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { btnClickTabListInvoicePrintSelector } from "../../../../redux/selector";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import Captcha from "../../../../components/Captcha/Captcha";
import EditActivityLog from "./EditActivityLog";
import AddActivityLog from "./AddActivityLog";
import { LOAD_ACTIONLOG } from "../../../../graphql/ActionLog/queries";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
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
    label: "Sử dụng",
    icon: <PlayCircleOutlined />,
  },
  {
    id: "6",
    label: "Xuất",
    icon: <ExportOutlined />,
  },
  {
    id: "7",
    label: "Khác",
    icon: <AppstoreOutlined />,
  },
  {
    id: "8",
    label: "Xuất Excel",
    icon: <FileExcelOutlined />,
  },
  {
    id: "9",
    label: "Xóa nhật ký",
    icon: <DeleteOutlined />,
  },
];

function TabListActivityLog() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1900px)" });
  const [openModal, setOpenModal] = useState(false);
  const [modalAddJobType, setModalAddJobType] = useState(false);
  const [modalEditJobType, setModalEditJobType] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [exportData, setExportData] = useState([]);
  const { loading, error, data } = useQuery(LOAD_ACTIONLOG);
  useEffect(() => {
    if (!loading && !error && data) {
      try {
        const formattedData = data.GetLogs.nodes.map((item, i) => {
          try {
            return {
              "Số thứ tự": i + 1,
              "Tên người dùng": item.userName || '',
              "ID người dùng": item.userId || '',
              "Tên miền người dùng": item.remoteHost || '',
              claims: item.claims || '',
              "Ngày tạo": item.createdTime ? moment(item.createdTime).format("DD/MM/YYYY") : '',
              "Ngày cập nhật": item.createdTime ? moment(item.createdTime).format("DD/MM/YYYY") : '',
              link: item.httpURL || '',
              Sever: item.localAddress || '',
              headers: item.headers || '',
              form: item.form || '',
              responseStatusCode: item.responseStatusCode || '',
              resQuestBody: item.resQuestBody || '',
              "Thông báo": item.responseBody || '',
            };
          } catch (innerError) {
            console.error('Error processing individual item:', innerError);
            return null; // hoặc giá trị mặc định khác tùy thuộc vào logic của bạn
          }
        }).filter(item => item !== null); // Lọc bỏ các item có giá trị null
  
        setTableData(formattedData);
        setExportData(formattedData);
        console.log("f", formattedData);
      } catch (outerError) {
        console.error('Error processing data:', outerError);
        // Xử lý lỗi ở đây nếu cần thiết
      }
    }
  }, [loading, error, data]);
  

  const exportToExcel = (data, filename) => {
    const dataToExport = data.map((row) => {
      // Tạo một đối tượng mới chỉ chứa các cột từ "Số thứ tự" trở đi
      const newRow = Object.entries(row)
        .filter(([key]) => key >= "Số thứ tự")
        .reduce((obj, [key, value]) => {
          if (typeof value === "string" && value.length > 32767) {
            obj[key] = value.substring(0, 32767);
          } else {
            obj[key] = value;
          }
          return obj;
        }, {});

      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    // Tính toán độ rộng tối đa cho mỗi cột
    const colWidths = dataToExport.reduce((widths, row) => {
      Object.entries(row).forEach(([key, value], i) => {
        const length = (`${value}` || "").length;
        if (!widths[i] || widths[i] < length) {
          widths[i] = length;
        }
      });
      return widths;
    }, []);
    // Đặt độ rộng cho mỗi cột
    worksheet["!cols"] = colWidths.map((w) => ({ wch: w }));
    // Đặt thuộc tính auto_filter cho worksheet
    worksheet["!autofilter"] = { ref: "A1:Z1" };
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const tabJobType = useSelector(btnClickTabListInvoicePrintSelector);
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === "1") {
      message.error("Tính năng chưa khả dụng");
    } else if (key === "2") {
      setModalAddJobType(true);
    } else if (key === "3") {
      setModalEditJobType(true);
    } else if (key === "4") {
      message.error("Tính năng chưa khả dụng");
    } else if (key === "5") {
      message.error("Tính năng chưa khả dụng");
    } else if (key === "6") {
      message.error("Tính năng chưa khả dụng");
    } else if (key === "7") {
      message.error("Tính năng chưa khả dụng");
    } else if (key === "8") {
      exportToExcel(exportData, "Nhật ký hoạt động");
    } else if (key === "9") {
      message.error("Tính năng chưa khả dụng");
    }
  };

  // hide modal
  const hideModal = () => {
    setOpenModal(false);
    setModalAddJobType(false);
    setModalEditJobType(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
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
                  tabJobType === null && _tab.id === "3"
                    ? "tab-item-disabled"
                    : tabJobType === null && _tab.id === "4"
                    ? "tab-item-disabled"
                    : ""
                }`}
              >
                {_tab.id === "4" && tabJobType !== null ? (
                  <>
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
                      okText="Có"
                      cancelText="Không"
                      onCancel={() => {
                        setIsCaptcha(false);
                        captchaRef.current.reset();
                      }}
                    >
                      {_tab.icon} {_tab.label}
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    {_tab.icon} {_tab.label}
                  </>
                )}
              </div>
            ),
            key: _tab.id,
            disabled:
              (tabJobType === null && _tab.id === "3") ||
              (tabJobType === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddJobType ? modalAddJobType : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddActivityLog tabJobType={tabJobType} hideModal={hideModal} />
      </Modal>

      <Modal
        open={modalEditJobType ? modalEditJobType : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditActivityLog tabJobType={tabJobType} hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default TabListActivityLog;

