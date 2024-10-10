import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Table, Tooltip, message } from "antd";
import AddDepartmentModal from "./AddDepartmentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getPhongBansSelector,
  openSelector,
  phongBanIdSelector,
  refreshTableSelector,
  userIDPhongBanSelector,
} from "../../../../../../redux/selector";
import { fetchGetPhongBans } from "../../../../../../redux/slices/registerSlice/registerSlice";
import { useQuery } from "@apollo/client";
import { GetPhongBanQuery } from "../../../../../../graphql/users/usersQuery";
import {
  fetchGetIdPhongBan,
  fetchUpdatePhongBan,
} from "../../../../../../redux/slices/thanhVienSlice/thanhVienSlice";
import { setRefreshTable } from "../../../../../../redux/slices/currentPageSlice/currentPageSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: "7%",
  },

  {
    title: "Tên nhóm PB/ĐV",
    dataIndex: "name",
    key: "name",
  },
];

const DepartmentTab = ({ hideModal }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [rowSelection, setRowSelection] = useState(null);
  const DsPhongBans = useSelector(getPhongBansSelector);

  const userIDCurrent = useSelector(userIDPhongBanSelector);
  const phongBanId = useSelector(phongBanIdSelector);
  // console.log("phongBan",phongBan)
  const [initialData, setInitialData] = useState([]);

  // const { data: phongBanId } = useQuery(GetPhongBanQuery, {
  //   variables: {
  //     idUser: userIDCurrent,
  //   },
  // });
  useEffect(() => {
    if (userIDCurrent) {
      dispatch(fetchGetIdPhongBan(userIDCurrent));
    }
  }, [userIDCurrent]);

  useEffect(() => {
    setRowSelection(phongBanId?.id);
  }, [phongBanId]);

  useEffect(() => {
    dispatch(fetchGetPhongBans())
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("🚀 ~ error:", error);
      });
  }, []);

  useEffect(() => {
    // Thiết lập initialData từ DsPhongBans
    const updatedInitialData = DsPhongBans.map((item, index) => ({
      stt: index + 1,
      id: item.id,
      name: item.name,
    }));
    setInitialData(updatedInitialData);

    // Nếu phongBanId có giá trị và initialData đã được cập nhật
    if (
      phongBanId?.id &&
      updatedInitialData.length > 0
    ) {
      // Tìm hàng có id tương tự với phongBanId và thiết lập nó là hàng được chọn
      const selectedRow = updatedInitialData.find(
        (row) => row.id === phongBanId.id
      );
      if (selectedRow) {
        setRowSelection(selectedRow);
      }
    }
  }, [DsPhongBans, phongBanId]);

  const data = DsPhongBans.map((item, index) => ({
    stt: index + 1,
    id: item.id,
    name: item.name,
  }));

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setRowSelection(selectedRows[0]);
  };

  const handleUncheckRadio = () => {
    setRowSelection(null);
  };

  const hideSubModal = () => {
    setOpenModal(false);
  };

  const handleSelectedPhongBan = (selectedRows) => {
    console.log(
      "🚀 ~ file: DepartmentTab.jsx:60 ~ handleSelectedPhongBan ~ selectedRowKeys:",
      selectedRows ? selectedRows.id : null
    );
  };

  const handeChangePhongBan = () => {
    const data = {
      userId: userIDCurrent,
      phongBanId: rowSelection.id,
    };
    dispatch(fetchUpdatePhongBan(data))
      .unwrap()
      .then((res) => {
        message.success(res);
        hideModal();
        dispatch(setRefreshTable(true));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  return (
    <>
      <Table
        pagination={false}
        size="small"
        scroll={{ x: 620, y: 400 }}
        bordered
        rowKey="stt"
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={data}
        // onRow={(record, index) => {
        //   return {
        //     onClick: () => {
        //       handleSelectedPhongBan(record)
        //     },
        //   }
        // }}
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
          onChange: (selectedRowKeys, selectedRows) => {
            handleRowSelection(selectedRowKeys, selectedRows);
            handleSelectedPhongBan(selectedRows[0]);
          },
          selectedRowKeys: rowSelection ? [rowSelection.stt] : [],
        }}
      />
      <Row
        justify="end"
        gutter={[8]}
        style={{
          marginTop: "10px",
        }}
      >
        <Col>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            // style={{ marginRight: 1 }}
            // onClick={() => setOpenModal(true)}
            onClick={handeChangePhongBan}
          >
            Lưu
          </Button>
        </Col>
        <Col>
          {/* <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            disabled={!rowSelection}
          >
            xóa
          </Button> */}
          <Button
            style={
              {
                // marginLeft: "10px",
              }
            }
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Col>
      </Row>

      <Modal
        open={openModal}
        onCancel={hideSubModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">
          Danh sách phòng ban/đơn vị
        </h2>

        <AddDepartmentModal hideModal={hideSubModal} />
      </Modal>
    </>
  );
};

export default DepartmentTab;
