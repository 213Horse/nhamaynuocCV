import { Collapse } from "antd";

import FormInfoTransfer from "./FormInfoTransfer/FormInfoTransfer";
import FormCustomerReceive from "./FormCustomerReceive/FormCustomerReceive";

function FormTransferContract({
  modalTransferContract,
  hideModalTransferContract,
}) {
  // collapse (Thông tin chuyển nhượng + KH tiếp nhận)
  const items = [
    {
      key: "1",
      label: "Thông tin chuyển nhượng",
      children: <FormInfoTransfer />,
    },
    {
      key: "2",
      label: "Khách hàng tiếp nhận",
      children: (
        <FormCustomerReceive
          modalTransferContract={modalTransferContract}
          hideModalTransferContract={hideModalTransferContract}
        />
      ),
    },
  ];

  return (
    <div className="container-transfer-contract">
      <Collapse
        key="1"
        items={items}
        defaultActiveKey={["1", "2"]}
        style={{ margin: "12px 0px" }}
        size="small"
      />
    </div>
  );
}

export default FormTransferContract;
