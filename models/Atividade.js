const {DataTypes} = require("sequelize")
const db = require("../db/conn")
const Setor = require("./Setor")
const Atividade = db.define("atividade",{
    num_atividade : {
        type:DataTypes.STRING(30)
    },
    nome_atividade : {
        type:DataTypes.STRING(30)
    }
},{
    createdAt:false,
    updatedAt:false
})

Setor.hasMany(Atividade)
Atividade.belongsTo(Setor)

// Atividade.sync({force:true})


module.exports = Atividade