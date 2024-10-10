import { Card, Col, Collapse, Row, Table, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByNhaMay } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import {
  btnClickGetFactoryIdSelector,
  filterClickSelector,
  getUserNhaMaySelector,
  idFilterSelector,
  listWorkStatistic,
  listWorkStatisticDetail,
  loadingSelector,
  nhaMayChangeSelector,
} from "../../redux/selector";
import FormSearchWorkStatistic from "../FormSearchReadingIndex/FormSearchWorkStatistic";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import dayjs from "dayjs";
import {
  fetchListWorkStatisticDetail,
  invoiceSlice,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import {
  setIdFilter,
  setLoading,
  setNhaMayChange,
} from "../../redux/slices/currentPageSlice/currentPageSlice";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet";

const { Meta } = Card;
const WorkStatistic = () => {
  const [sizes, setSizes] = useState([100, "12%", "auto"]);
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const userId = useSelector(idFilterSelector);
  const nhaMayId = sessionStorage.getItem("current_factory_id");
  const factoryId = useSelector(btnClickGetFactoryIdSelector);

  const canBoDocs = useSelector(getUserNhaMaySelector);
  const listSoDoc = useSelector(listWorkStatistic);
  const dsChiSoDongHoTuSoDoc = useSelector(listWorkStatisticDetail);
  const nhaMayChangeClick = useSelector(nhaMayChangeSelector);

  const createFilterQueryString2 = () => {
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

  const onSelectChange = (selectedKeys, row) => {
    setSelectedRowKeys(selectedKeys);
    dispatch(setLoading(true));
    const UserId = userId;
    const ThangTaoHoaDon = row[0].ngayThu;
    const nhaMayIds = factoryId;
    const values = { UserId, ThangTaoHoaDon, nhaMayIds };
    dispatch(fetchListWorkStatisticDetail(values))
      .unwrap()
      .then(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    const nhaMayId = createFilterQueryString2();
    dispatch(getUserByNhaMay(nhaMayId));
    dispatch(setNhaMayChange(0));
    dispatch(setIdFilter(null));
    dispatch(invoiceSlice.actions.resetWorkStatistics());
    handleUncheckRadio();
  }, [nhaMayChangeClick]);

  const click = useSelector(filterClickSelector);

  useEffect(() => {
    handleUncheckRadio();
  }, [click]);

  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormSearchWorkStatistic canBoDocs={canBoDocs} />,
    },
  ];

  const handleUncheckRadio = () => {
    setSelectedRowKeys([]);
    dispatch(invoiceSlice.actions.resetWorkStatistics2());
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "6%",
    },
    {
      key: "ngayThu",
      title: "Ngày thu",
      dataIndex: "ngayThu",
      sorter: (a, b) => {
        const dateA = new Date(a.ngayThu.split("/").reverse().join("/"));
        const dateB = new Date(b.ngayThu.split("/").reverse().join("/"));
        return dateA - dateB;
      },
      showSorterTooltip: false,
    },
    {
      key: "soHoDaThu",
      title: "Số hộ đã thu",
      dataIndex: "soHoDaThu",
    },
    {
      key: "tongSoHoTrongThang",
      title: "Tổng hộ trong tháng",
      dataIndex: "tongSoHoTrongThang",
    },
    {
      key: "tongTienHoaDon",
      title: "Tổng tiền hóa đơn",
      dataIndex: "tongTienHoaDon",
    },
    {
      key: "tongDoanhThuTrungThang",
      title: "Tổng doanh thu trong tháng",
      dataIndex: "tongDoanhThuTrungThang",
    },
    {
      key: "tongTieuThu",
      title: "Tổng tiêu thụ",
      dataIndex: "tongTieuThu",
    },
    {
      key: "tongTieuThuTrongThang",
      title: "Tổng tiêu thụ trong tháng",
      dataIndex: "tongTieuThuTrongThang",
    },
  ];

  const colsTableModal = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "ten",
      title: "Tên",
      dataIndex: "ten",
    },
    {
      key: "ngayThu",
      title: "Ngày thu",
      dataIndex: "ngayThu",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "soDienThoai",
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
    },
    {
      key: "soTien",
      title: "Số tiền",
      dataIndex: "soTien",
    },
  ];

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString("en-US");
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const calculateSum = () => {
    let sum = 0;
    listSoDoc.forEach((item) => {
      sum += item.tongTienHoaDon;
    });
    return sum;
  };
  return (
    <>
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
            columns={cols}
            bordered
            dataSource={
              listSoDoc && listSoDoc.length > 0
                ? listSoDoc.map((_customer, index) => ({
                    index: index + 1,
                    ngayThu: _customer.ngayThu,
                    soHoDaThu: formatNumberWithCommas(_customer.soHoDaThu),
                    tongSoHoTrongThang: formatNumberWithCommas(
                      _customer.tongSoHoTrongThang
                    ),
                    tongTienHoaDon: formatNumberWithCommas(
                      _customer.tongTienHoaDon
                    ),

                    tongDoanhThuTrungThang:
                      formatNumberWithCommas(_customer.tongDoanhThuTrungThang) +
                      " " +
                      "VNĐ",

                    tongTieuThu:
                      formatNumberWithCommas(_customer.tongTieuThu) + " ",
                    tongTieuThuTrongThang: formatNumberWithCommas(
                      _customer.tongTieuThuTrongThang
                    ),
                  }))
                : []
            }
            loading={loading}
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
                      onClick={handleUncheckRadio}
                    />
                  </Tooltip>
                );
              },
            }}
            scroll={{ x: 1000 }}
            //   x: 1200,
            //   y: 200,
            // }}
            pagination={false}
          ></Table>
        </Col>
        <Col span={isTabletOrMobile ? 24 : 12}>
          <Table
            columns={colsTableModal}
            loading={loading}
            dataSource={
              dsChiSoDongHoTuSoDoc && dsChiSoDongHoTuSoDoc.length > 0
                ? dsChiSoDongHoTuSoDoc.map((_customer, index) => ({
                    index: index + 1,
                    ngayThu: dayjs(_customer.ngayThu).format(
                      "DD/MM/YYYY HH:mm:ss"
                    ),
                    ten: _customer.tenHo,
                    diaChi: _customer.diaChi,
                    soDienThoai: _customer.soDienThoai,
                    soTien:
                      formatNumberWithCommas(_customer.soTien) + " " + "VND",
                  }))
                : []
            }
            rowKey="index"
            size="small"
            scroll={{ x: 1000 }}
            pagination={false}
          ></Table>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={6}>
          <Tooltip title="Tổng Doanh Thu Trong Tháng">
            <Card style={{ backgroundColor: "#D37676" }}>
              {listSoDoc && listSoDoc.length > 0
                ? formatNumberWithCommas(listSoDoc[0]?.tongDoanhThuTrungThang) +
                  " " +
                  "VNĐ"
                : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title="Tổng Tiêu Thụ Trong Tháng">
            <Card style={{ backgroundColor: "#9BB0C1" }}>
              {listSoDoc && listSoDoc.length > 0
                ? formatNumberWithCommas(listSoDoc[0]?.tongTieuThuTrongThang) +
                  " " +
                  "VNĐ"
                : ""}
            </Card>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title="Tổng Số Hộ Trong Tháng">
            <Card style={{ backgroundColor: "#C5EBAA"}}>
              {listSoDoc && listSoDoc.length > 0
                ? listSoDoc[0]?.tongSoHoTrongThang + " " + "Hộ"
                : ""}
            </Card>
          </Tooltip>
        </Col>

        <Col span={6}>
          <Tooltip title="Tổng Tiền Hóa Đơn">
            <Card
              style={{ backgroundColor: "#FFBE98" }}
            >
              {
                listSoDoc && listSoDoc.length > 0
                  ? formatNumberWithCommas(calculateSum()) + " " + "VNĐ"
                  : ""
              }
            </Card>
          </Tooltip>
        </Col>
      </Row>
    </>
  );
};

export default WorkStatistic;
