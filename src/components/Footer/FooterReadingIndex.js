import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  KeyOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  MoreOutlined,
  CaretDownOutlined,
  BarChartOutlined,
  DeleteOutlined,
  FundViewOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tabs, Modal, Button, Row, Col, Select, Form } from "antd";
import { getRequest } from "../../services";
// import { createFilterQueryString } from "../../../utils";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSeriInvoice } from "../../redux/slices/CHSeriInvoiceSlice/CHSeriInvoiceSlice";
import "./FooterReadingIndex.css";
import {
  btnClickTabReadingIndexSelector,
  currentPageIndexSelector,
  btnClickGetFactoryIdSelector,
} from "../../redux/selector";
import readingIndexSlice, {
  fetchApiChotSoDoc,
  fetchApiKhoaSoDoc,
  fetchApiMoKhoaSoDoc,
  getAllIndexVer2,
  handleDeleteReadingIndex,
  readingIndexQuery,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { toast } from "react-toastify";

export const FooterReadingIndex = (props) => {
  const {
    setIsOpenModalCreate,
    setIsModalOpenMCreate,
    isTabletOrMobile,
    setIsModalOpenIndexBar,
    setIsModalWriteIndex,
    hide,
  } = props;
  const currentPage = useSelector(currentPageIndexSelector);
  const [seriHoaDon, setSeriHoaDon] = useState([]);
  // const nhaMayId = sessionStorage.getItem("current_factory_id");
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dispatch = useDispatch();
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const soDoc = useSelector(btnClickTabReadingIndexSelector);
  const [form] = Form.useForm();
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.forEach((factory, index) => {
        factoryQueryString +=
          index === 0
            ? `nhaMayIds=${factory.nhaMayId}`
            : `&nhaMayIds=${factory.nhaMayId}`;
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    return factoryQueryString;
  };

  useEffect(() => {
    if (nhaMayId) {
      const queryString = createFilterQueryString();

      // Fetch danh muc seri hoa don
      getRequest(`danh-muc-seri-hoa-don/get-all?${queryString}`)
        .then((res) => {
          setSeriHoaDon(res);
        })
        .catch((error) => {
          // Handle error here
          console.error("Error fetching danh muc seri hoa don:", error);
        });
    }
  }, [nhaMayId]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("soDoc: ", soDoc);
  // handle -> Khóa sổ đọc
  const handleKhoaSoDoc = async () => {
    const soTrang = currentPage;
    const soLuong = 10;
    const data2 = { soTrang, soLuong, nhaMayId };
    const selectedSeriHoaDon = form.getFieldValue("seriHoaDon");
    console.log(selectedSeriHoaDon);
    if (soDoc.chotSo === false) {
      toast.error("Chốt sổ trước khi khóa!");
      dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
    } else {
      const key = soDoc.id;
      const id = selectedSeriHoaDon;
      const data = { key, id };
      await dispatch(fetchApiKhoaSoDoc(data));
      dispatch(getAllIndexVer2(data2));
      dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
    }
    setIsModalVisible(false);
  };

  // Hàm mở Modal
  // Hàm mở Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("Cancel");
  };

  // handle -> Khóa sổ đọc
  const handleMoKhoaSoDoc = async () => {
    const soTrang = currentPage;
    const soLuong = 10;
    const data2 = { soTrang, soLuong, nhaMayId };
    await dispatch(fetchApiMoKhoaSoDoc(soDoc.id));
    dispatch(getAllIndexVer2(data2));
    dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
  };

  // handle -> Chốt sổ
  const handleChotSoDoc = async () => {
    const soTrang = currentPage;
    const soLuong = 10;
    const data2 = { soTrang, soLuong, nhaMayId };
    const soDocChiSoId = soDoc.id;
    const isStatus = false;
    const data = { soDocChiSoId, isStatus };

    if (soDoc) {
      if (soDoc.chotSo === false) {
        data.isStatus = true;
      }
      if (soDoc.trangThaiKhoaSo === 1) {
        await dispatch(fetchApiChotSoDoc(data));
        dispatch(getAllIndexVer2(data2));
        dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
      } else {
        toast.error("Mở khóa trước khi hủy chốt");
        dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
      }
    }
  };

  // handle get list -> Ghi chỉ số
  const handleGetListGhiChiSo = () => {
    // dispatch(readingIndexQuery());
    setIsModalWriteIndex(true);
    hide();
  };

  const tabs = [
    {
      id: "1",
      label: <span onClick={() => setIsOpenModalCreate(true)}>Tạo sổ</span>,
      icon: <PlusCircleOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${1}`}
          onClick={() => {
            setIsOpenModalCreate(true);
            hide();
          }}
        >
          <PlusCircleOutlined /> <span>Tạo sổ</span>
        </div>
      ),
    },
    {
      id: "2",
      label: (
        <span onClick={() => setIsModalOpenMCreate(true)}>
          Tạo sổ đồng loạt
        </span>
      ),
      icon: <PlusCircleOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${2}`}
          onClick={() => {
            setIsModalOpenMCreate(true);
            hide();
          }}
        >
          <PlusCircleOutlined /> <span>Tạo sổ đồng loạt</span>
        </div>
      ),
    },
    {
      id: "3",
      label: <span onClick={() => setIsModalWriteIndex(true)}>Ghi chỉ số</span>,
      icon: <FundViewOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${3}`}
          onClick={handleGetListGhiChiSo}
        >
          <FundViewOutlined /> <span>Ghi chỉ số</span>
        </div>
      ),
    },
    {
      id: "4",
      label: <span>Khóa sổ</span>,
      icon: <CheckCircleOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${6} ${
            soDoc?.trangThaiKhoaSo === 1 ? "Đã chốt" : "huy-chot-so"
          } ${!soDoc && "disabled-btn"}`}
          onClick={() => {
            if(soDoc){
            if (soDoc?.trangThaiKhoaSo === 1) {
              showModal();
            } else {
              handleMoKhoaSoDoc();
            }
            }
          }}
        >
          {soDoc?.trangThaiKhoaSo === 1 || soDoc === null ? (
            <>
              <CheckCircleOutlined /> <span>Khóa sổ</span>
            </>
          ) : (
            <>
              <PlusCircleOutlined /> <span>Hủy khóa</span>
            </>
          )}
        </div>
      ),
    },
    
    // Và bên ngoài phần render, bạn có thể đặt Modal:

    // {
    //   id: "15",
    //   label: (
    //     <span
    //       // onClick={() => setIsModalOpenMCreate(true)}
    //     >
    //       Khóa sổ và tính tiền
    //     </span>
    //   ),
    //   icon: <KeyOutlined />,
    // },
    {
      id: "5",
      label: (
        <span
        // onClick={() => setIsModalOpenMCreate(true)}
        >
          Xóa sổ đọc
        </span>
      ),
      icon: <CloseCircleOutlined />,
      button: (
        <Popconfirm
          placement="top"
          title="Bạn có chắc chắn xóa sổ đọc này không?"
          onConfirm={() => {
            if (soDoc) {
              console.log(soDoc.id);
              dispatch(handleDeleteReadingIndex(soDoc.id));
            }
          }}
          // clas=` ${
          // !soDoc && "disabled-btn"
          disabled={!soDoc}
        >
          <div
            className={`tab-item-readingIndex tab-item-readingIndex-${5} ${
              !soDoc && "disabled-btn"
            }`}
          >
            <CloseCircleOutlined /> <span>Xóa sổ đọc</span>
          </div>
        </Popconfirm>
      ),
    },
    {
      id: "6",
      label: <span>Chốt sổ</span>,
      icon: <CheckCircleOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${6} ${
            soDoc?.chotSo === false ? "Đã chốt" : "huy-chot-so"
          } ${!soDoc && "disabled-btn"}`}
          onClick={() => {
            hide();
          }}
        >
          <Popconfirm
            placement="top"
            title={`Bạn có chắc chắn muốn ${
              soDoc?.chotSo === false ? "chốt" : "hủy"
            } sổ này không?`}
            onConfirm={handleChotSoDoc}
            disabled={!soDoc}
          >
            {soDoc?.chotSo === false || soDoc === null ? (
              <>
                <CheckCircleOutlined /> <span>Chốt sổ</span>
              </>
            ) : (
              <>
                <PlusCircleOutlined /> <span>Hủy chốt</span>
              </>
            )}
          </Popconfirm>
        </div>
      ),
    },
    // {
    //   id: "7",
    //   label: (
    //     <span
    //     // onClick={() => setIsModalOpenMCreate(true)}
    //     >
    //       Ngừng ghi chỉ số
    //     </span>
    //   ),
    //   icon: <SettingOutlined />,
    //   button: (
    //     <div
    //       className={`tab-item-readingIndex tab-item-readingIndex-${7}`}
    //       onClick={() => {
    //         // setIsModalOpenMCreate(true);
    //         hide();
    //       }}
    //     >
    //       <SettingOutlined /> <span>Ngừng ghi chỉ số</span>
    //     </div>
    //   ),
    // },
    // {
    //   id: "8",
    //   label: (
    //     <span
    //     // onClick={() => setIsModalOpenMCreate(true)}
    //     >
    //       Đồng bộ lại
    //     </span>
    //   ),
    //   icon: <EditOutlined />,
    //   button: (
    //     <div
    //       className={`tab-item-readingIndex tab-item-readingIndex-${8}`}
    //       // onClick={() => setIsModalOpenMCreate(true)}
    //     >
    //       <EditOutlined /> <span>Đồng bộ lại</span>
    //     </div>
    //   ),
    // },
    // {
    //   id: "9",
    //   label: (
    //     <span
    //     // onClick={() => setIsModalOpenMCreate(true)}
    //     >
    //       Tiện ích
    //     </span>
    //   ),
    //   icon: <MoreOutlined />,
    //   iconRight: <CaretDownOutlined />,
    //   button: (
    //     <div
    //       className={`tab-item-readingIndex tab-item-readingIndex-${9}`}
    //       // onClick={() => setIsModalOpenMCreate(true)}
    //     >
    //       <MoreOutlined /> <span>Tiện ích</span>
    //     </div>
    //   ),
    // },
    // {
    //   id: "10",
    //   label: <span onClick={() => setIsModalOpenIndexBar(true)}>Chỉ số</span>,
    //   icon: <BarChartOutlined />,
    //   button: (
    //     <div
    //       className={`tab-item-readingIndex tab-item-readingIndex-${10}`}
    //       onClick={() => setIsModalOpenIndexBar(true)}
    //     >
    //       <BarChartOutlined /> <span>Chỉ số</span>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <Tabs
        type={isTabletOrMobile ? "line" : "card"}
        tabPosition={isTabletOrMobile ? "left" : "top"}
        activeKey="0"
        items={tabs.map((_tab, index) => {
          return {
            label: (
              // <div
              //   className={`tab-item-readingIndex tab-item-readingIndex-${_tab.id}`}
              // >
              //   {_tab.icon} {_tab.label}
              // </div>
              <>{_tab.button}</>
            ),
            key: _tab.id,
            disabled:
            
              (soDoc === null && _tab.id === "6") ||
              (soDoc === null && _tab.id === "4")
                ? true
                : false,
          };
        })}
      />
      <Modal
        title={`Bạn có chắc chắn muốn ${
          soDoc?.trangThaiKhoaSo === 1 ? "khóa" : "hủy"
        } sổ này không?`}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={
          soDoc?.trangThaiKhoaSo === 1 ? handleKhoaSoDoc : handleMoKhoaSoDoc
        }
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ disabled: !soDoc }}
        cancelButtonProps={{ disabled: false }}
      >
        <Row>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form form={form}>
              <Form.Item name="seriHoaDon" label="Số hóa đơn">
                <Select
                  placeholder="Chọn kỳ ghi chỉ số"
                  style={{
                    width: "100%",
                  }}
                  options={seriHoaDon?.data?.data.map((item) => ({
                    value: item.id,
                    label: item.soHoaDon,
                  }))}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
