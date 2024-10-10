import { React, useState } from "react";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Table, Popover } from "antd";
import { PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { AdvancedSearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";
import TableListPC from "./TableListPC";
moment.locale("vi");

function CustomerType() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

    const initialData = [
        {
            key: "1",
            stt:  1,
            kihieu: `Canhan`,
            description: `Cá nhân`,
        },
        {
            key: "2",
            stt:  2,
            kihieu: `Canhan`,
            description: `Cá nhân`,
        },
    ]
    const [data1] = useState(initialData);

    const columns = [
        {
            title: "#",
            dataIndex: "stt",
            key: "stt",
            width: 70,
        },
        {
            title: "Ký hiệu",
            dataIndex: "kihieu",
            key: "kihieu",
            width: 170,
            render: (text, record) => (
                <>
                    <SnippetsOutlined />
                    {text}
                </>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
    ]; 

    return (
        <>
            <AdvancedSearchForm />

            <Table
                style={{ marginTop: "10px" }}
                size="small"
                bordered
                rowKey="index"
                scroll={{ x: 1000, y: 480 }}
                columns={columns.map((column) => ({
                    ...column,
                    className: "cell-wrap",
                }))}
                dataSource={data1}
            />
            {isTabletOrMobile && (
                <div className="contract-bottom">
                    {/* check mobile */}
                    {isTabletOrMobile ? (
                        <Popover
                            size="small"
                            rootClassName="fix-popover-z-index"
                            placement="bottomRight"
                            trigger="click"
                            content={<TableListPC isTabletOrMobile={isTabletOrMobile}/>}
                        >
                            <div className="contract-bottom-func">
                                <PlusOutlined />
                            </div>
                        </Popover>
                    ) : (
                        <div className="contract-bottom-func">{/* <TabListBC /> */}</div>
                    )}
                </div>
            )}
        </>
    );
}
export default CustomerType;
