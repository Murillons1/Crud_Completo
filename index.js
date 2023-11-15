const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const conn = require("./db/conn")
const Gerente = require("./models/Gerente")
const Atividade = require("./models/Atividade")
const Setor = require("./models/Setor")

let log = false
let usuario = ""

 
const PORT = 3000
const hostname = "localhost"

//------------Express--------------------

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
//----------Express-Handlebars-----------
app.set("view engine","handlebars")
app.engine("handlebars",exphbs.engine())
//---------logout------------------------
app.get("/logout",(req,res)=>{
    log = false
    usuario = ""
    res.render("home", {log, usuario})
})
//-------------login---------------------
app.post("/login",async(req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Gerente.findOne({raw:true, where: {email:email, senha:senha}})


    if(pesq == null){
        res.render("home", {log})
    }else if(pesq.email === email && pesq.senha === senha){
        usuario = pesq.nome
        log = true
        res.render("home", {log, usuario})
    }else{
        res.redirect("/")
    }

})

// ----------------Cadastrar Atividade e Setor----------------------
app.get("/cadastra_a",(req,res)=>{
    res.render("cadastra_a", {log , usuario})
})

app.post("/a",async(req,res)=>{
    const num_atividade = req.body.numero_a
    const nome_atividade = req.body.nome_a
    
    await Atividade.create({num_atividade,nome_atividade})
    log = true
    res.redirect("/")

})
app.post("/s",async(req,res)=>{
    const num_setor = req.body.numero_s
    const nome_setor = req.body.nome_s
    
    await Setor.create({num_setor,nome_setor})
    log = true
    res.redirect("/")
    

})


app.get("/cadastra_s",(req,res)=>{
    res.render("cadastra_s", {log , usuario})
})

// ------------Apaga Atividade e Setor--------------
app.post("/ap",async(req,res)=>{
    const id = req.body.id
    await Atividade.destroy({raw:true, where: {id:id}})
    log = true
    res.redirect("/")
})



app.get("/apaga_a",(req,res)=>{
    res.render("apaga_a", {log , usuario})
})

app.post("/sp",async(req,res)=>{
    const id = req.body.id
    await Setor.destroy({raw:true, where: {id:id}})
    log = true
    res.redirect("/")
})


app.get("/apaga_s",(req,res)=>{
    res.render("apaga_s", {log , usuario})
})


//--------------Lista Atividade e Setor ----------------
app.get("/lista_a",async(req,res)=>{
    const dados  = await Atividade.findAll({raw:true})
    res.render("lista_a", {log,usuario, valores:dados})
})


app.get("/lista_s",async(req,res)=>{
    const dados  = await Setor.findAll({raw:true})
    res.render("lista_s", {log ,usuario, valores:dados})
})

// --------------Atualizar Atividade e Setor-------------
app.post("/aa",async(req,res)=>{
    const id = req.body.id
    const num_atividade = req.body.num_atividade
    const nome_atividade = req.body.nome_atividade

    const dados_nome_num = await Atividade.findOne({raw:true, where: {id:id}})

    if(dados_nome_num != null){
        dados = {
            id:id,
            num_atividade:num_atividade,
            nome_atividade:nome_atividade
        }
        if(((typeof id === "string")&&(typeof num_atividade === "string")&&(typeof nome_atividade === "string"))){
            await Atividade.update(dados,{raw: true, where: {id:id}})
            res.render("home", {log , usuario})
        }else{
            res.redirect("/")
        }

    }


})


app.get("/atualiza_a",(req,res)=>{
    res.render("atualiza_a", {log , usuario})
})

app.post("/as",async(req,res)=>{
    const id = req.body.id
    const num_setor = req.body.num_setor
    const nome_setor = req.body.nome_setor

    const dados_nome_num = await Setor.findOne({raw:true, where: {id:id}})

    if(dados_nome_num != null){
        dados = {
            id:id,
            num_setor:num_setor,
            nome_setor:nome_setor
        }
        if(((typeof id === "string")&&(typeof num_setor === "string")&&(typeof nome_setor === "string"))){
            await Setor.update(dados,{raw: true, where: {id:id}})
            res.render("home", {log , usuario})
        }else{
            res.redirect("/")
        }

    }


})


app.get("/atualiza_s",(req,res)=>{
    res.render("atualiza_s", {log , usuario})
})




app.get("/",(req,res)=>{
    res.render("home", {log , usuario})
})

//---------Conexão-------------------------
conn.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Servidor Rodando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error("Nâo foi possivel conectar" + error)
})
