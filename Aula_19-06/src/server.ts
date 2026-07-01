import express from "express";
import router from "./routes/UserRoutes";

const PORT = 3000

const app = express()
app.use(express.json())
app.use(router) // Vamos usar as nossas rotas

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso! ${PORT}`)
})