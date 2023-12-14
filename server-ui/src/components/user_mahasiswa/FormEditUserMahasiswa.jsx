import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function FormEditUserMahasiswa() {

    const [nim, setNim] = useState('')
    const [nama, setNama] = useState('')
    // const [programStudiId, setProgramStudiId] = useState('')
    const [programStudi, setProgramStudi] = useState('')
    const [programStudiList, setProgramStudiList] = useState([])
    // const [kelasId, setKelasId] = useState('')
    const [kelas, setKelas] = useState('')
    const [kelasList, setKelasList] = useState([])
    const [noTelepon, setNoTelepon] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(() => {
        
        const getUserMahasiswaId = async() => {
            try {
                const response = await axios.get(`http://34.192.213.125:8080/api/admin/user_mahasiswa/${id}`)
                setNim(response.data.data.nim)
                setNama(response.data.data.nama)
                // setProgramStudiId(response.data.data.programStudiId)
                setProgramStudi(response.data.data.programStudi)


                const getProgramStudi = await axios.get('http://34.192.213.125:8080/api/admin/program_studi')
                setProgramStudiList(getProgramStudi.data.data)

                const getKelas = await axios.get('http://34.192.213.125:8080/api/admin/kelas')
                setKelasList(getKelas.data.data)
                // setKelasId(response.data.data.kelasId)
                setKelas(response.data.data.kelas)
                setNoTelepon(response.data.data.noTelepon)
            }catch (error) {
                if(error.response) {
                    console.log(error.response.data.message)
                    setMessage(error.response.data.message)
                }
            }
        }
        getUserMahasiswaId()
    }, [id])

    const updateUserMahasiswa = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://34.192.213.125:8080/api/admin/user_mahasiswa/update/${id}`, {
                nim : nim,
                nama : nama,
                programStudiId : programStudi,
                kelasId : kelas,
                noTelepon : noTelepon
            })
            
            navigate("/api/admin/user_mahasiswa")
            console.log({
                nim : nim,
                nama : nama,
                programStudiId : programStudi,
                kelasId : kelas,
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
            <h1 className='title'>User Mahasiswa</h1>
            <h2 className='subtitle'>Update User Mahasiswa</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateUserMahasiswa}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Nomor Induk Mahasiswa / NIM</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={nim}
                                        onChange={(e) => setNim(e.target.value)}
                                        placeholder='Nomor Induk Mahasiswa / NIM'
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
                                <label className='label'>Program Studi</label>
                                <div className='control'>
                                    <select
                                        className='select'
                                        value={programStudi}
                                        onChange={(e) => setProgramStudi(e.target.value)}
                                        style={inputStyle}>                                        
                                        <option value=''>Pilih Program Studi</option>
                                            {programStudiList.map((prodi) => (
                                                <option key={prodi.id} value={prodi.id}>
                                                    {prodi.programStudi}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Kelas</label>
                                <div className='control'>
                                    <select
                                        className='select'
                                        value={kelas}
                                        onChange={(e) => setKelas(e.target.value)}
                                        style={inputStyle}>
                                        <option value=''>Pilih Kelas</option>
                                            {kelasList.map((kelas) => (
                                                <option key={kelas.id} value={kelas.id}>
                                                    {kelas.kelas}
                                                </option>
                                            ))}
                                    </select>
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

export default FormEditUserMahasiswa
