import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'banks'})
export class Bank {

    @PrimaryGeneratedColumn('uuid', {name: 'bank_id'})
    bankId: string

    name: string
}
