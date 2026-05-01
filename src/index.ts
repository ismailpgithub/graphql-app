import express from 'express'
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function init() {
    
const app = express()
const PORT = Number(process.env.PORT) || 8000
app.use(express.json())

const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
        }
    `,
    resolvers: {
        Query: {
            hello: () => `Hey there, I am a graphql server`
        }
    }
})

await gqlServer.start()


app.get('/', (req, res) =>{
res.json({message: 'Server is up and running '})
})

app.use("/graphql", expressMiddleware(gqlServer));

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
 
}

init()