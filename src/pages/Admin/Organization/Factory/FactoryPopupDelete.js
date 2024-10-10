import React, { useRef, useState } from 'react'
import { Button, Modal, Row, message } from 'antd';
import Captcha from '../../../../components/Captcha/Captcha';
import { deleteRequest, putRequest } from '../../../../services';
import { useDispatch } from 'react-redux';
import { fetchApiAllFactory } from '../../../../redux/slices/factorySlice/factorySlice';

const FactoryPopupDelete = ({
    isModalOpen,
    setIsModalOpen,
    factoryId,
    handleUncheckRadio
}) => {

    const captchaRef = useRef();
    const dispatch = useDispatch();

    const [isCaptcha, setIsCaptcha] = useState(false); //captcha


    const handleCancel = () => {
        setIsModalOpen(false);
        setIsCaptcha(false);
        captchaRef.current.reset();
    };

    return (
        <Modal
            title="Xóa nhà máy"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
            />
            <Row justify={'end'}>
                <Button
                    type="primary"
                    danger
                    disabled={!isCaptcha}
                    onClick={() => {
                        if (isCaptcha) {
                            setIsModalOpen(false);
                            setIsCaptcha(false);
                            captchaRef.current.reset();
                            console.log('factoryId', factoryId);
                            putRequest('nha-may/delete/' + factoryId)
                            .then(res => {
                                console.log('res', res);
                                if (res?.data?.code == 'Success!') {
                                    dispatch(fetchApiAllFactory())
                                    handleUncheckRadio();
                                    message.success('Xóa thành công');
                                } else {
                                    message.error('Xóa thất bại');
                                }
                            })
                        }
                    }}
                >
                    Xóa
                </Button>
            </Row>
        </Modal>
    );
};
export default FactoryPopupDelete;