import { gql, useQuery } from "@apollo/client";
import {
  AutoComplete,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
import apolloClient from "../../../config/apolloClient";
import { getRequest } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector, fetchApiAllPaymentMethodSelector, getCanBoDoc, getMemberSelector } from "../../../redux/selector";
import { fetchCanBoThu } from "../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { fetchApiAllPaymentMethod } from "../../../redux/slices/paymentMethodSlice/paymentMethodSlice";
import { fetchGetMember } from "../../../redux/slices/thanhVienSlice/thanhVienSlice";

export const FormClock = ({ rowSelection, setClockInfo, formEditInvoice }) => {
  // const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [dsDoiTuongGia, setDsDoiTuongGia] = useState([]);
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const canBoThuTien = useSelector(getCanBoDoc)
  const hinhThucTT = useSelector(fetchApiAllPaymentMethodSelector)
  const members = useSelector(getMemberSelector)
  


  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryID}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    const nhaMayIds = createFilterQueryString();
    getRequest(`doi-tuong-gia/get-all?${nhaMayIds}`).then((res) => {
      var result = res.data.data.map((item) => ({
        value: item.id,
        label: item.keyId,
      }));
      setDsDoiTuongGia(result);
    });
  }, [factoryID]);

  useEffect(() => {
    const nhaMayIds = createFilterQueryString();
    dispatch(fetchGetMember(nhaMayIds))
  }, [factoryID]);

  useEffect(() => {
    const queryString = createFilterQueryString()
   dispatch(fetchCanBoThu(queryString))
  }, [factoryID]);

  useEffect(() => {
    const queryString = createFilterQueryString()
   dispatch(fetchApiAllPaymentMethod(queryString))
  }, [factoryID]);

  
  

  const handleUpdateTieuThuField = (event) => {
    const { id, value } = event.target;
    console.log("event", event);
    console.log(id, value);

    switch (id) {
      case "cSdau":
        formEditInvoice.setFieldValue("cSdau", value);
        break;
      case "cScuoi":
        formEditInvoice.setFieldValue("cScuoi", value);
        break;
      case "soNuocKM":
        formEditInvoice.setFieldValue("soNuocKM", value);
        break;
      case "tenVung":
        formEditInvoice.setFieldValue("tenVung", value);
        break;
      case "tenKhuVuc":
        formEditInvoice.setFieldValue("tenKhuVuc", value);
        break;
      case "truyThu":
        formEditInvoice.setFieldValue("truyThu", value);
        break;
      default:
        break;
    }

    const csdauField = formEditInvoice.getFieldValue("cSdau");
    const cscuoiField = formEditInvoice.getFieldValue("cScuoi");
    const soNuocKmField = formEditInvoice.getFieldValue("soNuocKM");
    const truyThuField = formEditInvoice.getFieldValue("truyThu");

    formEditInvoice.setFieldValue(
      "tieuThu",
      Number(cscuoiField) -
        Number(csdauField) -
        Number(soNuocKmField) +
        Number(truyThuField)
    );
  };

  const [inputSearchTuyenDoc, setInputSearchTuyenDoc] = useState("");
  const [resultSearchTuyenDoc, setResultSearchTuyenDoc] = useState([]);
  const GET_TUYEN_DOC = gql`
    query GetTuyenDocs($first: Int, $name: String, $factoryID: [String]) {
      GetTuyenDocs(
        first: $first
        order: { createdTime: DESC }
        where: {
          keyId: { contains: $name }
          deletedTime: { eq: null }
          isHide: { eq: false }
          nhaMayId: { in: $factoryID }
        }
      ) {
        nodes {
          id
          keyId
          tenTuyen
        }
      }
    }
  `;
  useEffect(() => {
    let factoryIdArr = [];
    if (factoryID === "all") {
      factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData")).map(
        (factory) => factory.nhaMayId
      );
    } else {
      factoryIdArr = [factoryID];
      console.log("factoryIdArr", factoryIdArr);
    }
    apolloClient
      .query({
        query: GET_TUYEN_DOC,
        variables: {
          first: 100,
          name: inputSearchTuyenDoc,
          factoryID: factoryIdArr,
        },
      })
      .then((result) => {
        console.log(result);
        setResultSearchTuyenDoc(result.data.GetTuyenDocs.nodes);
      });
  }, [factoryID]);

  const [innputSearchHopDong, setInputSearchHopDong] = useState("");
  const [resultSearchHopDong, setResultSearchHopDong] = useState([]);
  const GET_HOP_DONG = gql`
    query GetHopDongs($first: Int, $name: String) {
      GetHopDongs(
        first: $first
        where: { keyId: { contains: $name }, isHide: { eq: false } }
      ) {
        nodes {
          id
          keyId
          dongHoNuocs {
            keyId
          }
        }
      }
    }
  `;
  useEffect(() => {
    apolloClient
      .query({
        query: GET_HOP_DONG,
        variables: {
          first: 100,
          name: innputSearchHopDong,
        },
      })
      .then((result) => {
        console.log(result);
        setResultSearchHopDong(result.data.GetHopDongs.nodes);
      });
  }, [innputSearchHopDong]);

console.log("hinhthuc",hinhThucTT)

  return (
    <div className="clock-info">
      <Row gutter={24}>
        <Col
          style={{
            width: "100%",
          }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
        >
          <Form.Item
            name="nhanVienQuanLyId"
            label="Nhân viên"
            rules={[{ required: true }]}
          >
            <Select
              disabled
              mode="multiple"
              placeholder="Chọn nhân viên"
              style={{
                width: "100%",
              }}
              options={members?.map((item) => ({
                value: item.userId,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Col>
        <Col
          style={{
            width: "100%",
          }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
        >
          <Form.Item name="tuyenDocId" label="Tuyến đọc">
            <Select
              options={resultSearchTuyenDoc?.map((item) => ({
                value: item.id,
                label: item.tenTuyen,
              }))}
              style={{
                width: "100%",
              }}
              // onChange={(value) => {
              //   setInputSearchTuyenDoc(value);
              // }}
              placeholder="Tuyến đọc"
              disabled
            />
          </Form.Item>
        </Col>
        <Col
          style={{
            width: "100%",
          }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
        >
          <Form.Item name="soHopDong" label="Số hợp đồng">
            <AutoComplete
              options={resultSearchHopDong?.map((item) => ({
                label: item.keyId,
                value: item.keyId,
              }))}
              style={{
                width: "100%",
              }}
              onChange={(value) => {
                setInputSearchHopDong(value);
              }}
              onSelect={(value) => {
                formEditInvoice.setFieldsValue({
                  maDongHo: resultSearchHopDong?.filter(
                    (item) => item.keyId === value
                  )[0]?.dongHoNuocs[0]?.keyId,
                });
              }}
              placeholder="Số hợp đồng"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={6}
          style={{
            width: "100%",
          }}
        >
          <Form.Item name="maDongHo" label="Mã đồng hồ">
            <Input placeholder="Mã đồng hồ" disabled />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Form.Item
            name="cSdau"
            label="CS đầu"
            rules={[{ required: true }]}
            onChange={handleUpdateTieuThuField}
          >
            <InputNumber/>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Form.Item
            name="cScuoi"
            label="CS cuối"
            rules={[{ required: true }]}
            onChange={handleUpdateTieuThuField}
          >
            <InputNumber/>
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={6}
          style={{
            width: "100%",
          }}
        >
          <Form.Item name="tieuThu" label="Tiêu thụ">
            <InputNumber disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={6}
          style={{
            width: "100%",
          }}
        >
          <Form.Item name="maDongHoCu" label="Mã đồng hồ cũ">
            <Input placeholder="Mã đồng hồ cũ" disabled />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <Form.Item
            name="cSdauCu"
            label="CS đầu cũ"
            onChange={handleUpdateTieuThuField}
          >
            <InputNumber disabled/>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Form.Item
            name="cScuoiCu"
            label="CS cuối cũ"
            onChange={handleUpdateTieuThuField}
          >
            <InputNumber disabled/>
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={6}
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="truyThu"
            label="Truy thu"
            onChange={handleUpdateTieuThuField}
          >
            <InputNumber disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="soNuocKM"
            label="Số nước KM"
            onChange={handleUpdateTieuThuField}
          >
            <InputNumber disabled/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="hinhThucThanhToan" label="Hình thức TT">
            <Select
              placeholder="Chọn hình thức TT"
              style={{
                width: "100%",
              }}
              options={hinhThucTT?.map((item) => ({
                value: item.id,
                label: item.moTaPhuongThuc,
              }))}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="doiTuongGiaId" label="Đối tượng giá">
            <Select
              placeholder="Chọn đối tượng giá"
              style={{
                width: "100%",
              }}
              options={dsDoiTuongGia}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="tenVung"
            label="Tên vùng"
            onChange={handleUpdateTieuThuField}
          >
            <Input placeholder="Nhập tên vùng" disabled/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tenKhuVuc"
            label="Tên khu vực"
            onChange={handleUpdateTieuThuField}
          >
            <Input placeholder="Nhập tên khu vực" disabled/>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
