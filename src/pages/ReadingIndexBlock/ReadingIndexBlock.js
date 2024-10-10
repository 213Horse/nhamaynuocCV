import { Collapse, Modal, Popover, Table, theme, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { CreateBook } from "./CreateBook/CreateBook";
import { FormSearchReadingIndexTotal } from "../../components/FormSearchReadingIndexTotal/FormSearchReadingIndexTotal";
import { useMediaQuery } from "react-responsive";
import {
  LockOutlined,
  PlusOutlined,
  RedoOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import "./ReadingIndex.css";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  btnClickTabReadingIndexSelector,
  getAllKySelector,
  isLoadingReadingIndexTotalFilter,
  isLoadingReadingIndexTotalSelector,
  readingIndexTotalFilterSelector,
  readingIndexTotalFilterValuesSelector,
  readingIndexTotalIsFilterBlockSelector,
  readingIndexTotalIsFilterSelector,
  readingIndexTotalQuerySelector,
} from "../../redux/selector";
import readingIndexSlice, {
  fetchApiDsTrangThaiGhi,
  readingIndexQuery,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useQuery } from "@apollo/client";
import {
  GetKhuVucQuery,
  GetTuyenDocQuery,
} from "../../graphql/readingIndex/readingIndexQuery";
import moment from "moment";
import readingIndexTotalSlice, {
  fetchAllReadingIndexTotalBlock,
  fetchReadingIndexTotalFilterBlock,
} from "../../redux/slices/readingIndexTotalSlice/readingIndexTotalSlice";
import { LOAD_ALL_CAN_BO_DOC } from "../../graphql/users/usersQuery";
import { getAllKy } from "../../redux/slices/DMKy/kySlice";
import { CreateMultipleBook } from "../ReadingIndexBlock/CreateMultipleBook/CreateMultipleBook";
import { FooterReadingIndexBlock } from "../../components/Footer/FooterReadingIndexBlock";
import { FormSearchReadingIndexBlock } from "../../components/FormSearchReadingIndexBlock/FormSearchReadingIndexBlock";
import { WriteIndexModal } from "./WriteIndex/WriteIndexModal";

const ReadingIndexBlock = () => {
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

  const listData = useSelector(readingIndexTotalQuerySelector);
  const listDataFilter = useSelector(readingIndexTotalFilterSelector);
  const isFilterData = useSelector(readingIndexTotalIsFilterBlockSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const filterValue = useSelector(readingIndexTotalFilterValuesSelector);

  const isLoading = useSelector(isLoadingReadingIndexTotalSelector);

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

  // get list -> sổ đọc theo nhaMayId
  useEffect(() => {
    const values = { nhaMayId, pageNumber: 1 };
    nhaMayId && dispatch(fetchAllReadingIndexTotalBlock(values));
    setCurrentPage(1);
    dispatch(readingIndexTotalSlice.actions.btnClickClearFilter());
  }, [nhaMayId]);

  // useEffect(() => {
  //   console.log("kimo data", listDataFilter, isFilterData);
  // }, [listDataFilter]);
  //handle paging

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
    const values = {
      ...filterValue,
      nhaMayId,
      pageNumber: currentPage,
    };
    if (isFilterData) {
      dispatch(fetchReadingIndexTotalFilterBlock(values));
    } else {
      dispatch(fetchAllReadingIndexTotalBlock(values));
    }
  }, [currentPage, isFilterData, dispatch]);

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(fetchApiDsTrangThaiGhi(queryString));
    dispatch(getAllKy(queryString));
  }, []);

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
      dispatch(fetchAllReadingIndexTotalBlock({ nhaMayId, pageNumber: 1 }));
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
    isFilterData ? listDataFilter?.items : listData?.items
  )?.map((item, index) => {
    return {
      id: item.id,
      key: index,
      "#": pageSize * (currentPage - 1) + (index + 1), //set index table,
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
        console.log("record", record);
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
    <FooterReadingIndexBlock
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
                  <FormSearchReadingIndexBlock
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
              loading={isLoading}
              dataSource={dataSource}
              columns={columns}
              size="small"
              scroll={{
                x: 2000,
              }}
              pagination={{
                total: isFilterData
                  ? listDataFilter?.totalCount
                  : listData.totalCount,
                current: currentPage,
                pageSize: pageSize,
                onChange: (page) => setCurrentPage(page),
              }}
              style={{
                whiteSpace: "nowrap",
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
      <WriteIndexModal
        isModalWriteIndex={isModalWriteIndex}
        setIsModalWriteIndex={setIsModalWriteIndex}
      />
      <CreateBook
        handleCancel={handleCancel}
        handleOk={handleOk}
        isOpen={isOpenModalCreate}
        listKGCS={listKGCS}
      />
      <Modal
        title="Tạo sổ ghi chỉ số"
        open={isModalOpenMCreate}
        onOk={() => handleOk("", "multiple")}
        onCancel={() => handleCancel("", "multiple")}
        width={800}
        footer={null}
        centered
      >
        <CreateMultipleBook
          handleCancel={handleCancel}
          handleOk={handleOk}
          isOpen={isModalOpenMCreate}
          listKGCS={listKGCS}
        />
      </Modal>
    </>
  );
};
export default ReadingIndexBlock;
