import React, { Component, useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom'
import UsersContext from './../../context/Users/UsersContext'

const PublicRoute = ({ component: Component, ...props }) => {
    const usersCtx = useContext(UsersContext)
    const {
        authStatus,
        tokenVerification
    } = usersCtx

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            await tokenVerification();
            setLoading(false)
        }
        verifyUser()
    }, [authStatus])

    return (
        <Route{...props} render={(props) => {
            if (loading) return null
            return <Component{...props} />

        }} />
    )

}
export default PublicRoute