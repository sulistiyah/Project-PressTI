module.exports = (sequelizeDB, Sequelize) => {
    const User = sequelizeDB.define("user_dosen", {
        nip: {
            type: Sequelize.STRING(30)
        },
        nama: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(30)
        },
        noTelepon: {
            type: Sequelize.STRING(30)
        },
        image: {
            type: Sequelize.STRING(100)
        },
        password: {
            type: Sequelize.STRING(100)
        },
        rePassword: {
            type: Sequelize.STRING(100)
        },
        token: {
            type: Sequelize.STRING(255)
        }
        
    }, {
        tableName : "user_dosen"
    })

    return User
}