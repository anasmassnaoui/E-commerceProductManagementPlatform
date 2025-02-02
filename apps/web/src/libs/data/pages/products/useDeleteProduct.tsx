'use client';

import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './useGetProducts';

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    result: deleteProduct(id: $id)
  }
`;

type DeleteProduct = {
  result: boolean;
};

type RequestType = {
  id: string;
};

export function useDeleteProduct(
  options?: MutationHookOptions<DeleteProduct, RequestType>,
) {
  return useMutation<DeleteProduct, RequestType>(DELETE_PRODUCT, {
    ...options,
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
}
