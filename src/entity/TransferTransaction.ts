import {Transaction} from './Transaction'
import {Field, ObjectType} from 'type-graphql'
import {ChildEntity, Column} from 'typeorm'
import {TransactionType} from '../types'

@ChildEntity(TransactionType.TRANSFER)
@ObjectType()
export class TransferTransaction extends Transaction {

    @Column()
    @Field()
    transferFrom: string

    @Column()
    @Field()
    transferTo: string

}
