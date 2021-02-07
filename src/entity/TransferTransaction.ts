import {Transaction} from './Transaction'
import {ObjectType} from 'type-graphql'

//@ChildEntity()
@ObjectType()
export class TransferTransaction extends Transaction {

  /*  @ManyToOne(type => Account, account => account.transferTransactions)
    @JoinColumn({name: 'transferred_from'})
    @Field(type=>Account)
    transferredFrom: Account*/

  /*  @Column({name: 'transferred_to', nullable: false})
    @Field()
    transferredTo: string
*/
}
