import  express  from "express";
import { pool } from "./database";

const app = express()


const PORT = 3000;



app.use(express.json())





// Listar Produtos

app.get('/produtos', async (req, res) => {

    try{

        const [produtos] = await pool.query(
            'SELECT * FROM produtos'
        )

        return res.status(200).json(produtos)

    }catch(erro){
        console.log("Erro: ", erro)

        return res.status(500).json("Erro ao buscar produto: " + erro)
    }
})

// CRIA PRODUTOS

app.post('/produtos', async (req, res) => {

    try{
    const {titulo, autor, categoria, quantidade, ano_publicacao, codigo_produto} = req.body;

    const [resultado] = await pool.query(
        `INSERT INTO produtos
        (titulo, autor, categoria, quantidade, ano_publicacao, codigo_produto)
        VALUES (?, ?, ?, ?, ?, ?)`,

        [titulo, autor, categoria, quantidade, ano_publicacao, codigo_produto]

    )

    // Status 201 -> Dado criado com sucesso
    return res.status(201).json("Produto inserido com sucesso!")

    } catch (erro){
    return res.status(500).json("Erro interno do servidor: " + erro)

    }

})

// UPDATE -> ATUALIZAR
app.put("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {titulo, autor, categoria, quantidade, ano_publicacao, codigo_produto } = req.body;

    const [resultado] = await pool.query(
      "UPDATE produtos SET titulo = ?, autora = ?, categoria = ?, quantidade = ?, ano_publicacao = ?, codigo_produto = ? WHERE id = ?",
      [titulo, autor, categoria, quantidade, ano_publicacao, codigo_produto, id]
    );

    return res.status(200).json("Produto atualizado com sucesso!");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});

// DELETE -> DELETAR / APAGAR
app.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;


    const [resultado] = await pool.query(
      "DELETE FROM WHERE ida = ?",
      [id]
    );

    return res.status(200).json("Produto foi de arrasta!");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});

app.listen(PORT, () => {
    console.log (`🔥 Servidor rodando em http://localhost:${PORT}`)
});