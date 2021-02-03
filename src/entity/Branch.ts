import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Customer} from './Customer'
import {Address} from './Address'

@Entity({name: 'branches'})
export class Branch {

    @PrimaryGeneratedColumn('uuid', {name: 'branch_id'})
    branchId: string

    @OneToMany(type => Customer, customer => customer.branch, {cascade: true, eager: true})
    customers: Customer[]

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

}
