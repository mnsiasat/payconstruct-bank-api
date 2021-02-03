import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Branch} from './Branch'
import {Address} from './Address'

@Entity({name: 'customers'})
export class Customer {

    @PrimaryGeneratedColumn('uuid', {name: 'customer_id'})
    customerId: string

    @Column({name: 'first_name'})
    firstName: string

    @Column({name: 'middle_name'})
    middleName: string

    @Column({name: 'last_name'})
    lastName: string

    @ManyToOne(type => Branch, branch => branch.customers)
    branch: Branch

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address
}
