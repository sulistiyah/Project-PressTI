const db = require("../models")
const ProgramStudi = db.programStudi
const Op = db.Sequelize.Op

exports.createProdi = (req, res) => {
    //Validasi request
    if(!req.body.kodeProdi || !req.body.programStudi) {
      res.status(400).send({
        statusCode : 400,
        message: "Kolom Tidak Boleh Kosong!"
      });
      return;
    }

  //membuat data program studi
  const program_studi = {
    kodeProdi: req.body.kodeProdi,
    programStudi: req.body.programStudi
  };

  //Menyimpan data Program studi kedalam database
  ProgramStudi.create(program_studi)
    .then(data => {
      res.status(200).send({
        statusCode : 200,
        message : "Success Create Data Program Study",
        data : data
      });
    })
    .catch(err => {
      res.status(404).send({
        statusCode : 404,
        message: "Failed Get Data Program Study"
      });
    });
};

//Function GET => mendapatkan semua data dan mendapatkan data dengan query tertentu 
exports.findAll = (req, res) => {
    const id = req.query.id
    const condition = id? { id : { [Op.like]: `%${id}%` } } : null

    ProgramStudi.findAll({ where : condition})
        .then(data => {
            res.status(200).send({
                statusCode : 200,
                message: "Succes Get Data Program Study",
                data : data,
            })
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message:
                err.message || "Failed Get Data Program Study"
            })
        })
}

//Mendapatkan data program studi dengan parameter id include data kelas 
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProgramStudi.findByPk(id, { include: ["kelas"] })
    .then(data => {
      if (data) {
        res.status(200).send({
          statusCode : 200,
          message: "Succes Get Data Program Study By Id",
          data : data,
        })
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot find Program Study with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Error retrieving Program Study with id=" + id
      });
    });
};

//Update/Edit data program studi dengan parameter id
exports.update = (req, res) => {

  //Validasi request
  if(!req.body.kodeProdi || !req.body.programStudi) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  ProgramStudi.update(req.body, {
      where: { id: req.params.id }
  })
  .then(result => {
    if (result[0]) {
      ProgramStudi.findByPk(req.params.id)
        .then(prodi => {
            const formattedData = {
                id: prodi.id,
                kodeProdi: prodi.kodeProdi,
                programStudi: prodi.programStudi,
            };

            res.status(200).send({
                statusCode : 200,
                message: "Program Study Update Successful",
                data: formattedData
            });
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message: err.message || "Some error occurred while retrieving the Program Study."
            });
        });
    } else {
        res.status(404).send({
            statusCode : 404,
            message: `Cannot update Program Study with id=${req.params.id}. Maybe Program Study was not found or req.body is empty!`
        });
    }
  })
  .catch(err => {
      res.status(500).send({
          statusCode : 500,
          message: err.message || "Some error occurred while updating the Program Study."
      });
  });
};

// Delete salah satu data program studi dengan parameter id
exports.delete = (req, res) => {
  const id = req.params.id;

  ProgramStudi.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          statusCode : 200,
          message: "Program Study was deleted successfully!"
        });
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot delete Program Study with id=${id}. Maybe Program Study was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Could not delete Program Study with id=" + id
      });
    });
};
