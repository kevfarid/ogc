'use client';

import Column from '@/app/tasks/components/column';
import React, { useCallback, useMemo } from 'react';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Card from './components/card';
import Modal from '@/core/ui/modal';
import CreateTaskForm from './components/create-task-form';
import Button from '@/core/ui/button';
import AddColumnForm from './components/add-column-form';
import useTasks from './hooks/use-tasks';
import ModalConfirm from '@/core/ui/modal-confirm';
import Task from './types/task.type';
import { Modals } from './constants';

export default function TaskPage() {
  const {
    list,
    totalColumns,
    handleDragEnd,
    handleSubmit,
    handleCreateColumnSubmit,
    deleteTask,
    handleDeleteColumn,
    getModal,
    closeModal,
    setModal,
    openModal,
  } = useTasks();

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(pointerSensor);

  const onDeleteColumn = useCallback(
    (id: string, tasks: Task[]) => {
      setModal(Modals.ConfirmDeleteColumn, {
        idDeleteColumn: id,
      });
      if (tasks.length === 0) {
        handleDeleteColumn();
        return;
      }
      openModal(Modals.ConfirmDeleteColumn);
    },
    [setModal, openModal, handleDeleteColumn]
  );

  const listComponent = useMemo(
    () =>
      list.map((item) => (
        <Column
          key={item.id}
          title={item.title}
          id={item.id}
          onDelete={(id) => {
            onDeleteColumn(id, item.tasks);
          }}
        >
          {item.tasks.map((task) => (
            <Card
              onDelete={({ id }) => deleteTask(id)}
              data={task}
              key={task.id}
              title={task.title}
              state={task.state}
              id={task.id}
            >
              {task.description}
            </Card>
          ))}
        </Column>
      )),
    [list, onDeleteColumn, deleteTask]
  );

  return (
    <main className='w-screen h-screen py-8 overflow-hidden'>
      <div className='flex justify-end gap-2 mb-8 px-6 lg:px-16'>
        <Button onClick={() => openModal(Modals.AddTask)}>Add Task</Button>
        <Button variant='outlined' onClick={() => openModal(Modals.AddColumn)}>
          Add Column
        </Button>
      </div>
      <Modal
        isOpen={getModal(Modals.AddTask).isOpen}
        onClose={() => closeModal(Modals.AddTask)}
      >
        <CreateTaskForm onSubmit={handleSubmit} />
      </Modal>
      <Modal
        isOpen={getModal(Modals.AddColumn).isOpen}
        onClose={() => closeModal(Modals.AddColumn)}
      >
        <AddColumnForm onSubmit={handleCreateColumnSubmit} />
      </Modal>
      <ModalConfirm
        isOpen={getModal(Modals.ConfirmDeleteColumn).isOpen}
        onClose={() => closeModal(Modals.ConfirmDeleteColumn)}
        onConfirm={() => handleDeleteColumn()}
        title='Are you sure? You have tasks in this column.'
        confirmText='Delete'
      />
      <div
        className='w-full min-h-full grid gap-8 overflow-auto px-6 lg:pl-16 lg:pr-16'
        style={{
          gridTemplateColumns: `repeat(${totalColumns}, minmax(320px, 1fr))`,
        }}
      >
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          {listComponent}
        </DndContext>
      </div>
    </main>
  );
}
