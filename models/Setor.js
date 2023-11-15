const {DataTypes} = require("sequelize")
const db = require("../db/conn")
const Gerente = require("./Gerente")
const Setor = db.define("setor",{
    num_setor : {
        type:DataTypes.STRING(30)
    },
    nome_setor : {
        type:DataTypes.STRING(30)
    }
},{
    createdAt:false,
    updatedAt:false
})

Gerente.hasMany(Setor)
Setor.belongsTo(Gerente)

// Setor.sync({force:true})


module.exports = Setor