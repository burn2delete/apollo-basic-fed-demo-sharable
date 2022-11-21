import { ApolloServer } from 'apollo-server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

export async function buildGateway(port) {
  const gateway = new ApolloGateway({
    debug: true,
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: 'a',
          url: 'http://localhost:4001/graphql',
        },
        {
          name: 'b',
          url: 'http://localhost:4002/graphql',
        },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  const { url } = await server.listen(port);
  console.log(`Gateway running ${url}`);
}
