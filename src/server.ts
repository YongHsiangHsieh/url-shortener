import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { startBloomFilterRebuildJob } from './jobs/bloomFilterRebuild';

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  // Start the Bloom Filter rebuild job
  startBloomFilterRebuildJob();

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch(console.error); 