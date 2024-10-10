import React, { useState,useEffect } from "react";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RedoOutlined } from "@ant-design/icons";

import {
  btnClickTabListReading,
  tabListReadingSlice,
} from "../../../../../redux/slices/tabListReading/tabListReaingSlice";
import "./TableReading.css";
import { useQuery } from "@apollo/client";
import { GetUserQuery } from "../../../../../graphql/users/usersQuery";
import {
  fetchApiAllFactorySelector,
  getAllKySelector,btnClickGetFactoryIdSelector
} from "../../../../../redux/selector";
import { getAllTuyenDoc } from "../../../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { GetKyGhiChiSos } from "../../../../../graphql/ky/kyQuery";
import { fetchApiAllAreaByNhaMay } from "../../../../../redux/slices/areaSlice/areaSlice";

const parentColumns = [
  {
    title: "",
    key: "userName",
    dataIndex: "userName",
  },
];

const readingColumns = (showHeader) => [
  {
    title: "Stt",
    key: "key",
    dataIndex: "key",
    align: "center",
    width: 50,
  },
  {
    key: "keyId",
    title: "Mã tuyến",
    dataIndex: "keyId",
    width: 100,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "tenTuyen",
    title: "Tên tuyến",
    dataIndex: "tenTuyen",
    width: 140,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "nguoiThuTienId",
    title: "Nhân viên thu tiền",
    dataIndex: "nguoiThuTienId",
    width: 300,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "kyGhiChiSo",
    title: "Kỳ ghi chỉ số",
    dataIndex: "kyGhiChiSo",
    width: 180,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "tenKhuVuc",
    title: "Khu vực",
    dataIndex: "tenKhuVuc",
    width: 130,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "donVi",
    title: "Đơn vị",
    dataIndex: "donVi",
    ellipsis: {
      showTitle: false,
    },
  },
];



const TableReading = ({ searchQuery }) => {
  
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const [factoryIdArr, setFactoryIdArr] = useState("");

  const [pageCurrent, setPageCurrent] = useState(1);
  const dispatch = useDispatch();
  const listKy = useSelector(getAllKySelector);
  const danhSachNguoiDung = useSelector(
    (state) => state.nguoidung.danhSachNguoiDung
  );
  const danhSachTuyenDoc = useSelector(
    (state) => state.tuyendoc.listTuyenDoc
  );
  
  const factoryList = useSelector(fetchApiAllFactorySelector);
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );
  
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(btnClickTabListReading(selectedRows[0]));
  };

  const handleUncheckRadio = () => {
    dispatch(tabListReadingSlice.actions.btnClickTabListReading(null));
  };

  console.log("ds",danhSachTuyenDoc);
  const data = danhSachTuyenDoc?.items?.map((tuyenDocItem) => ({
    userName: tuyenDocItem?.name,
    key: tuyenDocItem?.userId,
    data: tuyenDocItem?.danhMucTuyenDocResponses?.map((subItem, i) => ({
      ...subItem,
      key: i + 1,
      keyId: subItem.keyId,
      tenTuyen: subItem.tenTuyen,
      nguoiThuTienId: subItem.listNhanVienThuTien?.map((nhanVien) => nhanVien.tenNhanVien)?.join(', '),
      nguoiQuanLyId: subItem.nguoiQuanLyId,
      tenKhuVuc: subItem.khuVucId,
      nguoiThuTien: danhSachNguoiDung?.find(
        (u) => u.id === subItem.nguoiThuTienId
      )?.userName,
      kyGhiChiSo: subItem.kyGhiChiSoId,
      donVi: factoryList?.find((f) => f.id === subItem?.nhaMayId)?.tenNhaMay,
    })),
  }));

  useEffect(() => {
    dispatch(fetchApiAllAreaByNhaMay(factoryId));
  }, [factoryId]);

  useEffect(() => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString +=`nhaMayIds=${factory.nhaMayId}&pageNumber=${pageCurrent}&pageSize=10`;
        } else {
          factoryQueryString +=`&nhaMayIds=${factory.nhaMayId}&pageNumber=${pageCurrent}&pageSize=10`;
        }
      });
    } else {
      
      factoryQueryString = `nhaMayIds=${factoryId}&pageNumber=${pageCurrent}&pageSize=10`;
    }
    console.log(factoryQueryString);
    setFactoryIdArr(factoryQueryString);
    console.log(pageCurrent);
    dispatch(getAllTuyenDoc(factoryQueryString))
  }, [factoryId]);

  return (
    <>{danhSachTuyenDoc &&   <Table
      showHeader={false}
      className="parent-table"
      columns={parentColumns}
      pagination={{total:danhSachTuyenDoc.totalPages,current: pageCurrent, pageSize:10,
        onChange(page) {
          setPageCurrent(page)
        },
      }}
      dataSource={data}
      size="small"
      scroll={{
        // y: 380,
        x: 1100,
        scrollToFirstRowOnChange: true,
      }}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <Table
              size="small"
              className="child-table"
              rowKey="keyId"
              columns={readingColumns(false).map((column) => {
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
                      style={{ wordWrap: "break-word", wordBreak: "break-all" }}
                    >
                      {text}
                    </div>
                  ),
                };
              })}
              dataSource={record.data}
              pagination={false}
              scroll={{
                x: 1100,
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    dispatch(
                      tabListReadingSlice.actions.btnClickTabListReading(record)
                    );
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
    }</>
  
  );
};

export default TableReading;
