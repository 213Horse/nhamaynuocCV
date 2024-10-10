import { LoadingOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Popover, Row, Select, Tabs } from "antd";
import "./WriteIndexModal.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardItemSoDoc from "./CardItemSoDoc";
import CardItemDetailSoDoc from "./CardItemDetailSoDoc";
import {
  getAllSoDocSelector,
  getListChiSoDongHo,
  getListSoDocChiSo,
  isLoadingChiSoDongHoTuSoDocSelector,
  btnClickGetFactoryIdSelector,
  btnClickTabReadingIndexSelector,
  btnClickFilterChiSoDongHoSelector,
} from "../../../redux/selector";
import { fetchApiDsTrangThaiGhi } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import FormFilterChiSoDongHo from "./FormFilterChiSoDongHo";
import { AdvancedSearchForm as FormSearchWriteModalIndex } from "../../../components/FormSearchReadingIndex/FormSearchWriteModalIndex";
import {
  GetKhuVucQuery,
  GetKyGhiChiSoQuery,
  GetTuyenDocQuery,
} from "../../../graphql/readingIndex/readingIndexQuery";
import { useQuery } from "@apollo/client";
import { LOAD_ALL_CAN_BO_DOC } from "../../../graphql/users/usersQuery";
import { setNhaMayChange } from "../../../redux/slices/currentPageSlice/currentPageSlice";
const itemsPerPage = 12;

export const WriteIndexModal = (props) => {
  const { isModalWriteIndex, setIsModalWriteIndex, paginationTable } = props;
  const [selector, setSelector] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageDsChiSoDH, setCurrentPageDsChiSoDH] = useState(1);
  const [thang,setThang] = useState(null)
  const dispatch = useDispatch();
  // selector
  const listData = useSelector(getListSoDocChiSo);
  const listChiSoDongHoTuSoDoc = useSelector(getListChiSoDongHo);
  const isLoadingChiSoDongHo = useSelector(isLoadingChiSoDongHoTuSoDocSelector);
  const soDoc = useSelector(btnClickTabReadingIndexSelector);
  const { data: listKGCS } = useQuery(GetKyGhiChiSoQuery);
  const { data: listTuyenDoc } = useQuery(GetTuyenDocQuery);
  const { data: listKhuVuc } = useQuery(GetKhuVucQuery);
  const { data: canBoDocs } = useQuery(LOAD_ALL_CAN_BO_DOC, {
    variables: {
      first: 100,
      roleCanBo: "Cán bộ đọc",
    },
  });

  // handle change page (ds Sổ đọc)
  const onPageChangeSoDoc = (page, pageSize) => {
    setCurrentPage(page);
  };

  // handle change page (ds chỉ số đh)
  const handleOnChangeDetailPage = (page, pageSize) => {
    setCurrentPageDsChiSoDH(page);
  };

  // ds sổ đọc
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const dsSoDoc = listData?.items?.slice(startIndex, endIndex);
  const listSoDoc = useSelector(getAllSoDocSelector);
  // ds chỉ số đh
  const startIndexChiSoDH = (currentPageDsChiSoDH - 1) * itemsPerPage;
  const endIndexChiSoDH = currentPageDsChiSoDH * itemsPerPage;
  const dsChiSoDongHoTuSoDoc = Array.isArray(listChiSoDongHoTuSoDoc)
    ? listChiSoDongHoTuSoDoc.slice(startIndexChiSoDH, endIndexChiSoDH)
    : [];
// const filter = useSelector(btnClickFilterChiSoDongHoSelector)
// console.log("")
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
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

  // handle load Input type select (Trạng thái ghi)
  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(fetchApiDsTrangThaiGhi(queryString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTroLaiClick = () => {
    setIsModalWriteIndex(false);
    dispatch(setNhaMayChange(1));
  };

  return (
    <div>
      {isModalWriteIndex && !selector && (
        <>
          <Row>
            <Col xs={{ span: 7 }} sm={{ span: 7 }} md={{ span: 2 }}>
              <Button
                onClick={handleTroLaiClick}
                style={{
                  fontSize: 15,
                }}
              >
                <RollbackOutlined /> Trở lại
              </Button>
            </Col>
            <Col xs={{ span: 17 }} sm={{ span: 17 }} md={{ span: 7 }}>
              <Row>
                <Popover
                  placement="bottom"
                  content={
                    <FormSearchWriteModalIndex
                      listKGCS={listKGCS?.GetKyGhiChiSos?.nodes}
                      listTuyenDoc={listTuyenDoc?.GetTuyenDocs?.nodes}
                      listKhuVuc={listKhuVuc?.GetKhuVucs?.nodes}
                      canBoDocs={canBoDocs}
                    />
                  }
                  trigger="click"
                >
                  <Button type="primary">Tìm kiếm</Button>
                </Popover>
              </Row>
            </Col>
            {/* <Col span={5}>
              <Select defaultValue="Chọn biểu mẫu">
                <Select.Option value="Chọn biểu mẫu">
                  Chọn biểu mẫu
                </Select.Option>
                <Select.Option value="biểu mẫu 2">
                  Chọn biểu mẫu 2
                </Select.Option>
              </Select>
            </Col> */}
          </Row>
          <Row
            gutter={[10, 10]}
            style={{
              marginTop: "3%",
            }}
          >
            {listSoDoc?.map((item) => {
              return (
                <CardItemSoDoc
                  key={item.id}
                  item={item}
                  isReadingIndex={true}
                  isBlockType={3}
                  setSelector={setSelector}
                />
              );
            })}
          </Row>
          <Row
            style={{
              justifyContent: "center",
              margin: "3% 0 5rem -10%",
            }}
          >
            {paginationTable()}
          </Row>
        </>
      )}

      {selector && isModalWriteIndex && (
        <>
          <Row>
            <Col xs={{ span: 7 }} sm={{ span: 7 }} md={{ span: 2 }}>
              <Button
                onClick={() => setSelector(null)}
                style={{
                  fontSize: 15,
                }}
              >
                <RollbackOutlined /> Trở lại
              </Button>
            </Col>
            <Col xs={{ span: 17 }} sm={{ span: 17 }} md={{ span: 7 }}>
              <Row>
                <Popover
                  placement="right"
                  content={<FormFilterChiSoDongHo selector={selector} />}
                  trigger="click"
                >
                  <Button type="primary">Tìm kiếm</Button>
                </Popover>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "2rem",
            }}
          >
            <Tabs
              defaultActiveKey="2"
              items={[
                { key: "1", label: "Bản đồ" },
                {
                  key: "2",
                  label: `Danh sách (${listChiSoDongHoTuSoDoc?.length})`,
                },
              ]}
              // onChange={onChange}
              size="large"
            />
          </Row>
          <Row
            gutter={[10, 10]}
            style={{
              marginTop: "3%",
            }}
          >
            {isLoadingChiSoDongHo ? (
              <LoadingOutlined spin style={{ color: "blue" }} />
            ) : (
              dsChiSoDongHoTuSoDoc?.map((item) => {
                return <CardItemDetailSoDoc key={item.id} item={item} />;
              })
            )}
          </Row>
          <Row
            style={{
              justifyContent: "center",
              margin: "5% 0 5rem -10%",
            }}
          >
            <Pagination
              defaultCurrent={1}
              total={listChiSoDongHoTuSoDoc?.length}
              current={currentPageDsChiSoDH}
              pageSize={itemsPerPage}
              showSizeChanger={false}
              onChange={handleOnChangeDetailPage}
            />
          </Row>
        </>
      )}
    </div>
  );
};
