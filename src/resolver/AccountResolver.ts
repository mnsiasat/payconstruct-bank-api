import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {Account} from '../entity/Account'
import {CreateAccountInput} from '../input/CreateAccountInput'
import {getRepository, Repository} from 'typeorm'
import {Customer} from '../entity/Customer'
import * as _ from 'lodash'
import {Branch} from '../entity/Branch'

@Resolver(of => Account)
export class AccountResolver {

    private accountRepository: Repository<Account>
    private customerRepository: Repository<Customer>
    private branchRepository: Repository<Branch>

    constructor() {
        this.accountRepository = getRepository(Account)
        this.customerRepository = getRepository(Customer)
        this.branchRepository = getRepository(Branch)
    }

    @Query(() => Account)
    account(@Arg('account_number') accountNumber: string) {
        return this.accountRepository.find({where: {accountNumber}, take: 1})
    }

    @Mutation(() => Account)
    async createAccount(@Arg('input') data: CreateAccountInput): Promise<Account> {
        const {
            type,
            initialDeposit,
            firstName,
            middleName,
            lastName,
            customerId,
            branchId,

        } = data

        if (_.isEmpty(customerId) &&
            _.isEmpty(lastName) && _.isEmpty(firstName) &&
            _.isEmpty(middleName)) {

            throw new Error('Required to supply either customerId, or customer name details!')
        }

        const where = customerId ? {customerId} : {firstName, middleName, lastName}

        let [existingCustomer] = await this.customerRepository.find({
            where,
            take: 1
        })

        if (!existingCustomer) {
            const [branch] = await this.branchRepository.find({where: {branchId}, take: 1})

            if(!branch){
                throw new Error(`Invalid branch details, branch ID: ${branchId}!`)
            }

            const newCustomer = await this.customerRepository.create(
                {
                    firstName,
                    middleName,
                    lastName,
                    branch
                })
            existingCustomer = await this.customerRepository.save(newCustomer)
        }

        const account = this.accountRepository.create({
            type,
            currentBalance: initialDeposit,
            customer: existingCustomer
        })
        return this.accountRepository.save(account)

        /*
        Parameters:
        => branchId
        => type: string
        => initialDeposit: number
        =>
        Steps:
        1. Find Customer by lastName, firstName, middleName return customer_ID
        2. If Customer doesnt exist
            2.1  create new Customer
             => lname, fname, mname
             => address
             => mobile
             => email
             => branchId
        3. If Customer already exists OR Customer successfully created
            3.1 Create new Account:
            =>  type
            => initialDeposit
            => customerId
        * */
    }
}

