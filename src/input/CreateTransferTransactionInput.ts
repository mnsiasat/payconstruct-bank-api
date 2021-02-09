import {Field, InputType} from 'type-graphql'

@InputType()
export class CreateTransferTransactionInput {

    @Field()
    transferFrom: string

    @Field()
    transferTo: string

    @Field()
    amount: number
}
