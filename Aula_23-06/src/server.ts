import express  from "express";

const app = express()

app.use(express.json()) // Define que a API utiliza JSON (API REST)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})