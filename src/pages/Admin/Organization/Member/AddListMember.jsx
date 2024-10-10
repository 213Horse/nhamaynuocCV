import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Input, Row, Select, message, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import Captcha from '../../../../components/Captcha/Captcha';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { fetchApiAllFactorySelector, getPhongBansSelector, getRolesSelector, refreshTableSelector } from '../../../../redux/selector';
import { fetchApiAllFactory } from '../../../../redux/slices/factorySlice/factorySlice';
import { fetchGetPhongBans, fetchGetRoles } from '../../../../redux/slices/registerSlice/registerSlice';

const AddListMember = ({ hideModal, isTabletOrMobile, onFinish }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // GET ROLES VS PHONGBANS
  const roles_gql = useSelector(getRolesSelector);
  const phongBans_gql = useSelector(getPhongBansSelector);
  // ======================
  const factoryNames = useSelector(fetchApiAllFactorySelector);
const refreshTable = useSelector(refreshTableSelector)
  useEffect(() => {
    dispatch(fetchApiAllFactory());
    dispatch(fetchGetRoles());
    dispatch(fetchGetPhongBans());
  }, [refreshTable,dispatch]);

  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const [showFormItem, setShowFormItem] = useState(false);

  // handle save and close modal

  // handle save and continue add
  const handleSaveAndAdd = async () => {
    try {
      const values = await form.validateFields()
      console.log(values);
      hideModal();
    } catch (error) {
      console.log({ error });
    }
  };

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const handleShowFormInput = (e) => {
    setShowFormItem(e.target.checked)
  }

  const layout = {
    labelCol: {
      span: 5, // note
    },
  };

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Tên Nhân Viên"
              name="name"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Mã người dùng"
              name="userCode"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không được bỏ trống"
                },
                {
                  min: 8,
                  message: "Ít nhất 8 kí tự"
                }
              ]}

            >
              <Input.Password style={{ width: "100%" }} placeholder='Mật khẩu yêu cầu tối thiểu 8 ký tự, ít nhất 1 chữ và 1 số' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Xác nhận MK"
              name="confirmPassword"
              rules={
                [{ required: true, message: "Vui lòng không được bỏ trống." }, ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Mật khẩu mà bạn vừa nhập vào không giống với mật khẩu cũ"
                      )
                    );
                  },
                }),]}
            >
              <Input.Password style={{ width: "100%" }} placeholder='Mật khẩu yêu cầu tối thiểu 8 ký tự, ít nhất 1 chữ và 1 số' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Địa chỉ Email"
              name="email"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Nhà máy"
              name="nhaMayIds"
              {...rules}
            >
              <Select
                mode='multiple'
                maxTagCount={3}
                options={
                  factoryNames?.length <= 0
                    ? []
                    : factoryNames.map((_factory) => ({
                      label: _factory.tenNhaMay,
                      value: _factory.id,
                    }))
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Chức vụ"
              name="roleIds"
              {...rules}
            >
              <Select
                options={
                  roles_gql?.length <= 0
                    ? []
                    : roles_gql.map((_role) => ({
                      label: _role.name,
                      value: _role.id,
                    }))
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Phòng ban"
              name="phongBanId"
              {...rules}
            >
              <Select
                options={
                  phongBans_gql?.length <= 0
                    ? []
                    : phongBans_gql.map((_pban) => ({
                      label: _pban.name,
                      value: _pban.id,
                    }))
                }
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //captcha */}
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item className="captcha-wrapper">
              <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //captcha */}

        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<SaveOutlined />}
            className="custom-btn-reset-d"
            htmlType='submit'
          >
            Next
          </Button>
          <Button
            style={{
              marginLeft: "10px",
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

export default AddListMember