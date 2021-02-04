import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Customer} from './Customer'
import {Branch} from './Branch'
import {Account} from './Account'
import {TransactionType} from '../types'

@Entity({name: 'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    transactionId: string

    @ManyToOne(type => Account, account => account.transactions)
    account: Account

    @ManyToOne(type => Account, account => account.transactions)
    @Column({name: 'transferred_from'})
    transferredFrom: Account

    @ManyToOne(type => Account, account => account.transactions)
    @Column({name: 'transferred_to'})
    transferredTo: Account

    @Column({
        name: 'type',
        type: 'enum',
        enum: TransactionType,
        default: TransactionType.CREDIT
    })
    type: TransactionType

    @Column({scale: 2})
    amount: number
}
