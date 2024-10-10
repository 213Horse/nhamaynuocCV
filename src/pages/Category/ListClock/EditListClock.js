import React, { useState } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  theme,
} from 'antd'
import { CloseOutlined, FileAddOutlined, SaveOutlined } from '@ant-design/icons'
import viVN from 'antd/es/date-picker/locale/vi_VN'
import { useMediaQuery } from 'react-responsive'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApiUpdateTotalWatch } from '../../../redux/slices/totalWatchSlice/totalWatchSlice'
import dayjs from 'dayjs'
import Captcha from '../../../components/Captcha/Captcha'
import { fetchApiGetAllManufacturerSelector, fetchApiGetAllProducingCountrySelector, fetchApiWathList } from '../../../redux/selector'
moment.locale('vi')
const EditListClock = ({ hideModal, tabListTotalWatch, listTotalWatch }) => {
  const [isCaptcha, setIsCaptcha] = useState(false) //captcha
  const dispatch = useDispatch()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const { Option } = Select
  const [form1] = Form.useForm()
  const { token } = theme.useToken()

  const watchListData = useSelector(fetchApiWathList);
  const listProducingCountryData = useSelector(fetchApiGetAllProducingCountrySelector)
  const listManufacturerData = useSelector(fetchApiGetAllManufacturerSelector)

  let trangThai = {
    Huy: "3",
    NgungSuDung: "2",
    DangSuDung: "1"
  }

  // handle submit form (main)
  const handleSubmit = (values) => {
    if (values) {
      dispatch(fetchApiUpdateTotalWatch({...values, prevKeyId: tabListTotalWatch?.keyId}));
      form1.resetFields()
      hideModal()
    }
  }
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error })
  }

  const layout = {
    labelCol: {
      span: 5,
    },
  }

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

  return (
    <>
      <Form
        {...layout}
        form={form1}
        onFinish={handleSubmit}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: 'none',
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Mã đồng hồ"
              name="keyId"
              initialValue={tabListTotalWatch?.keyId}
            >
              <Input style={{ width: '100%' }}></Input>
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Số seri"
              name="seriDongHo"
              initialValue={tabListTotalWatch?.seriDongHo}
            >
              <Input style={{ width: '100%' }}></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Chỉ số đầu"
              name="chiSoDau"
              initialValue={tabListTotalWatch?.chiSoDau}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Chỉ số cuối"
              name="chiSoCuoi"
              initialValue={tabListTotalWatch?.chiSoCuoi}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              name="loaiDongHo"
              label="Kiểu đồng hồ"
              initialValue={tabListTotalWatch?.loaiDongHo}
            >
              <Select
                placeholder="Chọn kiểu đồng hồ"
                options={watchListData?.map(item => ({
                  label: item?.value,
                  value: item?.id
                }))}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Đường kính"
              name="duongKinh"
              initialValue={tabListTotalWatch?.duongKinh}
            >
              <Input style={{ width: '100%' }}></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Nước sản xuất"
              name="nuocSX"
              initialValue={tabListTotalWatch?.nuocSX}
            >
              <Select 
                placeholder="Chọn nước sản xuất"
                options={listProducingCountryData?.map(item => ({
                  label: item?.value,
                  value: item?.id
                }))}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Hãng sản xuất"
              name="hangSX"
              initialValue={tabListTotalWatch?.hangSX}
            >
              <Select 
                placeholder="Chọn hãng sản xuất"
                options={listManufacturerData?.map(item => ({
                  label: item?.value,
                  value: item?.id
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Ngày sản xuất"
              name="ngayKiemDinh"
              initialValue={dayjs(tabListTotalWatch?.ngayKiemDinh)}
            >
              <DatePicker
                locale={viVN}
                style={{
                  width: '100%',
                }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Ngày kết thúc"
              name="hieuLucKD"
              initialValue={dayjs(tabListTotalWatch?.hieuLucKD)}
            >
              <DatePicker
                locale={viVN}
                style={{
                  width: '100%',
                }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Số thứ tự"
              name="soThuTu"
              initialValue={tabListTotalWatch?.soThuTu}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          {/* <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Đồng hồ cha"
              name="dongHoChaId"
              initialValue={tabListTotalWatch?.dongHoChaId}
            >
              <Select placeholder="Chọn khu vực cha">
                <Option value="1">Đồng hồ cha 1</Option>
                <Option value="2">Đồng hồ cha 2</Option>
              </Select>
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Địa chỉ"
              name="diaChi"
              initialValue={tabListTotalWatch?.diaChi}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? 'gutter-item-btn' : 'gutter-item'}
          >
            <Form.Item {...rules}
              label="Trạng thái"
              name="trangThaiSuDung"
              initialValue={trangThai[tabListTotalWatch?.trangThaiSuDung]}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="3">Huỷ</Option>
                <Option value="2">Ngưng sử dụng</Option>
                <Option value="1">Đang sử dụng</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item className="captcha-wrapper">
              <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={null}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '10px',
          }}
        >
          <Button
            htmlType="submit"
            style={{
              marginLeft: '10px',
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            disabled={!isCaptcha}
          >
            Cập nhật
          </Button>
          <Button
            style={{
              marginLeft: '10px',
            }}
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  )
}

export default EditListClock
