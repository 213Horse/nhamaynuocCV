import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableReading from "./components/TableReading/TableReading";
import { btnClickTabListContract } from "../../../redux/slices/tabListContractSlice/tabListContractSlice";
import { getAllDMTuyenDoc } from "../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import Header from "../../../components/CategoryHeader/CategoryHeader";
import { getAllNguoiDung } from "../../../redux/slices/NguoiDungSlice/nguoidungSlice";
import { getAllKy } from "../../../redux/slices/DMKy/kySlice";
import tabListReadingSlice from "../../../redux/slices/tabListReading/tabListReaingSlice";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import { fetchApiAllAreaByNhaMay } from "../../../redux/slices/areaSlice/areaSlice";

const ManagementReading = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const [factoryIdArr, setFactoryIdArr] = useState([]);

  //get array nhaMayId
  useEffect(() => {
    let factory = [];
    if (factoryId === "all") {
      factory = JSON.parse(sessionStorage.getItem("nhaMaysData")).map(
        (factory) => factory.nhaMayId
      );
    } else {
      factory = [factoryId];
    }
    console.log(factory);
    setFactoryIdArr(factory);
    dispatch(getAllDMTuyenDoc(factory));
  }, [factoryId]);

  useEffect(() => {
    dispatch(getAllKy());
    dispatch(getAllNguoiDung());
    dispatch(btnClickTabListContract(null));

    return () => {
      dispatch(tabListReadingSlice.actions.btnClickTabListReading(null));
    };
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="management-price-subject-wrapper">
      <div className="management-price-subject-header">
        <Header onChange={handleChange} />
      </div>
      <div
        className="management-price-subject-table"
        style={{
          marginBottom: "5rem",
        }}
      >
        <TableReading searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ManagementReading;
