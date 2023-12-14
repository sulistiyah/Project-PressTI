import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FormAddMataKuliah() {

    const [kodeMatkul, setKodeMatkul] = useState('')
    const [mataKuliah, setMataKuliah] = useState('')
    const [programStudiId, setProgramStudiId] = useState('')
    const [programStudiList, setProgramStudiList] = useState([]);
    const [kelasId, setKelasId] = useState('')
    const [kelasList, setKelasList] = useState([]);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for Program Studi
                const responseProgramStudi = await axios.get('http://18.210.63.173:8080/api/admin/program_studi');
                setProgramStudiList(responseProgramStudi.data.data);
    
                // Fetch data for Kelas
                const responseKelas = await axios.get('http://18.210.63.173:8080/api/admin/kelas');
                setKelasList(responseKelas.data.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
            }
        };
    
        fetchData();
    }, []);

    const saveMataKuliah = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://18.210.63.173:8080/api/admin/mata_kuliah/create', {
                kodeMatkul : kodeMatkul,
                mataKuliah : mataKuliah,
                programStudiId : programStudiId,
                kelasId : kelasId
            })
            
            navigate("/api/admin/mata_kuliah")
            console.log({
                kodeMatkul : kodeMatkul,
                mataKuliah : mataKuliah,
                programStudiId : programStudiId,
                kelasId : kelasId
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
            <h2 className='subtitle'>Create Mata Kuliah</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveMataKuliah}>
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
                                <label className='label'>Kelas</label>
                                <div className='control'>
                                    <select
                                        className='select'
                                        value={kelasId}
                                        onChange={(e) => setKelasId(e.target.value)}
                                        style={inputStyle}                                    >
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

export default FormAddMataKuliah
