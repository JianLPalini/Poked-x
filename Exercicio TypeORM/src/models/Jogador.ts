import{ Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Selecao } from "./Selecao";

@Entity('jogador')
export class Jogador {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',
    length:100, nullable:false,})
    name:string

    @Column({type:'int', nullable:false})
    numeroCamiseta:number

    @Column({type:'varchar', 
    length:100, nullable:false})
    posicao:string

    @Column({type:'int', nullable:false})
    idade:number

    @Column({type:'decimal', nullable:false})
    altura:number

     @Column({type:'decimal', nullable:false})
    peso:number

    @Column({type:'int', nullable:false})
    gols:number

    @ManyToOne(() => Selecao, selecao => selecao.jogador)
    selecao:Selecao
}