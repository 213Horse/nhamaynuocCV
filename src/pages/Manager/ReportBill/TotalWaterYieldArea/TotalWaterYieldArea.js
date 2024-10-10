import { Collapse, Divider } from "antd";
import FormTotalWaterYieldArea from "./FormWaterYieldArea";
import Reporter from "../../../../components/Reporter/Reporter";
import TableTotalWaterYieldArea from "./TableTotalWaterYieldArea";


function TotalWaterYieldArea() {
    return (
        <>
            <Collapse
                key="collapse1"
                size="small"
                items={[
                    {
                        key: "1",
                        label: "Thông tin tìm kiếm",
                        children: <FormTotalWaterYieldArea />,
                    },
                ]}
                accordion={false}
                defaultActiveKey={["1"]}
            />

            <Divider />

            <Reporter />

            <Divider />

            <TableTotalWaterYieldArea />
        </>
    );
}

export default TotalWaterYieldArea;
