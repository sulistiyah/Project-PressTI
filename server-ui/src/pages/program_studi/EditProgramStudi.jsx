import React, {useEffect} from 'react'
import Layout from '../Layout'
import FormEditProgramStudi from '../../components/program_studi/FormEditProgramStudi'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

function EditProgramStudi() {

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
            <FormEditProgramStudi/>
        </Layout>
    )
}


export default EditProgramStudi
