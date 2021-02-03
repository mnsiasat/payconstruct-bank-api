import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Customer} from './Customer'
import {Branch} from './Branch'
import {Account} from './Account'

@Entity({name: 'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    transactionId: string

    @ManyToOne(type => Account, account => account.transactions)
    account: Account

    @Column()
    transactionType: string

}
