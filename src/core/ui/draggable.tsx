import React, { HTMLAttributes } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type DraggableProps = {
  id: string;
} & HTMLAttributes<HTMLButtonElement>;

export default function Draggable({
  id,
  children,
  style,
  ...props
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const styles = {
    // Outputs `translate3d(x, y, 0)`
    ...style,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      style={styles}
      {...attributes}
      {...props}
    >
      {children}
    </button>
  );
}
