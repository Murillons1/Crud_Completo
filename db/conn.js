const {Sequelize} = require("sequelize")
const sequelize = new Sequelize("crud2","root","senai",{
    host:"localhost",
    dialect:"mysql"
})




// sequelize.authenticate().then(()=>{
//     console.log("Conectado ao Banco de Dados")
// }).catch((error)=>{
//     console.error("Não foi possivel conectar ao Banco de Dados"+error)
// })



module.exports = sequelize