const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

const sequelizeDB = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port : dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeDatabase = sequelizeDB;


db.admin = require("./admin_model.js")(sequelizeDB, Sequelize)
db.programStudi = require("./program_studi_model.js")(sequelizeDB, Sequelize);
db.kelas = require("./kelas_model.js")(sequelizeDB, Sequelize)
db.matkul = require("./mata_kuliah_model.js")(sequelizeDB, Sequelize)
db.userMahasiswa = require("./mahasiswa_model.js")(sequelizeDB, Sequelize)
db.userDosen = require("./dosen_model.js")(sequelizeDB, Sequelize)
db.setPresensi = require("./set_presensi_model.js")(sequelizeDB, Sequelize)
db.kehadiran = require("./kehadiran_model.js")(sequelizeDB, Sequelize)
db.face = require("./face_model.js")(sequelizeDB, Sequelize)


//Menyambungkan foreign key program studi ke kelas
db.programStudi.hasMany(db.kelas, {as : "kelas"})
db.kelas.belongsTo(db.programStudi, {
  foreignKey : "programStudiId",
  as: "programStudi",
})

//Menyabungkan foreignKey tabel mata_kuliah dengan tabel program_studi
db.programStudi.hasMany(db.matkul, {
  foreignKey : "programStudiId",
  as : "matkul"})
db.matkul.belongsTo(db.programStudi, {
  foreignKey : "programStudiId",
  as: "programStudi"
})

//Menyabungkan foreignKey tabel mata_kuliah dengan tabel kelas
db.kelas.hasMany(db.matkul, {
  foreignKey : "kelasId",
  as : "matkul"
})
db.matkul.belongsTo(db.kelas, {
  foreignKey : "kelasId",
  as: "kelas"
})


//Menyambungkan foreign key prodi dan kelas ke user mahasiswa
db.userMahasiswa.belongsTo(db.programStudi, {
  foreignKey : "programStudiId",
  as: "programStudi",
})
// db.kelas.hasMany(db.userMahasiswa, {as : "userMahasiswaa"})
db.userMahasiswa.belongsTo(db.kelas, {
  foreignKey : "kelasId",
  as: "kelas",
})


//Menyambungkan Foreign Key program studi ke set presensi
db.programStudi.hasMany(db.setPresensi, {
  foreignKey : "programStudiId",
  as : "setPresensi"
})
db.setPresensi.belongsTo(db.programStudi, {
  foreignKey : "programStudiId",
  as : "programStudi"
})


//Menyambungkan Foreign Key Kelas ke set presensi
db.kelas.hasMany(db.setPresensi, {
  foreignKey : "kelasId",
  as : "setPresensi"
})
db.setPresensi.belongsTo(db.kelas, {
  foreignKey : "kelasId",
  as : "kelas"
})

//Menyambungkan Foreign Key mataKuliah ke set presensi
db.matkul.hasMany(db.setPresensi, {
  foreignKey : "mataKuliahId",
  as : "setPresensi"
})
db.setPresensi.belongsTo(db.matkul, {
  foreignKey : "mataKuliahId",
  as : "mataKuliah"
})


//Menyambungkan Foreign Key user mahasiswa ke Rekapitulasi presensi atau kehadiran
db.userMahasiswa.hasMany(db.kehadiran, {
  foreignKey : "userMahasiswaId",
  as : "kehadiran"
})
db.kehadiran.belongsTo(db.userMahasiswa, {
  foreignKey : "userMahasiswaId",
  as: "userMahasiswa"
})


//menyambungkan foreign key set presensi ke rekapitulasi/kehadiran
db.setPresensi.hasMany(db.kehadiran, {
  foreignKey : "setPresensiId",
  as : "kehadiran"
})
db.kehadiran.belongsTo(db.setPresensi, {
  foreignKey : "setPresensiId",
  as: "setPresensi"
})



db.face.belongsTo(db.userMahasiswa, {
  foreignKey: "userMahasiswaId",
  as : "userMahasiswa"
})


// db.tag.belongsToMany(db.tutorial, {
//   through: "tutorial_tag",
//   as: "tutorials",
//   foreignKey: "tag_id",
// });
// db.tutorial.belongsToMany(db.tag, {
//   through: "tutorial_tag",
//   as: "tags",
//   foreignKey: "tutorial_id",
// });


module.exports = db;