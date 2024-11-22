import React, { HTMLAttributes } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type DraggableProps = {
  id: string;
  data: Record<string, unknown>;
} & HTMLAttributes<HTMLDivElement>;

export default function Draggable({
  id,
  children,
  style,
  data,
  ...props
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id,
      data,
    });
  const styles = {
    // Outputs `translate3d(x, y, 0)`
    ...style,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      style={styles}
      {...attributes}
      {...props}
    >
      {children}
    </div>
  );
}
