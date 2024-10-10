import React, { useEffect, useState } from "react";
import { Modal, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickTabListPriceObj,
  tabListPriceObjSlice,
} from "../../../../../redux/slices/tabListPriceObj/tabListPriceObjSlice";

import "./TablePriceList.css";
import { RedoOutlined } from "@ant-design/icons";

const priceListColumns = (showHeader) => [
  {
    key: showHeader ? "keyId" : "key",
    dataIndex: showHeader ? "keyId" : "key",
    align: "center",
    width: 140,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "danhSachDoiTuongGiaId",
    title: showHeader ? "" : "Đối tượng giá",
    dataIndex: "danhSachDoiTuongGiaId",
    width: 100,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "keyId",
    title: showHeader ? "" : "Tên đối tượng giá",
    dataIndex: "keyId",
    width: 140,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "ngayBatDau",
    title: showHeader ? "" : "Từ ngày",
    dataIndex: "ngayBatDau",
    width: 180,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "ngayKetThuc",
    title: showHeader ? "" : "Đến ngày",
    dataIndex: "ngayKetThuc",
    width: 130,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "vat",
    title: showHeader ? "" : "Thuế VAT(%)",
    dataIndex: "vat",
    width: 130,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    key: "phiBvmt",
    title: showHeader ? "" : "Phí bảo vệ môi trường",
    dataIndex: "phiBvmt",
    width: 130,
    ellipsis: {
      showTitle: false,
    },
  },
];

const TablePriceList = () => {
  const dispatch = useDispatch();
  const priceObject = useSelector((state) => state.priceObject);
  // const danhSachTuyenDoc = useSelector(
  //   (state) => state.tuyendoc.danhSachTuyenDoc
  // );
  const listAreas = useSelector((state) => state.areaSlice.data);
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );

  const handleUncheckRadio = () => {
    dispatch(tabListPriceObjSlice.actions.btnClickTabListPriceObj(null));
  };

  const data =
    priceObject &&
    priceObject.length > 0 &&
    priceObject.map((priceObject, i) => {
      let RouterPO;
      if (priceObject && priceObject.length > 0) {
        RouterPO = priceObject.filter((priceObject) => {
          return priceObject.nguoiQuanLyId === priceObject.id;
        });
      }

      const RouterPONew = RouterPO?.map((priceObj) => {
        let name = "";
        listAreas.forEach((area) => {
          if (priceObject.khuVucId === area.id) {
            name = area.tenKhuVuc;
          }
        });
        return { ...priceObject, name };
      });

      return {
        gmail: priceObject.email,
        key: priceObject.id,
        data:
          RouterPONew &&
          RouterPONew.length > 0 &&
          RouterPONew?.map((priceObject, i) => {
            return {
              key: i,
              index: i,
              KeyId: priceObject.keyId,
              danhSachDoiTuongGiaId: priceObject.danhSachDoiTuongGiaId,
              ngayBatDau: priceObject.ngayBatDau,
              ngayKetThuc: priceObject.ngayKetThuc,
              vat: priceObject.vat,
              phiBvmt: priceObject.phiBvmt,
            };
          }),
      };
    });

  return (
    <Table
      className="parent-table"
      columns={priceListColumns(true)}
      dataSource={data}
      scroll={{
        // y: 380,
        x: 1100,
        scrollToFirstRowOnChange: true,
      }}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <Table
              className="child-table"
              columns={priceListColumns(false).map((column) => ({
                ...column,
                render: (text) => (
                  <div
                    style={{ wordWrap: "break-word", wordBreak: "break-all" }}
                  >
                    {text}
                  </div>
                ),
              }))}
              dataSource={record.data}
              pagination={false}
              rowKey="index"
              scroll={{
                x: 1100,
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    dispatch(
                      tabListPriceObjSlice.actions.btnClickTabListPriceObj(
                        record
                      )
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
                selectedRowKeys: rowSelected ? [rowSelected.index] : [],
              }}
              bordered
            />
          );
        },
      }}
    />
  );
};

export default TablePriceList;
