import {InputType, Field} from 'type-graphql'
import {AccountType} from '../types'

@InputType()
export class CreateAccountInput {

    @Field(type => AccountType,{ defaultValue: AccountType.SAVINGS})
    type: AccountType

    @Field()
    branchId: string

    @Field({ defaultValue: 0})
    initialDeposit: number

    @Field({ nullable: true })
    customerId?: string

    @Field({ nullable: true })
    lastName?: string

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    middleName?: string;

}
