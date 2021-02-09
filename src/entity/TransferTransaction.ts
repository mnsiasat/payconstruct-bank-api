import {Transaction} from './Transaction'
import {Field, ObjectType} from 'type-graphql'
import {ChildEntity, Column} from 'typeorm'

@ChildEntity()
@ObjectType()
export class TransferTransaction extends Transaction {

  /*  @ManyToOne(type => Account, account => account.transferTransactions)
    @JoinColumn({name: 'transferred_from'})
    @Field(type=>Account)
    transferredFrom: Account*/

    @Column()
    @Field()
    transferredFrom: string

    @Column()
    @Field()
    transferredTo: string

}
