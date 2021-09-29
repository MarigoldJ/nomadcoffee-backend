import { ApolloServer } from "apollo-server";
import schema from "./schema";

const SERVER_PORT = 4000;

const server = new ApolloServer({ schema });
server.listen({ port: SERVER_PORT }).then(({ url }) => {
  console.log(`🎈 Server is running on ${url} ✅`);
});
