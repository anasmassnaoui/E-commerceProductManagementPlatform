'use client';

import { ApolloProvider } from '@apollo/client';
import { gqlClient } from 'libs/data';
import { ReactNode } from 'react';

export function GraphQLProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={gqlClient}>{children}</ApolloProvider>;
}
