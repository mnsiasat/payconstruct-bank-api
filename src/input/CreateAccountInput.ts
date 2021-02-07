import {InputType, Field} from 'type-graphql'
import {AccountType} from '../types'

@InputType()
export class CreateAccountInput {

    @Field(type => AccountType)
    type: AccountType

    @Field({ defaultValue: 0})
    initialDeposit: number

    @Field({ nullable: true })
    customerId?: string

    @Field({ nullable: true })
    lastName?: number

    @Field({ nullable: true })
    firstName?: number;

    @Field({ nullable: true })
    middleName?: number;

}
