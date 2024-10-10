import {
  CheckCircleOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  RetweetOutlined,
  CloseCircleOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tabs, message } from "antd";
import React, { useEffect } from "react";
import "./FooterReadingIndex.css";
import { useDispatch, useSelector } from "react-redux";
import readingIndexSlice, {
  fetchApiChotSoDoc,
  fetchApiKhoaSo,
  fetchApiMoKhoa,
  handleDeleteReadingIndex,
  readingIndexQuery,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import readingIndexTotalSlice, {
  fetchAllReadingIndexTotal,
} from "../../redux/slices/readingIndexTotalSlice/readingIndexTotalSlice";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabReadingIndexSelector,
} from "../../redux/selector";
import { toast } from "react-toastify";

export const FooterReadingIndexTong = (props) => {
  const dispatch = useDispatch();
  const {
    setIsModalOpenMCreate,
    isTabletOrMobile,
    hide,
    setCurrentPage,
    setIsModalWriteIndex,
  } = props;

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const soDoc = useSelector(btnClickTabReadingIndexSelector);

  // handle -> Chốt sổ

  console.log("soDoc", soDoc);
  const handleChotSoDoc = async () => {
    const soDocChiSoId = soDoc.id;
    const isStatus = false;
    const data = { soDocChiSoId, isStatus };
    if (soDoc) {
      if (soDoc.chotSo === false) {
        data.isStatus = true;
      }
      if (soDoc.trangThaiKhoaSo === 1) {
        await dispatch(fetchApiChotSoDoc(data));
        dispatch(fetchAllReadingIndexTotal({ nhaMayId, pageNumber: 1 }));
        dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
      } else {
        toast.error("Mở khóa trước khi hủy chốt");
        dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
      }
    }
  };
  const handleKhoaSo = async () => {
    if (soDoc) {
      if (soDoc.chotSo === false) {
        toast.error("Chốt sổ trước khi khóa!");
        dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
      } else {
        await dispatch(fetchApiKhoaSo(soDoc.id));
        dispatch(fetchAllReadingIndexTotal({ nhaMayId, pageNumber: 1 }));
        dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
      }
    }
  };

  const handleMoKhoaSo = async () => {
    if (soDoc) {
      await dispatch(fetchApiMoKhoa(soDoc.id));
      dispatch(fetchAllReadingIndexTotal({ nhaMayId, pageNumber: 1 }));
      dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
    }
  };
  console.log("sodoc", soDoc);

  const handleGetListGhiChiSo = () => {
    // dispatch(readingIndexQuery());
    setIsModalWriteIndex(true);
    hide();
  };
  const tabs = [
    {
      id: "0",
      label: <span>Làm mới</span>,
      icon: <RetweetOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${7}`}
          onClick={() => {
            dispatch(fetchAllReadingIndexTotal({ nhaMayId, pageNumber: 1 }));
            hide();
            setCurrentPage(1);
            dispatch(readingIndexTotalSlice.actions.btnClickClearFilter());
            message.success("Làm mới thành công");
          }}
        >
          <RetweetOutlined /> <span>Làm mới</span>
        </div>
      ),
    },
    {
      id: "1",
      label: <span onClick={() => setIsModalOpenMCreate(true)}>Tạo sổ</span>,
      icon: <PlusCircleOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${1}`}
          onClick={() => {
            setIsModalOpenMCreate(true);
            hide();
          }}
        >
          <PlusCircleOutlined /> <span>Tạo sổ</span>
        </div>
      ),
    },
    {
      id: "2",
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
      id: "3",
      label: <span>Khóa sổ</span>,
      icon: <CheckCircleOutlined />,
      button: (
        <div
          className={`tab-item-readingIndex tab-item-readingIndex-${4} ${
            soDoc?.chotSo === "Đã chốt" && "huy-chot-so"
          } ${!soDoc && "disabled-btn"}`}
          onClick={() => {
            hide();
          }}
        >
          <Popconfirm
            placement="top"
            title={`Bạn có chắc chắn muốn ${
              soDoc?.trangThaiKhoaSo === 1 ? "khóa" : "hủy"
            } sổ này không?`}
            onConfirm={
              soDoc?.trangThaiKhoaSo === 1 ? handleKhoaSo : handleMoKhoaSo
            }
            disabled={!soDoc}
          >
            {soDoc?.trangThaiKhoaSo === 1 || soDoc == null ? (
              <>
                <CheckCircleOutlined /> <span>Khóa sổ</span>
              </>
            ) : (
              <>
                <PlusCircleOutlined /> <span>Hủy khóa</span>
              </>
            )}
          </Popconfirm>
        </div>
      ),
    },
    {
      id: "4",
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
              console.log("click delete", soDoc);
              dispatch(handleDeleteReadingIndex(soDoc.id));
            }
          }}
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
      id: "5",
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
    //   id: "6",
    //   label: <span>Ngừng ghi chỉ số</span>,
    //   icon: <SettingOutlined />,
    //   button: (
    //     <div
    //       className={`tab-item-readingIndex tab-item-readingIndex-${7}`}
    //       onClick={() => {
    //         hide();
    //       }}
    //     >
    //       <SettingOutlined /> <span>Ngừng ghi chỉ số</span>
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
            label: <>{_tab.button}</>,
            key: _tab.id,
          };
        })}
      />
    </>
  );
};
