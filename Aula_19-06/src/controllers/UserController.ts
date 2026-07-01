import { Request, Response } from "express";
import { UserService } from "../services/UserService";

// Responsabilidade
// Cria os métodos que vão ser chamados nas rotas
// É aqui também que enviamos os status e a resposta do servidor
// Ele chama os métodos que criamos em service
// É ele que recebe as requisições
// É ele que envia as respostas

export class UsuarioController {
    private service = new UserService()
    async createUsuario(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                // STATUS 400 -> Bad Request (Requisição mal formada)
                return res.status(400).json({
                    mensagem: "Email e senha são obrigatórios"
                })
            }
            await this.service.create(email, password)
            // STATUS 201 -> CRIADO COM SUCESSO
            return res.status(201).json({
                mensagem: "Usuário criado com sucesso!"
            })
        } catch {
            // STATUS 500 -> Erro interno do servidor
            return res.status(500).json({
                mensagem: "Erro interno do servidor"
            })
        }
    }
    async listUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await this.service.findALL()
            // STATUS 200 -> OK confirmação
            return res.status(200).json(
                usuarios
            )
        } catch {
            return res.status(500).json({
                mensage: "Erro interno no servidor"
            })
        }
    }
    async getUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const usuario = await this.service.findById(id)
            if (!usuario) {
                // STATUS 404 -> NOT FOUND (Não encontrado)
                return res.status(404).json({
                    mensagem: "Usuario não encontrado"
                })
            }
            return res.status(200).json(usuario)
        } catch {
            return res.status(500).json({
                mensagem: "Erro interno"
            })

        }
    }
    async updateUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const { email, password } = req.body

            if (!id || !email || !password) {
                return res.status(400).json({
                    mensagem: "Informações inexistentes!"
                })
            }

            const resultado = await this.service.update(
                id,
                email,
                password
            )

            if (!resultado) {
                return res.status(404).json({
                    mensagem: "Não encontrado!"
                })
            }

            return res.status(200).json({
                mensagem: "Usuário atualizado com sucesso"
            })
        } catch {
            return res.status(500).json({
                mensagem: "Erro interno do servidor"
            })
        }
    }

    async deleteUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            if (!id) {
                return res.status(400).json({
                    mensagem: "Informações inexistentes!"
                })
            }

            const resultado = await this.service.delete(id)

            if (!resultado) {
                return res.status(404).json({
                    mensagem: "Não encontrado!"
                })
            }
            // OK sem retorno
            return res.status(204).send()
        } catch {
            return res.status(500).json({
                mensagem: "Erro interno no servidor"
            })
        }
    }
}