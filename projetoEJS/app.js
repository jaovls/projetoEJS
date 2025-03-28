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
    database: 'gerenciar-login' 
})


// Configura o express para ser usado
const App = express()
App.set("view engine", "ejs")
App.use(express.urlencoded({extended: true}))
App.use(express.json())
// Servindo arquivos estáticos (CSS, imagens, etc.) na pasta mvc depois views
App.set("views", path.join(__dirname, "mvc/views"))
App.use(express.static(path.join(__dirname, "public")))


// Endpoint para renderizar a tela de login
App.get("/", (req,res) => {
    res.render("index.ejs")
})

// Endpoint para a tela de login
App.post("/login", async (req,res) => {

    let usuario = ""
    let email = ""
    let senha = ""

    if(req.body.usuario === ""  || req.body.email === "" ||req.body.senha === ""){
        res.render("error.ejs")
    }


    usuario = req.body.usuario
    email = req.body.email
    senha = req.body.senha



    const sql = "SELECT * FROM login WHERE usuario = ? AND email = ? AND senha = ?"

    const [rows] = await connection.execute(sql, [usuario,email,senha])
    
    if(rows.length === 0) {
        res.render("error", {
            mensagem: "Usuário ou senha inválidos!"
        })
    }
    
    // Se o login for bem-sucedido, renderiza a página 'painelUser.ejs'  
    res.render("painelUser.ejs");

})

// Endpoint para adicionar usuario
App.post("/adicionar-usuario", async (req,res) => {
    let usuario = ""
    let email = ""

    if (req.body.usuario === "" || req.body.email === ""){
        
    }

    usuario = req.body.usuario
    email = req.body.email

    const sql = "INSERT INTO `login` (usuario, email) VALUES (?, ?)"
    const [rows] = await connection.execute(sql, [usuario,email])

    
})




// Ligar/deixar disponivel o serviço
App.listen(3000, () =>{
    // Mensagem para saber se o servidor está rodando
    console.log("Aplicação no ar")
})