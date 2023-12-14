import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function KelasList() {

    const [kelas, setKelas] = useState([])

    useEffect(() => {
        getKelas()
    }, [])


    const getKelas = async () => {
        try {
            const response = await axios.get('http://18.210.63.173:8080/api/admin/kelas');
            console.log('Response:', response.data); // Tambahkan log ini
            setKelas(response.data.data || []);
        } catch (error) {
            console.error('Error fetching kelas:', error);
        }
    }

    const deleteKelas = async (kelasId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://18.210.63.173:8080/api/admin/kelas/delete/${kelasId}`)
            getKelas()
        }
        
    }

    return (
        <div>
            <h1 className='title'>Kelas</h1>
            <h2 className='subtitle'>List Of Kelas</h2>
            <Link to={'/api/admin/kelas/create'} className='button is-primary mb-2'>Create Kelas</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Kode Kelas</th>
                        <th>Kelas</th>
                        <th>Program Studi</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(kelas)? (
                        kelas.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.kodeKelas}</td>
                            <td>{data.kelas}</td>
                            <td>{data.programStudi ? data.programStudi.programStudi : 'N/A'}</td>
                            <td>
                                <Link to={`/api/admin/kelas/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteKelas(data.id)} className='button is-small is-danger'>Delete</button>
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

export default KelasList
