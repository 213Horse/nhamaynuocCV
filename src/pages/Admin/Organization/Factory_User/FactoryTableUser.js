import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import './actions.css'
import ListUser from './components/ListUser'
import ListFactory from './components/ListFactory'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApiAllFactorySelector, selectClaims } from '../../../../redux/selector'
import { fetchApiAllFactory } from '../../../../redux/slices/factorySlice/factorySlice'
import { GetUserAccount } from '../../../../graphql/ManagerClaims/getUserAccounts'
import { useQuery } from '@apollo/client'

function FactoryTableUser() {

    const [selectedUser, setSelectedUser] = React.useState(null);

    const dispatch = useDispatch();
    const factories = useSelector(fetchApiAllFactorySelector); // get factories from redux
    const { loading, error, data } = useQuery(GetUserAccount); // get factories from graphql


    useEffect(() => {
        dispatch(fetchApiAllFactory());
    }, []);

    useEffect(() => {
        console.log(factories);
    }, [factories]);

    return (
        <Row gutter={[12, 12]}>
            <Col lg={14} >
                <ListUser
                    users={data}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </Col>
            <Col lg={10} >
                <ListFactory
                     factories={factories}
                     selectedUser={selectedUser}
                />
            </Col>
        </Row>
    )
}

export default FactoryTableUser