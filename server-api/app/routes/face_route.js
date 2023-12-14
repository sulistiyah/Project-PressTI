// const { authJwtMahasiswa} = require("../middleware")
// const controller = require("../controllers/face_controller.js");
// // const multer = require('multer')
// // const upload = multer({dest : '../uploads/'})
// // const upload = multer({dest: 'uploads/'})
// // const upload = require('../middleware/multer.js');
// const uploadFile = require('../middleware/upload.js');
// // const config = {
// //   headers: {
// //     "Content-Type": "multipart/form-data",
// //   },
// // };

module.exports = app => {
  const controller = require("../controllers/face_controller.js");
  const router = require("express").Router()
  const uploadFile = require('../middleware/upload.js');

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-type, Accept",
    );
    next();
  });

  //route awal untuk semua api mahasiswa
  app.use("/api/mahasiswa", router)

  // router.post("/detect-face", uploadFile.single('image'), controller.detectAndSaveFace)

  router.post("/face-detection", uploadFile.single('image'), controller.detectFace)

  //GET ALL My Profile - Data Mahasiswa //mengcek wajah dari database 
  // router.post(   "/check-face", 
  //               [ authJwt.verifikasiToken ], 
  //               controller.checkFace)

  // GET My Profile By Id - Data Mahasiswa // mendaftarkan wajah
  // router.post(   "/create-face", upload.single('images', 'label'), 
  //               controller.faceUpload)

  // router.post("/post-face",upload.fields(
  //   [
  //     {name : 'File1'},
  //     {name : 'File2'},
  //     {name : 'File3'},
  //   ]), controller.uploadLabeledImages)
  // router.post("/check-face", controller.getDescriptorsFromDB)
}