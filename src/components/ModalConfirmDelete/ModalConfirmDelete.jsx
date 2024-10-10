import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ModalConfirmDelete.css";
import { deleteDMTuyenDoc } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";

const ModalConfirmDelete = ({
  isModalOpen,
  setIsOpenModalDelete,
  confirmLoading,
}) => {
  const rowSelected = useSelector(state => state.tabListReadingSlice.rowSelected);
  const dispatch = useDispatch();

  const hanldeDeleteTuyenDoc = () => {
    console.log(rowSelected.KeyId);
    dispatch(deleteDMTuyenDoc(rowSelected.KeyId))
    setIsOpenModalDelete(false)
  }

  return (
    <Modal
      destroyOnClose={true}
      className="popup-delete"
      title='Thông báo'
      bodyStyle={{
        borderTop: "1px solid #ccc",
        paddingTop: "10px",
      }}
      open={isModalOpen}
      onOk={hanldeDeleteTuyenDoc}
      okText="Xác Nhận"
      onCancel={() => setIsOpenModalDelete(false)}
      confirmLoading={confirmLoading}
      okButtonProps={{
        style: {
          backgroundColor: "#13DEB9",
          color: "#FFFFFF",
        },
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: "#FBF2EF",
          color: "#FA966E",
          border: "none",
        },
      }}
    >
      <p>{`Bạn chắc chắn muốn xóa Tuyến đọc ${rowSelected?.KeyId} không?`}</p>
    </Modal>
  );
};

export default ModalConfirmDelete;
