import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  RetweetOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Col, Input, Row, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiAllFactorySelector } from "../../../../redux/selector";
import { fetchApiAllFactory } from "../../../../redux/slices/factorySlice/factorySlice";
import FactoryPopupAdd from "./FactoryPopupAdd";
import FactoryPopupDelete from "./FactoryPopupDelete";
import FactoryPopupUpdate from "./FactoryPopupUpdate";
import "./Factory.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
export default function FactoryTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const renderImage = (text, record, index) => {
    const baseUrl = "https://api-awa-v2.amazingtech.vn";
    const validUrl = baseUrl + text;
    return text ? (
      <img src={validUrl} alt="Image" onClick={() => {setCurrentImage(validUrl); setIsOpen(true);}} />
    ) : null;
  };
  const dispatch = useDispatch();
  const factories = useSelector(fetchApiAllFactorySelector); // get data from redux

  // Code default of antd table features ------------------
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  // ------------------------------------------------------

  const [listFactory, setListFactory] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  // Control modals ---------------------------------------
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  // ------------------------------------------------------

  useEffect(() => {
    dispatch(fetchApiAllFactory());
  }, []);

  useEffect(() => {
    var result = [];
    factories.forEach((factory, index) => {
      result.push({
        ...factory,
        key: index,
      });
    });
    setListFactory(result);
  }, [factories]);

  useEffect(() => {
    if (selectedRowKey != null) {
      console.log("selectedRowKey", selectedRowKey);
    }
  }, [selectedRowKey]);

  // Code default of antd table features ------------------
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  // ------------------------------------------------------

  // Radio button actions, config -------------------------
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      handleSelectRow(selectedRowKeys);
    },
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
  };

  const handleSelectRow = (row) => {
    if (typeof row === "object") {
      setSelectedRowKey(row);
    } else {
      setSelectedRowKey([row]);
    }
  };

  const handleUncheckRadio = () => {
    setSelectedRowKey(null);
  };
  // ------------------------------------------------------

  // congSuatThietKy: null
  // diaChi: "Nhà máy nước sạch Hiệp Hòa 1"
  // dienTichDat_m2: 100
  // dienTichNha_m2: 50
  // id: "1d6bc18f-c319-42a6-a6a0-d596483d90dd"
  // keyId: "NMNBHLC"
  // maNhaMay: ""
  // namVanHanh: 2017
  // namXayDung: 2015
  // phamViPhucVu: "500"
  // phanLoaiNhaMay: "Nước"
  // tenNhaMay: "Nhà máy nước sạch Hiệp Hòa 1"
  const columns = [
    {
      title: "#",
      render: (text, record) => record.key + 1,
    },
    {
      title: "Mã nhà máy",
      dataIndex: "keyId",
      key: "keyId",
    },
    {
      title: "Tên nhà máy",
      dataIndex: "tenNhaMay",
      key: "tenNhaMay",
      ...getColumnSearchProps("tenNhaMay"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
      ...getColumnSearchProps("diaChi"),
    },
    {
      title: "Diện tích đất (m2)",
      dataIndex: "dienTichDat_m2",
      key: "dienTichDat_m2",
    },
    {
      title: "Diện tích nhà (m2)",
      dataIndex: "dienTichNha_m2",
      key: "dienTichNha_m2",
    },
    {
      title: "Năm xây dựng",
      dataIndex: "namXayDung",
      key: "namXayDung",
    },
    {
      title: "Năm vận hành",
      dataIndex: "namVanHanh",
      key: "namVanHanh",
    },
    {
      title: "Phạm vi phục vụ (người)",
      dataIndex: "phamViPhucVu",
      key: "phamViPhucVu",
    },
    {
      title: "Công suất thiết kế (m3/ngày)",
      dataIndex: "congSuatThietKy",
      key: "congSuatThietKy",
    },
    {
      title: "Phân loại nhà máy",
      dataIndex: "phanLoaiNhaMay",
      key: "phanLoaiNhaMay",
    },
    {
      title: "Mã số thuế",
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: "TK ngân hàng",
      dataIndex: "taiKhoanNganHang",
      key: "taiKhoanNganHang",
    },
    {
      title: "Tên chủ TK",
      dataIndex: "chuTaiKhoanNganHang",
      key: "chuTaiKhoanNganHang",
    },
    {
      title: "Điện thoại",
      dataIndex: "dienThoai",
      key: "dienThoai",
    },
    {
      title: "Danh sách tọa độ",
      dataIndex: "danhSachToaDo",
      key: "danhSachToaDo",
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "tenNganHang",
      key: "tenNganHang",
      // hidden: true,
    },
    {
      title: "Tên giám đốc",
      dataIndex: "tenGiamDoc",
      key: "tenGiamDoc",
      // hidden: true,
    },
    {
      title: "Chi nhánh ngân hàng",
      dataIndex: "chiNhanhNganHang",
      key: "chiNhanhNganHang",
      // hidden: true,
    },
    {
      title: "Chữ ký",
      dataIndex: "imageChuKy",
      key: "imageChuKy",
      render: renderImage,
    },
  ];

  // style button
  const styleButton = {
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  };

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col>
          <Button
            style={styleButton}
            type="primary"
            onClick={() => dispatch(fetchApiAllFactory())}
          >
            <RetweetOutlined />
            Làm mới
          </Button>
        </Col>
        <Col>
          <Button
            style={styleButton}
            className="button-add"
            onClick={() => setIsOpenModalCreate(true)}
          >
            <PlusCircleOutlined />
            Thêm mới
          </Button>
        </Col>
        <Col>
          <Button
            style={{
              ...styleButton,
            }}
            className={
              selectedRowKey != null
                ? "button-update-nha-may"
                : "button-disable"
            }
            type="primary"
            onClick={() => {
              if (selectedRowKey != null) {
                setIsOpenModalUpdate(true);
              }
            }}
          >
            <EditOutlined />
            Sửa
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            danger
            className={selectedRowKey != null ? "" : "button-disable"}
            style={{
              backgroundColor: selectedRowKey != null ? "" : "gray",
              ...styleButton,
            }}
            onClick={() => {
              if (selectedRowKey != null) {
                console.log(selectedRowKey);
                setIsOpenModalDelete(true);
              }
            }}
          >
            <DeleteOutlined />
            Xóa
          </Button>
        </Col>
      </Row>
      {isOpen && (
        <Lightbox
          mainSrc={currentImage}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
      <br />
      <Row>
        <Table
          columns={columns.filter(column => !column.hidden)}
          dataSource={listFactory}
          scroll={{ x: 1300 }}
          size="small"
          style={{
            whiteSpace: "nowrap",
          }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: selectedRowKey,
            ...rowSelection,
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                handleSelectRow(record.key);
              },
            };
          }}
        />
      </Row>
      <Row>
        <FactoryPopupAdd
          isModalOpen={isOpenModalCreate}
          setIsModalOpen={setIsOpenModalCreate}
        />
        <FactoryPopupUpdate
          isModalOpen={isOpenModalUpdate}
          setIsModalOpen={setIsOpenModalUpdate}
          factory={listFactory[selectedRowKey]}
        />
        <FactoryPopupDelete
          isModalOpen={isOpenModalDelete}
          setIsModalOpen={setIsOpenModalDelete}
          factoryId={factories[selectedRowKey]?.keyId}
          handleUncheckRadio={handleUncheckRadio}
        />
      </Row>
    </>
  );
}
