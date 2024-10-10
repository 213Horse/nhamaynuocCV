import { Col, Row } from 'antd';
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import './Database.css'
import TitleData from './TitleData/TitleData';
import ListData from './ListData/ListData';
import { useDispatch } from 'react-redux';
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice';

const Database = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Row gutter={24}>
        <Col span={isTabletOrMobile ? 24 : 6}>
          <h4 style={{ margin: '10px' }}>
            Chủ đề dữ liệu
          </h4>
          <TitleData />
        </Col>
        <Col span={isTabletOrMobile ? 24 : 18}>
          <h4 style={{ margin: '10px 0px' }}>
            Danh sách lớp dữ liệu
          </h4>
          <ListData />
        </Col>
      </Row>
    </>
  )
}

export default Database