import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function FormEditUserDosen() {

    const [nip, setNip] = useState('')
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [noTelepon, setNoTelepon] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(() => {
        
        const getUserDosenId = async() => {
            try {
                const response = await axios.get(`http://18.210.63.173:8080/api/admin/user_dosen/${id}`)
                setNip(response.data.data.nip)
                setNama(response.data.data.nama)
                setEmail(response.data.data.email)
                setNoTelepon(response.data.data.noTelepon)
            }catch (error) {
                if(error.response) {
                    console.log(error.response.data.message)
                    setMessage(error.response.data.message)
                }
            }
        }
        getUserDosenId()
    }, [id])

    const updateUserDosen = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://18.210.63.173:8080/api/admin/user_dosen/update/${id}`, {
                nip : nip,
                nama : nama,
                email : email,
                noTelepon : noTelepon
            })
            
            navigate("/api/admin/user_dosen")
            console.log({
                nip : nip,
                nama : nama,
                email : email,
                noTelepon : noTelepon
            });
        }catch (error) {
            if(error.response) {
                console.log(error.response.data.message)
                setMessage(error.response.data.message)
            }
        }
    }

    const inputStyle = {
        width: '100%',
        height: '2.5rem',
        borderColor: '#000000',
        borderRadius: '5px',
        backgroundColor: '#f8f8f8',
        color: '#000000',
        fontFamily: 'Time New Roman',
        fontSize: '16px'
    }


    return (
        <div>
            <h1 className='title'>User Dosen</h1>
            <h2 className='subtitle'>Update User Dosen</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateUserDosen}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Nomor Induk Pegawai / NIP</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={nip}
                                        onChange={(e) => setNip(e.target.value)}
                                        placeholder='Nomor Induk Pegawai / NIP'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Nama</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                        placeholder='Nama'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Email</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Nama'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>No Telepon</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={noTelepon}
                                        onChange={(e) => setNoTelepon(e.target.value)}
                                        placeholder='No Telepon'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <div className='control'>
                                    <button type='submit' className="button is-success" >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditUserDosen
