import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import Dasboard from "./pages/Dasboard"
import RequireAuthenticationHOC from './features/RequireAuthenticationHOC';

import ProgramStudi from "./pages/program_studi/ProgramStudi"
import AddProgramStudi from "./pages/program_studi/AddProgramStudi"
import EditProgramStudi from "./pages/program_studi/EditProgramStudi"

import Kelas from "./pages/kelas/Kelas"
import AddKelas from "./pages/kelas/AddKelas"
import EditKelas from "./pages/kelas/EditKelas"

import MataKuliah from "./pages/mata_kuliah/MataKuliah"
import AddMataKuliah from "./pages/mata_kuliah/AddMataKuliah"
import EditMataKuliah from "./pages/mata_kuliah/EditMataKuliah"

import UserMahasiswa from "./pages/user_mahasiswa/UserMahasiswa"
import AddUserMahasiswa from "./pages/user_mahasiswa/AddUserMahasiswa"
import EditUserMahasiswa from "./pages/user_mahasiswa/EditUserMahasiswa"

import UserDosen from "./pages/user_dosen/UserDosen"
import AddUserDosen from "./pages/user_dosen/AddUserDosen"
import EditUserDosen from "./pages/user_dosen/EditUserDosen"

import SetPresensi from "./pages/set_presensi/SetPresensi"
import AddSetPresensi from "./pages/set_presensi/AddSetPresensi"
import EditSetPresensi from "./pages/set_presensi/EditSetPresensi"




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={ <Login/> } />
          <Route path="/api/admin/login" element={ <Login/> } />
          <Route path="/api/admin/dashboard" element={ <Dasboard/>} />

          <Route path="/api/admin/program_studi" element={ <ProgramStudi/> } />
          <Route path="/api/admin/program_studi/create" element={ <AddProgramStudi/> } />
          <Route path="/api/admin/program_studi/update/:id" element={ <EditProgramStudi/> } />

          <Route path="/api/admin/kelas" element={ <Kelas/> } />
          <Route path="/api/admin/kelas/create" element={ <AddKelas/> } />
          <Route path="/api/admin/kelas/update/:id" element={ <EditKelas/> } />

          <Route path="/api/admin/mata_kuliah" element={ <MataKuliah/> } />
          <Route path="/api/admin/mata_kuliah/create" element={ <AddMataKuliah/> } />
          <Route path="/api/admin/mata_kuliah/update/:id" element={ <EditMataKuliah/> } />

          <Route path="/api/admin/user_mahasiswa" element={ <UserMahasiswa/> } />
          <Route path="/api/admin/user_mahasiswa/create" element={ <AddUserMahasiswa/> } />
          <Route path="/api/admin/user_mahasiswa/update/:id" element={ <EditUserMahasiswa/> } />

          <Route path="/api/admin/user_dosen" element={ <UserDosen/> } />
          <Route path="/api/admin/user_dosen/create" element={ <AddUserDosen/> } />
          <Route path="/api/admin/user_dosen/update/:id" element={ <EditUserDosen/> } />

          <Route path="/api/admin/set_presensi" element={ <SetPresensi/> } />
          <Route path="/api/admin/set_presensi/create" element={ <AddSetPresensi/> } />
          <Route path="/api/admin/set_presensi/update/:id" element={ <EditSetPresensi/> } />

        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
