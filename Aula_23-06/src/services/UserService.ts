import { UserRepository } from "../repositories/UserRepository";

export class UserService {

    private repo = new UserRepository()

    async getAllUsers() {
        try {
            const users = await this.repo.findAll()
            return users
        }catch (error) {
            throw new Error('Erro ao buscar dados')
        }
    }

    async registerUser(nome: string, email: string, senha: string) {
        try{
            const users = await this.repo.create(nome, email, senha)
            return users
        } catch {
            throw new Error('Erro ao registrar usuário')
        }
    }
}

