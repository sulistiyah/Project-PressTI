const db = require("../models")
const MataKuliah = db.matkul
const ProgramStudi = db.programStudi
const Kelas = db.kelas
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  if(!req.body.kodeMatkul || !req.body.mataKuliah || !req.body.programStudiId || !req.body.kelasId) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }
  //membuat data Mata Kuliah
  const mata_kuliah = {
    kodeMatkul: req.body.kodeMatkul,
    mataKuliah: req.body.mataKuliah,
    programStudiId : req.body.programStudiId,
    kelasId : req.body.kelasId
  };

  //Menyimpan data Mata Kuliah kedalam database
  MataKuliah.create(mata_kuliah)
  .then(data => {
    if (!data) {
        res.status(404).send({
            statusCode : 404,
            message: "Failed Create Data Mata Kuliah"
        });
    } else {
    // Mencari program studi berdasarkan ID yang diberikan
    ProgramStudi.findByPk(req.body.programStudiId)
    .then(programStudi => {
    if (!programStudi) {
        res.status(404).send({
            statusCode : 404,
            message: "Program Study not found"
        });
    } else {
        // Mencari kelas berdasarkan ID yang diberikan
        Kelas.findByPk(req.body.kelasId)
        .then(kelas => {
            if (!kelas) {
                res.status(404).send({
                    statusCode : 404,
                    message: "Kelas not found"
                });
            } else {
                res.status(200).send({
                    statusCode : 200,
                    message: "Create Mata Kuliah Successful",
                    data: {
                        id: data.id,
                        kodeMatkul: data.kodeMatkul,
                        mataKuliah: data.mataKuliah,
                        programStudi: {
                            id: programStudi.id,
                            kodeProdi: programStudi.kodeProdi,
                            programStudi: programStudi.programStudi,
                        },
                        kelas: {
                            id: kelas.id,
                            kodeKelas: kelas.kodeKelas,
                            kelas: kelas.kelas,
                        }                                
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while retrieving Kelas."
            });
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while retrieving Program Studi."
        });
    });
    }
  })
  .catch(err => {
      res.status(500).send({
      statusCode : 500,
      message: err.message || "Some error occurred while creating the User."
      });
  });
};

//Function GET => mendapatkan semua data dan mendapatkan data dengan query tertentu 
exports.findAll = (req, res) => {
    const id = req.query.id
    const condition = id? { mataKuliah : { [Op.like]: `%${id}%` } } : null

    MataKuliah.findAll({ 
      where : condition,
      include : [
        {
          model : ProgramStudi,
          as : "programStudi"
        },
        {
          model : Kelas,
          as : "kelas"
        }
      ]
    })
    .then(data => {
      const formdData = data.map(matkul => ({
        id: matkul.id,
        kodeMatkul: matkul.kodeMatkul,
        mataKuliah: matkul.mataKuliah,
        programStudi:{
          id: matkul.programStudi.id,
          kodeProdi: matkul.programStudi.kodeProdi,
          programStudi: matkul.programStudi.programStudi
        },
        kelas:{
          id: matkul.kelas.id,
          kodeKelas: matkul.kelas.kodeKelas,
          kelas: matkul.kelas.kelas
        }
      }))
      res.status(200).send({
        statusCode : 200,
        message: "Succes Get Data Mata Kuliah",
        data : formdData,
      })
    })
    .catch(err => {
        res.status(500).send({
          statusCode : 500,
          message:
          err.message || "Failed Get Data Mata Kuliah"
        })
    }) 
}

//Mendapatkan data Mata Kuliah dengan parameter id include data kelas 
exports.findOne = (req, res) => {
  const id = req.params.id;

  MataKuliah.findByPk(id, { include: ["programStudi", "kelas"] })
    .then(data => {
      if (data) {
        res.status(200).send({
          statusCode : 200,
          message: "Succes Get Data Mata Kuliah By Id",
          data : data,
        })
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot find Mata Kuliah with id = ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Error retrieving Mata Kuliah with id =" + id
      });
    });
};

//Update/Edit data Mata Kuliah dengan parameter id
exports.update = async (req, res) => {
  if(!req.body.kodeMatkul || !req.body.mataKuliah) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  try {
      const result = await MataKuliah.update(req.body, {
        where: { id: req.params.id }
      });
  
      if (result[0]) {
        const mataKuliah = await MataKuliah.findByPk(req.params.id, {
          include: ["programStudi", "kelas"]
        });
  
        if (!mataKuliah) {
          return res.status(404).send({
            statusCode: 404,
            message: `Cannot find Mata Kuliah with id=${req.params.id}.`
          });
        }
  
        const formattedData = {
          id: mataKuliah.id,
          kodeMatkul: mataKuliah.kodeMatkul,
          mataKuliah: mataKuliah.mataKuliah,
          programStudi: {
            id: mataKuliah.programStudi.id,
            kodeProdi: mataKuliah.programStudi.kodeProdi,
            programStudi: mataKuliah.programStudi.programStudi
          },
          kelas: {
            id: mataKuliah.kelas.id,
            kodeKelas: mataKuliah.kelas.kodeKelas,
            kelas: mataKuliah.kelas.kelas
          }
        };
  
        res.status(200).send({
          statusCode: 200,
          message: "Mata Kuliah Update Successful",
          data: formattedData
        });
      } else {
        res.status(404).send({
          statusCode: 404,
          message: `Cannot update Mata Kuliah with id=${req.params.id}. Maybe Mata Kuliah was not found or req.body is empty!`
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        statusCode: 500,
        message: err.message || "Some error occurred while updating the Mata Kuliah."
      });
    }
};

// Delete salah satu data Mata Kuliah dengan parameter id
exports.delete = (req, res) => {
  const id = req.params.id;

  MataKuliah.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          statusCode : 200,
          message: "Mata Kuliah was deleted successfully!"
        });
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot delete Mata Kuliah with id=${id}. Maybe Mata Kuliah was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Could not delete Mata Kuliah with id=" + id
      });
    });
};
