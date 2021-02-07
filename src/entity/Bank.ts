import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'
import {Branch} from './Branch'

@Entity('banks')
@ObjectType()
export class Bank{

    @PrimaryGeneratedColumn('uuid', {name: 'bank_id'})
    @Field(type => ID)
    bankId: string

    @Column()
    @Field()
    name: string

    @OneToMany(type => Branch, branch => branch.bank, {cascade: true, eager: true})
    @Field(type=>[Branch])
    branches: Branch[]
}
