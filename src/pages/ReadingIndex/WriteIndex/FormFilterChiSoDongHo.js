import { Button, Checkbox, Divider, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BorderOutlined, LoadingOutlined } from "@ant-design/icons";

import {
  btnClickGetFactoryIdSelector,
  fetchApiDsTrangThaiGhiSelector,
  getAllSoDocSelector,
  isLoadingFilterDsChiSoDHSelector,
  readingIndexTotalQuerySelector,
} from "../../../redux/selector";
import readingIndexSlice, {
  fetchApiFilterDsChiSoDongHo, fetchApiGetChiSoDongHoTuSoDoc,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function FormFilterChiSoDongHo({selector}) {
  const [formFilter] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  const dispatch = useDispatch();
  const listSoDoc = useSelector(getAllSoDocSelector);
  const dsTrangThaiGhi = useSelector(fetchApiDsTrangThaiGhiSelector);
  const isLoading = useSelector(isLoadingFilterDsChiSoDHSelector);
  const nhaMayIds = useSelector(btnClickGetFactoryIdSelector);
  
  // useEffect(() => {
  //   if (nhaMayId) {
  //     formFilter.setFieldsValue({ nhaMayIds: nhaMayId ? [nhaMayId] : [] });
  //   }
  // }, [nhaMayId, formFilter]);

  // handle filter (Chỉ số đh)
  const createFilterQueryString = (filterForm) => {
    let queryString = "";
    for (const key in filterForm) {
      if (filterForm[key]) {
        if (queryString === "") {
          queryString += `${key}=${filterForm[key]}`;
        } else {
          queryString += `&${key}=${filterForm[key]}`;
        }
      }
    }
    console.log(`${queryString}`);
    return `${queryString}`;
  };

  console.log("list", listSoDoc);
  const createFilterFactoryString = () => {
    let factoryQueryString = "";
    if (nhaMayIds === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayIds}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayIds}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayIds}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const handleSubmit = (values) => {
    const factoryURI = createFilterFactoryString();
    const monthOfSoDoc = dayjs(selector.ngayCuoiKy).format("MM/YYYY")
    values.monthOfSoDoc = monthOfSoDoc
    const formValueURI = createFilterQueryString(values);
    const queryString = `${formValueURI}&${factoryURI}&pageNumber=1&pageSize=1000000000`;
    dispatch(
      fetchApiFilterDsChiSoDongHo(queryString)
    );
    dispatch(readingIndexSlice.actions.btnClickFilterChiSoDongHo("FILTER"));
  };

  // handle failed
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  // handle reset list
  const handleReset = () => {
    const soDocId = selector.id;
    const monthOfSoDoc = dayjs(selector.ngayCuoiKy).format("MM/YYYY")
    const isBlockType = 3
    const value = {
      monthOfSoDoc,
      soDocId,
      isBlockType ,
      factoryIdArr: createFilterQueryString(),
    };
    dispatch(fetchApiGetChiSoDongHoTuSoDoc(value));
    dispatch(readingIndexSlice.actions.btnClickFilterChiSoDongHo("UN_FILTER"));
    formFilter.resetFields();
  };

  return (
    <>
      <Divider orientation="left">
        <b>
          <i>Thông tin tìm kiếm</i>
        </b>
      </Divider>

      <Form
        form={formFilter}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        {/* Mã KH */}
        <Form.Item name="maKhachHang" label="Mã KH" {...formItemLayout}>
          <Input name="maKhachHang" placeholder="Nhập mã khách hàng" />
        </Form.Item>

        {/* Trạng thái ghi */}
        <Form.Item
          name="trangThaiGhiId"
          label="Trạng thái ghi"
          {...formItemLayout}
        >
          <Select
            fieldNames="trangThaiGhiId"
            placeholder="Chọn trạng thái ghi"
            style={{ width: "200px" }}
          >
            {dsTrangThaiGhi?.map((_trangThaiGhi) => {
              return (
                <Select.Option key={_trangThaiGhi.id} value={_trangThaiGhi.id}>
                  <BorderOutlined
                    style={{
                      color: `${_trangThaiGhi.maMau}`,
                      backgroundColor: `${_trangThaiGhi.maMau}`,
                      marginRight: "6px",
                    }}
                  />
                  {_trangThaiGhi.tenTrangThai}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {/* Vị trí */}
        <Form.Item name="haveLocation" label="Vị trí" {...formItemLayout}>
          <Checkbox name="haveLocation" />
        </Form.Item>

        {/* Tiêu thụ */}
        <Form.Item name="haveConsumption" label="Tiêu thụ" {...formItemLayout}>
          <Checkbox name="haveConsumption" />
        </Form.Item>

        {/* Ghi chú */}
        <Form.Item name="haveNotes" label="Ghi chú" {...formItemLayout}>
          <Checkbox name="haveNotes" />
        </Form.Item>

        {/* Hình ảnh  */}
        <Form.Item name="haveImage" label="Hình ảnh" {...formItemLayout}>
          <Checkbox name="haveImage" />
        </Form.Item>

        {/* Mã KH */}
        {/* <Form.Item name="nhaMayIds" hidden>
          <Input name="nhaMayIds" disabled />
        </Form.Item> */}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleReset} style={{ marginRight: "12px" }}>
            Làm mới
          </Button>
          <Button type="primary" htmlType="submit">
            {isLoading ? <LoadingOutlined spin /> : "Tìm kiếm"}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default FormFilterChiSoDongHo;
