import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FormAddUserDosen() {

    const [nip, setNip] = useState('')
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [noTelepon, setNoTelepon] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const saveUserDosen = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://18.210.63.173:8080/api/admin/user_dosen/create', {
                nip : nip,
                nama : nama,
                email : email,
                noTelepon : noTelepon,
                password : password,
                rePassword : rePassword
            })            
            navigate("/api/admin/user_dosen")
            console.log({
                nip : nip,
                nama : nama,
                email : email,
                noTelepon : noTelepon,
                password : password,
                rePassword : rePassword
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
            <h2 className='subtitle'>Create User Dosen</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveUserDosen}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Nomor Induk Pegawai / NIp</label>
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
                                        placeholder='Email'
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
                                <label className='label'>Password</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Re-Password</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                        placeholder='Re-Password'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <div className='control'>
                                    <button type='submit' className="button is-success" >
                                        Save
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

export default FormAddUserDosen
