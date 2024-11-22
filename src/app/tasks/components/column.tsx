import { Droppable, DroppableProps } from '@/core/ui/droppable';
import Close from '@/core/ui/icons/close';
import React, { ReactNode } from 'react';

export default function ColumnTask({
  children,
  title,
  onDelete,
  ...props
}: {
  children: ReactNode;
  title: string;
  onDelete?: (id: string) => void;
} & DroppableProps) {
  return (
    <Droppable
      className='bg-gray-50 shadow-md rounded-2xl p-8 h-fit transition-all duration-300 ease-in-out relative group'
      {...props}
    >
      <button
        className='absolute top-4 right-4 transform lg:scale-0 lg:group-hover:scale-100 transition-transform duration-300 ease-in-out'
        onClick={() => onDelete?.(props.id)}
      >
        <Close className='w-5' />
      </button>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      {children}
    </Droppable>
  );
}
