import {Branch} from '../entity/Branch'
import {Arg, Mutation, Resolver} from 'type-graphql'
import {CreateBranchInput} from '../input/CreateBranchInput'
import {Address} from '../entity/Address'
import {getRepository, Repository} from 'typeorm'
import {Bank} from '../entity/Bank'

@Resolver(of => Branch)
export class BranchResolver {

    private branchRepository: Repository<Branch>
    private addressRepository: Repository<Address>
    private bankRepository: Repository<Bank>

    constructor() {
        this.branchRepository = getRepository(Branch)
        this.addressRepository = getRepository(Address)
        this.bankRepository = getRepository(Bank)
    }

    @Mutation(() => Branch)
    async createBranch(@Arg('input') data: CreateBranchInput): Promise<Branch> {

        const {bankId, ...addressInputs} = data

        const [bank] = await this.bankRepository.find({where: {bankId}, take: 1})

        let address = this.addressRepository.create(addressInputs)
        address = await this.addressRepository.save(address)

        const branch = await this.branchRepository.create({bank, address})
        return this.branchRepository.save(branch)
    }

}
