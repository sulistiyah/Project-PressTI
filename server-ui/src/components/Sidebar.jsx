import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { IoSchool, IoPeople, IoBook, IoPerson, IoSettings, IoDocumentText, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from '../features/authSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {admin} = useSelector(
        (state) => state.auth
    )

    const logout = () => {
        // dispatch(LogOut())
        dispatch(reset())
        navigate('/api/admin/login')
    }

    const styleTitleMenu = {
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px' , 
        fontSize: '18px', 
        fontFamily: 'Time New Roman', 
        color: '#000000'
    }

    const styleIconMenu = {
        fontSize: '24px' , 
        color: '#000000'
    }

    const styleMenu = {
        display: 'flex', 
        alignItems: 'center',
        gap: '8px', 
        fontSize: '16px' , 
        fontFamily: 'Time New Roman', 
        color: '#000000'
    }

    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label" style={styleTitleMenu}> General </p>
                    <ul className="menu-list">
                        <li>
                        <NavLink to={"/api/admin/dashboard"} style={styleMenu}>
                            <IoHome style={styleIconMenu} />
                            Dashboard
                        </NavLink>
                        </li>
                    </ul>
                <p className="menu-label" style={styleTitleMenu}> Administrator </p>
                    <ul className="menu-list">
                        <li>
                            <NavLink to={"/api/admin/program_studi"} style={styleMenu}>
                            <IoSchool style={styleIconMenu}/>
                                Program Studi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/kelas"} style={styleMenu}>
                            <IoPeople style={styleIconMenu}/>
                                Kelas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/mata_kuliah"} style={styleMenu}>
                            <IoBook style={styleIconMenu}/>
                                Mata Kuliah
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/user_mahasiswa"} style={styleMenu}>
                            <IoPerson style={styleIconMenu}/>
                                User Mahasiswa
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/user_dosen"} style={styleMenu}>
                            <IoPerson style={styleIconMenu}/>
                                User Dosen
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/set_presensi"} style={styleMenu}>
                            <IoSettings style={styleIconMenu}/>
                                Set Presensi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/rekapitulasi_presensi"} style={styleMenu}>
                            <IoDocumentText style={styleIconMenu}/>
                                Rekapitulasi Presensi
                            </NavLink>
                        </li>
                    </ul>
                <p className="menu-label" style={styleTitleMenu}> Settings </p>
                    <ul className="menu-list">
                        <li>
                            <button onClick={logout} className='button is-white' style={styleMenu}>
                            <IoLogOut style={styleIconMenu}/>
                                Logout
                            </button>
                        </li>
                    </ul>
            </aside>
        </div>
    )
}

export default Sidebar
