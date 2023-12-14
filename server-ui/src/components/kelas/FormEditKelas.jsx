import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function FormEditKelas() {
    const [kodeKelas, setKodeKelas] = useState('')
    const [kelas, setKelas] = useState('')
    const [programStudi, setProgramStudi] = useState('')
    const [programStudiList, setProgramStudiList] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const getKelasId = async() => {
            try {
                const response = await axios.get(`http://34.192.213.125:8080/api/admin/kelas/${id}`)
                setKodeKelas(response.data.data.kodeKelas)
                setKelas(response.data.data.kelas)
                setProgramStudi(response.data.data.programStudi)

                const getProgramStudi = await axios.get('http://34.192.213.125:8080/api/admin/program_studi')
                setProgramStudiList(getProgramStudi.data.data)

            }catch (error) {
                if(error.response) {
                    console.log(error.response.data.message)
                    setMessage(error.response.data.message)
                }
            }
        }
        getKelasId()
    }, [id])

    const updateKelas = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://34.192.213.125:8080/api/admin/kelas/update/${id}`, {
                kodeKelas : kodeKelas,
                kelas : kelas,
                programStudiId : programStudi
                
            })
            
            navigate("/api/admin/kelas")
            console.log({
                kodeKelas : kodeKelas,
                kelas : kelas,
                programStudiId : programStudi
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
            <h1 className='title'>Kelas</h1>
            <h2 className='subtitle'>Update Kelas</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateKelas}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Kode Kelas</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={kodeKelas}
                                        onChange={(e) => setKodeKelas(e.target.value)}
                                        placeholder='Kode Kelas'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Kelas</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={kelas}
                                        onChange={(e) => setKelas(e.target.value)}
                                        placeholder='Kelas'
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

export default FormEditKelas
