import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {ApolloServer} from 'apollo-server'
import {buildSchema} from 'type-graphql'
import * as dotenv from 'dotenv'
import {BranchResolver} from './resolvers/BranchResolver'

dotenv.config()

const main = async () => {
    try{
        await createConnection()
        const schema = await buildSchema({
            resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        })
        const server = new ApolloServer({schema})
        await server.listen(4000)
        console.info('Server has started!')
    }catch(err){
        console.error(err)
    }
}

main()
