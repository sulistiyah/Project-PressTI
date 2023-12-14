import React, { useEffect } from 'react'
import RequireAuthenticationHOC from '../features/RequireAuthenticationHOC';
import Layout from './Layout'
import Welcome from '../components/Welcome'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../features/authSlice"

function Dasboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if(isError) {
            navigate("/api/admin/login")
        }
    }, [isError, navigate])

    return (
        <Layout>
            <Welcome/>
        </Layout>
    )
}

export default Dasboard
