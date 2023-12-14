module.exports = app => {
    const admin = require("../controllers/admin_controller.js")
    const router = require("express").Router()

    app.use("/api/admin", router)

    //ADMIN
    router.post("/create_admin", admin.createAdmin)
    router.post("/login", admin.loginAdmin)
    router.get("/my_admin", admin.findAllAdmin)

    //PROGRAM STUDI
    router.post("/program_studi/create", admin.createProgramStudi);
    router.get("/program_studi", admin.findAllProgramStudi)
    router.get("/program_studi/:id", admin.findOneProgramStudi);
    router.put("/program_studi/update/:id", admin.updateProgramStudi)
    router.delete("/program_studi/delete/:id", admin.deleteProgramStudi)

    //KELAS
    router.post("/kelas/create", admin.createKelas)
    router.get("/kelas", admin.findAllKelas)
    router.get("/kelas/:id", admin.findOneKelas)
    router.put("/kelas/update/:id", admin.updateKelas)
    router.delete("/kelas/delete/:id", admin.deleteKelas)

    //MATA KULIAH
    router.post("/mata_kuliah/create", admin.createMataKuliah)
    router.get("/mata_kuliah", admin.findAllMataKuliah)
    router.get("/mata_kuliah/:id", admin.findOneMataKuliah)
    router.put("/mata_kuliah/update/:id", admin.updateMataKuliah)
    router.delete("/mata_kuliah/delete/:id", admin.deleteMataKuliah)

    //USER MAHASISWA
    router.post("/user_mahasiswa/create", admin.createUserMahasiswa)
    router.get("/user_mahasiswa", admin.findAllUserMahasiswa)
    router.get("/user_mahasiswa/:id", admin.findOneUserMahasiswa)
    router.put("/user_mahasiswa/update/:id", admin.updateUserMahasiswa)
    router.delete("/user_mahasiswa/delete/:id", admin.deleteUserMahasiswa)

    //USER DOSEN
    router.post("/user_dosen/create", admin.createUserDosen)
    router.get("/user_dosen", admin.findAllUserDosen)
    router.get("/user_dosen/:id", admin.findOneUserDosen)
    router.put("/user_dosen/update/:id", admin.updateUserDosen)
    router.delete("/user_dosen/delete/:id", admin.deleteUserDosen)


    //USER DOSEN
    router.post("/set_presensi/create", admin.createSetPresensi)
    router.get("/set_presensi", admin.findAllSetPresensi)
    router.get("/set_presensi/:id", admin.findOneSetPresensi)
    router.put("/set_presensi/update/:id", admin.updateSetPresensi)
    router.delete("/set_presensi/delete/:id", admin.deleteSetPresensi)
    
}