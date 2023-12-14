import React, {useEffect} from 'react'
import Layout from '../Layout'
import FormAddUserDosen from '../../components/user_dosen/FormAddUserDosen'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const AddUserDosen = () => {
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
            <FormAddUserDosen/>
        </Layout>
    )
}

export default AddUserDosen
