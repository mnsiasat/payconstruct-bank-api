import {ChildEntity, Column, ManyToOne} from 'typeorm'
import {Transaction} from './Transaction'
import {Account} from './Account'
import {Field, ObjectType} from 'type-graphql'

@ChildEntity()
@ObjectType()
export class TransferTransaction extends Transaction {

  /*  @ManyToOne(type => Account, account => account.transferTransactions)
    @Column({name: 'transferred_from'})
    @Field(type=>Account)
    transferredFrom: Account

    @Column({name: 'transferred_to'})
    @Field(type=>Account)
    transferredTo: Account*/

}
