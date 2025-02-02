import { ReactNode } from 'react';
import { GraphQLProvider } from './GraphQLProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <GraphQLProvider>{children}</GraphQLProvider>;
}
