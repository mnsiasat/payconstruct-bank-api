import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {Transaction} from '../entity/Transaction'
import {CreateTransactionInput} from '../input/CreateTransactionInput'
import {getRepository, Repository} from 'typeorm'
import {DepositTransaction} from '../entity/DepositTransaction'
import { Account } from '../entity/Account'
import {WithdrawalTransaction} from '../entity/WithdrawalTransaction'
import {TransferTransaction} from '../entity/TransferTransaction'
import {CreateTransferTransactionInput} from '../input/CreateTransferTransactionInput'


@Resolver(of => Transaction)
export class TransactionResolver {

    private depositTransactionRepository: Repository<DepositTransaction>
    private withdrawalTransactionRepository: Repository<WithdrawalTransaction>
    private transferTransactionRepository: Repository<TransferTransaction>
    private accountRepository: Repository<Account>

    constructor() {
        this.depositTransactionRepository = getRepository(DepositTransaction)
        this.accountRepository = getRepository(Account)
        this.withdrawalTransactionRepository = getRepository(WithdrawalTransaction)
        this.transferTransactionRepository = getRepository(TransferTransaction)
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

    @Mutation(() => TransferTransaction)
    async transfer(@Arg('input') data: CreateTransferTransactionInput): Promise<TransferTransaction> {
        const {transferFrom, transferTo} = data
        const [fromAccount] = await this.accountRepository.find({where: {accountNumber:transferFrom}, take: 1})
        const [toAccount] = await this.accountRepository.find({where: {accountNumber:transferTo}, take: 1})

        if(!fromAccount){
            throw new Error(`Invalid source account: ${transferFrom}  for transfer transaction!`)
        }

        if(!toAccount){
            throw new Error(`Invalid recipient account: ${toAccount} for transfer transaction!`)
        }

        let newTransfer =  await this.transferTransactionRepository.create(data)
        newTransfer = await this.transferTransactionRepository.save(newTransfer)

        //Update Source Account currentBalance
        fromAccount.currentBalance = fromAccount.currentBalance - newTransfer.amount
        await this.accountRepository.save(fromAccount)


        //Update Recipient Account currentBalance
        toAccount.currentBalance = toAccount.currentBalance + newTransfer.amount
        await this.accountRepository.save(toAccount)

        return newTransfer
    }

    @Query(() => [TransferTransaction])
        transferHistory(@Arg('accountNumber') accountNumber: string) {
        return this.transferTransactionRepository.find({where: {transferFrom: accountNumber}})
    }

}

