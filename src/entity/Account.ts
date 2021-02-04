import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm'
import {Branch} from './Branch'
import {Customer} from './Customer'
import {Transaction} from './Transaction'
import {AccountType, TransactionType} from '../types'


@Entity({name: 'accounts'})
export class Account {

    @PrimaryColumn({scale: 0})
    accountNumber: number

    @Column({
        name: 'type',
        type: 'enum',
        enum: AccountType,
        default: AccountType.SAVINGS
    })
    type: AccountType

    @ManyToOne(type => Customer, customer => customer.accounts)
    customer: Customer

    @Column({name: 'current_balance' , scale: 2})
    currentBalance: number

    @OneToMany(type => Transaction, transaction => transaction.account, {cascade: true, eager: true})
    transactions: Transaction[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date

    @Column({name: 'transaction_amount' , scale: 2})
    transactionAmount: number
}
