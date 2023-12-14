import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function UserDosenList() {

    const [userDosen, setUserDosen] = useState([])

    useEffect(() => {
        getUserDosen()
    }, [])

    const getUserDosen = async () => {
        try {
            const response = await axios.get('http://34.192.213.125:8080/api/admin/user_dosen');
            console.log('Response:', response.data); // Tambahkan log ini
            setUserDosen(response.data.data || []);
        } catch (error) {
            console.error('Error fetching user dosen:', error);
        }
    }

    const deleteUserDosen = async (userDosenId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://34.192.213.125:8080/api/admin/user_dosen/delete/${userDosenId}`)
            getUserDosen()
        }
    }

    return (
        <div>
            <h1 className='title'>User Dosen</h1>
            <h2 className='subtitle'>List Of User Dosen</h2>
            <Link to={'/api/admin/user_dosen/create'} className='button is-primary mb-2'>Create User Dosen</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Nomor Induk Pegawai / NIP</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>No Telepon</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(userDosen)? (
                        userDosen.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.nip}</td>
                            <td>{data.nama}</td>
                            <td>{data.email}</td>
                            <td>{data.noTelepon}</td>
                            <td>
                                <Link to={`/api/admin/user_dosen/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteUserDosen(data.id)} className='button is-small is-danger'>Delete</button>
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

export default UserDosenList

