import {Field, InputType} from 'type-graphql'

@InputType()
export class CreateTransactionInput {

    @Field()
    accountNumber: string

    @Field()
    amount: number

}
