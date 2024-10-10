import { Collapse, Divider } from "antd";
import FormInitialPaymentTrackingList from "./FormInitialPaymentTrackingList";
import TableInitialPaymentTrackingList from "./TableInitialPaymentTrackingList";
import Reporter from "../../../../components/Reporter/Reporter";


function InititalPaymentTrackingList() {
    return (
        <>
            <Collapse
                key="collapse1"
                size="small"
                items={[
                    {
                        key: "1",
                        label: "Thông tin tìm kiếm",
                        children: <FormInitialPaymentTrackingList />,
                    },
                ]}
                accordion={false}
                defaultActiveKey={["1"]}
            />

            <Divider />

            <Reporter />

            <Divider />

            <TableInitialPaymentTrackingList />
        </>
    );
}

export default InititalPaymentTrackingList;
