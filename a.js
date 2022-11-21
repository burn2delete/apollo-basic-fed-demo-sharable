import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

export async function buildSubgraph(port) {
  const typeDefs = gql`
    extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key", "@requires", "@external"])
        
    type Query {
      a: A
    }
    type A {
      foo: String
    }
  `;

  const resolvers = {
    Query: {
      a: () => ({}),
    },
    A: {
      foo: () => 'hello from a',
    },
  };

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ schema });
  const { url } = await server.listen(port);
  console.log(`Subgraph running ${url}`);
}
