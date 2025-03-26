// npm install express <pacote>
// npm install ejs
// npm install nodemon


// Importar o modulo para o projeto
const express = require("express")
const path = require("path")
const mysql2 = require("mysql2/promise")
const { error } = require("console")

// Conexão com o banco
const connection = mysql2.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'bancologin' 
})


// Configura o express para ser usado
const App = express()
App.set("view engine", "ejs")
App.use(express.urlencoded({extended: true}))
App.use(express.json())
// Servindo arquivos estáticos (CSS, imagens, etc.) na pasta mvc depois views
App.set("views", path.join(__dirname, "mvc/views"))
App.use(express.static(path.join(__dirname, "public")))


// Endpoint
App.get("/", (req,res) => {
    res.render("index.ejs")
})

App.post("/login", async (req,res) => {

    let usuario = ""
    let senha = ""

    if(req.body.usuario === ""  || req.body.senha === ""){
        res.render("error.ejs")
    }


    usuario = req.body.usuario
    senha = req.body.senha



    const sql = "SELECT * FROM login WHERE usuario = ? AND senha = ?"

    const [rows] = await connection.execute(sql, [usuario,senha])
    
    if(rows.length === 0) {
        res.render("error", {
            mensagem: "Usuário ou senha inválidos!"
        })
    }
    
    // Se o login for bem-sucedido, renderiza a página 'conta.ejs'  
    res.render("conta.ejs");

})



// Ligar/deixar disponivel o serviço
App.listen(3000, () =>{
    // Mensagem para saber se o servidor está rodando
    console.log("Aplicação no ar")
})