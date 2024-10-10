import { Collapse, Divider } from "antd";
import FormTotalWaterYield from "./FormTotalWaterYield";
import TableTotalWaterYeild from "./TableTotalWaterYeild";
import Reporter from "../../../../components/Reporter/Reporter";


function TotalWaterYield() {
    return (
        <>
            <Collapse
                key="collapse1"
                size="small"
                items={[
                    {
                        key: "1",
                        label: "Thông tin tìm kiếm",
                        children: <FormTotalWaterYield />,
                    },
                ]}
                accordion={false}
                defaultActiveKey={["1"]}
            />

            <Divider />

            <Reporter />

            <Divider />

            <TableTotalWaterYeild />
        </>
    );
}

export default TotalWaterYield;
