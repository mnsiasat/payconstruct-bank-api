import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'


@Entity('addresses')
@ObjectType()
export class Address{

    @PrimaryGeneratedColumn('uuid', {name: 'address_id'})
    @Field(type => ID)
    addressId: string

    @Column()
    @Field()
    line1: string

    @Column()
    @Field()
    line2: string

    @Column()
    @Field()
    city: string

    @Column()
    @Field()
    zipcode: string

    @Column()
    @Field()
    state: string

    @Column()
    @Field()
    country: string

}
