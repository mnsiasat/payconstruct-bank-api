import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'accounts'})
export class Account {

    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column({scale: 0})
    accountNumber: number
}
