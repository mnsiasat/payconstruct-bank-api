import {ChildEntity, Column} from 'typeorm'
import {Field, ObjectType} from 'type-graphql'
import {Transaction} from './Transaction'
import {TransactionType} from '../types'

@ChildEntity(TransactionType.DEPOSIT)
@ObjectType()
export class DepositTransaction extends Transaction {

    @Column({name:'account_number', nullable: false})
    @Field()
    accountNumber: number

}
