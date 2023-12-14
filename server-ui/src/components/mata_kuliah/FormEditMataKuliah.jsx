import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function FormEditMataKuliah() {
    const [kodeMatkul, setKodeMatkul] = useState('')
    const [mataKuliah, setMataKuliah] = useState('')
    const [programStudi, setProgramStudi] = useState('')
    const [programStudiList, setProgramStudiList] = useState([])
    const [kelas, setKelas] = useState('')
    const [kelasList, setKelasList] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const getMataKuliahId = async() => {
            try {
                const response = await axios.get(`http://34.192.213.125:8080/api/admin/mata_kuliah/${id}`)
                setKodeMatkul(response.data.data.kodeMatkul)
                setMataKuliah(response.data.data.mataKuliah)
                
                const getProgramStudi = await axios.get('http://34.192.213.125:8080/api/admin/program_studi')
                setProgramStudiList(getProgramStudi.data.data)
                setProgramStudi(response.data.data.programStudi)

                const getKelas = await axios.get('http://34.192.213.125:8080/api/admin/kelas')
                setKelasList(getKelas.data.data)
                setKelas(response.data.data.kelas)
            }catch (error) {
                if(error.response) {
                    console.log(error.response.data.message)
                    setMessage(error.response.data.message)
                }
            }
        }
        getMataKuliahId()
    }, [id])

    const updateMataKuliah = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://34.192.213.125:8080/api/admin/mata_Kuliah/update/${id}`, {
                kodeMatkul : kodeMatkul,
                mataKuliah : mataKuliah,
                programStudiId : programStudi,
                kelasId : kelas
                
            })
            
            navigate("/api/admin/mata_kuliah")
            console.log({
                kodeMatkul : kodeMatkul,
                mataKuliah : mataKuliah,
                programStudiId : programStudi,
                kelasId : kelas
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
            <h1 className='title'>Mata Kuliah</h1>
            <h2 className='subtitle'>Update Mata Kuliah</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateMataKuliah}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Kode Mata Kuliah</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={kodeMatkul}
                                        onChange={(e) => setKodeMatkul(e.target.value)}
                                        placeholder='Kode Mata Kuliah'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Mata Kuliah</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={mataKuliah}
                                        onChange={(e) => setMataKuliah(e.target.value)}
                                        placeholder='Mata Kuliah'
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

export default FormEditMataKuliah
