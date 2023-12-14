import React, {useEffect} from 'react'
import Layout from '../Layout'
import FormEditKelas from '../../components/kelas/FormEditKelas'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const EditKelas = () => {

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
            <FormEditKelas/>
        </Layout>
    )
}

export default EditKelas
