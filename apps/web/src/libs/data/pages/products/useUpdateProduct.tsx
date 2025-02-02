'use client';

import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { UpdateProductDto } from '@repo/api';
import { GET_PRODUCTS } from './useGetProducts';

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: String!, $input: UpdateProductInput!) {
    result: updateProduct(id: $id, input: $input)
  }
`;

type UpdateProduct = {
  result: boolean;
};

type RequestType = {
  id: string;
  input: UpdateProductDto;
};

export function useUpdateProduct(
  options?: MutationHookOptions<UpdateProduct, RequestType>,
) {
  return useMutation<UpdateProduct, RequestType>(UPDATE_PRODUCT, {
    ...options,
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
}
