import { React, useEffect, useState } from "react";
// import { initialData } from "../../utils/dataBlock";
import TabListBC from "./FormBlockClock/TableListBC";
import "../../components/GlobalStyles/GlobalStyles.css";
import "../Manager/Contract/Contract.css";
import { Form, Input, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import tabListInvoicePrintSlice from "../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { fetchApiAllArea } from "../../redux/slices/areaSlice/areaSlice";
import { getAllDMTotalByType } from "../../redux/slices/DmTotalSlice/DmTotalSlice";
import { fetchReasonData } from "../../redux/slices/reasonSlice/reasonSlice";
import { fetchApiAllRegion } from "../../redux/slices/regionSlice/regionSlice";
import { getAllNguoiDung } from "../../redux/slices/NguoiDungSlice/nguoidungSlice";
import {
  btnClickGetFactoryIdSelector,
  fetchApiGetAllClockWaterSelector,
} from "../../redux/selector";
import { useQuery } from "@apollo/client";
import { GetTuyenDocsByNhaMay } from "../../graphql/ManagementReading/ManagementReadingQuery";
import TableBlockClock from "./TableBlockClock/TableBlockClock";
import { getAllKy } from "../../redux/slices/DMKy/kySlice";
import { btnClickTabListContract } from "../../redux/slices/tabListContractSlice/tabListContractSlice";
import { getAllDMTuyenDoc } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import tabListReadingSlice from "../../redux/slices/tabListReading/tabListReaingSlice";
import {
  fetchApiGetAllClockWater,
  fetchApiWaterClock,
  fetchClockWaterByNhaMayId,
} from "../../redux/slices/waterClockSlice/waterClockSlice";
import { fetchGetAllBlock } from "../../redux/slices/blockSlice/blockSlice";
moment.locale("vi");

function BlockClock(tuyenDocId, { onSearch }) {
  const dispatch = useDispatch();
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

    setFactoryIdArr(factory);
  }, [factoryId]);

  const { data: tuyenDocs } = useQuery(GetTuyenDocsByNhaMay, {
    variables: {
      first: 100,
      nhaMayId: factoryIdArr ? factoryIdArr : null,
    },
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [searchQuery, setSearchQuery] = useState("");

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    return `${factoryQueryString}&pageSize=100&page=1`;
  };

  useEffect(() => {

    dispatch(getAllKy());
    dispatch(getAllNguoiDung());
    dispatch(btnClickTabListContract(null));
    dispatch(getAllDMTuyenDoc(factoryIdArr));
    dispatch(fetchApiAllArea());
    dispatch(fetchReasonData());
    // dispatch(fetchApiAllRegion());
    factoryId && dispatch(fetchClockWaterByNhaMayId(createFilterQueryString()));
    dispatch(fetchApiWaterClock());

    return () => {
      dispatch(tabListReadingSlice.actions.btnClickTabListReading(null));
    };
  }, [factoryId, tuyenDocId]);

  const AdvancedSearchForm = () => {
    const layout = {
      labelCol: {
        span: 13,
      },
      wrapperCol: {
        span: 30,
      },
    };
    return (
      <Form {...layout}>
        <Form.Item
          lassName="custom-form-item"
          label="Nhập mã đồng hồ cần tìm kiếm"
          name="9"
        >
          <Input
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      {/* <AdvancedSearchForm /> */}
      <AdvancedSearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div
        className="management-price-subject-table"
        style={{ marginTop: "10px" }}
      >
        <TableBlockClock searchQuery={searchQuery} />
      </div>
      {/* func bottom */}
      <div className="contract-bottom">
        {/* check mobile */}
        {isTabletOrMobile ? (
          <Popover
            size="small"
            rootClassName="fix-popover-z-index"
            placement="bottomRight"
            trigger="click"
            content={
              <TabListBC
                tuyenDocs={tuyenDocs?.GetTuyenDocs?.nodes}
                isTabletOrMobile={isTabletOrMobile}
              />
            }
          >
            <div className="contract-bottom-func">
              <PlusOutlined />
            </div>
          </Popover>
        ) : (
          <div className="contract-bottom-func">
            <TabListBC
              createFilterQueryString={createFilterQueryString}
              tuyenDocs={tuyenDocs?.GetTuyenDocs?.nodes}
            />
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
export default BlockClock;
