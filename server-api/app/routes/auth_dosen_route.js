const { verifikasiRegister } = require("../middleware");
const { authJwtDosen} = require("../middleware")
const controllerUser = require("../controllers/auth_dosen_controller.js");
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

  //route awal untuk semua api dosen
  app.use("/api/dosen", router)

  //POST untuk register dosen
  router.post(  "/register",
                [ verifikasiRegister.checkDuplicateDataDosen ],
                controllerUser.register);

  //POST untuk login dosen
  router.post(  "/login", controllerUser.login);

  //GET ALL My Profile - Data dosen
  router.get(   "/my_profile", 
                [ authJwtDosen.verifikasiTokenDosen ], 
                controllerUser.findAllMyProfile)

  //GET My Profile By Id - Data dosen
  router.get(   "/my_profile/:id", 
                [ authJwtDosen.verifikasiTokenDosen ], 
                controllerUser.findOneMyProfileById)

  //PUT My Profile By Id (Edit Profil) - Data dosen
  router.put(   "/my_profile/:id",
                [ authJwtDosen.verifikasiTokenDosen ],
                controllerUser.editProfil) 

  router.put(   "/my_profile",
                [ authJwtDosen.verifikasiTokenDosen ],
                controllerUser.editProfil) 

  //PUT Change Password By Id (Ganti Kata Sandi) - Data dosen
  router.put( "/change_password/:id",
              [ authJwtDosen.verifikasiTokenDosen ],
              controllerUser.changePassword)

//////////////////////////////////////////////////////////////////////PROGRAM STUDI//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/program_studi", 
                [ authJwtDosen.verifikasiTokenDosen ], 
                constrollerProgramStudi.findAll)

  //GET Data Program Studi By Id
  router.get(  "/program_studi/:id", 
                [authJwtDosen.verifikasiTokenDosen ],
                constrollerProgramStudi.findOne)


//////////////////////////////////////////////////////////////////////KELAS//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/kelas", 
                [ authJwtDosen.verifikasiTokenDosen ], 
                controllerKelas.findAll)

  //GET Data Program Studi By Id
  router.get(  "/kelas/:id", 
                [authJwtDosen.verifikasiTokenDosen ],
                controllerKelas.findOne)             
                
//////////////////////////////////////////////////////////////////////MATA KULIAH//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/mata_kuliah", 
                [ authJwtDosen.verifikasiTokenDosen ], 
                controllerMataKuliah.findAll)

  //GET Data Program Studi By Id
  router.get(  "/mata_kuliah/:id", 
                [authJwtDosen.verifikasiTokenDosen ],
                controllerMataKuliah.findOne)
  
};
