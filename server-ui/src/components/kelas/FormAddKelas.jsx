import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FormAddKelas() {

    const [kodeKelas, setKodeKelas] = useState('')
    const [kelas, setKelas] = useState('')
    const [programStudiId, setProgramStudiId] = useState('')
    const [programStudiList, setProgramStudiList] = useState([]);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for Program Studi
                const responseProgramStudi = await axios.get('http://34.192.213.125:8080/api/admin/program_studi');
                setProgramStudiList(responseProgramStudi.data.data);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
            }
        };

        fetchData();

    }, []);

    const saveKelas = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://34.192.213.125:8080/api/admin/kelas/create', {
                kodeKelas : kodeKelas,
                kelas : kelas,
                programStudiId : programStudiId
                
            })
            
            navigate("/api/admin/kelas")
            console.log({
                kodeKelas : kodeKelas,
                kelas : kelas,
                programStudiId : programStudiId
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
            <h2 className='subtitle'>Create Kelas</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveKelas}>
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
                                        value={programStudiId}
                                        onChange={(e) => setProgramStudiId(e.target.value)}
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

export default FormAddKelas
