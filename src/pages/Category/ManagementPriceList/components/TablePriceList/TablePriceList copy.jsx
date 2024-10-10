import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickTabListPriceObj,
  tabListPriceObjSlice,
} from "../../../../../redux/slices/tabListPriceObj/tabListPriceObjSlice";

import "./TablePriceList.css";

const priceListColumns = (showHeader) => [
  {
    key: showHeader ? "keyId" : "keyId",
    dataIndex: showHeader ? "keyId" : "keyId",
    width: 250,
    align: "center",
  },
  {
    key: "priceObject",
    title: showHeader ? "Đối tượng giá" : "",
    dataIndex: "priceObject",
    width: 150,
  },
  {
    key: "keyId",
    title: showHeader ? "Tên đối tượng giá" : "",
    dataIndex: "keyId",
    width: 220,

    filters: showHeader
      ? [
          {
            text: "Tăng dần",
            value: "ASC",
          },
          {
            text: "Giảm dần",
            value: "DESC",
          },
          {
            text: "Theo cột",
            value: "followColumns",
            children: [
              {
                text: "Đối tượng giá",
                value: "objectPrice",
              },
              {
                text: "Tên đối tượng giá",
                value: "keyId",
              },
              {
                text: "Từ ngày",
                value: "fromDate",
              },
              {
                text: "Đến ngày",
                value: "toDate",
              },
              {
                text: "Thuế VAT (%)",
                value: "taxVAT",
              },
              {
                text: "Phí bảo vệ môi trường",
                value: "feeProtectEnvironment",
              },
            ],
          },
          {
            text: "Group by the field",
            value: "groupByField",
            children: [],
          },
          {
            text: "Show in Groups",
            value: "showInGroups",
          },
        ]
      : null,
  },
  {
    key: "fromDate",
    title: showHeader ? "Từ ngày" : "",
    dataIndex: "fromDate",
    width: 110,
  },
  {
    key: "toDate",
    title: showHeader ? "Đến ngày" : "",
    dataIndex: "toDate",
    width: 110,
  },
  {
    key: "tax",
    title: showHeader ? "Thuế VAT (%)" : "",
    dataIndex: "tax",
    width: 130,
  },
  {
    key: "environmentFee",
    title: showHeader ? "Phí bảo vệ môi trường" : "",
    dataIndex: "environmentFee",
  },
];

const columnsDetailTable = [
  {
    key: "numericalOrder",
    title: "STT",
    dataIndex: "numericalOrder",
    width: 50,
    align: "center",
  },
  {
    key: "description",
    title: "Mô tả",
    dataIndex: "description",
    width: 80,
  },
  {
    key: "descriptionDetail",
    title: "Mô tả chi tiết",
    dataIndex: "descriptionDetail",
    width: 90,
  },
  {
    key: "fromNumber",
    title: "Từ số",
    dataIndex: "fromNumber",
    width: 40,
  },
  {
    key: "toNumber",
    title: "Đến số",
    dataIndex: "toNumber",
    width: 50,
  },
  {
    key: "priceVAT",
    title: "Giá có VAT",
    dataIndex: "priceVAT",
    width: 60,
  },
  {
    key: "price",
    title: "Giá",
    dataIndex: "price",
    width: 60,
  },
];

const TablePriceList = () => {
  const dispatch = useDispatch();
  const danhSachNguoiDung = useSelector(
    (state) => state.nguoidung.danhSachNguoiDung
  );
  const danhSachTuyenDoc = useSelector(
    (state) => state.tuyendoc.danhSachTuyenDoc
  );
  const listAreas = useSelector((state) => state.areaSlice.data);
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(btnClickTabListPriceObj(selectedRows[0]));
  };

  const handleUncheckRadio = () => {
    dispatch(tabListPriceObjSlice.actions.btnClickTabListReading(null));
  };

  const data =
    danhSachNguoiDung &&
    danhSachNguoiDung.length > 0 &&
    danhSachNguoiDung.map((nguoiDung, i) => {
      let tuyenDocNguoiDung;
      if (danhSachTuyenDoc && danhSachTuyenDoc.length > 0) {
        tuyenDocNguoiDung = danhSachTuyenDoc.filter((tuyenDoc) => {
          return tuyenDoc.nguoiQuanLyId === nguoiDung.id;
        });
      }

      const tuyenDocNguoiDungMoi = tuyenDocNguoiDung?.map((nguoiDung) => {
        let name = "";
        listAreas.forEach((area) => {
          if (nguoiDung.khuVucId === area.id) {
            name = area.tenKhuVuc;
          }
        });
        return { ...nguoiDung, name };
      });

      return {
        gmail: nguoiDung.email,
        key: nguoiDung.id,
        data:
          tuyenDocNguoiDungMoi &&
          tuyenDocNguoiDungMoi.length > 0 &&
          tuyenDocNguoiDungMoi?.map((tuyenDoc, i) => {
            // console.log({tuyenDoc});
            return {
              key: i,
              index: i,
              KeyId: tuyenDoc.keyId,
              tenTuyen: tuyenDoc.tenTuyen,
              nguoiThuTienId: tuyenDoc.nguoiThuTienId,
              nguoiQuanLyId: tuyenDoc.nguoiQuanLyId,
              // indexingPeriod: `Kỳ ghi ${i}`,
              tenKhuVuc: tuyenDoc.name,
              khuVucId: tuyenDoc.khuVucId,
              // unit: `Đơn vị ${i}`,
            };
          }),
      };
    });
  // const TablePriceList = ({ viewTableDetail }) => {
  //   const priceListData = [];
  //   for (let i = 0; i <= 10; i++) {
  //     priceListData.push({
  //       priceObjectTitle: `Tên đối tượng giá ${i} (bản ghi)`,
  //       key: i,
  //       data: [
  //         {
  //           key: i,
  //           numericalOrder: i + 1,
  //           priceObject: `Đối tượng giá ${i}`,
  //           namePriceObject: `Tên đối tượng giá ${i}`,
  //           fromDate: `Từ ngày ${i}`,
  //           toDate: `Đến ngày ${i}`,
  //           tax: `Thuế ${i}%`,
  //           environmentFee: `Phí bảo vệ môi trường ${i}%`,
  //         },
  //       ],
  //     });
  //   }

  // const priceListDataChildren = [];
  // for (let i = 0; i <= 10; i++) {
  //   priceListDataChildren.push({
  //     key: i,
  //     numericalOrder: i + 1,
  //     description: `Đối tượng giá ${i}`,
  //     descriptionDetail: `Tên đối tượng giá ${i}`,
  //     fromNumber: `${i}.00`,
  //     tonNumber: `-${i}.00`,
  //     priceVAT: `${i + 1}0000`,
  //     price: `${i + 1}0000`,
  //   });
  // }

  // const dispatch = useDispatch();
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const [openModalPriceDetail, setOpenModalPriceDetail] = useState(false);

  // const handleRowSelection = (selectedRowKeys, selectedRow) => {
  //   dispatch(btnClickTabListContract(selectedRow));
  // };
  // useEffect(() => {
  //   let unsubscribe = false;
  //   console.log(unsubscribe);

  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(unsubscribe);

  //       if (!unsubscribe) console.log(json);
  //     });

  //   return () => {
  //     console.log("unsubscribe");
  //     unsubscribe = true;
  //     console.log("153", unsubscribe);
  //   };
  // }, [tabList]);
  const paginationOptions = {
    defaultPageSize: 10,
    pageSizeOptions: ["10", "25", "50"],
    showSizeChanger: true,
  };

  const handleOpenDetail = () => {
    setOpenModalPriceDetail(true);
  };
  const handleCloseModalPriceDetail = () => {
    setOpenModalPriceDetail(false);
  };

  return (
    <div className="body-price-list">
      <div className="body-price-list-top-table">
        <Table
          className="table-list"
          columns={priceListColumns(true)}
          dataSource={data}
          // dataSource={priceListData}
          scroll={{
            y: 330,
            x: 1300,
            scrollToFirstRowOnChange: true,
          }}
          pagination={paginationOptions}
          // expandable={{
          //   expandedRowRender: (record) => {
          //     return (
          //       <Table
          //         className="child-table"
          //         columns={priceListColumns(false)}
          //         dataSource={record.data}
          //         pagination={false}
          //         rowKey="key"
          //         onRow={(record, rowIndex) => {
          //           return {
          //             onDoubleClick: (event) => {
          //               handleOpenDetail(event, record);
          //             }, // click row
          //           };
          //         }}
          //         rowSelection={{
          //           type: "radio",
          //           onChange: (selectedRowKeys, selectedRows) => {
          //             handleRowSelection(selectedRowKeys, selectedRows[0]);
          //           },
          //           selectedRowKeys: tabList ? [tabList.key] : [],
          //         }}
          //       />
          //     );
          //   },
          //   onExpand: (expanded, record) => {
          //     console.log(expanded, record);
          //   },
          // }}
        />
      </div>
      {/* <Modal
        title="Chi tiết đối tượng giá"
        open={openModalPriceDetail}
        onCancel={handleCloseModalPriceDetail}
        centered
        width={800}
        bodyStyle={{ height: "600px", overflow: "auto" }}
        footer={null}
      >
        <Table
          className="table-price-detail"
          columns={columnsDetailTable}
          dataSource={data}
          // dataSource={priceListDataChildren}
          scroll={{
            y: 450,
            x: 1000,
            scrollToFirstRowOnChange: true,
          }}
        />
      </Modal> */}
    </div>
  );
};

export default TablePriceList;
