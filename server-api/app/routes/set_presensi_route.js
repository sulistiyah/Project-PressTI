const { verifikasiRegister } = require("../middleware");
const { authJwtDosen} = require("../middleware")
const controllerSetPresensi = require("../controllers/set_presensi_controller.js")


module.exports = app => {
    const setPresensi = require("../controllers/set_presensi_controller.js")
    const router = require("express").Router()

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Set Presensi
    router.post("/dosen/set_presensi",[ authJwtDosen.verifikasiTokenDosen ], setPresensi.create);

    //GET Data Set Presensi
    router.get("/mahasiswa/set_presensi", [ authJwtDosen.verifikasiTokenDosen ], setPresensi.findAll)

    //GET Data Set Presensi By Id
    router.get("/mahasiswa/set_presensi/:id", [ authJwtDosen.verifikasiTokenDosen ],  setPresensi.findOne)
    router.get("/dosen/set_presensi/:id", [ authJwtDosen.verifikasiTokenDosen ],  setPresensi.findOne)

    //PUT Data Set Presensi By id => Edit/Update Data
    router.put("/set_presensi/:id", [ authJwtDosen.verifikasiTokenDosen ],  setPresensi.update)

    //DELETE Data Set Presensi By Id
    router.delete("/set_presensi/:id", [ authJwtDosen.verifikasiTokenDosen ],  setPresensi.delete)

    app.use("/api", router)


}