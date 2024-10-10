import { Collapse, Modal, Popover, Table, theme, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { CreateBook } from "./CreateBook/CreateBook";
import { CreateMultipleBook } from "./CreateMultipleBook/CreateMultipleBook";
import { FormSearchReadingIndexTotal } from "../../components/FormSearchReadingIndexTotal/FormSearchReadingIndexTotal";
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
} from "@ant-design/icons";
import { ModalIndexBar } from "./ModalIndexBar/ModalIndexBar";
import "./ReadingIndex.css";
import { WriteIndexModal } from "./WriteIndex/WriteIndexModal";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabReadingIndexSelector,
  getAllKySelector,
  getListSoDocChiSo,
  isLoadingGetListSoDocTheoNhaMay,
  isLoadingReadingIndexTotalFilter,
  isLoadingReadingIndexTotalSelector,
  readingIndexTotalFilterSelector,
  readingIndexTotalFilterValuesSelector,
  readingIndexTotalIsFilterSelector,
  readingIndexTotalQuerySelector,
} from "../../redux/selector";
import readingIndexSlice, {
  fetchApiDsTrangThaiGhi,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useQuery } from "@apollo/client";
import {
  GetKhuVucQuery,
  GetKyGhiChiSoQuery,
  GetTuyenDocQuery,
} from "../../graphql/readingIndex/readingIndexQuery";
import moment from "moment";
import { FooterReadingIndexTong } from "../../components/Footer/FooterReadingIndexTong";
import readingIndexTotalSlice, {
  fetchAllReadingIndexTotal,
  fetchReadingIndexTotalFilter,
} from "../../redux/slices/readingIndexTotalSlice/readingIndexTotalSlice";
import { LOAD_ALL_CAN_BO_DOC } from "../../graphql/users/usersQuery";
import { getAllKy } from "../../redux/slices/DMKy/kySlice";

const ReadingIndexTong = () => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isModalOpenMCreate, setIsModalOpenMCreate] = useState(false);
  const [isModalOpenIndexBar, setIsModalOpenIndexBar] = useState(false);
  const tabListReadingIndex = useSelector(btnClickTabReadingIndexSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [isModalWriteIndex, setIsModalWriteIndex] = useState(false);
  const [loading, setLoading] = useState(true);
  const listData = useSelector(readingIndexTotalQuerySelector);
  const listDataFilter = useSelector(readingIndexTotalFilterSelector);
  const isFilterData = useSelector(readingIndexTotalIsFilterSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const filterValue = useSelector(readingIndexTotalFilterValuesSelector);
  const isLoading = useSelector(isLoadingReadingIndexTotalSelector);
  // const isLoadingReadingIndexTotalFilterSeletor = useSelector(
  //   isLoadingReadingIndexTotalFilter
  // );

  // console.log("listData ->", listData);
  // console.log(nhaMayId);
  // all query for readingIndex
  const listKGCS = useSelector(getAllKySelector);
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
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    const values = { nhaMayId, pageNumber: 1 };
    setLoading(true);
    dispatch(fetchApiDsTrangThaiGhi(createFilterQueryString()));
    dispatch(fetchAllReadingIndexTotal(values))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
    dispatch(readingIndexTotalSlice.actions.btnClickClearFilter());
    setCurrentPage(1);
  }, [nhaMayId]);

  //handle paging
  useEffect(() => {
    setLoading(true);
    const values = {
      ...filterValue,
      nhaMayId,
      pageNumber: currentPage,
    };
    if (isFilterData) {
      dispatch(fetchReadingIndexTotalFilter(values))
        .unwrap()
        .then(() => {
          setLoading(false);
        });
    } else {
      dispatch(fetchAllReadingIndexTotal(values))
        .unwrap()
        .then(() => {
          setLoading(false);
        });
    }
  }, [currentPage, isFilterData, dispatch]);

  // useEffect(() => {
  //   dispatch(getAllKy());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   //clear row select in redux
  //   // dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
  // }, []);

  const handleOk = (_, type) => {
    setIsOpenModalCreate(false);
    if (type === "multiple") {
      setIsModalOpenMCreate(false);
    }
    if (type === "indexBar") {
      setIsModalOpenIndexBar(false);
    }
  };

  const handleCancel = (_, type) => {
    setIsOpenModalCreate(false);
    if (type === "multiple") {
      setIsModalOpenMCreate(false);
    }
    if (type === "indexBar") {
      setIsModalOpenIndexBar(false);
    }
  };

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      readingIndexSlice.actions.btnClickTabReadingIndex(selectedRows[0])
    );
  };

  // handle un-check radio
  const handleUncheckRadio = () => {
    nhaMayId &&
      dispatch(fetchAllReadingIndexTotal({ nhaMayId, pageNumber: 1 }));
    setCurrentPage(1);
    dispatch(readingIndexSlice.actions.btnClickTabReadingIndex(null));
    dispatch(readingIndexSlice.actions.btnClickFilterSoDoc("UN_FILTER"));
  };

  const getTrangThaiLabel = (value) => {
    const optionsTrangThai = [
      {
        label: "Đang ghi",
        value: 1,
      },
      {
        label: "Đã ngừng",
        value: 2,
      },
    ];

    const option = optionsTrangThai.find((option) => option.value === value);
    return option ? option.label : "Đã ngừng";
  };

  const GetKyGhiChiSoLabel = (value) => {
    const option = listKGCS.find((option) => option.id === value);
    return option ? option?.moTa : "";
  };

  const GetNguoiQuanLy = (nguoiQuanLyId) => {
    const user = canBoDocs?.GetUsers?.nodes.find(
      (item) => item.id === nguoiQuanLyId
    );
    return user?.normalizedUserName;
  };

  const dataSource = (
    isFilterData ? listDataFilter.items : listData.items
  )?.map((item, index) => {
    return {
      key: index,
      "#": index + 1,
      id: item.id,
      kyGhiChiSoId: GetKyGhiChiSoLabel(item.kyGhiChiSoId),
      tuyenDocId: item.tenTuyenDoc,
      nguoiQuanLyId: GetNguoiQuanLy(item.nguoiQuanLyId),
      tenSo: item.tenSo,
      chuaGhi: item.soDhdaGhi,
      chotSo: item.chotSo,
      trangThai: getTrangThaiLabel(item.trangThai),
      trangThaiKhoaSo: item.trangThaiKhoaSo,
      ngayHoaDon: item.ngayHoaDon
        ? moment(item.ngayHoaDon).format("DD-MM-YYYY")
        : null,
      ngayDauKy: item.ngayDauKy
        ? moment(item.ngayDauKy).format("DD-MM-YYYY")
        : null,
      ngayCuoiKy: item.ngayCuoiKy
        ? moment(item.ngayCuoiKy).format("DD-MM-YYYY")
        : null,
      hoaDon: item.hoaDon,
    };
  });

  const columns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
    },
    {
      title: "",
      dataIndex: "trangThaiKhoaSo",
      key: "trangThaiKhoaSo",
      width: "3%",
      align: "center",
      render: (record) => {
        if (record === 1) {
          return <UnlockOutlined style={{ color: "blue" }} />;
        } else {
          return <LockOutlined style={{ color: "red" }} />;
        }
      },
    },
    {
      title: "Tuyến đọc",
      dataIndex: "tuyenDocId",
      key: "tuyenDocId",
      ellipsis: false,
    },
    {
      title: "Kỳ ghi chỉ số",
      dataIndex: "kyGhiChiSoId",
      key: "kyGhiChiSoId",
    },
    {
      title: "Cán bộ đọc",
      dataIndex: "nguoiQuanLyId",
      key: "nguoiQuanLyId",
    },
    {
      title: "Tên sổ",
      dataIndex: "tenSo",
      key: "tenSo",
    },
    {
      title: "Chốt sổ",
      dataIndex: "chotSo",
      key: "chotSo",
      render: (record) => {
        if (record === false) {
          return <p style={{ color: "blue" }}>Chưa chốt</p>;
        } else {
          return <p style={{ color: "red" }}>Đã chốt</p>;
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
    },
    {
      title: "Ngày chốt",
      dataIndex: "ngayChot",
      key: "ngayChot",
    },
    {
      title: "Ngày hóa đơn",
      dataIndex: "ngayHoaDon",
      key: "ngayHoaDon",
    },
    {
      title: "Ngày đầu kỳ",
      dataIndex: "ngayDauKy",
      key: "ngayDauKy",
    },
    {
      title: "Ngày cuối kỳ",
      dataIndex: "ngayCuoiKy",
      key: "ngayCuoiKy",
    },
    {
      title: "Hóa đơn",
      dataIndex: "hoaDon",
      key: "hoaDon",
    },
  ];

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const renderFooter = () => (
    <FooterReadingIndexTong
      setIsOpenModalCreate={setIsOpenModalCreate}
      setIsModalOpenMCreate={setIsModalOpenMCreate}
      isTabletOrMobile={isTabletOrMobile}
      setIsModalOpenIndexBar={setIsModalOpenIndexBar}
      setIsModalWriteIndex={setIsModalWriteIndex}
      setCurrentPage={setCurrentPage}
      hide={hide}
    />
  );

  // useEffect(() => {
  //   dispatch(readingIndexQuery());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("isLoading", isLoadingReadingIndexTotalFilterSeletor);
  // }, [isLoadingReadingIndexTotalFilterSeletor]);
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
                  <FormSearchReadingIndexTotal
                    listKGCS={listKGCS}
                    listTuyenDoc={listTuyenDoc?.GetTuyenDocs?.nodes}
                    listKhuVuc={listKhuVuc?.GetKhuVucs?.nodes}
                    canBoDocs={canBoDocs?.GetUsers?.nodes || []}
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
            }}
          >
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              size="small"
              scroll={{
                x: 2000,
              }}
              style={{
                whiteSpace: "nowrap",
              }}
              pagination={{
                total: isFilterData
                  ? listDataFilter?.totalCount
                  : listData.totalCount,
                current: currentPage,
                pageSize: pageSize,
                onChange: (page) => setCurrentPage(page),
              }}
              rowKey="key"
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    // clicked row to check radio
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
              loading={loading}
              // loading={isLoadingReadingIndexTotalFilterSeletor}
            />
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

      <CreateBook
        handleCancel={handleCancel}
        handleOk={handleOk}
        isOpen={isOpenModalCreate}
        listKGCS={listKGCS}
      />

      <Modal
        title="Tạo sổ ghi chỉ số"
        open={isModalOpenMCreate}
        onOk={() => handleOk("", "multiple")}
        onCancel={() => handleCancel("", "multiple")}
        width={800}
        footer={null}
        centered
        // destroyOnClose
      >
        <CreateMultipleBook
          handleCancel={handleCancel}
          handleOk={handleOk}
          isOpen={isModalOpenMCreate}
          listKGCS={listKGCS}
        />
      </Modal>

      <WriteIndexModal
        isModalWriteIndex={isModalWriteIndex}
        setIsModalWriteIndex={setIsModalWriteIndex}
      />

      <ModalIndexBar
        isOpen={isModalOpenIndexBar}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
};
export default ReadingIndexTong;
