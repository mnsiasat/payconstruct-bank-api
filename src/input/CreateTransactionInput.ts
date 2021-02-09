import {Field, InputType} from 'type-graphql'

@InputType()
export class CreateTransactionInput {

    @Field()
    accountNumber: number

    @Field()
    amount: number
}
