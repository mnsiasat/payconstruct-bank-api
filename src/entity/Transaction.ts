import {
    Column, CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance, UpdateDateColumn
} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'

@Entity('bank_transactions')
@TableInheritance({column: {type: 'varchar', name: 'type'}})
@ObjectType({ isAbstract: true })
export abstract class Transaction {

    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    @Field(type => ID)
    transactionId: string

    @Column({scale: 2})
    @Field()
    amount: number

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date
}
