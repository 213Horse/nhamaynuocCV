import React, { useEffect, useRef, useState } from "react";
import { Button, message, Modal } from "antd";
import Captcha from "../../../../../components/Captcha/Captcha";
import { deleteRequest } from "../../../../../services";
import { fetchApiAllPriceObject } from "../../../../../redux/slices/priceObjectSlice/priceObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../../../../redux/selector";

const ModalDelete = ({ isModalOpen, setIsOpenModalDelete, tabListPO }) => {
  const captchaRef = useRef();
  const [isCaptcha, setIsCaptcha] = useState(false);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dispatch = useDispatch();

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const handleOk = async () => {
    await deleteRequest(`doi-tuong-gia/delete/${tabListPO.keyId}`).then((res) => {
      console.log("res", res);
      if (res?.data?.code === "Success!") {
        setIsCaptcha(false);
        setIsOpenModalDelete(false);
        const queryString = createFilterQueryString();
        dispatch(fetchApiAllPriceObject(queryString));
        message.success("Xóa thành công!");
      }
    });
    setIsOpenModalDelete(false);
  };
  const handleCancel = () => {
    setIsOpenModalDelete(false);
  };

  useEffect(() => {
    console.log("tabListPO", tabListPO);
  }, [tabListPO]);
  return (
    <Modal
      title="Bạn có chắc chắn muốn xóa không?"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={400}
    >
      <Captcha
        onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
        ref={captchaRef}
      />
    </Modal>
  );
};
export default ModalDelete;
