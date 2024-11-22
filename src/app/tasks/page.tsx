'use client';

import Column from '@/app/tasks/components/column';
import React from 'react';
import { DndContext } from '@dnd-kit/core';
import Card from './components/card';
import TaskList from './types/task-list.type';

const columns: TaskList[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
        title: 'Task 1',
        state: 'todo',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, placeat? Voluptatum delen',
      },
    ],
  },
  { id: 'inprogress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export default function TaskPage() {
  return (
    <div className='w-screen min-h-screen grid grid-cols-3 gap-16 px-16 py-8'>
      <DndContext>
        {columns.map((column) => (
          <Column key={column.id} title={column.title} id={column.id}>
            {column.tasks.map((task) => (
              <Card
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
  );
}
