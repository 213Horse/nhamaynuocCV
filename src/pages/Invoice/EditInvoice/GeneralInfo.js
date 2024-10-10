import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../../services";
import { gql, useQuery } from "@apollo/client";

import { useSelector, useDispatch } from "react-redux";
import {getAllKy} from "../../../redux/slices/DMKy/kySlice";
import {
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const GeneralInfo = ({ seriHoaDonOptions }) => {
  const [dsKyGhiChiSo, setDsKyGhiChiSo] = useState([]);
  const [seriHoaDon, setSeriHoaDon] = useState([]);

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dispatch = useDispatch();

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.forEach((factory, index) => {
        factoryQueryString += index === 0 ? `nhaMayIds=${factory.nhaMayId}` : `&nhaMayIds=${factory.nhaMayId}`;
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    return factoryQueryString;
  };

  useEffect(() => {
    if (nhaMayId) {
      const queryString = createFilterQueryString();
      // Fetch ky data
      getRequest(`ky-ghi-chi-so/get-all?${queryString}`)
        .then((res) => {
          setDsKyGhiChiSo(res);
        })
        .catch((error) => {
          // Handle error here
          console.error("Error fetching ky data:", error);
        });
      // Fetch danh muc seri hoa don
      getRequest(`danh-muc-seri-hoa-don/get-all?${queryString}`)
        .then((res) => {
          setSeriHoaDon(res);
        })
        .catch((error) => {
          // Handle error here
          console.error("Error fetching danh muc seri hoa don:", error);
        });
    }
  }, [nhaMayId]);
  
  return (
    <div className="general-info" style={{ marginTop: "15px" }}>
      <Row gutter={24}>
        <Col sm={24} lg={8} style={{ width: "100%" }}>
          <Form.Item name="thangTaoHoaDon" label="Chọn tháng">
            <DatePicker
              allowClear
              locale={locale}
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              format="MM/YYYY"
              picker="month"
              disabled
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={8} style={{ width: "100%" }}>
          <Form.Item name="kyGhiChiSoId" label="Kỳ ghi chỉ số">
            <Select
              placeholder="Chọn kỳ ghi chỉ số"
              style={{
                width: "100%",
              }}
              options={dsKyGhiChiSo?.data?.data.map((item) => ({
                value: item.id,
                label: item.moTa,
              }))}
              disabled
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={8} style={{ width: "100%" }}>
          <Form.Item name="ngayDauKy" label="Ngày đầu kỳ">
            <DatePicker
              allowClear
              locale={locale}
              placeholder="Chọn ngày đầu kỳ"
              style={{ width: "100%" }}
              format="MM-YYYY"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col sm={24} lg={8} style={{ width: "100%" }}>
          <Form.Item
            name="ngayCuoiKy"
            label="Ngày cuối kỳ"
            rules={[{ required: true }]}
          >
            <DatePicker
              allowClear
              locale={locale}
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              format="MM-YYYY"
              disabled
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={8} style={{ width: "100%" }}>
          <Form.Item name="ngayLapHoaDon" label="Ngày lập">
            <DatePicker
              allowClear
              locale={locale}
              placeholder="Chọn ngày lập hóa đơn"
              style={{ width: "100%" }}
              format="MM-YYYY"
              disabled
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={8} style={{ width: "100%" }}>
          {/* <Form.Item name="seriHoaDon" label="Số hóa đơn">
            <Select
              placeholder="Chọn số hoá đơn"
              style={{
                width: "100%",
              }}
              options={
                seriHoaDonOptions
                  ? seriHoaDon.map((item) => ({
                      value: item,
                      label: item,
                    }))
                  : []
              }
            />
          </Form.Item> */}

          <Form.Item name="seriHoaDon" label="Số hóa đơn">
            <Select
              placeholder="Chọn kỳ ghi chỉ số"
              style={{
                width: "100%",
              }}
              options={seriHoaDon?.data?.data.map((item) => ({
                value: item.id,
                label: item.soHoaDon,
              }))}
              disabled
            />
          </Form.Item>
          
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} style={{ width: "100%" }}>
          <Form.Item name="trangThaiDoc" label="Trạng thái đọc">
            {/* <Input placeholder="Trạng thái đọc" /> */}
            <Select
              placeholder="Chọn trạng thái đọc"
              style={{
                width: "100%",
              }}
              disabled={true}
              options={[
                {
                  value: 1,
                  label: "Đã ghi",
                },
                {
                  value: 2,
                  label: "Chưa ghi",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={12} style={{ width: "100%" }}>
          <Form.Item name="ghiChu" label="Ghi chú">
            <Input placeholder="Ghi chú" disabled/>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
