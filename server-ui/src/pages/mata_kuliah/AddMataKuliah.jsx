import React, {useEffect} from 'react'
import Layout from '../Layout'
import FormAddMataKuliah from '../../components/mata_kuliah/FormAddMataKuliah'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const AddMataKuliah = () => {

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
            <FormAddMataKuliah/>
        </Layout>
    )
}

export default AddMataKuliah
