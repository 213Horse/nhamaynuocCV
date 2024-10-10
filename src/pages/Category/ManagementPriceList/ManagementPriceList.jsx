import React, { useEffect, useState } from "react";
import {
  btnClickTabListInvoicePrintSelector,
  btnClickGetFactoryIdSelector,
  fetchApiAllPriceObjectSelector,
} from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tooltip } from "antd";
import { fetchApiAllPriceObject } from "../../../redux/slices/priceObjectSlice/priceObjectSlice";
import moment from "moment";
import { RedoOutlined } from "@ant-design/icons";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import HeaderPriceObj from "../../../components/CategoryHeader/CategoryHeaderPriceObj";
import dayjs from "dayjs";

export default function ManagementPriceList() {
  const dispatch = useDispatch();
  const tabListPO = useSelector(btnClickTabListInvoicePrintSelector);
  const priceObject = useSelector(fetchApiAllPriceObjectSelector);

  const [searchQuery, setSearchQuery] = useState({
    text: "",
    date: "",
  });

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "Đối tượng giá",
      dataIndex: "keyIdDMPriceObject",
      key: "keyIdDMPriceObject",
    },
    {
      title: "Tên đối tượng giá",
      key: "mota",
      dataIndex: "mota",
      // width: 140,
      filteredValue: [searchQuery.text],
      onFilter: (value, record) => {
        return String(record.mota).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Phí VAT (%)",
      key: "vat",
      dataIndex: "vat",
      render: vat => vat * 100
    },
    {
      title: "Phí bảo vệ môi trường",
      key: "phiBvmt",
      dataIndex: "phiBvmt",
    },
  ];

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  
  useEffect(() => {
    if (nhaMayId) {
      console.log("Data nha may:", nhaMayId);
      const queryString = createFilterQueryString();
      dispatch(fetchApiAllPriceObject(queryString));
    }
  }, [nhaMayId]);

  useEffect(() => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleDateChange = (value, string) => {
    setSearchQuery((prev) => ({ ...prev, date: string }));
  };

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
        selectedRows[0]
      )
    );
  };

  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };
console.log("price", priceObject);
  return (
    <div className="management-price-subject-wrapper">
      <div className="management-price-subject-header">
        <HeaderPriceObj
          onSearchChange={handleSearchChange}
          onDateChange={handleDateChange}
        />
      </div>
      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1000 }}
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={priceObject.map((_priceObject, index) => ({
          id: _priceObject.id,
          index: index + 1,
          mota: _priceObject.danhSachDoiTuongGia.moTa, // sửa
          listPriceObjectId: _priceObject.listPriceObjectId,  
          keyIdDMPriceObject: _priceObject.danhSachDoiTuongGia.kyHieu, //sửa
          // ngayBatDau: _priceObject.ngayBatDau, //sửa
          // ngayKetThuc: _priceObject.ngayKetThuc, //sửa
          vat: _priceObject.vat,
          phiBvmt: _priceObject.phiBvmt,
          keyId: _priceObject.keyId,
          bvmt: _priceObject.bvmt,
          tinhTu: _priceObject.tinhTu,
          toiThieu: _priceObject.toiThieu,
          coToiThieu: _priceObject.coToiThieu,
          phiDuyTriId: _priceObject.phiDuyTriId,
          dtTinhGia: _priceObject.dtTinhGia,
          kieuTinh: _priceObject.kieuTinh,
          coPhiDuyTri: _priceObject.coPhiDuyTri,
          uuTienPhiDuyTri: _priceObject.uuTienPhiDuyTri,
          giaPhiDuyTri: _priceObject.giaPhiDuyTri,
          tieuThuMaxTinhPhiDuyTri: _priceObject.tieuThuMaxTinhPhiDuyTri,
          phanTramVATPhiDuyTri: _priceObject.phanTramVATPhiDuyTri,
          tongTienPhiDuyTriSauVAT: _priceObject.tongTienPhiDuyTriSauVAT,
          chiTietGias: _priceObject.chiTietGias,
        }))}
        onRow={(record, index) => {
          return {
            onClick: () => {
              dispatch(
                tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
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
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: tabListPO ? [tabListPO.index] : [],
        }}
      />
    </div>
    // <Table
    //   style={{ marginTop: "10px" }}
    //   size="small"
    //   bordered
    //   rowKey="index"
    //   scroll={{ x: 1000 }}
    //   columns={columns.map((column) => ({
    //     ...column,
    //     className: "cell-wrap",
    //   }))}
    //   dataSource={priceObject.map((_priceObject, index) => ({
    //     index: index + 1,
    //     mota: _priceObject.mota,
    //     listPriceObjectId: _priceObject.listPriceObjectId,
    //     keyIdDMPriceObject: _priceObject.keyIdDMPriceObject,
    //     ngayBatDau: moment(_priceObject.ngayBatDau).format("DD/MM/YYYY"),
    //     ngayKetThuc: moment(_priceObject.ngayKetThuc).format("DD/MM/YYYY"),
    //     vat: _priceObject.vat,
    //     phiBvmt: _priceObject.phiBvmt,
    //     keyId: _priceObject.keyId,
    //     bvmt: _priceObject.bvmt,
    //     tinhTu: _priceObject.tinhTu,
    //     toiThieu: _priceObject.toiThieu,
    //     coToiThieu: _priceObject.coToiThieu,
    //     phiDuyTriId: _priceObject.phiDuyTriId,
    //     dtTinhGia: _priceObject.dtTinhGia,
    //     kieuTinh: _priceObject.kieuTinh,
    //   }))}
    //   onRow={(record, index) => {
    //     return {
    //       onClick: () => {
    //         // clicked row to check radio
    //         dispatch(
    //           tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
    //             record
    //           )
    //         );
    //       },
    //     };
    //   }}
    //   rowSelection={{
    //     type: "radio",
    //     columnTitle: () => {
    //       return (
    //         <Tooltip title="Bỏ chọn hàng hiện tại.">
    //           <RedoOutlined
    //             className="icon-reset-rad-btn"
    //             onClick={handleUncheckRadio}
    //           />
    //         </Tooltip>
    //       );
    //     },
    //     onChange: (selectedRowKeys, selectedRows) =>
    //       handleRowSelection(selectedRowKeys, selectedRows),
    //     selectedRowKeys: tabListPO ? [tabListPO.index] : [],
    //   }}
    // />
    // </div>
  );
}
