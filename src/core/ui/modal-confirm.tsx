import React from 'react';
import Modal, { type ModalProps } from './modal';
import Button from './button';

export default function ModalConfirm({
  onConfirm,
  title = 'Are you sure?',
  confirmText = 'Delete',
  ...props
}: {
  onConfirm: () => void;
  title?: string;
  confirmText?: string;
} & Omit<ModalProps, 'children'>) {
  return (
    <Modal {...props} className='[&>div]:max-w-64'>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-xl font-bold mb-4 text-center'>{title}</h1>
        <div className='flex gap-4'>
          <Button variant='outlined' onClick={props.onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
}
