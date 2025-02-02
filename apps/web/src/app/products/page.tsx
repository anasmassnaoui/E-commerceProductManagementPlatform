'use client';

import clsx from 'clsx';
import { Button, Spinner } from 'flowbite-react';
import { Product } from '@repo/api';
import { useGetProducts } from 'libs/data';
import {
  AddProductModal,
  DeleteProductModal,
  ProductCard,
  UpdateProductModal,
} from 'libs/logic';
import { useModalState } from 'libs/utils';

export default function ProductPage() {
  const { data: { products } = {}, loading, error } = useGetProducts();
  const addProductModalState = useModalState();
  const updateProductModalState = useModalState<Product>();
  const deleteProductModalState = useModalState<string>();

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={addProductModalState.open} className="cursor-pointer">
          Add new product
        </Button>
      </div>
      <div
        className={clsx(
          'grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4 max-w-6xl mx-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4',
          (loading || error) && 'place-items-center',
        )}
      >
        {loading ? (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        ) : error ? (
          <p className="text-red-500 text-center">Failed to load products</p>
        ) : (
          products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => updateProductModalState.open(product)}
              onDelete={() => deleteProductModalState.open(product.id)}
            />
          ))
        )}
      </div>
      <AddProductModal
        isOpen={addProductModalState.isOpen}
        onClose={addProductModalState.close}
      />
      <UpdateProductModal
        product={updateProductModalState.data}
        isOpen={updateProductModalState.isOpen}
        onClose={updateProductModalState.close}
      />
      <DeleteProductModal
        productId={deleteProductModalState.data}
        isOpen={deleteProductModalState.isOpen}
        onClose={deleteProductModalState.close}
      />
    </div>
  );
}
