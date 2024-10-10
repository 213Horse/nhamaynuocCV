import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { GetUserQuery } from "../../../../graphql/users/usersQuery";
import { fetchApiAllFactorySelector, fetchApiAllReadingSelector } from "../../../../redux/selector";
import { fetchApiAllFactory } from "../../../../redux/slices/factorySlice/factorySlice";
import { fetchApiAllReading } from "../../../../redux/slices/readingSlice/readingSlice";
import { getRegion } from "../../../../graphql/region/Region";
import { getArea } from "../../../../graphql/area/Area";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

function FormTotalBill() {
    const [ngayLapDat, setNgayLapDat] = useState(null);

    const dispatch = useDispatch();

    // get from redux
    const factoryNames = useSelector(fetchApiAllFactorySelector);
    const readings = useSelector(fetchApiAllReadingSelector);

    // get from graphql
    const { data: users } = useQuery(GetUserQuery);
    const { data: regions } = useQuery(getRegion);
    const { data: areas } = useQuery(getArea);

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

    const layout = {
        labelCol: {
            span: `${isTabletOrMobile ? 8 : 6}`,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const handleGetAllFactory = () => {
        dispatch(fetchApiAllFactory());
    };

    const handleGetAllReading = () => {
        dispatch(fetchApiAllReading());
    };

    // handle change ngày lắp đặt
    const handleChangeNgayLapDat = (date) => {
        if (date) {
            const lastDayOfMonth = moment(date).endOf("month");
            setNgayLapDat(lastDayOfMonth);
        }
    };

    const handleSubmitForm = (values) => {
        console.log(values);
    };

    const handleSubmitFormFailed = (error) => {
        console.log({ error });
    };

    return (
        <Form
            {...layout}
            onFinish={handleSubmitForm}
            onFinishFailed={handleSubmitFormFailed}
            fields={[
                { name: "ngayLapDatEnd", value: ngayLapDat ? dayjs(ngayLapDat) : "" },
            ]}
        >
            <Row>
                {/* Đơn vị */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="listNhaMayId" label="Đơn vị: ">
                        <Select fieldNames="listNhaMayId" onClick={handleGetAllFactory}>
                            {factoryNames?.length > 0
                                ? factoryNames?.map((_factory) => {
                                    return (
                                        <Select.Option key={_factory.id} value={_factory.id}>
                                            {_factory.tenNhaMay}
                                        </Select.Option>
                                    );
                                })
                                : []}
                        </Select>
                    </Form.Item>
                </Col>

                {/* Nhân viên thu tuyến */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="nhanVienThuTuyen" label="Nhân viên thu tuyến: ">
                        <Select
                            fieldNames="nhanVienThuTuyen"
                            options={
                                []
                            }
                            placeholder="Chọn nhân viên"
                            disabled
                        />
                    </Form.Item>
                </Col>

                {/* Vùng */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="vung" label="Vùng: ">
                        <Select
                            fieldNames="vung"
                            options={
                                regions?.GetVungs?.nodes?.length <= 0
                                    ? []
                                    : regions?.GetVungs?.nodes?.map((_nameManager) => ({
                                        label: _nameManager.tenVung,
                                        value: _nameManager.id,
                                    }))
                            }
                            placeholder="Chọn vùng"
                        />
                    </Form.Item>
                </Col>

                {/* Khu vưc */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="khuVuc" label="Khu vực: ">
                        <Select
                            fieldNames="khuVuc"
                            options={
                                areas?.GetKhuVucs?.nodes?.length <= 0
                                    ? []
                                    : areas?.GetKhuVucs?.nodes?.map((_nameManager) => ({
                                        label: _nameManager.tenKhuVuc,
                                        value: _nameManager.id,
                                    }))
                            }
                            placeholder="Chọn khu vực"
                        />
                    </Form.Item>
                </Col>


                {/* Nhân viên */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="nhanVienXem" label="Nhân viên: ">
                        <Select
                            fieldNames="nhanVienXem"
                            options={
                                users?.GetUsers?.nodes?.length <= 0
                                    ? []
                                    : users?.GetUsers?.nodes?.map((_nameManager) => ({
                                        label: _nameManager.userName,
                                        value: _nameManager.id,
                                    }))
                            }
                            placeholder="Chọn nhân viên"
                        />
                    </Form.Item>
                </Col>

                {/* Tuyến đọc */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="tuyenDoc" label="Tuyến đọc: ">
                        <Select
                            fieldNames="tuyenDoc"
                            placeholder="Chọn tuyến đọc"
                            onClick={handleGetAllReading}
                        >
                            <Select.Option value="">Tất cả</Select.Option>
                            {readings?.length <= 0
                                ? []
                                : readings?.map((_reading) => {
                                    return (
                                        <Select.Option key={_reading.id} value={_reading.id}>
                                            {_reading.tenTuyen}
                                        </Select.Option>
                                    );
                                })}
                        </Select>
                    </Form.Item>
                </Col>

                {/* Tháng */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="thang" label="Tháng: ">
                        <Select
                            fieldNames="ngayLapDatEnd"
                            placeholder="Chọn tháng"
                            options={[]}
                            disabled
                        />
                    </Form.Item>
                </Col>

                {/* Năm */}
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="nam" label="Năm: ">
                        <Select
                            fieldNames="nam"
                            placeholder="Chọn năm"
                            options={[]}
                            disabled
                        />
                    </Form.Item>
                </Col>

            </Row>

            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            htmlType="submit"
                            className="gutter-item-btn custom-btn-watch-report"
                        >
                            Xem báo cáo
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

export default FormTotalBill;
