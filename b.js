import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

export async function buildSubgraph(port) {
  const typeDefs = gql`
    type Query {
      b: B
    }

    type B {
      bar: String
    }
  `;

  const resolvers = {
    Query: {
      b: () => ({}),
    },
    B: {
      bar: () => 'hello from b',
    },
  };

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ schema });
  const { url } = await server.listen(port);
  console.log(`Subgraph running ${url}`);
}
