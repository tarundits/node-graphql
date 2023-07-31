import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserInterface } from "./interfaces/UserInterface";
import { getUser } from "./helpers/user";

interface MyContext {
    user: UserInterface;
}

import { typeDefs } from "./graphql/typeDefs/typeDefs";
import resolvers from "./graphql/resolvers";
import { authMiddleware } from "./middlewares/authMiddleware";

import * as dotenv from "dotenv";

import connectDB from "./config/db";
connectDB();

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const server: any = new ApolloServer<MyContext>({ 
    typeDefs, 
    resolvers
});

// Use a self-executing async function to await the startStandaloneServer
(async () => {
    const { url } = await startStandaloneServer(server, {
        /*
        context: async ({ req, res }) => {
            const token: any = req.headers.authorization || '';
            const user = await getUser(token);
            return { user };
        },
        */
    });

  console.log(`🚀 Server listening at: ${url}`);
})();


// startStandaloneServer(server, {
//     listen: { port: 4000 },
// }).then(({ url }) => {
//     console.log(`Server ready at ${url}`);
// });