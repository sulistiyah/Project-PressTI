import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function FormEditProgramStudi() {
    const [kodeProdi, setKodeProdi] = useState('')
    const [programStudi, setProgramStudi] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const getProgramStudiId = async() => {
            try {
                const response = await axios.get(`http://34.192.213.125:8080/api/admin/program_studi/${id}`)
                setKodeProdi(response.data.data.kodeProdi)
                setProgramStudi(response.data.data.programStudi)
            }catch (error) {
                if(error.response) {
                    setMessage(error.response.data.message)
                }
            }
        }
        getProgramStudiId()
    }, [id])

    const updateProgramStudi = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://34.192.213.125:8080/api/admin/program_studi/update/${id}`, {
                kodeProdi : kodeProdi,
                programStudi : programStudi
                
            })
            
            navigate("/api/admin/program_studi")
            console.log({
                kodeProdi: kodeProdi,
                programStudi: programStudi
            });
        }catch (error) {
            if(error.response) {
                console.log(error.response.data.message),
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
            <h1 className='title'>Program Studi</h1>
            <h2 className='subtitle'>Update Program Studi</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateProgramStudi}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Kode Program Studi</label>
                                <div className='control'>
                                        <input type='text'
                                        className='input' 
                                        value={kodeProdi}
                                        onChange={(e) => setKodeProdi(e.target.value)}
                                        placeholder='Kode Program Studi'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Program Studi</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={programStudi}
                                        onChange={(e) => setProgramStudi(e.target.value)}
                                        placeholder='Program Studi'
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

export default FormEditProgramStudi
