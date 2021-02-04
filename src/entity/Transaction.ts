import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance} from 'typeorm'
import {Customer} from './Customer'
import {Branch} from './Branch'
import {Account} from './Account'
import {TransactionType} from '../types'
import {Field, ID, ObjectType} from 'type-graphql'

@Entity('transactions')
@TableInheritance({column: {type: 'varchar', name: 'type'}})
@ObjectType()
export abstract class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    @Field(type => ID)
    transactionId: string

    @Column({
        name: 'type',
        type: 'enum',
        enum: TransactionType,
        default: TransactionType.CREDIT
    })
    @Field(type=>TransactionType)
    type: TransactionType

    @Column({scale: 2})
    @Field()
    amount: number
}
