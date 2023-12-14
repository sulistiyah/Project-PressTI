module.exports = (sequelizeDB, Sequelize) => {
        const Kehadiran = sequelizeDB.define("kehadiran", {
        nim: {
            type: Sequelize.STRING(30)
        },
        nama: {
            type: Sequelize.STRING(50)
        },
        programStudi: {
            type: Sequelize.STRING(50)
        },
        kelas: {
            type: Sequelize.STRING(50)
        },
        mataKuliah: {
            type: Sequelize.STRING(50)
        },
        statusPresensi: {
            type: Sequelize.STRING(30)
        },
        tanggalPresensi: {
            type: Sequelize.DATE
        },
        waktuPresensi: {
            type: Sequelize.TIME
        },
        noTelepon: {
            type: Sequelize.STRING(30)
        }
        }, {
            tableName : "kehadiran"
        })
    
        return Kehadiran;
};  