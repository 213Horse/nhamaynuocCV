import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import {
  btnClickTabListReading,
  tabListReadingSlice,
} from "../../../redux/slices/tabListReading/tabListReaingSlice";
import "./TableBlockClock.css";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  getAllBlockClockSelector,
} from "../../../redux/selector";
import { getAllDMTuyenDoc } from "../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import {
  LOAD_TUYEN_DOC,
  LOAD_TUYEN_DOC_BY_NHA_MAY_ID,
} from "../../../graphql/reading/queries";
import { useQuery } from "@apollo/client";
import moment from "moment";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import AddBlockClock from "../FormBlockClock/AddBlockClock";
import EditBlockClock from "../FormBlockClock/EditBlockClock";
import { countBy } from "lodash";
import { getAllBlockClock } from "../../../redux/slices/blockSlice/blockSlice";

const TableBlockClock = ({ searchQuery }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalAddBlock, setAddBlock] = useState(false);
  const [modalEditBlock, setEditBlock] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [edit, setEdit] = useState(true);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const nhaMayId = sessionStorage.getItem("current_factory_id");
  const { data: tuyenDocs, error } = useQuery(LOAD_TUYEN_DOC);
  const staffs = useSelector((state) => state?.nguoidung?.danhSachNguoiDung);
  const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);

  const blockColumns = (showHeader) => [
    {
      title: "Stt",
      key: "key",
      dataIndex: "key",
      align: "center",
      width: 50,
    },
    {
      title: "Mã block",
      dataIndex: "keyId",
      key: "keyId",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => (
        <>
          <SnippetsOutlined />
          {text}
        </>
      ),
    },
    {
      title: "Tên block",
      dataIndex: "tenDongHo",
      key: "tenDongHo",

      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",

      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThaiSuDung",
      key: "trangThaiSuDung",
      ellipsis: {
        showTitle: false,
      },
     
    },
    {
      title: "Nhân viên",
      dataIndex: "nguoiQuanLyId",
      key: "nguoiQuanLyId",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        const nguoiQuanLy = staffs?.find((nguoi) => nguoi?.id === text);
        return nguoiQuanLy ? nguoiQuanLy?.userName : text;
      },
    },
    {
      title: "Seri",
      dataIndex: "seriDongHo",
      key: "seriDongHo",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngaySuDung",
      key: "ngaySuDung",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Ngày kiểm định",
      dataIndex: "ngayKiemDinh",
      key: "ngayKiemDinh",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Hiệu lực kiểm định",
      dataIndex: "hieuLucKD",
      key: "hieuLucKD",
      ellipsis: {
        showTitle: false,
      },
    },
  ];

  const parentColumns = [
    {
      title: "",
      key: "tenTuyen",
      dataIndex: "tenTuyen",
      render: (text, record) => {
        const tuyenDoc = blockClockList?.find(
          (tuyenDoc) => tuyenDoc.tenTuyen === text
        );
        return tuyenDoc ? (
          <div>
            <p>{text}</p>
          </div>
        ) : (
          []
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const blockClockList = useSelector(getAllBlockClockSelector);

  useEffect(() => {
    dispatch(getAllBlockClock(nhaMayId));
  }, [nhaMayId]);

  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(btnClickTabListReading(selectedRows[0]));
    setSelectedRow(selectedRows[0]);
  };
  const handleUncheckRadio = () => {
    dispatch(btnClickTabListReading(null));
    setSelectedRow(null);
  };

  const hideModal = () => {
    setOpenModal(false);
    setAddBlock(false);
    setEditBlock(false);
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const data = blockClockList?.map((blockItem, i) => {
    return {
      key: i + 1,
      tuyenDocId: blockItem.dongHoBlock.tuyenDocId,
      tenTuyen: blockItem.tenTuyen,
      maBlock: blockItem.dongHoBlock.keyId,
      tenDongHo: blockItem.dongHoBlock.tenDongHo,
      trangThaiSuDung: blockItem.dongHoBlock.trangThaiSuDung ,
      nguoiQuanLyId: blockItem.dongHoBlock.tenNguoiQuanLy,
      seriDongHo: blockItem.dongHoBlock.seriDongHo,
      ngayBatDau: blockItem.dongHoBlock.ngayBatDau,
      ngayKetThuc: blockItem.dongHoBlock.ngayKetThuc,
      ngayKiemDinh: blockItem.dongHoBlock.ngayKiemDinh,
      hieuLucKD: blockItem.dongHoBlock.hieuLucKD,
    };
  });

  console.log("baasd", blockClockList);

  return (
    <>
      <Table
        showHeader={false}
        className="parent-table"
        columns={parentColumns}
        dataSource={data}
        size="small"
        scroll={{
          x: 800,
          scrollToFirstRowOnChange: true,
        }}
        expandable={{
          expandedRowRender: (record) => {
            const dongHoBlock = blockClockList.map((item) => item.dongHoBlock);
            const childData = dongHoBlock
              ?.filter(
                (blockItem) => blockItem.tuyenDocId === record.tuyenDocId
              )
              .map((blockItem, i) => {
                const nguoiQuanLy = staffs?.find(
                  (nguoi) => nguoi?.id === blockItem?.nguoiQuanLyId
                );
                return {
                  tuyenDocId: blockItem?.tuyenDocId,
                  id: blockItem?.id,
                  keyId: blockItem?.keyId,
                  tuyenDoc: blockItem?.tuyenDoc,
                  tenDongHo: blockItem?.tenDongHo,
                  diaChi: blockItem?.diaChi,
                  seriDongHo: blockItem?.seriDongHo,
                  lyDoThay: blockItem?.lyDoThay,
                  lyDoHuy: blockItem?.lyDoHuy,
                  chiSoDau: blockItem?.chiSoDau,
                  chiSoCuoi: blockItem?.chiSoCuoi,
                  maDHThay: blockItem?.maDHThay,
                  nguoiThay: blockItem?.nguoiThay,
                  soPhieuThay: blockItem?.soPhieuThay,
                  kinhDo: blockItem?.kinhDo,
                  viDo: blockItem?.viDo,
                  nguoiQuanLyId: blockItem?.tenNguoiQuanLy,
                  nql: blockItem?.nguoiQuanLyId,
                  khuVuc: blockItem?.khuVuc,
                  trangThaiSuDung: blockItem?.trangThaiSuDung === 1 ? "Đang sử dụng" : blockItem?.trangThaiSuDung === 2 ? "Ngưng sử dụng" : "Hủy",
                  ttsd: blockItem?.trangThaiSuDung,
                  viTriLapDat: blockItem?.viTriLapDat,
                  hangSXId: blockItem?.hangSXId,
                  hinhThucXL: blockItem?.hinhThucXL,
                  ngaySuDung:
                    blockItem.ngaySuDung !== null
                      ? moment(blockItem.ngaySuDung).format("DD/MM/YYYY")
                      : null,
                  ngayKetThuc:
                    blockItem.ngayKetThuc !== null
                      ? moment(blockItem.ngayKetThuc).format("DD/MM/YYYY")
                      : null,
                  hieuLucKD:
                    blockItem.hieuLucKD !== null
                      ? moment(blockItem.hieuLucKD).format("DD/MM/YYYY")
                      : null,
                  ngayKiemDinh:
                    blockItem.ngayKiemDinh !== null
                      ? moment(blockItem.ngayKiemDinh).format("DD/MM/YYYY")
                      : null,
                };
              });
            return (
              <Table
                size="small"
                className="child-table"
                rowKey="keyId"
                columns={blockColumns(false).map((column) => {
                  if (column?.key === "keyId") {
                    column.filteredValue = [searchQuery];
                    column.onFilter = (value, record) => {
                      return String(record.keyId)
                        .toLowerCase()
                        .includes(value.toLowerCase());
                    };
                  }
                  return {
                    ...column,
                    render: (text) => (
                      <div
                        style={{
                          wordWrap: "break-word",
                          wordBreak: "break-all",
                        }}
                      >
                        {text}
                      </div>
                    ),
                  };
                })}
                dataSource={childData}
                pagination={false}
                scroll={{
                  x: 2000,
                }}
                onRow={(record, index) => {
                  return {
                    onClick: () => {
                      dispatch(
                        tabListReadingSlice.actions.btnClickTabListReading(
                          record
                        )
                      );
                      setSelectedRow(record);
                      console.log("selected:", record);
                    },
                  };
                }}
                rowSelection={{
                  type: "radio",
                  columnTitle: () => {
                    return (
                      <Tooltip title="Bỏ chọn hàng hiện tại.">
                        <RedoOutlined
                          className="icon-reset-rad-btn"
                          onClick={handleUncheckRadio}
                        />
                      </Tooltip>
                    );
                  },
                  onChange: (selectedRowKeys, selectedRows) =>
                    handleRowSelection(selectedRowKeys, selectedRows),
                  selectedRowKeys: rowSelected ? [rowSelected?.keyId] : [],
                }}
                bordered
              />
            );
          },
        }}
      />
      <Modal
        open={modalAddBlock ? modalAddBlock : openModal}
        onCancel={hideModal}
        width={1100}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm đồng hồ vào block</h2>

        <AddBlockClock
          tabListbc={tabListbc}
          hideModal={hideModal}
          tuyenDocs={tuyenDocs}
        />
      </Modal>
      {/* Modal ( In Sửa Block) */}
      <Modal
        open={modalEditBlock ? modalEditBlock : openModal}
        onCancel={hideModal}
        width={1100}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Cập nhật thông tin block</h2>

        <EditBlockClock tabListbc={tabListbc} hideModal={hideModal} />
      </Modal>
    </>
  );
};

export default TableBlockClock;
