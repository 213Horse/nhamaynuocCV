import { useState } from "react";
import { Divider, Modal } from "antd";
import { OrderedListOutlined, SortAscendingOutlined } from "@ant-design/icons";

import FormUpdateInfoDebt from "./FormUpdateInfoDebt/FormUpdateInfoDebt";
import FormInfoContractDebt from "./FormInfoContractDebt/FormInfoContractDebt";
import FormSortNumberClock from "./FormSortNumberClock/FormSortNumberClock";

function TableListDebt({ tabList }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdateInfoDebt, setOpenModalUpdateInfoDebt] = useState(false);
  const [openModalSortNumber, setOpenModalSortNumber] = useState(false);

  //   console.log(tabList);

  //   handle open modal debt
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // hide modal debt
  const hideModal = () => {
    setOpenModal(false);
  };

  // handle open modal update info debt
  const handleOpenModalUpdateInfoDebt = () => {
    setOpenModalUpdateInfoDebt(true);
  };

  //  modal update info debt
  const hideModalUpdateInfoDebt = () => {
    setOpenModalUpdateInfoDebt(false);
  };

  // handle open modal sort number
  const handleOpenModalSortNumber = () => {
    setOpenModalSortNumber(true);
  };

  // hide modal sort number
  const hideModalSortNumber = () => {
    setOpenModalSortNumber(false);
  };

  return (
    <>
      <div className="container-debt-utilities">
        {/* Title tiện ích (Xem danh sách nợ) */}
        <span className="debt-title-name" onClick={handleOpenModal}>
          <OrderedListOutlined className="debt-icon-left" /> Xem danh sách nợ
        </span>

        {/* Title tiện ích (Sắp xếp STT) */}
        <span className="debt-title-name" onClick={handleOpenModalSortNumber}>
          <SortAscendingOutlined className="debt-icon-left" /> Sắp xếp STT
        </span>
      </div>

      {/* Show modal (Thông tin hợp đồng nợ) */}
      <Modal
        open={openModal}
        onCancel={hideModal}
        width={1000}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h3>Thông tin hợp đồng nợ</h3>

        {/* Form info contract debt */}
        <FormInfoContractDebt
          handleOpenModalUpdateInfoDebt={handleOpenModalUpdateInfoDebt}
          hideModal={hideModal}
          tabList={tabList}
        />
      </Modal>

      {/* Show modal (Cập nhật thông tin hợp đồng nợ) */}
      <Modal
        width={1000}
        open={openModalUpdateInfoDebt}
        onCancel={hideModalUpdateInfoDebt}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Divider orientation="left" style={{ fontWeight: "bold" }}>
          Cập nhật thông tin hợp đồng nợ
        </Divider>

        {/* Form update info debt */}
        <FormUpdateInfoDebt hideModalUpdateInfoDebt={hideModalUpdateInfoDebt} />
      </Modal>

      {/* Show modal (Danh sách sắp xếp đồng hồ) */}
      <Modal
        open={openModalSortNumber}
        onCancel={hideModalSortNumber}
        width={1000}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Divider orientation="left" style={{ fontWeight: "bold" }}>
          Danh sách sắp xếp đồng hồ
        </Divider>

        {/* Form list sort number (clock) */}
        <FormSortNumberClock hideModalSortNumber={hideModalSortNumber} />
      </Modal>
    </>
  );
}

export default TableListDebt;
