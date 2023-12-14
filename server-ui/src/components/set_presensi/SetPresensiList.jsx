import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function SetPresensiList() {

    const [setPresensi, setSetPresensi] = useState([])

    useEffect(() => {
        getSetPresensi()
    }, [])

    const getSetPresensi = async () => {
        try {
            const response = await axios.get('http://34.192.213.125:8080/api/admin/set_presensi');
            console.log('Response:', response.data); // Tambahkan log ini
            setSetPresensi(response.data.data || []);
        } catch (error) {
            console.error('Error fetching user presensi:', error);
        }
    }

    const deleteSetPresensi = async (setPresensiId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://34.192.213.125:8080/api/admin/set_presensi/delete/${setPresensiId}`)
            getSetPresensi()
        }
    }

    return (
        <div>
            <h1 className='title'>Set Presensi</h1>
            <h2 className='subtitle'>List Of Set Presensi</h2>
            <Link to={'/api/admin/set_presensi/create'} className='button is-primary mb-2'>Create Set Presensi</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Tanggal</th>
                        <th>Jam Mulai</th>
                        <th>Jam Berakhir</th>
                        <th>Mata Kuliah</th>
                        <th>Kelas</th>
                        <th>Program Studi</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(setPresensi)? (
                        setPresensi.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.tanggal}</td>
                            <td>{data.jamMulai}</td>
                            <td>{data.jamBerakhir}</td>
                            <td>{data.mataKuliah ? data.mataKuliah.mataKuliah : 'N/A'}</td>
                            <td>{data.kelas ? data.kelas.kelas : 'N/A'}</td>
                            <td>{data.programStudi ? data.programStudi.programStudi : 'N/A'}</td>                            
                            <td>
                                <Link to={`/api/admin/set_presensi/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteSetPresensi(data.id)} className='button is-small is-danger'>Delete</button>
                            </td>
                        </tr>
                    ))): (
                        <tr>
                            <td colSpan="5">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SetPresensiList
