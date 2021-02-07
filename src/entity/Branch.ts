import {Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Customer} from './Customer'
import {Address} from './Address'
import {Field, ID, ObjectType} from 'type-graphql'
import {Bank} from './Bank'

@Entity('branches')
@ObjectType('branch')
export class Branch {

    @PrimaryGeneratedColumn('uuid', {name: 'branch_id'})
    @Field(type => ID)
    branchId: string

    @ManyToOne(type => Bank, bank => bank.branches)
    @JoinColumn({ name: "bank_id" })
    @Field(type=>Bank)
    bank: Bank

    @OneToMany(type => Customer, customer => customer.branch, {cascade: true, eager: true})
    @Field(type=>[Customer])
    customers: Customer[]

    @OneToOne(() => Address)
    @JoinColumn({ name: "address_id" })
    @Field(type=>Address)
    address: Address

}
