'use client';

import { useCallback, useRef, useState } from 'react';
import { Product, UpdateProductDto } from '@repo/api';
import { getUpdatedFields, validateForm } from '../../../utils/validateForm';
import { Button, Modal } from 'flowbite-react';
import { HiSave } from 'react-icons/hi';
import { useUpdateProduct } from 'libs/data';

type UpdateProductModalProps = {
  product?: Product;
  isOpen: boolean;
  onClose?: () => void;
};

export function UpdateProductModal({
  isOpen,
  onClose,
  product,
}: UpdateProductModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [updateProduct, { loading }] = useUpdateProduct();
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    formRef.current?.reset();
    setError('');
    onClose?.();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!product || !formRef.current) return;
    const formData = new FormData(formRef.current);
    const validationResult = await validateForm(formData, UpdateProductDto);
    if (validationResult.isValide) {
      console.log(validationResult.data);
      const { hasChanges, changes } = getUpdatedFields(
        product,
        validationResult.data,
      );
      if (!hasChanges) {
        handleClose();
      } else {
        updateProduct({ variables: { id: product.id, input: changes } })
          .then(handleClose)
          .catch((error) => {
            console.error(error);
            setError('Failed to update product');
          });
      }
    } else {
      setError(validationResult.errors?.[0]?.message ?? 'Invalid form data');
    }
  }, [product]);

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={handleClose}
      className="bg-gray-900/50"
    >
      <Modal.Header>Update Product</Modal.Header>
      <Modal.Body>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={product?.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={product?.price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={product?.description}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write product description here"
              ></textarea>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Image
              </label>
              <input
                type="text"
                name="image"
                id="image"
                defaultValue={product?.image}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Past image url"
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="relative pt-8">
        {error && (
          <p className="absolute text-red-400 text-sm top-1">{error}</p>
        )}
        <Button
          isProcessing={loading}
          disabled={loading}
          onClick={handleSubmit}
          className="cursor-pointer"
        >
          {!loading && <HiSave className="mr-2 h-5 w-5" />}
          {loading ? 'Updating product...' : 'Update product'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
