import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css';


function FormAddSetPresensi() {

    const [tanggal, setTanggal] = useState('')
    const [jamMulai, setJamMulai] = useState('12:00')
    const [jamBerakhir, setJamBerakhir] = useState('13:00')
    const [mataKuliah, setMataKuliah] = useState('')
    const [matakuliahList, setMataKuliahList] = useState([])
    const [kelas, setKelas] = useState('')
    const [kelasList, setKelasList] = useState([])
    const [programStudi, setProgramStudi] = useState('')
    const [programStudiList, setProgramStudiList] = useState([])
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

                // Fetch data for Mata Kuliah
                const responseMataKuliah = await axios.get('http://18.210.63.173:8080/api/admin/mata_kuliah');
                setMataKuliahList(responseMataKuliah.data.data);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
            }
        };
    
        fetchData();
    }, []);

    // const handleTimeChange = (newTime) => {
    //     setJamMulai(newTime)
    // }

    const saveSetPresensi = async(e) => {
        e.preventDefault()
        try {
            // const formatJam = `${jamMulai.getHours()}:${jamMulai.getMinutes()}`;
            await axios.post('http://18.210.63.173:8080/api/admin/set_presensi/create', {
                tanggal : tanggal,
                jamMulai : jamMulai,
                jamBerakhir : jamBerakhir,
                mataKuliahId : mataKuliah,
                kelasId : kelas,
                programStudiId : programStudi
            })            
            navigate("/api/admin/set_presensi")
            console.log({
                tanggal : tanggal,
                jamMulai : jamMulai,
                jamBerakhir : jamBerakhir,
                mataKuliahId : mataKuliah,
                kelasId : kelas,
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
            <h1 className='title'>Set Presensi</h1>
            <h2 className='subtitle'>Create Set Presensi</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveSetPresensi}>
                        <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Tanggal</label>
                                <div className='control'>
                                    <DatePicker
                                        selected={tanggal}
                                        onChange={(date) => setTanggal(date)}
                                        dateFormat="dd/MM/yyyy"
                                        style={inputStyle}
                                        placeholderText='Tanggal'
                                    />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Jam Mulai</label>
                                <div className='control'>
                                    <TimePicker
                                        value={jamMulai}
                                        onChange={(time) => setJamMulai(time)}
                                        timeFormat="HH:mm"
                                        style={{ width: '100%', height: '2.5rem' }}
                                    />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Jam Berakhir</label>
                                <div className='control'>
                                    <TimePicker
                                        value={jamBerakhir}
                                        onChange={(time) => setJamBerakhir(time)}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Mata Kuliah</label>
                                <div className='control'>
                                    <select
                                        className='select'
                                        value={mataKuliah}
                                        onChange={(e) => setMataKuliah(e.target.value)}
                                        style={inputStyle}>                                        
                                        <option value=''>Pilih Mata Kuliah</option>
                                            {matakuliahList.map((matkul) => (
                                                <option key={matkul.id} value={matkul.id}>
                                                    {matkul.mataKuliah}
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

export default FormAddSetPresensi
