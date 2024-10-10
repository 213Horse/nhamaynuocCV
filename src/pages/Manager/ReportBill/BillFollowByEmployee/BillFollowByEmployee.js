import { Collapse, Divider } from "antd";
import FormBillFollowByEmployee from "./FormBillFollowByEmployee";
import TableBillFollowByEmployee from "./TableBillFollowByEmployee";
import Reporter from "../../../../components/Reporter/Reporter";


function BillFollowByEmployee() {
    return (
        <>
            <Collapse
                key="collapse1"
                size="small"
                items={[
                    {
                        key: "1",
                        label: "Thông tin tìm kiếm",
                        children: <FormBillFollowByEmployee />,
                    },
                ]}
                accordion={false}
                defaultActiveKey={["1"]}
            />

            <Divider />

            <Reporter />

            <Divider />

            <TableBillFollowByEmployee />
        </>
    );
}

export default BillFollowByEmployee;
