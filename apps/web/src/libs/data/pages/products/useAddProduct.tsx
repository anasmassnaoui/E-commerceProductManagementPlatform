'use client';

import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Product, CreateProductDto } from '@repo/api';
import { GET_PRODUCTS } from './useGetProducts';

export const ADD_PRODUCT = gql`
  mutation addProduct($input: CreateProductInput!) {
    product: createProduct(input: $input) {
      name
      price
      description
      image
    }
  }
`;

type AddProduct = {
  product: Product;
};

type RequestType = {
  input: CreateProductDto;
};

export function useAddProduct(
  options?: MutationHookOptions<AddProduct, RequestType>,
) {
  return useMutation<AddProduct, RequestType>(ADD_PRODUCT, {
    ...options,
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
}
