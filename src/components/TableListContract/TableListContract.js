import {
  RedoOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { Pagination, Table, Tooltip } from "antd";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./TableListContract.css";
import tabListContractSlice from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import {
  btnClickTabListContractSelector,
  currentPageSelector,
  filterClickSelector,
  filterDataSelector,
  filterSelector,
  getListContractData,
  nhaMayChangeSelector,
  refreshSelector,
  refreshTableSelector,
} from "../../redux/selector";
import { fetchApiGetContract } from "../../redux/slices/contractSlice/contractSlice";
import RedirectBtn from "./RedirectBtn";
import {
  setClickFilter,
  setCurrentPage,
  setDataFilter,
  setFilter,
  setNhaMayChange,
  setRefreshTable,
  setRowSelect,
} from "../../redux/slices/currentPageSlice/currentPageSlice";

function TableListContract() {
  const currentPage = useSelector(currentPageSelector);
  const [sizes, setSizes] = useState([100, "6%", "auto"]);
  const dispatch = useDispatch();
  const tabList = useSelector(btnClickTabListContractSelector);
  const nhaMayId = sessionStorage.getItem("current_factory_id");

  // cols table main
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "6%",
    },
    {
      key: "loaiKhachHang",
      title: "Loại KH",
      dataIndex: "loaiKhachHang",
      width: "6%",
    },
    {
      key: "tenKhachHang",
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      width: "20%",
    },
    {
      key: "keyId",
      title: "Mã khách hàng",
      dataIndex: "keyId",
      width: "12%",
    },
    {
      key: "maKhachHangCu",
      title: "Mã khách hàng cũ",
      dataIndex: "maKhachHangCu",
      width: "12%",
    },
    {
      key: "dienThoai",
      title: "Điện thoại",
      dataIndex: "dienThoai",
      width: "10%",
    },
    {
      key: "diachi",
      title: "Địa chỉ KH",
      dataIndex: "diachi",
      width: "30%",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
  ];

  // cols table modal
  const colsTableModal = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "keyId",
      title: "Mã đồng hồ",
      dataIndex: "keyId",
    },
    {
      key: "showToMap",
      title: "",
      dataIndex: "showToMap",
    },
    {
      key: "trangThaiSuDung",
      title: "Tình trạng SD",
      dataIndex: "trangThaiSuDung",
    },
    {
      key: "chiSoDau",
      title: "Chỉ số đầu",
      dataIndex: "chiSoDau",
    },
    {
      key: "soThuTu",
      title: "Thứ tự ghi",
      dataIndex: "soThuTu",
    },
    {
      key: "seriDongHo",
      title: "Seri",
      dataIndex: "seriDongHo",
    },
    {
      key: "tuyenDoc",
      title: "Tuyến đọc",
      dataIndex: "tuyenDoc",
    },
    {
      key: "diaChi",
      title: "Địa chỉ sử dụng",
      dataIndex: "diaChi",
    },
    {
      key: "block_clock",
      title: "Đồng hồ khối",
      dataIndex: "block_clock",
    },
    {
      key: "type_clock",
      title: "Kiểu đồng hồ",
      dataIndex: "type_clock",
    },
    {
      key: "ngaySuDung",
      title: "Ngày sử dụng",
      dataIndex: "ngaySuDung",
    },
    {
      key: "ngayLapDat",
      title: "Ngày lắp đặt",
      dataIndex: "ngayLapDat",
    },
  ];

  const filter = useSelector(filterSelector);
  const getListOfCustomer = useSelector(getListContractData);
  const dataFilter = useSelector(filterDataSelector);
  const clickFilter = useSelector(filterClickSelector);
  const [loading, setLoading] = useState(true);
  const [dataSourceClock, setDataSourceClock] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const nhaMayChangeClick = useSelector(nhaMayChangeSelector);

  // handle un-check radio + reset table
  const handleUncheckRadio = () => {
    dispatch(tabListContractSlice.actions.btnClickTabListContract(null));
    setDataSourceClock(null);
    setSelectedRowKeys([]);
    dispatch(setRowSelect(null));
  };

  const onSelectChange = (selectedKeys, row) => {
    setSelectedRowKeys(selectedKeys);
    dispatch(setRowSelect(row[0]));
    dispatch(tabListContractSlice.actions.btnClickTabListContract(row[0]));
    setDataSourceClock(row[0]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (clickFilter === 1) {
      handleUncheckRadio();
      dispatch(setClickFilter(0));
    }
  }, [clickFilter]);

  const handlePageChange = (page) => {
    if (filter !== 1) {
      dispatch(setCurrentPage(page));
      const soTrang = page;
      const soLuong = 10;
      const data = { soTrang, soLuong, nhaMayId };
      handleUncheckRadio();
      setDataSourceClock(null);
      setLoading(true);
      dispatch(fetchApiGetContract(data))
        .unwrap()
        .then(() => {
          setLoading(false);
        });
    } else {
      dispatch(setCurrentPage(page));
      handleUncheckRadio();
      setDataSourceClock(null);
      setLoading(true);
      const newDataFilter = { ...dataFilter, soTrang: page };
      dispatch(fetchApiGetContract(newDataFilter))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
    }
  };

  // const goToLastPage = () => {
  //   dispatch(
  //     setCurrentPage(
  //       getListOfCustomer && getListOfCustomer[0]?.tongSoTrang
  //         ? getListOfCustomer[0]?.tongSoTrang
  //         : 1
  //     )
  //   );
  //   setDataSourceClock(null);
  //   handleUncheckRadio();
  // };

  // const goToFirstPage = () => {
  //   dispatch(setCurrentPage(1));
  //   setDataSourceClock(null);
  //   handleUncheckRadio();
  // };

  useEffect(() => {
    dispatch(setCurrentPage(1));
    handleUncheckRadio();
    dispatch(setDataFilter(null));
    dispatch(setFilter(0));
    dispatch(setNhaMayChange(0));
  }, [nhaMayId, nhaMayChangeClick]);

  const refresh = useSelector(refreshTableSelector);
  
  useEffect(() => {
    setLoading(true);
    const soTrang = currentPage;
    const soLuong = 10;
    const data = { soTrang, soLuong, nhaMayId };
    dispatch(fetchApiGetContract(data))
      .unwrap()
      .then(() => {
        setLoading(false);
        dispatch(setRefreshTable(false));
        handleUncheckRadio();
        setDataSourceClock(null);
      });
  }, [refresh]);

  useEffect(() => {
    if (filter !== 1) {
      const soTrang = currentPage;
      const soLuong = 10;
      const data = { soTrang, soLuong, nhaMayId };
      dispatch(fetchApiGetContract(data));
      setDataSourceClock(null);
    } else {
      const newDataFilter = {
        ...dataFilter,
        soTrang: currentPage,
        nhaMayId: nhaMayId,
      };
      dispatch(fetchApiGetContract(newDataFilter));
    }
    setLoading(false);
    handleUncheckRadio();
  // }, [nhaMayId, currentPage, filter, dispatch]);
}, [nhaMayId, dispatch]);
  // console.log("hopdong", getListOfCustomer);
  
  return (
    <>
      <div className="splitter-container">
        <SplitPane
          split="horizontal"
          sizes={sizes}
          onChange={(sizes) => setSizes(sizes)}
        >
          <div className="container-tbl-contract">
            <Table
              id="table-contract"
              rowKey="index"
              size="small"
              columns={cols}
              bordered
              dataSource={
                getListOfCustomer && getListOfCustomer.length > 0
                  ? getListOfCustomer.map((_customer, index) => ({
                      index: (currentPage - 1) * 10 + index + 1,
                      loaiKhachHang: _customer.loaiKhachHang,
                      tenKhachHang: _customer.tenKhachHang,
                      keyId: _customer.maKhachHang,
                      maKhachHangCu: _customer.maKhachHangCu,
                      dienThoai: _customer.dienThoai,
                      email: _customer.email,
                      nhaMayId: _customer.nhaMayId,
                      dongHo: _customer.dongHo,
                      maHopDong: _customer.maHopDong,
                      diachi: _customer.diaChiKH,
                    }))
                  : []
              }
              loading={loading}
              pagination={{
                position: ["none"],
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    const selectedKeys = [record.index];
                    onSelectChange(selectedKeys, [record]);
                  },
                  // onDoubleClick: () => {
                  // dispatch(fetchApiGetByIdCustomer(record?.keyId));
                  // // // get info customer -> load to fields
                  // dispatch(fetchApiGetWaterClock(record?.keyId));
                  // // when click row (table customer)
                  // dispatch(
                  //   fetchApiGetCustomerIdFromOptionFactory(record?.keyId)
                  // );
                  // console.log("record", record.keyId);
                  // dispatch(
                  //   tabListContractSlice.actions.btnClickTabListContract(
                  //     record
                  //   )
                  // );
                  // },
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
              scroll={{
                x: 1200,
                // y: 300,
              }}
            ></Table>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 8,
                marginRight: 20,
              }}
            >
              {/* <DoubleLeftOutlined
                className="ForwardIcon"
                onClick={goToFirstPage}
                size="small"
              /> */}
              <Pagination
                simple
                total={
                  getListOfCustomer && getListOfCustomer[0]?.tongSoTrang
                    ? getListOfCustomer[0]?.tongSoTrang * 10
                    : 1
                }
                onChange={(e) => handlePageChange(e)}
                current={currentPage}
              />
              {/* <DoubleRightOutlined
                className="ForwardIcon"
                size="small"
                onClick={goToLastPage}
              /> */}
            </div>
          </div>
          <div className="splitter-bottom">
            <div className="inner-modal-tbl-contract">
              <Table
                columns={colsTableModal}
                loading={loading}
                dataSource={
                  tabList
                    ? dataSourceClock?.dongHo?.map((_waterClock, index) => ({
                        index: index + 1,
                        keyId: _waterClock?.maDongHo,
                        showToMap: _waterClock?.trangThaiSuDung === 1 && (
                          <RedirectBtn
                            keyId={_waterClock?.maDongHo}
                            kinhDo={_waterClock?.kinhDo}
                            viDo={_waterClock?.viDo}
                          />
                        ),
                        trangThaiSuDung:
                          _waterClock?.trangThaiSuDung === 1 ? (
                            <p className="status-normal-water-clock">
                              Đang sử dụng
                            </p>
                          ) : _waterClock?.trangThaiSuDung === 2 ? (
                            <p className="status-cancel-water-clock">
                              Ngưng sử dụng
                            </p>
                          ) : (
                            <p className="status-cancel-water-clock">Hủy</p>
                          ),
                        chiSoDau: _waterClock?.chiSoDau,
                        soThuTu: _waterClock?.soThuTu,
                        seriDongHo: _waterClock?.seriDongHo,
                        tuyenDoc: _waterClock?.tuyenDoc,
                        diaChi: _waterClock?.diaChi,
                        // block_clock: _waterClock?.dongHoChaId,
                        // type_clock: _waterClock?.kieuDongHo,
                        ngaySuDung: dayjs(_waterClock?.ngaySuDung).format(
                          "DD-MM-YYYY"
                        ),
                        ngayLapDat: dayjs(
                          _waterClock?.ngayLapDat
                        ).format("DD-MM-YYYY"),
                      }))
                    : []
                }
                rowKey="index"
                size="small"
                pagination={{
                  pageSize: 10,
                }}
              ></Table>
            </div>
          </div>
        </SplitPane>
      </div>
    </>
  );
}

export default memo(TableListContract);
