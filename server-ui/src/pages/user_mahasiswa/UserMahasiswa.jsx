import React, {useEffect} from 'react'
import Layout from '../Layout'
import UserMahasiswaList from '../../components/user_mahasiswa/UserMahasiswaList'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const UserMahasiswa = () => {
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
            <UserMahasiswaList/>
        </Layout>
    )
}

export default UserMahasiswa
