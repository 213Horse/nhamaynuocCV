import { Col, Collapse, Row, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import FormSearchWriteIndex from "../FormSearchReadingIndex/FormSearchWriteIndex";
import { btnClickGetFactoryIdSelector, detailWriteIndex, listWriteIndex } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { getUserByNhaMay } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { RedoOutlined } from "@ant-design/icons";
import { fetchListWriteIndexDetail } from "../../redux/slices/invoiceSlice/invoiceSlice";
import dayjs from "dayjs";

const WriteIndex = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const listWrite = useSelector(listWriteIndex);
  const detailWrite = useSelector(detailWriteIndex);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormSearchWriteIndex setCurPage={setCurPage} setFilterData={setFilterData} />,
    },
  ];

  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "6%",
    },
    {
      key: "listNgayGhi",
      title: "Ngày ghi",
      dataIndex: "listNgayGhi",
      render:(record) => {
        return dayjs(record).format("DD/MM/YYYY")
      }
    },
    {
      key: "tongSoDongHoDaGhi",
      title: "Tổng số ĐH đã ghi",
      dataIndex: "tongSoDongHoDaGhi",
    },
    {
      key: "tongSoDongHoPhaiGhi",
      title: "Tổng số ĐH phải ghi",
      dataIndex: "tongSoDongHoPhaiGhi",
    },
    {
      key: "tongSoTieuThuDaGhi",
      title: "Tổng số tiêu thụ đã ghi",
      dataIndex: "tongSoTieuThuDaGhi",
    },
  ];

  const colsTableModal = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width:"6%"
    },
    {
      key: "ngayGhi",
      title: "Ngày ghi",
      dataIndex: "ngayGhi",
      width:"8%",
      render:(record) => {
        return dayjs(record).format("DD/MM/YYYY")
      }

    },
    {
      key: "dienThoai",
      title: "Điện thoại",
      dataIndex: "dienThoai",
      width:"8%",
    },
    {
      key: "tieuThu",
      title: "Tiêu thụ",
      dataIndex: "tieuThu",
      width:"8%",
    },
    {
      key: "soHo",
      title: "Số hộ",
      dataIndex: "soHo",
      width:"8%",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
  ];
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    const nhaMayId = createFilterQueryString();
    dispatch(getUserByNhaMay(nhaMayId));
  }, [factoryId]);

  // const onSelectChange = (selectedKeys, row) => {
  //   setSelectedRowKeys(selectedKeys);
  //   const date = dayjs(row[0].listNgayGhi).format("DD/MM/YYYY");
  //   const userId = filterData.userId
  //   const nhaMayIds = createFilterQueryString()
  //   const data = {date,userId,nhaMayIds}
  //   setCurPage(1)
  //   dispatch(fetchListWriteIndexDetail(data))
  //     .unwrap()
  //     .then(() => {
        
  //     });
  // };

  const onSelectChange = (selectedKeys, row) => {
    setSelectedRowKeys(selectedKeys);
    // dispatch(setLoading(true));
    const date = dayjs(row[0].listNgayGhi).format("DD/MM/YYYY");
    const UserId = filterData.userId;
    const nhaMayIds = factoryId;
    const values = { UserId, date, nhaMayIds };
    dispatch(fetchListWriteIndexDetail(values))
      .unwrap()
      .then(() => {
        // dispatch(setLoading(false));
      });
  };




  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
    <Collapse
        key="1"
        items={items}
        accordion={false}
        defaultActiveKey={["1"]}
        style={{ margin: "10px 50px" }}
        size="small"
        className="custom-collapse"
      />
      <Row gutter={24}>
        <Col span={isTabletOrMobile ? 24 : 12}>
          <Table
            id="table-contract"
            rowKey="index"
            size="small"
            dataSource={listWrite && listWrite.length > 0
                ? listWrite.map((_customer, index) => ({
                    index: index + 1,
                    tongSoDongHoDaGhi: _customer.tongSoDongHoDaGhi,
                    tongSoDongHoPhaiGhi: _customer.tongSoDongHoPhaiGhi,
                    tongSoTieuThuDaGhi: _customer.tongSoTieuThuDaGhi,
                    listNgayGhi: _customer.listNgayGhi,
                    
                  }))
                : []}
            columns={cols}
            bordered
            
            onRow={(record, index) => {
              return {
                onClick: () => {
                  const selectedKeys = [record.index];
                  onSelectChange(selectedKeys, [record]);
                },
              };
            }}
            rowSelection={{
              type: "radio",
              ...rowSelection,
              columnTitle: () => {
                return (
                  <Tooltip title="Làm mới">
                    <RedoOutlined
                      className="icon-reset-rad-btn"
                      // onClick={handleUncheckRadio}
                    />
                  </Tooltip>
                );
              },
            }}
            scroll={{
              x: 1200,
              y: 500,
            }}
           
          ></Table>
        </Col>
        <Col span={isTabletOrMobile ? 24 : 12}>
          <Table
            columns={colsTableModal}
            dataSource={detailWrite && detailWrite.length > 0
                ? detailWrite.map((_customer, index) => ({
                    index: index + 1,
                    diaChi: _customer.diaChi,
                    dienThoai: _customer.dienThoai,
                    tieuThu: _customer.tieuThu,
                    ngayGhi: _customer.ngayGhi,
                    soHo: _customer.soHo,
                    
                  }))
                : []}
            // loading={loading}
            rowKey="index"
            size="small"
            scroll={{
              x: 1200,
              y: 500,
            }}
            pagination={{
              current:curPage,
              onChange: (page, pageSize)=>{
                setCurPage(page)
              }
            }}
          ></Table>
        </Col>
      </Row>
    </div>
  );
};

export default WriteIndex;
