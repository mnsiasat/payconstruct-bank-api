import {ChildEntity, JoinColumn, ManyToOne} from 'typeorm'
import {Transaction} from './Transaction'
import {Account} from './Account'
import {Field, ObjectType} from 'type-graphql'

@ChildEntity()
@ObjectType()
export class DepositTransaction extends Transaction {

    @ManyToOne(type => Account, account => account.depositTransactions)
    @JoinColumn({ name: "account_id" })
    @Field(type=>Account)
    account: Account

}
