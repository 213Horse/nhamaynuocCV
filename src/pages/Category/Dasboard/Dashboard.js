import { useEffect, useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
  DatePicker,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "./chart/EChart";
import LineChart from "./chart/LineChart";

import ava1 from "./assets/images/logo-shopify.svg";
import ava2 from "./assets/images/logo-atlassian.svg";
import ava3 from "./assets/images/logo-slack.svg";
import ava4 from "./assets/images/logo-spotify.svg";
import ava5 from "./assets/images/logo-jira.svg";
import ava6 from "./assets/images/logo-invision.svg";
import team1 from "./assets/images/team-1.jpg";
import team2 from "./assets/images/team-2.jpg";
import team3 from "./assets/images/team-3.jpg";
import team4 from "./assets/images/team-4.jpg";
import card from "./assets/images/info-card-1.jpg";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashBoardData,
  getTongSoDongHo,
  getTongSoHopDong,
  getDashBoardDataTieuThu,
  fetchListTuyenDocByNhaMay,
} from "../../../redux/slices/dashBoardSlice/dashBoardSlice";
import {
  btnClickDashboardData,
  btnClickGetFactoryIdSelector,
  btnClickTotalClock,
  btnClickTotalContract,
  getListTuyenDoc,
} from "../../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import moment from "moment";
import dayjs from "dayjs";
import {
  fetchTuyendocAddselection,
  fetchTuyenDocByNhaMay,
  fetchTuyendocselection,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { getAllTuyenDoc } from "../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { format } from "date-fns";

function Dashboard() {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const totalContract = useSelector(btnClickTotalContract);
  const totalClock = useSelector(btnClickTotalClock);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dashboardData = useSelector(btnClickDashboardData);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const tongTatCaHopDong = totalContract?.reduce((tong, item) => {
    return tong + item.tongSoHopDong;
  }, 0);
  const tongDoanhThu = dashboardData?.reduce((tong, item) => {
    return tong + item.tongTienSauVat;
  }, 0);
  const { RangePicker } = DatePicker;
  const formatTongDoanhThu = new Intl.NumberFormat("en-US", {
    currency: "VND",
  }).format(tongDoanhThu);
  // useEffect(() => {
  //   if (dateChange) {
  //     setFormMonth(dateChange[0]);
  //     setToMonth(dateChange[1]);
  //   }
  // }, [dateChange]);
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

  const createFilterDate = (tuNgay, denNgay) => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}&TuThang=${tuNgay}&DenThang=${denNgay}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}&TuThang=${tuNgay}&DenThang=${denNgay}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}&TuThang=${tuNgay}&DenThang=${denNgay}`;
    }
    console.log(`${factoryQueryString}`);
    setFromDate(tuNgay);
    setToDate(denNgay);
    return `${factoryQueryString}`;
  };
  const [tuNgay, setTuNgay] = useState(null);
  const [denNgay, setDenNgay] = useState(null);
  
  // get list -> sổ đọc theo nhaMayId
  useEffect(() => {
    if (nhaMayId) {
      const queryTotal = createFilterQueryString();
      dispatch(getTongSoHopDong(queryTotal));
  
      const currentDate = new Date();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentYear = currentDate.getFullYear();
  
      // Check if tuNgay and denNgay are not selected
      if (!tuNgay || !denNgay) {
        // Use default logic from current month to December of the current year
        const queryDashBoard = createFilterDate(`${currentMonth}/${currentYear}`, `12/${currentYear}`);
        dispatch(getDashBoardData(queryDashBoard));
      }
  
      dispatch(getTongSoDongHo(queryTotal));
      dispatch(fetchTuyendocAddselection(nhaMayId));
  
      console.log("Total hop dong:", tongTatCaHopDong);
    }
  }, [nhaMayId, tuNgay, denNgay]);


  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);
  useEffect(() => {
    if (nhaMayId && tuNgay && denNgay) {
      const queryDashBoard = createFilterDate(tuNgay, denNgay);
      dispatch(getDashBoardData(queryDashBoard));
    }
  }, [nhaMayId, tuNgay, denNgay]);
  
  const pickerMonthChange = (date, dateString) => {
    const tuNgay = dateString[0];
    setTuNgay(tuNgay);
    const denNgay = dateString[1];
    setDenNgay(denNgay);
    const queryDashBoard = createFilterDate(tuNgay, denNgay);
    dispatch(getDashBoardData(queryDashBoard));
  };

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      width="22"
      viewBox="0 0 512 512"
    >
      <path
        fill="#ffffff"
        d="M384 48c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H384zM96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H208zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"
      />
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      width="22"
      viewBox="0 0 448 512"
    >
      <path
        fill="#ffffff"
        d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z"
      />
    </svg>,
  ];
  const count = [
    {
      today: "Tổng doanh thu",
      title: `${formatTongDoanhThu} VNĐ`,
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Số lượng hợp đồng",
      title: tongTatCaHopDong,
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Số lượng đồng hồ",
      title: totalClock.tongSoLuongDongHo,
      icon: cart,
      bnb: "redtext",
    },
    // {
    //   today: "Tiêu thụ",
    //   title: "13,200 m3",
    //   persent: "10%",
    //   icon: cart,
    //   bnb: "bnb2",
    // },
  ];

  const list = [
    {
      img: ava1,
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava2,
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava3,
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava4,
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava5,
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      img: ava6,
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
  <Card bordered={false} className="criclebox ">
    <div className="number">
      <Row align="middle" gutter={[24, 0]}>
        <Col xs={24}>
          <span>Chọn tháng</span>
          <Title level={3}>
            <RangePicker
              defaultValue={[dayjs(), dayjs().endOf('year')]}
              locale={locale}
              picker="month"
              format={"MM/YYYY"}
              onChange={pickerMonthChange}
            />
          </Title>
        </Col>
      </Row>
    </div>
  </Card>
</Col>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
            <LineChart fromDate={fromDate} toDate={toDate} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
