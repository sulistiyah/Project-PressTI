import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

// axios.defaults.baseURL = 'http://34.192.213.125:8080/api/admin'

function ProgramStudiList() {

    const [programStudi, setProgramStudi] = useState([])

    useEffect(() => {
        getProgramStudi()
    }, [])


    const getProgramStudi = async () => {
        try {
            const response = await axios.get(`http://34.192.213.125:8080/api/admin/program_studi`);
            console.log('Response:', response.data); // Tambahkan log ini
            setProgramStudi(response.data.data || []);
        } catch (error) {
            console.error('Error fetching program studi:', error);
        }
    }

    const deleteProgramStudi = async (programStudiId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://34.192.213.125:8080/api/admin/program_studi/delete/${programStudiId}`)
            getProgramStudi()
        }
    }

    return (
        <div>
            <h1 className='title'>Program Studi</h1>
            <h2 className='subtitle'>List Of Program Studi</h2>
            <Link to={'/api/admin/program_studi/create'} className='button is-primary mb-2'>Create Program Studi</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Kode Program Studi</th>
                        <th>Program Studi</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(programStudi)? (
                        programStudi.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.kodeProdi}</td>
                            <td>{data.programStudi}</td>
                            <td>
                                <Link to={`/api/admin/program_studi/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteProgramStudi(data.id)} className='button is-small is-danger'>Delete</button>
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

export default ProgramStudiList
