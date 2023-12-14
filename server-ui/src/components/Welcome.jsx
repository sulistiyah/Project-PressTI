import React from 'react'
import { useSelector } from "react-redux"

function Welcome() {
    const { admin } = useSelector((state) => state.auth)
    return (
        <div>
            <h1 className='title'>Dasboard</h1>
            <h2 className='subtitle'>
                Welcome Back <strong>{admin && admin.nama}</strong>
            </h2>
        </div>
    )
}

export default Welcome
