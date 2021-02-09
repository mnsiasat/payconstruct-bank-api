import {
    Column, CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance, UpdateDateColumn
} from 'typeorm'
import {Field, ID, InterfaceType} from 'type-graphql'

@Entity('bank_transactions')
@TableInheritance({column: {type: 'varchar', name: 'type'}})
@InterfaceType()
export abstract class Transaction {

    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    @Field(type => ID)
    transactionId: string

    @Column({scale: 2})
    @Field()
    amount: number

    @CreateDateColumn({type: 'timestamp'})
    @Field(type => Date)
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp'})
    @Field(type => Date)
    updatedAt: Date
}
