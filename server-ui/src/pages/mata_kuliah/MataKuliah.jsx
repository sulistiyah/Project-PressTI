import React, {useEffect} from 'react'
import MataKuliahList from '../../components/mata_kuliah/MataKuliahList'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const MataKuliah = () => {
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
            <MataKuliahList/>
        </Layout>
    )
}

export default MataKuliah
