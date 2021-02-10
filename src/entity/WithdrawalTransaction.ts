import {ChildEntity, Column} from 'typeorm'
import {Field, ObjectType} from 'type-graphql'
import {Transaction} from './Transaction'
import {TransactionType} from '../types'

@ChildEntity(TransactionType.WITHDRAWAL)
@ObjectType({ implements: Transaction })
export class WithdrawalTransaction extends Transaction {

    @Column({name:'account_number', nullable: false})
    @Field()
    accountNumber: string

}
