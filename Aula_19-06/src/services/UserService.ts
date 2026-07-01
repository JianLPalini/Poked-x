import {db} from "../config/database"
import { User } from "../models/User"

export class UserService {
    // na camada Service é que vamos ter os métodos 

    async create(email:string, password:string){
        if(email.length == 0 || password.length == 0){
        throw new Error("Informações não podem estar vazias!!!!!")
        }

        const user = new User(email, password);
        const [result] = await db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [user.getEmail(), user.getPassword()] 
    )
    return result
    }

    // READ - LER
    async findALL(){
        const [rows] = await db.query(
            "Select * FROM usuarios"
        )
        return rows
    }

    // READ - LER
    async findById(id: number){
        const [rows]: any = await db.query(
            "SELECT * FROM usuarios WHERE id = ?"
            [id]
        )
        return rows[0]
    }

    // UPDATE
    async update(
        id: number,
        email: string,
        password: string
    ){
        const [result] = await db.query(
            `UPDATE usuarios SET email = ?, password = ? WHERE id = ?`,
            [
                email,
                password,
                id
            ]
        )
        return result
    }

    // DELETE - REMOVER
    async delete(id: number) {
        const [result] = await db.query(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        )
        return result
    }
}

