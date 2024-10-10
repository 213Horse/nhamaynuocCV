import { Collapse, Pagination, Popover, Table, theme, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { CreateBook } from "./CreateBook/CreateBook";
import { CreateMultipleBook } from "./CreateMultipleBook/CreateMultipleBook";
import { AdvancedSearchForm as FormSearchReadingIndex } from "../../components/FormSearchReadingIndex/FormSearchReadingIndex";
import { FooterReadingIndex } from "../../components/Footer/FooterReadingIndex";
import { useMediaQuery } from "react-responsive";
import {
  CloseCircleOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  PlusOutlined,
  SettingOutlined,
  LockOutlined,
  UnlockOutlined,
  RedoOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { ModalIndexBar } from "./ModalIndexBar/ModalIndexBar";
import "./ReadingIndex.css";
import { WriteIndexModal } from "./WriteIndex/WriteIndexModal";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickFilterSoDocSelector,
  btnClickGetFactoryIdSelector,
  btnClickTabReadingIndexSelector,
  currentPageIndexSelector,
  filterDataIndexSelector,
  filterIndexSelector,
  getAllSoDocSelector,
  getListSoDocChiSo,
  getQueryReadingIndexList,
  getSelectLineReadingOptions,
  getTuyenDocByNhaMaySelector,
  isLoadingDsSoDocSelector,
  isLoadingGetListSoDocTheoNhaMaySelector,
  nhaMayChangeSelector,
} from "../../redux/selector";
import readingIndexSlice, {
  fetchApiFilterSoDoc,
  fetchApiFilterSoDocBinhThuong,
  fetchApiGetListSoDocTheoNhaMay,
  fetchApiGetListTuyenDocChuaTaoSo,
  fetchApiGetNgayTrongSoDocTheoKy,
  readingIndexQuery,
  getAllIndexVer2,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useQuery } from "@apollo/client";
import {
  GetKhuVucQuery,
  GetKyGhiChiSoQuery,
  GetTuyenDocQuery,
} from "../../graphql/readingIndex/readingIndexQuery";
import moment from "moment";
import { LOAD_ALL_CAN_BO_DOC } from "../../graphql/users/usersQuery";
import { fetchSelectLineReadingOptions } from "../../redux/slices/paymentSlice/paymentSlice";
import { getRequest } from "../../services";
import { fetchTuyenDocByNhaMay } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import {
  setClickFilter,
  setCurrentPage,
  setCurrentPageIndex,
  setDataFilter,
  setDataFilterIndex,
  setFilter,
  setFilterIndex,
  setNhaMayChange,
} from "../../redux/slices/currentPageSlice/currentPageSlice";

const ReadingIndex = () => {
  const pageSize = 10;

  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isModalOpenMCreate, setIsModalOpenMCreate] = useState(false);
  const [isModalOpenIndexBar, setIsModalOpenIndexBar] = useState(false);
  const tabListReadingIndex = useSelector(btnClickTabReadingIndexSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isModalWriteIndex, setIsModalWriteIndex] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);

  const listData = useSelector(getListSoDocChiSo);
  const nhaMayId = sessionStorage.getItem("current_factory_id");
  const queryReadingIndexList = useSelector(getQueryReadingIndexList);
  const isLoading = useSelector(isLoadingDsSoDocSelector);
  const isLoadingSoTheoNhaMay = useSelector(
    isLoadingGetListSoDocTheoNhaMaySelector
  );

  const selectLineReadingOptionsSelector = useSelector(
    getSelectLineReadingOptions
  );

  const { data: listKGCS } = useQuery(GetKyGhiChiSoQuery);
  const { data: listTuyenDoc } = useQuery(GetTuyenDocQuery);
  const { data: listKhuVuc } = useQuery(GetKhuVucQuery);
  const { data: canBoDocs } = useQuery(LOAD_ALL_CAN_BO_DOC, {
    variables: {
      first: 100,
      roleCanBo: "Cán bộ đọc",
    },
  });

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

    dispatch(
      readingIndexSlice.actions.setQueryReadingIndexList(
        `${factoryQueryString}&pageSize=10&pageNumber=1`
      )
    );
    console.log(`${factoryQueryString}&pageSize=10&pageNumber=1`);
    return `${factoryQueryString}&pageSize=10&pageNumber=1`;
  };
  const handleOk = (_, type) => {
    setIsOpenModalCreate(false);
    // if (type === "multiple") {
    setIsModalOpenMCreate(false);
    // }
    if (type === "indexBar") {
      setIsModalOpenIndexBar(false);
    }
  };
  const handleCancel = (_, type) => {
    setIsOpenModalCreate(false);
    // if (type === "multiple") {
    setIsModalOpenMCreate(false);
    dispatch(setDataFilter(null));
    dispatch(setClickFilter(0));
    dispatch(setFilter(0));
    dispatch(setCurrentPage(1));
    // }
    if (type === "indexBar") {
      setIsModalOpenIndexBar(false);
    }

    dispatch(readingIndexSlice.actions.setOptionThangNam(null));
    dispatch(
      fetchApiGetNgayTrongSoDocTheoKy({
        value: null,
        optionThangNam: null,
      })
    );
    dispatch(
      fetchApiGetListTuyenDocChuaTaoSo({
        values: null,
        nhaMayId: null,
      })
    );
    dispatch(
      fetchApiFilterSoDocBinhThuong({
        values: null,
        nhaMayId: null,
      })
    );
  };

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      readingIndexSlice.actions.btnClickTabReadingIndex(selectedRows[0])
    );
  };


  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width:"3%"
    },
    {
      title: "",
      dataIndex: "trangThaiKhoaSo",
      key: "trangThaiKhoaSo",
      align: "center",
      width:"5%",
      render: (record) => {
        console.log("record", record);
        if (record === 1) {
          return <UnlockOutlined style={{ color: "blue" }} />;
        } else {
          return <LockOutlined style={{ color: "red" }} />;
        }
      },
    },
    {
      title: "Chốt sổ",
      dataIndex: "chotSo",
      key: "chotSo",
      width:"5%",
      render: (record) => {
        if (record === false) {
          return <p style={{ color: "blue" }}>Chưa chốt</p>;
        } else {
          return <p style={{ color: "red" }}>Đã chốt</p>;
        }
      },
    },
    {
      title: "Tuyến đọc",
      dataIndex: "tuyenDoc",
      key: "tuyenDoc",
      
    },
    {
      title: "Cán bộ đọc",
      dataIndex: "canBoDoc",
      key: "canBoDoc",

    },
    {
      title: "Tên sổ",
      dataIndex: "tenSo",
      key: "tenSo",
      width:500,
 
    },
    {
      title: "Sổ chưa ghi",
      dataIndex: "soChiSoDongHoChuaGhi",
      key: "soChiSoDongHoChuaGhi",
      width:"5%",
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width:"5%",
    },
    {
      title: "Ngày chốt",
      dataIndex: "ngayChot",
      key: "ngayChot",
      width:"10%",
    },
    {
      title: "Hóa đơn",
      dataIndex: "hoaDon",
      key: "hoaDon",

    },
    // {
    //   title: "",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const renderFooter = () => (
    <FooterReadingIndex
      setIsOpenModalCreate={setIsOpenModalCreate}
      setIsModalOpenMCreate={setIsModalOpenMCreate}
      isTabletOrMobile={isTabletOrMobile}
      setIsModalOpenIndexBar={setIsModalOpenIndexBar}
      setIsModalWriteIndex={setIsModalWriteIndex}
      hide={hide}
    />
  );
  const filter = useSelector(filterIndexSelector);
  const dataFilter = useSelector(filterDataIndexSelector);
  const currentPage = useSelector(currentPageIndexSelector);

  const handleUncheckRadio = () => {
    const soTrang = currentPage;
    const soLuong = 10;
    const data = { soTrang, soLuong, nhaMayId };
    nhaMayId && dispatch(getAllIndexVer2(data));

    dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
    dispatch(readingIndexSlice.actions.btnClickFilterSoDoc("UN_FILTER"));
  };

  const handlePageChange = (page) => {
    if (filter !== 1) {
      dispatch(setCurrentPageIndex(page));
      const soTrang = page;
      const soLuong = 10;
      const data = { soTrang, soLuong, nhaMayId };
      handleUncheckRadio();
      dispatch(getAllIndexVer2(data));
    } else {
      dispatch(setCurrentPageIndex(page));
      handleUncheckRadio();
      const newDataFilter = { ...dataFilter, soTrang: page };
      dispatch(getAllIndexVer2(newDataFilter));
    }
  };

  const listSoDoc = useSelector(getAllSoDocSelector);

  const goToLastPage = () => {
    setCurrentPageIndex(
      listSoDoc && listSoDoc[0]?.tongSoTrang ? listSoDoc[0]?.tongSoTrang : 1
    );
    handleUncheckRadio();
  };
  const goToFirstPage = () => {
    setCurrentPageIndex(1);
    handleUncheckRadio();
  };
  const nhaMayChangeClick = useSelector(nhaMayChangeSelector);

  useEffect(() => {
    dispatch(setCurrentPageIndex(1));
    handleUncheckRadio();
    dispatch(setDataFilterIndex(null));
    dispatch(setFilterIndex(0));
    dispatch(setNhaMayChange(0));
  }, [nhaMayId, nhaMayChangeClick]);

  useEffect(() => {
    if (filter !== 1) {
      const soTrang = currentPage;
      const soLuong = 10;
      const data = { soTrang, soLuong, nhaMayId };
      dispatch(getAllIndexVer2(data));
      handleUncheckRadio();
    } else {
      const newDataFilter = {
        ...dataFilter,
        soTrang: currentPage,
        nhaMayId: nhaMayId,
      };
      dispatch(getAllIndexVer2(newDataFilter));
      handleUncheckRadio();
    }
  }, [nhaMayId, dispatch, currentPage]);

  const paginationTable = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 8,
          marginRight: 20,
        }}
      >
        <DoubleLeftOutlined
          className="ForwardIcon"
          onClick={goToFirstPage}
          size="small"
        />
        <Pagination
          simple
          total={
            listSoDoc && listSoDoc[0]?.tongSoTrang
              ? listSoDoc[0]?.tongSoTrang * 10
              : 1
          }
          onChange={(e) => handlePageChange(e)}
          current={currentPage}
        />
        <DoubleRightOutlined
          className="ForwardIcon"
          size="small"
          onClick={goToLastPage}
        />
      </div>
    );
  };

  return (
    <>
      {!isModalWriteIndex && (
        <>
          <Collapse
            items={[
              {
                key: "1",
                label: "Tìm kiếm",
                children: (
                  <FormSearchReadingIndex
                    // setCurrentPage={setCurrentPage}
                    listKGCS={listKGCS?.GetKyGhiChiSos?.nodes}
                    listTuyenDoc={selectLineReadingOptionsSelector?.nodes}
                    listKhuVuc={listKhuVuc?.GetKhuVucs?.nodes}
                    canBoDocs={canBoDocs}
                  />
                ),
              },
            ]}
            size="small"
            defaultActiveKey={["1"]}
          />
          <div
            style={{
              lineHeight: "200px",
              textAlign: "center",
              borderRadius: token.borderRadiusLG,
              marginTop: 7,
              position: "relative",
            }}
          >
            <Table
              bordered
              loading={isLoading || isLoadingSoTheoNhaMay}
              dataSource={
                listSoDoc && listSoDoc.length > 0
                  ? listSoDoc.map((item, index) => ({
                      key: index + 1,
                      index: index + 1,
                      id: item?.id,
                      trangThaiKhoaSo: item?.trangThaiKhoaSo,
                      tuyenDoc: item.tuyenDoc,
                      canBoDoc: item.canBoDoc,
                      tenSo: item.tenSo,
                      soChiSoDongHoChuaGhi:
                        item.soChiSoDongHoChuaGhi + "/" +  item.tongSoChiSoDongHo,
                      chotSo: item.chotSo,

                      trangThai: item.trangThai === 1 ? "Đang ghi" : "Đã ngừng",
                      ngayChot: item.ngayChot
                        ? moment(item.ngayChot).format("DD/MM/YYYY")
                        : null,
                      hoaDon: item.hoaDon
                        ? moment(item.hoaDon).format("DD/MM/YYYY")
                        : null,
                    }))
                  : []
              }
              columns={columns}
              size="small"
              scroll={{
                x: 2000,
                // y: 380,
              }}
              pagination={{
                position: ["none"],
              }}
              style={{
                whiteSpace: "nowrap",
              }}
              rowKey="key"
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    dispatch(
                      readingIndexSlice.actions.btnClickTabReadingIndex(record)
                    );
                  },
                };
              }}
              rowSelection={{
                type: "radio",
                columnTitle: () => {
                  return (
                    <Tooltip title="Làm mới.">
                      <RedoOutlined
                        className="icon-reset-rad-btn"
                        onClick={handleUncheckRadio}
                      />
                    </Tooltip>
                  );
                },
                onChange: (selectedRowKeys, selectedRows) =>
                  handleRowSelection(selectedRowKeys, selectedRows),
                selectedRowKeys: tabListReadingIndex
                  ? [tabListReadingIndex.key]
                  : [],
              }}
            />
            {paginationTable()}
          </div>
        </>
      )}
      <div
        className="contract-bottom"
        style={{
          zIndex: 999,
        }}
      >
        <div className="contract-bottom-func">
          {isTabletOrMobile ? (
            <Popover
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
              content={renderFooter()}
              open={open}
              onOpenChange={handleOpenChange}
            >
              <PlusOutlined />
            </Popover>
          ) : (
            renderFooter()
          )}
        </div>
      </div>

      {isOpenModalCreate && (
        <CreateBook
          handleCancel={handleCancel}
          handleOk={handleOk}
          isOpen={isOpenModalCreate}
          listKGCS={listKGCS?.GetKyGhiChiSos?.nodes}
          canBoDocs={canBoDocs}
        />
      )}

      {isModalOpenMCreate && (
        <CreateMultipleBook
          handleCancel={handleCancel}
          handleOk={handleOk}
          isOpen={isModalOpenMCreate}
          listKGCS={listKGCS?.GetKyGhiChiSos?.nodes}
        />
      )}

      {isModalWriteIndex && (
        <WriteIndexModal
          isModalWriteIndex={isModalWriteIndex}
          setIsModalWriteIndex={setIsModalWriteIndex}
          paginationTable={paginationTable}
        />
      )}

      {isModalOpenIndexBar && (
        <ModalIndexBar
          isOpen={isModalOpenIndexBar}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </>
  );
};
export default ReadingIndex;
