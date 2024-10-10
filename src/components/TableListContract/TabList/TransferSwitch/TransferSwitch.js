import {
  PlusCircleOutlined,
  RetweetOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormTransferReading from "./FormTransferReading/FormTransferReading";
import FormTransferContract from "./FormTransferContract/FormTransferContract";
import FormTransferCodeCustomer from "./FormTransferCodeCustomer/FormTransferCodeCustomer";
import { btnClickTabListContractSelector } from "../../../../redux/selector";
import { fetchApiGetByIdCustomer } from "../../../../redux/slices/customerSlice/customerSlice";

function TransferSwitch() {
  const [modalTransferReading, setModalTransferReading] = useState(false);
  const [modalTransferContract, setModalTransferContract] = useState(false);
  const [modalTransferCodeCustomer, setModalTransferCodeCustomer] =
    useState(false);

  const dispatch = useDispatch();

  const customerByKeyId = useSelector(btnClickTabListContractSelector);

  // console.log("customer key id", customerByKeyId);
  // console.log("customer", customer);

  useEffect(() => {
    dispatch(fetchApiGetByIdCustomer(customerByKeyId?.keyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerByKeyId?.keyId]);

  const handleTransferReading = () => {
    setModalTransferReading(true);
  };

  const hideModalTransferReading = () => {
    setModalTransferReading(false);
  };

  const handleTransferContract = () => {
    setModalTransferContract(true);
  };

  const hideModalTransferContract = () => {
    setModalTransferContract(false);
  };

  const handleTransferCodeCustomer = () => {
    setModalTransferCodeCustomer(true);
  };

  const hideModalTransferCodeCustomer = () => {
    setModalTransferCodeCustomer(false);
  };

  return (
    <div className="container-transfer-switch">
      {/* Chuyển tuyến, phạm vi */}
      <span className="debt-title-name" onClick={handleTransferReading}>
        <RetweetOutlined /> Chuyển tuyến, phạm vi
      </span>

      {/* Chuyển nhượng hợp đồng */}
      <span className="debt-title-name" onClick={handleTransferContract}>
        <SwapOutlined /> Chuyển nhượng hợp đồng
      </span>

      {/* Chuyển mã khách hàng */}
      <span className="debt-title-name" onClick={handleTransferCodeCustomer}>
        <PlusCircleOutlined /> Chuyển mã khách hàng
      </span>

      {/* Modal (Chuyển tuyến, phạm vi) */}
      {modalTransferReading && (
        <Modal
          open={modalTransferReading}
          onCancel={hideModalTransferReading}
          width={2000}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <FormTransferReading
            hideModalTransferReading={hideModalTransferReading}
          />
        </Modal>
      )}

      {/* Modal (Chuyển nhượng hợp đồng) */}
      {modalTransferContract && (
        <Modal
          open={modalTransferContract}
          onCancel={hideModalTransferContract}
          width={800}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <FormTransferContract
            modalTransferContract={modalTransferContract}
            hideModalTransferContract={hideModalTransferContract}
          />
        </Modal>
      )}

      {/* Modal (Chuyển mã khách hàng) */}
      {modalTransferCodeCustomer && (
        <Modal
          open={modalTransferCodeCustomer}
          onCancel={hideModalTransferCodeCustomer}
          width={800}
          centered={true}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <FormTransferCodeCustomer
            hideModalTransferCodeCustomer={hideModalTransferCodeCustomer}
          />
        </Modal>
      )}
    </div>
  );
}

export default TransferSwitch;
