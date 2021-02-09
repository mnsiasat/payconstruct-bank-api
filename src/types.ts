import {registerEnumType} from 'type-graphql'

export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAWAL = 'withdrawal',
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
