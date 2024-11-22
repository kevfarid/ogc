'use client';

import Column from '@/app/tasks/components/column';
import React from 'react';
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
import useTasks from './hook/use-tasks';
import ModalConfirm from '@/core/ui/modal-confirm';

export default function TaskPage() {
  const {
    list,
    totalColumns,
    isModalOpen,
    isAddingColumnModalOpen,
    handleDragEnd,
    handleSubmit,
    handleCreateColumnSubmit,
    setIsModalOpen,
    setIsAddingColumnModalOpen,
    deleteTask,
    handleDeleteColumn,
    isConfirmDeleteColumnModalOpen,
    setIsConfirmDeleteColumnModalOpen,
    setIdDeletingColumn,
  } = useTasks();

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(pointerSensor);

  return (
    <main className='w-screen h-screen py-8 overflow-hidden'>
      <div className='flex justify-end gap-2 mb-8 px-6 lg:px-16'>
        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        <Button
          variant='outlined'
          onClick={() => setIsAddingColumnModalOpen(true)}
        >
          Add Column
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTaskForm onSubmit={handleSubmit} />
      </Modal>
      <Modal
        isOpen={isAddingColumnModalOpen}
        onClose={() => setIsAddingColumnModalOpen(false)}
      >
        <AddColumnForm onSubmit={handleCreateColumnSubmit} />
      </Modal>
      <ModalConfirm
        isOpen={isConfirmDeleteColumnModalOpen}
        onClose={() => setIsConfirmDeleteColumnModalOpen(false)}
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
          {list.map((item) => (
            <Column
              key={item.id}
              title={item.title}
              id={item.id}
              onDelete={(id) => {
                setIdDeletingColumn(id);
                if (item.tasks.length === 0) {
                  handleDeleteColumn();
                  return;
                }
                setIsConfirmDeleteColumnModalOpen(true);
                return;
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
          ))}
        </DndContext>
      </div>
    </main>
  );
}
