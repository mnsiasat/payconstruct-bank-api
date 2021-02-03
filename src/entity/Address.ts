import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'addresses'})
export class Address{

    @PrimaryGeneratedColumn('uuid', {name: 'address_id'})
    addressId: string

    @Column()
    line1: string

    @Column()
    line2: string

    @Column()
    city: string

    @Column()
    zipcode: string

    @Column()
    state: string

    @Column()
    country: string

}
