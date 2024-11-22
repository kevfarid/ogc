import type { HTMLAttributes, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

export type DroppableProps = {
  id: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Droppable({ id, children, style, ...props }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const styles = {
    ...style,
    opacity: !isOver ? 1 : 0.5,
    border: isOver ? '2px dashed #000' : '2px dashed transparent',
  };

  return (
    <div ref={setNodeRef} style={styles} {...props}>
      {children}
    </div>
  );
}
