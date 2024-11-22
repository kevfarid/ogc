import { Droppable, DroppableProps } from '@/core/ui/droppable';
import React, { ReactNode } from 'react';

export default function ColumnTask({
  children,
  title,
  ...props
}: {
  children: ReactNode;
  title: string;
} & DroppableProps) {
  return (
    <Droppable className='bg-gray-50 shadow-md rounded-2xl p-8' {...props}>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      {children}
    </Droppable>
  );
}
