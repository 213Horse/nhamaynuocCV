import {
  CheckCircleOutlined,
  CheckOutlined,
  DownSquareOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Pagination,
  Popover,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import { data } from "./_data";
import "./WriteIndexModal.css";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import CameraComponent from "./ConnectCamera";
import { useSelector } from "react-redux";
import {
  getAllKySelector,
  getListChiSoDongHo,
  getListSoDocChiSo,
  isLoadingChiSoDongHoTuSoDocSelector,
  readingIndexTotalFilterSelector,
  readingIndexTotalIsFilterBlockSelector,
  readingIndexTotalIsFilterSelector,
  readingIndexTotalQuerySelector,
} from "../../../redux/selector";
import { useQuery } from "@apollo/client";
import {
  GetKhuVucQuery,
  GetKyGhiChiSoQuery,
  GetTuyenDocQuery,
} from "../../../graphql/readingIndex/readingIndexQuery";
import { LOAD_ALL_CAN_BO_DOC } from "../../../graphql/users/usersQuery";
import { AdvancedSearchForm as FormSearchWriteModalIndex } from "../../../components/FormSearchReadingIndex/FormSearchWriteModalIndex";
import CardItemSoDoc from "../../ReadingIndex/WriteIndex/CardItemSoDoc";
import FormFilterChiSoDongHo from "../../ReadingIndex/WriteIndex/FormFilterChiSoDongHo";
import CardItemDetailSoDoc from "../../ReadingIndex/WriteIndex/CardItemDetailSoDoc";
import { FormSearchWriteModalIndexBlock } from "../../../components/FormSearchReadingIndex/FormSearchWriteModalIndexBlock";

export const WriteIndexModal = (props) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageDsChiSoDH, setCurrentPageDsChiSoDH] = useState(1);
  const { isModalWriteIndex, setIsModalWriteIndex } = props;
  const [indexPage, setIndexPage] = useState(1);
  const [selector, setSelector] = useState(null);
  const listChiSoDongHoTuSoDoc = useSelector(getListChiSoDongHo);
  const isLoadingChiSoDongHo = useSelector(isLoadingChiSoDongHoTuSoDocSelector);
  const listDataFilter = useSelector(readingIndexTotalFilterSelector);
  const isFilterData = useSelector(readingIndexTotalIsFilterBlockSelector);
  const listKGCS = useSelector(getAllKySelector);
  // const { data: listKGCS } = useQuery(GetKyGhiChiSoQuery);
  const { data: listTuyenDoc } = useQuery(GetTuyenDocQuery);
  const { data: listKhuVuc } = useQuery(GetKhuVucQuery);
  const { data: canBoDocs } = useQuery(LOAD_ALL_CAN_BO_DOC, {
    variables: {
      first: 100,
      roleCanBo: "Cán bộ đọc",
    },
  });
  const listData = useSelector(getListSoDocChiSo);
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
  const startIndexChiSoDH = (currentPageDsChiSoDH - 1) * itemsPerPage;
  const endIndexChiSoDH = currentPageDsChiSoDH * itemsPerPage;
  const dsChiSoDongHoTuSoDoc = listChiSoDongHoTuSoDoc?.slice(
    startIndexChiSoDH,
    endIndexChiSoDH
  );
  const listSoDoc = useSelector(readingIndexTotalQuerySelector);

  function onChange(pageNumber) {
    setIndexPage(pageNumber);
  }

  return (
    <div>
      {/* <div>
            {
                isModalWriteIndex && !selector &&
                <>
                    <Row>
                        <Col
                            xs={{ span: 7 }}
                            sm={{ span: 7 }}
                            md={{ span: 2 }}
                        >
                            <Button onClick={() => setIsModalWriteIndex(false)}
                                style={{
                                    fontSize: 15,
                                }} >
                                <RollbackOutlined /> Trở lại
                            </Button>
                        </Col>
                        <Col span={5}>
                            <Select defaultValue="Chọn biểu mẫu">
                                <Option value="Chọn biểu mẫu">Chọn biểu mẫu</Option>
                                <Option value="biểu mẫu 2">Chọn biểu mẫu 2</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[10, 10]}
                        style={{
                            marginTop: '3%',
                        }}
                    >
                        {
                            data.slice((indexPage - 1) * 12, (indexPage - 1) * 12 + 12).map((item) => {
                                return (
                                    <Frame1 item={item} setSelector={setSelector} />
                                )
                            }
                            )
                        }
                    </Row>
                    <Row style={{
                        justifyContent: "center",
                        margin: "3% 0 5rem -10%",
                    }}>
                        <Pagination defaultCurrent={1} total={15} onChange={(e) => onChange(e)} />
                    </Row>
                </>
            }
            {
                selector && isModalWriteIndex &&
                <>
                    <Row>
                        <Col
                            xs={{ span: 7 }}
                            sm={{ span: 7 }}
                            md={{ span: 2 }}
                        >
                            <Button onClick={() => setSelector(null)}
                                style={{
                                    fontSize: 15,
                                }} >
                                <RollbackOutlined /> Trở lại
                            </Button>
                        </Col>
                        <Col
                            xs={{ span: 17 }}
                            sm={{ span: 17 }}
                            md={{ span: 7 }}
                        >
                            <Row>
                                <Select defaultValue={`${selector.time} ${selector.address}`}
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {
                                        data.map((item) => {
                                            return (
                                                <Option value={`${item.time} ${item.address}`}>
                                                    <div
                                                        onClick={() => setSelector(item)}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    > {item.time} {item.address}</div>
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: '2rem'
                    }}>
                        <Tabs
                            defaultActiveKey="2"
                            items={[
                                { key: '1', label: 'Bản đồ' },
                                { key: '2', label: `Danh sách (${selector.subList.length})` },
                            ]}
                            // onChange={onChange}
                            size="large"
                        />
                    </Row>
                    <Row gutter={[10, 10]}
                        style={{
                            marginTop: '3%',
                        }}
                    >
                        {
                            selector.subList.map((item) => {
                                return (
                                    <Frame2 item={item} />
                                )
                            })}
                    </Row>
                    <Row style={{
                        justifyContent: "center",
                        margin: "5% 0 5rem -10%",
                    }}>
                        <Pagination defaultCurrent={1} total={selector.subList.lenght} onChange={(e) => onChange(e)} />
                    </Row>
                </>
            }
        </div> */}

      {isModalWriteIndex && !selector && (
        <>
          <Row>
            <Col xs={{ span: 7 }} sm={{ span: 7 }} md={{ span: 2 }}>
              <Button
                onClick={() => setIsModalWriteIndex(false)}
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
                    <FormSearchWriteModalIndexBlock
                      listKGCS={listKGCS}
                      listTuyenDoc={listTuyenDoc?.GetTuyenDocs?.nodes}
                      listKhuVuc={listKhuVuc?.GetKhuVucs?.nodes}
                      canBoDocs={canBoDocs?.GetUsers?.nodes || []}
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
            {(isFilterData ? listDataFilter?.items : listSoDoc?.items)?.map(
              (item, index) => {
                return (
                  <CardItemSoDoc
                    key={item.id}
                    item={item}
                    isReadingIndex={false}
                    isBlockType={2}
                    setSelector={setSelector}
                  />
                );
              }
            )}
          </Row>
          <Row
            style={{
              justifyContent: "center",
              margin: "3% 0 5rem -10%",
            }}
          >
            <Pagination
              defaultCurrent={1}
              total={listData?.items?.length}
              current={currentPage}
              pageSize={itemsPerPage}
              showSizeChanger={false}
              onChange={onPageChangeSoDoc}
            />
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
                  content={<FormFilterChiSoDongHo />}
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

function Frame1({ item, setSelector }) {
  return (
    <Col
      key={item.key}
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 8 }}
      style={{
        cursor: "pointer",
      }}
      onClick={() => setSelector(item)}
    >
      <Card className="bigger">
        <div
          style={{
            height: 50,
            overflow: "hidden",
          }}
        >
          <h3>
            {item.time} {item.address}
          </h3>
        </div>
        <p>Đồng hồ: {item.amount}</p>
        <b
          style={{
            color: "green",
          }}
        >
          0 bản ghi và 0 ảnh cần đồng bộ
        </b>
      </Card>
    </Col>
  );
}

function Frame2({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeClock, setTypeClock] = useState("loai 1");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const styleIndex = {
    fontSize: 20,
    padding: "1rem",
  };

  const styleTitle = {
    fontSize: 15,
    padding: "1rem",
    backgroundColor: "rgb(211, 211, 211)",
    fontWeight: "bold",
    color: "gray",
  };
  return (
    <>
      <Col
        key={item.key}
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        style={{
          cursor: "pointer",
        }}
        onClick={() => showModal()}
      >
        <Card className="bigger">
          <Row
            style={{
              height: 50,
              overflow: "hidden",
            }}
          >
            <h3>{item.title}</h3>
          </Row>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={16}>CS Đầu: {item.cs1}</Col>
                <Col span={8}>CS Cuối: {item.cs2}</Col>
              </Row>
              <Row>
                <Col span={18}>Số lượng: {item.amount}</Col>
              </Row>
              <Row>
                <Col span={20}>Cập nhật ngày: {item.updateDate}</Col>
                <Col
                  span={4}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: -20,
                  }}
                >
                  <div
                    style={{
                      color: "green",
                      fontSize: 25,
                    }}
                  >
                    <CheckCircleOutlined />
                  </div>
                  <div
                    style={{
                      color: "orange",
                      fontSize: 25,
                    }}
                  >
                    <EnvironmentOutlined />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Modal
        // title={item.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1100}
      >
        <div
          id="write-index"
          style={{
            height: "70vh",
            overflowY: "scroll",
            borderRadius: "1rem",
          }}
        >
          <Row style={{ marginTop: "3rem" }}>
            <Col span={24}>
              <h3>{item.title}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 17 }} sm={{ span: 17 }} md={{ span: 5 }}>
              <Select
                defaultValue="green"
                style={{
                  width: "200px",
                }}
                options={[
                  {
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "black",
                            width: 20,
                            height: 20,
                          }}
                        />
                        Tạm ngừng
                      </div>
                    ),
                    value: "black",
                  },
                  {
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "blue",
                            width: 20,
                            height: 20,
                          }}
                        />
                        Tạm thu
                      </div>
                    ),
                    value: "blue",
                  },
                  {
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "brown",
                            width: 20,
                            height: 20,
                          }}
                        />
                        Vắng chủ
                      </div>
                    ),
                  },
                  {
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "gray",
                            width: 20,
                            height: 20,
                          }}
                        />
                        ĐH không sử dụng
                      </div>
                    ),
                    value: "gray",
                  },
                  {
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "pink",
                            width: 20,
                            height: 20,
                          }}
                        />
                        ĐH cắt
                      </div>
                    ),
                    value: "pink",
                  },
                  {
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "green",
                            width: 20,
                            height: 20,
                          }}
                        />{" "}
                        Đã ghi
                      </div>
                    ),
                    value: "green",
                  },
                  {
                    // label: 'Chưa ghi',
                    // value: 'red'
                    label: (
                      <div
                        style={{
                          display: "flex",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 20,
                            height: 20,
                          }}
                        />{" "}
                        Chưa ghi
                      </div>
                    ),
                    value: "red",
                  },
                ]}
              />
            </Col>
            <Col span={2}>
              <Button type="primary" icon={<SaveOutlined />} />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <Row>
                <Col span={24} style={{ margin: "1rem 0" }}>
                  <Card>
                    <h2 style={{ textAlign: "center", lineHeight: ".5rem" }}>
                      Sinh hoạt ABC
                    </h2>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ margin: "1rem 0" }}>
                  <div
                    style={{
                      overflow: "hidden",
                      borderRadius: "5px",
                      border: ".5px gray solid",
                    }}
                  >
                    <Row style={{ border: ".5px gray solid" }}>
                      <Col span={10} style={styleTitle}>
                        Tháng 5
                      </Col>
                      <Col span={7} push={1} style={styleIndex}>
                        <b>123</b>
                      </Col>
                      <Col
                        span={6}
                        style={{ ...styleIndex, textAlign: "right" }}
                      >
                        <b>123</b>
                      </Col>
                    </Row>
                    <Row style={{ border: ".5px gray solid" }}>
                      <Col span={10} style={styleTitle}>
                        Tháng 6
                      </Col>
                      <Col span={7} push={1} style={styleIndex}>
                        <b>123</b>
                      </Col>
                      <Col
                        span={6}
                        style={{ ...styleIndex, textAlign: "right" }}
                      >
                        <b>123</b>
                      </Col>
                    </Row>
                    <Row style={{ border: ".5px gray solid" }}>
                      <Col span={10} style={styleTitle}>
                        Tháng 7
                      </Col>
                      <Col span={7} push={1} style={styleIndex}>
                        <b>123</b>
                      </Col>
                      <Col
                        span={6}
                        style={{ ...styleIndex, textAlign: "right" }}
                      >
                        <b>123</b>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ margin: "1rem 0" }}>
                  <div
                    style={{
                      textAlign: "center",
                      padding: ".5rem",
                      border: "1px gray solid",
                      borderRadius: ".5rem",
                    }}
                  >
                    <h1>123</h1>
                  </div>
                </Col>
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "1rem 0",
                }}
              />
              <Row>
                <h3>Mục đích sử dụng</h3>
                <br />
                <br />
                <Input defaultValue={"Sinh hoat ABC"} />
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "2rem 0",
                }}
              />
              <Row>
                <h3>Hình ảnh</h3>
              </Row>
              <Row>
                <Col span={24}>
                  <CameraComponent />
                </Col>
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "2rem 0",
                }}
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 11, offset: 1 }}
            >
              <Row>
                <h3>Số hiệu đồng hồ</h3>
                <br />
                <br />
                <Input defaultValue={"12345"} />
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "2rem 0",
                }}
              />
              <Row>
                <h3>Số điện thoại</h3>
                <br />
                <br />
                <Input />
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "2rem 0",
                }}
              />
              <Row>
                <Col span={24}>
                  <h3>Loại đồng hồ</h3>
                  <br />
                  <Row>
                    <Col span={15}>
                      <div
                        style={{
                          border: ".5px gray solid",
                          borderRadius: "5px",
                          minHeight: "3.2rem",
                          padding: ".2rem 0 0 1rem",
                        }}
                      >
                        <h3>{typeClock}</h3>
                      </div>
                    </Col>
                    <Col
                      span={9}
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <Select
                        defaultValue={typeClock}
                        onChange={(e) => setTypeClock(e)}
                      >
                        <Option value="loai 1">loai 1</Option>
                        <Option value="loai 2">loai 2</Option>
                        <Option value="loai 3">loai 3</Option>
                        <Option value="loai 4">loai 4</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "2rem 0",
                }}
              />
              <Row>
                <h3>Mã vạch</h3>
                <br />
                <br />
                <Input />
              </Row>
              <hr
                style={{
                  borderBottom: ".1px cornflowerblue solid",
                  margin: "2rem 0",
                }}
              />
              <Row>
                <h3>Ghi chú</h3>
                <br />
                <br />
                <Input />
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}
