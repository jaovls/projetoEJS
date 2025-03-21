// npm install express <pacote>
// npm install ejs
// npm install nodemon


// Importar o modulo para o projeto
const express = require("express")
const path = require("path")


// Configura o express para ser usado
const App = express()
App.set("view engine", "ejs")

// Servindo arquivos estáticos (CSS, imagens, etc.) na pasta mvc depois views
App.set("views", path.join(__dirname, "mvc/views"))
App.use(express.static(path.join(__dirname, "public")))


// Endpoint
App.get("/", (req,res) => {
    res.render("index.ejs")
})


// Ligar/deixar disponivel o serviço
App.listen(3000, () =>{
    // Mensagem para saber se o servidor está rodando
    console.log("Aplicação no ar")
})