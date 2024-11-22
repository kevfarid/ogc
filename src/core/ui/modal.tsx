import { ReactNode, HTMLAttributes, MouseEvent } from 'react';
import cx from '../cx';
import Close from './icons/close';

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

export default function Modal({
  children,
  isOpen,
  onClose,
  className,
}: ModalProps) {
  const handleModalClose = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <div
          className={cx(
            'fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 px-4',
            className
          )}
          onClick={handleModalClose}
        >
          <div
            className='bg-white p-8 rounded-lg shadow-xl w-full md:w-3/6 relative'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='absolute top-4 right-4'>
              <button onClick={onClose}>
                <Close className='w-4 h-4' />
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
