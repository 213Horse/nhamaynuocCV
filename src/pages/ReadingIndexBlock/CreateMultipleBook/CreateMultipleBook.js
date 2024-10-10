import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import { ViewDetailListClock } from "../ViewDetail/ViewDetailListClock";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  btnClickGetFactoryIdSelector,
  fetchApiAllFactorySelector,
  fetchApiGetListTuyenDocChuaTaoSoSelector,
  fetchApiGetNgayTrongSoDocTheoKySelector,
  getAllKySelector,
  setOptionThangNamSelector,
} from "../../../redux/selector";
import readingIndexSlice, {
  fetchApiGetNgayTrongSoDocTheoKy,
  fetchApiTaoSoDocChiSoDongLoat,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { getAllKy } from "../../../redux/slices/DMKy/kySlice";
import { toast } from "react-toastify";
import { fetchAllReadingIndexTotalBlock, fetchCreateReadingIndexTotalBlock } from "../../../redux/slices/readingIndexTotalSlice/readingIndexTotalSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
export const CreateMultipleBook = (props) => {
  const [form1] = Form.useForm();
  const [nhaMayId, setNhaMayId] = useState("");
  const { isOpen, handleOk, handleCancel } = props;

  const [isOpenModalViewDetail, setIsOpenModalViewDetail] = useState(false);

  const dispatch = useDispatch();

  // const dataKGCS = useSelector(getKGCSToCreateBookSelector);
  // const dataListCreateBook = useSelector(getListToCreateBookSelector);
  // const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const listFactory = useSelector(fetchApiAllFactorySelector);
  const dsKyGhiChiSo = useSelector(getAllKySelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const dsTuyenChuaTaoSoDoc = useSelector(
    fetchApiGetListTuyenDocChuaTaoSoSelector
  );
  const getNgayTheoKy = useSelector(fetchApiGetNgayTrongSoDocTheoKySelector);
  // const optionThangNam = useSelector(setOptionThangNamSelector);
  // const dataOptionThangNam = useSelector(
  //   fetchApiGetNgayTrongSoDocTheoKySelector
  // );

  // console.log("dsKyGhiChiSo", dsKyGhiChiSo);
  console.log("dsTuyenChuaTaoSoDoc", dsTuyenChuaTaoSoDoc);
  // console.log("nhaMayId", nhaMayId);
  // console.log("optionThangNam", optionThangNam);
  // console.log("dataOptionThangNam", dataOptionThangNam);

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(getAllKy(queryString));
  
  }, [factoryId]);

  // set default fields (sau khi chọn Kỳ ghi chỉ số)
  // useEffect(() => {
  //   if (dataOptionThangNam) {
  //     form1.setFieldsValue({
  //       ngayHoaDon: dayjs(dataOptionThangNam?.ngayHoaDon),
  //     });
  //     form1.setFieldsValue({ ngayDauKy: dayjs(dataOptionThangNam?.ngayDauKy) });
  //     form1.setFieldsValue({ ngayCuoiKy: dayjs(dataOptionThangNam?.ngayCuoiKy) });
  //   }
  // }, [dataOptionThangNam, form1]);

  // load kỳ ghi chỉ số
  const optionsKGCS = dsKyGhiChiSo?.map((item) => ({
    label: item.moTa,
    value: item.id,
  }));

  const layout = {
    labelCol: {
      span: 4,
    },
  };

  // Handle change (Kỳ ghi chỉ số -> tạo ra các ngày)
  const handleChangeKyGhiChiSo = (value) => {
    dispatch(
      fetchApiGetNgayTrongSoDocTheoKy({
        value: value,
        optionThangNam: form1.getFieldValue("thangTaoSoDoc"),
      })
    );
  };

  useEffect(() => {
    if (getNgayTheoKy) {
      form1.setFieldValue("ngayDauKy", dayjs(getNgayTheoKy.ngayDauKy));
      form1.setFieldValue("ngayHoaDon", dayjs(getNgayTheoKy.ngayHoaDon));
      form1.setFieldValue("ngayCuoiKy", dayjs(getNgayTheoKy.ngayCuoiKy));
    }
  }, [getNgayTheoKy]);

  const handleCreateBook = async () => {
    try {
      const values = await form1.validateFields();
      await dispatch(fetchCreateReadingIndexTotalBlock(values));
      dispatch(fetchAllReadingIndexTotalBlock({ nhaMayId, pageNumber: 1 }));
      handleCancel("", "multiple");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFailed = (error) => {
    console.log({ error });
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  return (
    <>
      <div
        style={{
          marginTop: 16,
        }}
      >
        <Form {...layout} form={form1} onFinishFailed={handleFailed}>
          <Row gutter={24}>
            <Col lg={24} style={{ width: "100%" }}>
              <Form.Item name="thangTaoSoDoc" label="Tháng" {...rules}>
                <DatePicker
                  locale={locale}
                  name="thangTaoSoDoc"
                  allowClear
                  placeholder="Chọn tháng"
                  format="MM-YYYY"
                  style={{ width: "100%" }}
                  picker="month"
                />
              </Form.Item>
            </Col>
            <Col lg={24} style={{ width: "100%" }}>
              <Form.Item name="nhaMayId" label="Nhà máy" {...rules}>
                <Select
                  placeholder="Chọn nhà máy"
                  style={{
                    width: "100%",
                  }}
                  onChange={(values) => setNhaMayId(values)}
                  options={listFactory?.map((item) => ({
                    label: item?.tenNhaMay,
                    value: item?.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={24} style={{ width: "100%" }}>
              <Form.Item name="kyGhiChiSoId" label="Kỳ ghi chỉ số" {...rules}>
                <Select
                  placeholder="Chọn kỳ ghi chỉ số"
                  fieldNames="kyGhiChiSoId"
                  style={{ width: "100%" }}
                  options={optionsKGCS}
                  onChange={handleChangeKyGhiChiSo}
                />
              </Form.Item>
              <Form.Item name="ngayDauKy" label="Ngày đầu kỳ" {...rules}>
                <DatePicker
                  allowClear
                  locale={locale}
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
            <Col lg={24} style={{ width: "100%" }}>
              <Form.Item name="ngayHoaDon" label="Ngày hóa đơn" {...rules}>
                <DatePicker
                  allowClear
                  locale={locale}
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
              <Form.Item name="ngayCuoiKy" label="Ngày cuối kỳ" {...rules}>
                <DatePicker
                  allowClear
                  locale={locale}
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Row
        style={{
          display: "flex",
          justifyContent: "justify-between",
          marginBottom: 16,
          marginTop: 16,
          width: "100%",
        }}
      >
        <div>
          <Checkbox style={{ marginRight: "13px" }}>Tạo biểu mẫu</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>Ghi chỉ số online</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>Không SD kỳ</Checkbox>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Button
            icon={<PlusCircleOutlined />}
            className="tab-item-readingIndex tab-item-readingIndex-1"
            style={{ marginRight: 5 }}
            onClick={handleCreateBook}
          >
            Tạo sổ đồng loạt
          </Button>
          <Button
            onClick={() => {
              dispatch(readingIndexSlice.actions.btnClickResetKyGS(null));
              handleCancel("", "multiple");
            }}
            size="middle"
            className="custom-btn-close"
          >
            <CloseOutlined />
            Đóng
          </Button>
        </div>
      </Row>
      <ViewDetailListClock
        isOpen={isOpenModalViewDetail}
        handleOk={() => setIsOpenModalViewDetail(false)}
        setIsOpen={setIsOpenModalViewDetail}
      />
    </>
  );
};
