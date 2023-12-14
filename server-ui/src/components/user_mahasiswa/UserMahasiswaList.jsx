import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function UserMahasiswaList() {

    const [userMahasiswa, setUserMahasiswa] = useState([])

    useEffect(() => {
        getUserMahasiswa()
    }, [])

    const getUserMahasiswa = async () => {
        try {
            const response = await axios.get('http://18.210.63.173:8080/api/admin/user_mahasiswa');
            console.log('Response:', response.data); // Tambahkan log ini
            setUserMahasiswa(response.data.data || []);
        } catch (error) {
            console.error('Error fetching user mahasiswa:', error);
        }
    }

    const deleteUserMahasiswa = async (userMahasiswaId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://18.210.63.173:8080/api/admin/user_mahasiswa/delete/${userMahasiswaId}`)
            getUserMahasiswa()
        }
    }

    return (
        <div>
            <h1 className='title'>User Mahasiswa</h1>
            <h2 className='subtitle'>List Of User Mahasiswa</h2>
            <Link to={'/api/admin/user_mahasiswa/create'} className='button is-primary mb-2'>Create User Mahasiswa</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Nomor Induk Mahasiswa / NIM</th>
                        <th>Nama</th>
                        <th>Program Studi</th>
                        <th>Kelas</th>
                        <th>No Telepon</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(userMahasiswa)? (
                        userMahasiswa.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.nim}</td>
                            <td>{data.nama}</td>
                            <td>{data.programStudi ? data.programStudi.programStudi : 'N/A'}</td>
                            <td>{data.kelas ? data.kelas.kelas : 'N/A'}</td>
                            <td>{data.noTelepon}</td>
                            <td>
                                <Link to={`/api/admin/user_mahasiswa/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteUserMahasiswa(data.id)} className='button is-small is-danger'>Delete</button>
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

export default UserMahasiswaList
