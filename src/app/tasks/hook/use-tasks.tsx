import { Color } from '@/core/ui/badge';
import { DragEndEvent } from '@dnd-kit/core';
import { useState, useMemo } from 'react';
import useTasksStore from '../store/use-tasks-store';
import Task from '../types/task.type';

export default function useTasks() {
  const {
    list,
    updateTaskState,
    addTask,
    addColumn,
    deleteTask,
    deleteColumn,
  } = useTasksStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingColumnModalOpen, setIsAddingColumnModalOpen] = useState(false);
  const [isConfirmDeleteColumnModalOpen, setIsConfirmDeleteColumnModalOpen] =
    useState(false);
  const [idDeletingColumn, setIdDeletingColumn] = useState('');

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over) return;

    const data = active.data.current as Task;
    const targetColumnId = over.id.toString();
    const taskId = active.id.toString();

    updateTaskState({
      id: taskId,
      state: targetColumnId,
      data,
    });
  };

  const totalColumns = useMemo(() => list.length, [list]);

  const handleSubmit = (form: Record<string, string>) => {
    addTask({
      title: form.title,
      description: form.description,
    });
    setIsModalOpen(false);
  };

  const handleCreateColumnSubmit = (form: Record<string, string>) => {
    addColumn(
      {
        title: form.column,
        color: form.color as Color,
      },
      form.after
    );
    setIsAddingColumnModalOpen(false);
  };

  const handleDeleteColumn = () => {
    deleteColumn(idDeletingColumn);
    setIsConfirmDeleteColumnModalOpen(false);
  };

  return {
    list,
    totalColumns,
    isModalOpen,
    isAddingColumnModalOpen,
    handleDragEnd,
    handleSubmit,
    handleCreateColumnSubmit,
    setIsModalOpen,
    setIsAddingColumnModalOpen,
    isConfirmDeleteColumnModalOpen,
    setIsConfirmDeleteColumnModalOpen,
    deleteTask,
    handleDeleteColumn,
    setIdDeletingColumn,
  };
}
