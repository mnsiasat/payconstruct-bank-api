import {Arg, Mutation, Resolver} from 'type-graphql'
import {Transaction} from '../entity/Transaction'
import {CreateTransactionInput} from '../input/CreateTransactionInput'
import {getRepository, Repository} from 'typeorm'
import {DepositTransaction} from '../entity/DepositTransaction'
import { Account } from '../entity/Account'
import {WithdrawalTransaction} from '../entity/WithdrawalTransaction'


@Resolver(of => Transaction)
export class TransactionResolver {

    private depositTransactionRepository: Repository<DepositTransaction>
    private withdrawalTransactionRepository: Repository<WithdrawalTransaction>
    private accountRepository: Repository<Account>

    constructor() {
        this.depositTransactionRepository = getRepository(DepositTransaction)
        this.accountRepository = getRepository(Account)
        this.withdrawalTransactionRepository = getRepository(WithdrawalTransaction)
    }

    @Mutation(() => DepositTransaction)
    async deposit(@Arg('input') data: CreateTransactionInput): Promise<DepositTransaction> {
        const {accountNumber, amount} = data
        const [account] = await this.accountRepository.find({where: {accountNumber}, take: 1})

        if(!account){
            throw new Error(`Invalid accountNumber: ${accountNumber} for deposit transaction!`)
        }


        let newDeposit =  await this.depositTransactionRepository.create({accountNumber, amount})
        newDeposit = await this.depositTransactionRepository.save(newDeposit)

        //Update Account currentBalance
        account.currentBalance = newDeposit.amount + account.currentBalance
        await this.accountRepository.save(account)
        return newDeposit
    }

    @Mutation(() => WithdrawalTransaction)
    async withdraw(@Arg('input') data: CreateTransactionInput): Promise<WithdrawalTransaction> {
        const {accountNumber, amount} = data
        const [account] = await this.accountRepository.find({where: {accountNumber}, take: 1})

        if(!account){
            throw new Error(`Invalid accountNumber: ${accountNumber} for withdrawal transaction!`)
        }

        let newWithdrawal =  await this.withdrawalTransactionRepository.create({accountNumber, amount})
        newWithdrawal = await this.withdrawalTransactionRepository.save(newWithdrawal)

        //Update Account currentBalance
        account.currentBalance = account.currentBalance - newWithdrawal.amount
        await this.accountRepository.save(account)
        return newWithdrawal
    }
}
