import { Steps, message } from 'antd';
import React, { useState } from 'react';
import AddListMember from './AddListMember';
import { useDispatch } from 'react-redux';
import AddMemberOTP from './AddMemberOTP';
import { registerUser } from '../../../../redux/slices/registerSlice/registerSlice';

const { Step } = Steps;


const AddMemberStep = ({ isTabletOrMobile, hideModal }) => {
    const [userName, setUserName] = useState('');
    const [email_current, setEmail_current] = useState('');

    const [current, setCurrent] = useState(0);
    const dispatch = useDispatch();

    const onFinishRegister = (values) => {
        setUserName(values.userName);
        setEmail_current(values.email);
        const roles = values.roleIds ? [values.roleIds] : [];
        const data_1 = {
            ...values,
            roleIds: roles,
        };
        message.warning("Bắt đầu đăng ký... vui lòng đợi trong giây lát");
        dispatch(registerUser(data_1))
            .unwrap()
            .then(() => {
                setCurrent(current + 1);
            }).catch((error) => {
                message.error(error)
            }).finally(() => {

            });
    };

    const onFinishOTP = (values) => {
        console.log("Data for OTP: ", values);
    };


    const forms = [
        <AddListMember onFinish={onFinishRegister} isTabletOrMobile={isTabletOrMobile} hideModal={hideModal}></AddListMember>,
        <AddMemberOTP userName={userName} email_current={email_current} onFinishOTP={onFinishOTP} hideModal={hideModal}></AddMemberOTP>,
    ]
    return (
        <>
            <Steps current={current}>
                <Step title="Đăng ký thông tin"></Step>
                <Step title="Xác nhận Email"></Step>
            </Steps>
            {forms[current]}
        </>
    );
};

export default AddMemberStep;