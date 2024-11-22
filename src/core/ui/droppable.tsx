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
  };

  return (
    <div ref={setNodeRef} style={styles} {...props}>
      {children}
    </div>
  );
}
