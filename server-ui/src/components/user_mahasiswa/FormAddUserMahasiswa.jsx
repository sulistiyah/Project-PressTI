import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FormAddUserMahasiswa() {

    const [nim, setNim] = useState('')
    const [nama, setNama] = useState('')
    const [programStudiId, setProgramStudiId] = useState('')
    const [programStudiList, setProgramStudiList] = useState([]);
    const [kelasId, setKelasId] = useState('')
    const [kelasList, setKelasList] = useState([]);
    const [noTelepon, setNoTelepon] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for Program Studi
                const responseProgramStudi = await axios.get('http://34.192.213.125:8080/api/admin/program_studi');
                setProgramStudiList(responseProgramStudi.data.data);
    
                // Fetch data for Kelas
                const responseKelas = await axios.get('http://34.192.213.125:8080/api/admin/kelas');
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

    const saveUserMahasiswa = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://34.192.213.125:8080/api/admin/user_mahasiswa/create', {
                nim : nim,
                nama : nama,
                programStudiId : programStudiId,
                kelasId : kelasId,
                noTelepon : noTelepon,
                password : password,
                rePassword : rePassword
            })            
            navigate("/api/admin/user_mahasiswa")
            console.log({
                nim : nim,
                nama : nama,
                programStudiId : programStudiId,
                kelasId : kelasId,
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
            <h1 className='title'>User Mahasiswa</h1>
            <h2 className='subtitle'>Create User Mahasiswa</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveUserMahasiswa}>
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

export default FormAddUserMahasiswa
