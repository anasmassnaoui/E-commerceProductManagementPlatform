'use client';

import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { Product } from '@repo/api';

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      id
      name
      price
      description
      image
    }
  }
`;

type GetProducts = {
  products: Product[];
};

export function useGetProducts(options?: QueryHookOptions<GetProducts>) {
  return useQuery<GetProducts>(GET_PRODUCTS, options);
}
