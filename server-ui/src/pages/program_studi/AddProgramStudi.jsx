import React, {useEffect} from 'react'
import Layout from '../Layout'
import FormAddProgramStudi from '../../components/program_studi/FormAddProgramStudi'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const AddProgramStudi = () => {

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
            <FormAddProgramStudi/>
        </Layout>
    )
}

export default AddProgramStudi
