import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Branch} from './Branch'
import {Address} from './Address'
import {Account} from './Account'
import {Field, ID, ObjectType} from 'type-graphql'
import {Transaction} from './Transaction'

@Entity('customers')
@ObjectType()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'customer_id'})
    @Field(type => ID)
    customerId: string

    @Column({name: 'first_name'})
    @Field()
    firstName: string

    @Column({name: 'middle_name'})
    @Field()
    middleName: string

    @Column({name: 'last_name'})
    @Field()
    lastName: string

    @ManyToOne(type => Branch, branch => branch.customers)
    @JoinColumn({ name: "branch_id" })
    @Field(type=>Branch)
    branch: Branch

    @OneToMany(type => Account, account => account.customer, {cascade: true, eager: true})
    @Field(type=>[Account])
    accounts: Account[]

    @OneToOne(() => Address)
    @JoinColumn()
    @Field(type=>Address)
    address: Address
}
