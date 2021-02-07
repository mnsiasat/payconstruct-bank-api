import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    TableInheritance
} from 'typeorm'
import {Account} from './Account'
import {Field, ID, ObjectType} from 'type-graphql'

@Entity('bank_transactions')
@TableInheritance({column: {type: 'varchar', name: 'type'}})
@ObjectType()
export abstract class Transaction {

    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    @Field(type => ID)
    transactionId: string

   /* @Column({
        name: 'type',
        type: 'enum',
        enum: TransactionType,
        default: TransactionType.CREDIT
    })
    @Field(type=>TransactionType)
    type: TransactionType*/

    @ManyToOne(type => Account, account => account.transactions)
    @JoinColumn({ name: "account_id" })
    @Field(type=>Account)
    account: Account

    @Column({scale: 2})
    @Field()
    amount: number
}
