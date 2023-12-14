const { verifikasiRegister } = require("../middleware");
const { authJwtMahasiswa} = require("../middleware")
const controllerUser = require("../controllers/auth_mahasiswa_controller.js");
const constrollerProgramStudi = require("../controllers/program_studi_controller.js")
const controllerKelas = require("../controllers/kelas_controller.js")
const controllerMataKuliah = require("../controllers/mata_kuliah_controller.js")


module.exports = app => {
  const router = require("express").Router()

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //route awal untuk semua api mahasiswa
  app.use("/api/mahasiswa", router)

  //POST untuk register mahasiswa
  router.post(  "/register",
                [ verifikasiRegister.checkDuplicateDataMahasiswa ], 
                controllerUser.register);

  //POST untuk login mahasiswa
  router.post(  "/login", controllerUser.login);

  //GET ALL My Profile - Data Mahasiswa
  router.get(   "/my_profile", 
                [ authJwtMahasiswa.verifikasiTokenMahasiswa ], 
                controllerUser.findAllMyProfile)

  //GET My Profile By Id - Data Mahasiswa
  router.get(   "/my_profile/:id", 
                [ authJwtMahasiswa.verifikasiTokenMahasiswa ], 
                controllerUser.findOneMyProfileById)

  //PUT My Profile By Id (Edit Profil) - Data Mahasiswa
  router.put(   "/my_profile/:id",
                [ authJwtMahasiswa.verifikasiTokenMahasiswa ],
                controllerUser.editProfil) 

  //PUT Change Password By Id (Ganti Kata Sandi) - Data Mahasiswa
  router.put( "/change_password/:id",
              [ authJwtMahasiswa.verifikasiTokenMahasiswa ],
              controllerUser.changePassword)

//////////////////////////////////////////////////////////////////////PROGRAM STUDI//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/program_studi", 
                [ authJwtMahasiswa.verifikasiTokenMahasiswa ], 
                constrollerProgramStudi.findAll)

  //GET Data Program Studi By Id
  router.get(  "/program_studi/:id", 
                [authJwtMahasiswa.verifikasiTokenMahasiswa ],
                constrollerProgramStudi.findOne)


//////////////////////////////////////////////////////////////////////KELAS//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/kelas", 
                [ authJwtMahasiswa.verifikasiTokenMahasiswa ], 
                controllerKelas.findAll)

  //GET Data Program Studi By Id
  router.get(  "/kelas/:id", 
                [authJwtMahasiswa.verifikasiTokenMahasiswa ],
                controllerKelas.findOne)             
                
//////////////////////////////////////////////////////////////////////MATA KULIAH//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/mata_kuliah", 
                [ authJwtMahasiswa.verifikasiTokenMahasiswa ], 
                controllerMataKuliah.findAll)

  //GET Data Program Studi By Id
  router.get(  "/mata_kuliah/:id", 
                [authJwtMahasiswa.verifikasiTokenMahasiswa ],
                controllerMataKuliah.findOne)                        
  
};
