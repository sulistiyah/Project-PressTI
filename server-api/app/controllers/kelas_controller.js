const db = require("../models")
const Kelas = db.kelas
const ProgramStudi = db.programStudi
const Op = db.Sequelize.Op

//membuatd dan menyimpan data kelas ke database
exports.create = (req, res) => {
  if(!req.body.kodeKelas || !req.body.kelas) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  Kelas.create({
    kodeKelas : req.body.kodeKelas,
    kelas : req.body.kelas,
    programStudiId : req.body.programStudiId
  }, {
    include : ["programStudi"]
  })
  .then(data => {
    if(!data) {
      res.status(404).send({
        statusCode : 404,
        message : "Failed Create Data Class"
      })
    } else {
      ProgramStudi.findByPk(req.body.programStudiId)
        .then(programStudi => {
          if(!programStudi) {
            res.status(404).send({
              statusCode : 404,
              message : "Program Study Not Found"
            })
          }else {
            res.status(200) .send({
              statusCode : 200,
              message : "Success Create Data Class",
              data : {
                id : data.id,
                kodeKelas : data.kodeKelas,
                kelas : data.kelas,
                programStudi : {
                  id : programStudi.id,
                  kodeProdi : programStudi.kodeProdi,
                  programStudi : programStudi.programStudi
                }
              }
            })
          }
        })
        .catch(err => {
          res.status(500).send({
          statusCode : 500,
          message:
            err.message || "Some error occurred while creating the Class."
          });
        });
    }
  })
  .catch(err => {
    res.status(500).send({
    statusCode : 500,
    message:
      err.message || "Some error occurred while creating the Class."
    });
  });
};


//Function menemukan semua data kelas dan menemukan data dengan query tertentu
exports.findAll = (req, res) => {
  const id = req.query.id
  const condition = id? { id : { [Op.like]: `%${id}%` } } : null

  Kelas.findAll({ 
    where : condition,
    include: [
      {
        model : ProgramStudi,
        as: "programStudi"
      }
    ]
  })
  .then(data => {
    const formdData = data.map(kelas => ({
      id: kelas.id,
      kodeKelas: kelas.kodeKelas,
      kelas: kelas.kelas,
      programStudi:{
        id: kelas.programStudi.id,
        kodeProdi: kelas.programStudi.kodeProdi,
        programStudi: kelas.programStudi.programStudi
      }
    }))
    res.status(200).send({
      statusCode : 200,
      message: "Succes Get Data Class",
      data : formdData,
    })
  })
  .catch(err => {
    res.status(500).send({
        statusCode : 500,
        message:
        err.message || "Failed Get Data Class"
    })
  })
}

//function mendapatkan data kelas berdasarkan parameter id include data program studi
exports.findOne = (req, res) => {
  const id = req.params.id;

  Kelas.findByPk(id, { 
    include: [{
      model : ProgramStudi,
      as: "programStudi"
    }] 
  })
    .then(data => {
      if (data) {
        res.status(200).send({
          statusCode : 200,
          message: "Succes Get Data Class By Id",
          data : {
            id : data.id,
            kodeKelas : data.kodeKelas,
            programStudi : {
              id : data.programStudi.id,
              kodeProdi : data.programStudi.kodeProdi,
              programStudi : data.programStudi.programStudi
            }
          },
        })
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot find Class with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Error retrieving Class with id=" + id
      });
    });
};

//Update/Edit data kelas berdasarkan parameter id
exports.update = async (req, res) => {
  if(!req.body.kodeKelas || !req.body.kelas) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  try {
    const result = await Kelas.update(req.body, {
      where: { id: req.params.id }
    });

    if (result[0]) {
      const kelas = await Kelas.findByPk(req.params.id, {
        include: ["programStudi"]
      });

      if (!kelas) {
        return res.status(404).send({
          statusCode: 404,
          message: `Cannot find Class with id=${req.params.id}.`
        });
      }

      const formattedData = {
        id: kelas.id,
        kodeKelas: kelas.kodeKelas,
        kelas: kelas.kelas,
        programStudi: {
          id: kelas.programStudi.id,
          kodeProdi: kelas.programStudi.kodeProdi,
          programStudi: kelas.programStudi.programStudi
        }
      };

      res.status(200).send({
        statusCode: 200,
        message: "Class Update Successful",
        data: formattedData
      });
    } else {
      res.status(404).send({
        statusCode: 404,
        message: `Cannot update Class with id=${req.params.id}. Maybe Class was not found or req.body is empty!`
      });
    }
  } catch(err) {
      res.status(500).send({
          statusCode : 500,
          message: err.message || "Some error occurred while updating the Class."
      });
  }
};


// Delete salah satu data kelas dengan parameter id
exports.delete = (req, res) => {
  const id = req.params.id;

  Kelas.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          statusCode : 200,
          message: "Class was deleted successfully!"
        });
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot delete Class with id= ${id}. Maybe Class was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Could not delete Class with id =" + id
      });
    });
};

