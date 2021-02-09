import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import {Customer} from './Customer'
import {Field, ID, ObjectType} from 'type-graphql'
import {IsDefined} from 'class-validator'


@Entity('accounts')
@ObjectType()
export class Account{

    @PrimaryGeneratedColumn({name:'account_number'})
    @Field(type => ID)
    accountNumber: number

    /** TODO: make enum work
    @Column({
        name: 'type',
        type: 'enum',
        enum: AccountType,
        default: AccountType.SAVINGS
    })
    @Field(type=>AccountType)
    type: AccountType*/

    @Column()
    @Field()
    type: string

    @ManyToOne(type => Customer, customer => customer.accounts)
    @JoinColumn({ name: "customer_id" })
    @IsDefined()
    @Field(type=>Customer)
    customer: Customer

    @Column({name: 'current_balance' , scale: 2})
    @Field()
    currentBalance: number

    /** TODO: Temp comment-out, Joins don't currently support child entities/discriminator values.
    @OneToMany(type => DepositTransaction, transaction => transaction.account, {cascade: true, eager: true})
    @Field(type=>[DepositTransaction])
    depositTransactions: DepositTransaction[]

    @OneToMany(type => WithdrawalTransaction, transaction => transaction.account, {cascade: true, eager: true})
    @Field(type=>[WithdrawalTransaction])
    withdrawalTransactions: WithdrawalTransaction[]*/
}
