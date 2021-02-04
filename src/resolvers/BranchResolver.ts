import {Branch} from '../entity/Branch'
import {Arg, Query, Resolver} from 'type-graphql'

@Resolver(of => Branch)
export class BranchResolver {

    @Query(() => Branch)
    branch(@Arg('branch_id') branchId: string) {
        return Branch.findOne({where: {branchId}})
    }

}
