'use client';
import { Button, Modal } from 'flowbite-react';
import { useDeleteProduct } from 'libs/data';
import { useCallback, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

type DeleteProductModalProps = {
  productId?: string;
  isOpen: boolean;
  onClose?: () => void;
};

export function DeleteProductModal({
  productId,
  isOpen,
  onClose,
}: DeleteProductModalProps) {
  const [deleteProduct, { loading }] = useDeleteProduct();
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    setError('');
    onClose?.();
  }, []);

  const handleDelete = useCallback(async () => {
    if (!productId) return;
    deleteProduct({ variables: { id: productId } })
      .then(handleClose)
      .catch((error) => {
        console.error(error);
        setError('Failed to delete product');
      });
  }, [productId]);

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={handleClose}
      popup
      className="bg-gray-900/50"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <p className="text-red-400 text-sm mb-5">{error}</p>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              {loading ? 'Deleting product...' : "Yes, I'm sure"}
            </Button>
            <Button
              color="gray"
              onClick={handleClose}
              isProcessing={loading}
              disabled={loading}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
