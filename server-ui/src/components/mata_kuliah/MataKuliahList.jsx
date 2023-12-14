import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function MataKuliahList() {

    const [mataKuliah, setMataKuliah] = useState([])

    useEffect(() => {
        getMataKuliah()
    }, [])

    const getMataKuliah = async () => {
        try {
            const response = await axios.get('http://18.210.63.173:8080/api/admin/mata_kuliah');
            console.log('Response:', response.data); // Tambahkan log ini
            setMataKuliah(response.data.data || []);
        } catch (error) {
            console.error('Error fetching mata kuliah:', error);
        }
    }

    const deleteMataKuliah = async (mataKuliahId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://18.210.63.173:8080/api/admin/mata_kuliah/delete/${mataKuliahId}`)
            getMataKuliah()
        }
    }

    return (
        <div>
            <h1 className='title'>Mata Kuliah</h1>
            <h2 className='subtitle'>List Of Mata KUliah</h2>
            <Link to={'/api/admin/mata_kuliah/create'} className='button is-primary mb-2'>Create Mata Kuliah</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Kode Mata Kuliah</th>
                        <th>Mata Kuliah</th>
                        <th>Program Studi</th>
                        <th>Kelas</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(mataKuliah)? (
                        mataKuliah.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.kodeMatkul}</td>
                            <td>{data.mataKuliah}</td>
                            <td>{data.programStudi ? data.programStudi.programStudi : 'N/A'}</td>
                            <td>{data.kelas ? data.kelas.kelas : 'N/A'}</td>
                            <td>
                                <Link to={`/api/admin/mata_kuliah/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteMataKuliah(data.id)} className='button is-small is-danger'>Delete</button>
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

export default MataKuliahList
