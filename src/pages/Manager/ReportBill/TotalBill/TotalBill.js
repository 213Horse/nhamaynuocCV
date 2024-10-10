import { Collapse, Divider } from "antd";
import FormTotalBill from "./FormTotalBill";
import Reporter from "../../../../components/Reporter/Reporter";
import TableTotalBill from "./TableTotalBill";


function TotalBill() {
    return (
        <>
            <Collapse
                key="collapse1"
                size="small"
                items={[
                    {
                        key: "1",
                        label: "Thông tin tìm kiếm",
                        children: <FormTotalBill />,
                    },
                ]}
                accordion={false}
                defaultActiveKey={["1"]}
            />

            <Divider />

            <Reporter />

            <Divider />

            <TableTotalBill />
        </>
    );
}

export default TotalBill;
