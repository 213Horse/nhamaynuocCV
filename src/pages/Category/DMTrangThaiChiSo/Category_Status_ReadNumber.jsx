/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Table, Form, Input, Col, Row, Tooltip, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";

import "./CSS_Category_Status_ReadNumber.css";
import HeaderActionButton from "./HeaderActionButton";
import { getAllDMTrangThaiChiSo } from "../../../redux/slices/DMTrangThaiChiSo/trangThaiChiSoSlice";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
} from "../../../redux/selector";

const Category_Status_ReadIndex = () => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const danhSachtrangThaiChiSo = useSelector(
    (state) => state.trangThaiChiSo.danhSachtrangThaiChiSo
  );
  const [textInput, setTextInput] = useState("");
  const [openPopover, setOpenPopover] = useState(false);
  const rowSelected = useSelector(btnClickTabListInvoicePrintSelector);
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      width: 70,
      onCell(text, record) {
        return {
          props: {
            style: {
              background: "#FF3333",
            },
            children: <div>{text}</div>,
          },
        };
      },
    },
    {
      title: "Mã trạng thái",
      dataIndex: "kyHieu",
      width: 200,
      filteredValue: [textInput],
      onFilter: (value, record) => {
        return String(record.kyHieu)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Tên trạng thái",
      dataIndex: "tenTrangThai",
      width: 170,
    },
    {
      title: "Mã màu",
      dataIndex: "maMau",
      width: 90,
    },
    {
      title: "Không cho phép ghi",
      dataIndex: "khongChoPhepGhi",
    },
    {
      title: "Không cho hiển thị",
      dataIndex: "khongChoHienThi",
    },
    {
      title: "Số TT",
      dataIndex: "soTt",
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "moTaNgan",
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
      dispatch(getAllDMTrangThaiChiSo(queryString));
      return () => {
        dispatch(
          tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
        );
      };
    }
  }, [nhaMayId]);

  console.log("danhSachtrangThaiChiSo", danhSachtrangThaiChiSo);
  const data =
    danhSachtrangThaiChiSo &&
    danhSachtrangThaiChiSo.length > 0 &&
    danhSachtrangThaiChiSo.map((item, index) => ({
      key: item.id,
      index: index + 1,
      KeyId: item?.keyId,
      kyHieu: item?.kyHieu,
      tenTrangThai: item?.tenTrangThai,
      maMau: item?.maMau,
      khongChoPhepGhi:
        item?.khongChoPhepGhi !== null
          ? item?.khongChoPhepGhi === true
            ? "Có"
            : "Không"
          : "",
      khongChoHienThi:
        item?.khongChoPhepHienThi !== null
          ? item?.khongChoPhepHienThi === true
            ? "Có"
            : "Không"
          : "",
      soTt: item?.soTt,
      moTaNgan: item?.moTaNgan,
    }));

  const rowClass = (record) => {
    return `color - ${record.maMau.replace("#", "")} `;
  };

  const handleUncheckRadio = () => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const renderCategoryAction = () => (
    <HeaderActionButton isTabletOrMobile={isTabletOrMobile} />
  );

  return (
    <>
      <Form labelCol={9}>
        <Row>
          <Col
            span={isTabletOrMobile ? 8 : 16}
            className="category-header-content"
          >
            {isTabletOrMobile ? (
              <Popover
                rootClassName="fix-popover-z-index"
                placement="bottomRight"
                trigger="click"
                open={openPopover}
                onOpenChange={handleOpenChange}
                content={renderCategoryAction()}
              >
                <PlusOutlined />
              </Popover>
            ) : (
              renderCategoryAction()
            )}
          </Col>

          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item lassName="custom-form-item" name="9">
              <Input.Search
                style={{
                  width: "100%",
                }}
                onSearch={(value) => setTextInput(value)}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Tìm kiếm mã trạng thái"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        className="my-table"
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1200 }}
        columns={columns.map((col) => ({ ...col, className: "cell-wrap" }))}
        dataSource={data}
        rowClassName={rowClass}
        onRow={(record, rowIndex) => ({
          style: {
            color: record.maMau,
          },
          onClick: () => {
            dispatch(
              tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                record
              )
            );
          },
        })}
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
      />
    </>
  );
};

export default Category_Status_ReadIndex;
