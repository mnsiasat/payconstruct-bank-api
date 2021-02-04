import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Unique
} from 'typeorm'
import {Branch} from './Branch'
import {Customer} from './Customer'
import {Transaction} from './Transaction'
import {AccountType, TransactionType} from '../types'
import {Field, ID, ObjectType} from 'type-graphql'
import {TransferTransaction} from './TransferTransaction'
import {DepositTransaction} from './DepositTransaction'
import {WithdrawalTransaction} from './WithdrawalTransaction'


@Entity('accounts')
@ObjectType()
export class Account extends BaseEntity{

    @PrimaryColumn({name:'account_number',scale: 0})
    @Field(type => ID)
    accountNumber: number

    @Column({
        name: 'type',
        type: 'enum',
        enum: AccountType,
        default: AccountType.SAVINGS
    })
    @Field(type=>AccountType)
    type: AccountType

    @ManyToOne(type => Customer, customer => customer.accounts)
    @JoinColumn({ name: "customer_id" })
    @Field(type=>Customer)
    customer: Customer

    @Column({name: 'current_balance' , scale: 2})
    @Field()
    currentBalance: number

    @OneToMany(type => DepositTransaction, transaction => transaction.account, {cascade: true, eager: true})
    @Field(type=>DepositTransaction)
    depositTransactions: DepositTransaction[]

    @OneToMany(type => WithdrawalTransaction, transaction => transaction.account, {cascade: true, eager: true})
    @Field(type=>WithdrawalTransaction)
    withdrawalTransactions: WithdrawalTransaction[]

    /*@OneToMany(type => TransferTransaction, transaction => transaction.transferredFrom, {cascade: true, eager: true})
    @Field(type=>TransferTransaction)
    transferTransactions: TransferTransaction[]*/

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    @Field()
    updatedAt: Date

    @Column({name: 'transaction_amount' , scale: 2})
    @Field()
    transactionAmount: number
}
