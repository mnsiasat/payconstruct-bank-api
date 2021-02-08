import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import {Customer} from './Customer'
import {Transaction} from './Transaction'
import {Field, ID, ObjectType} from 'type-graphql'
import {IsDefined} from 'class-validator'


@Entity('accounts')
@ObjectType()
export class Account{

    @PrimaryGeneratedColumn({name:'account_number'})
    @Field(type => ID)
    accountNumber: number

    /*@Column({
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

    @OneToMany(type => Transaction, transaction => transaction.account, {cascade: true, eager: true})
    @Field(type=>[Transaction])
    transactions: Transaction[]

   /* @OneToMany(type => TransferTransaction, transaction => transaction.transferredFrom, {cascade: true, eager: true})
    @Field(type=>[TransferTransaction])
    transferTransactions: TransferTransaction[]*/

}
