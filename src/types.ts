import {registerEnumType} from 'type-graphql'

export enum TransactionType {
    DEBIT = 'debit',
    CREDIT = 'credit',
    TRANSFER = 'transfer'
}

registerEnumType(TransactionType, {
    name: "TransactionType", // this one is mandatory
});


export enum AccountType {
    SAVINGS = 'savings',
    CHECKING = 'checking'
}

registerEnumType(AccountType, {
    name: "AccountType", // this one is mandatory
})
