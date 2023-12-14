import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FormAddProgramStudi() {

    const [kodeProdi, setKodeProdi] = useState('')
    const [programStudi, setProgramStudi] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const saveProgramStudi = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://18.210.63.173:8080/api/admin/program_studi/create', {
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
            <h2 className='subtitle'>Create Program Studi</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveProgramStudi}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Kode Program Studi</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
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

export default FormAddProgramStudi
