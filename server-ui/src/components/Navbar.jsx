import React from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import logo from '../logo_ti.png'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from '../features/authSlice'

function Navbar() {

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


  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to = "/api/admin/dashboard" className="navbar-item">
            <img 
                src={logo}
                width="150" 
                height="200"
                alt='logo'
            />
          </NavLink>
      
          <a href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" className="navbar-menu">

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
