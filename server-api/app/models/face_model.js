module.exports = (sequelizeDB, Sequelize) => {
    const Face = sequelizeDB.define("face", {
      // label: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      image : {
        type: Sequelize.BLOB('long')
      },
      width : {
        type: Sequelize.STRING
      },
      height : {
        type: Sequelize.STRING
      }
      //  image: {
      //   type: Sequelize.BLOB("long"),
      //   allowNull: false,
      // },
    }, {
        tableName : "face"
    })
  
    return Face;
  };  