import { Color } from '@/core/ui/badge';
import { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useMemo } from 'react';
import useTasksStore from '../store/use-tasks-store';
import Task from '../types/task.type';
import useModalsManager from '@/core/hooks/use-modals-manager';

export default function useTasks() {
  const {
    list,
    updateTaskState,
    addTask,
    addColumn,
    deleteTask,
    deleteColumn,
  } = useTasksStore();

  const { get, set, close, open } = useModalsManager({
    addTask: {},
    addColumn: {},
    confirmDeleteColumn: {
      idDeleteColumn: '',
    },
  });

  const handleDragEnd = useCallback(
    ({ over, active }: DragEndEvent) => {
      if (!over) return;

      const data = active.data.current as Task;
      const targetColumnId = over.id.toString();
      const taskId = active.id.toString();

      updateTaskState({
        id: taskId,
        state: targetColumnId,
        data,
      });
    },
    [updateTaskState]
  );

  const totalColumns = useMemo(() => list.length, [list]);

  const handleSubmit = (form: Record<string, string>) => {
    addTask({
      title: form.title,
      description: form.description,
    });
    close('addTask');
  };

  const handleCreateColumnSubmit = (form: Record<string, string>) => {
    addColumn(
      {
        title: form.column,
        color: form.color as Color,
      },
      form.after
    );
  };

  const handleDeleteColumn = useCallback(() => {
    const id = get('confirmDeleteColumn').args?.idDeleteColumn;
    if (id) {
      deleteColumn(id);
      close('confirmDeleteColumn');
    }
  }, [deleteColumn, get, close]);

  return {
    list,
    totalColumns,
    handleDragEnd,
    handleSubmit,
    handleCreateColumnSubmit,
    deleteTask,
    handleDeleteColumn,
    getModal: get,
    setModal: set,
    closeModal: close,
    openModal: open,
  };
}
