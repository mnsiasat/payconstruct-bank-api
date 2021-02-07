import {InputType, Field} from 'type-graphql'

@InputType()
export class CreateBranchInput {

    @Field()
    bankId: string

    @Field()
    line1: string

    @Field()
    line2: string

    @Field()
    city: string

    @Field()
    zipcode :string

    @Field()
    state: string

    @Field()
    country: string
}

