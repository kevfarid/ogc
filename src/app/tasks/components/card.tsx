import Badge, { type Color } from '@/core/ui/badge';
import Draggable, { DraggableProps } from '@/core/ui/draggable';
import Task from '../types/task.type';
import useTasksStore from '../store/use-tasks-store';
import { useMemo } from 'react';
import Trash from '@/core/ui/icons/trash';

export const enum StatesEnum {
  Todo = 'todo',
  InProgress = 'inprogress',
  Done = 'done',
}

export type StateType = `${StatesEnum}` | string;

type State = Record<StateType, { color: Color | 'gray'; label: string }>;

export const States: State = {
  [StatesEnum.Todo]: {
    color: 'blue',
    label: 'To Do',
  },
  [StatesEnum.InProgress]: {
    color: 'yellow',
    label: 'In Progress',
  },
  [StatesEnum.Done]: {
    color: 'green',
    label: 'Done',
  },
};

type CardTaskProps = {
  title: string;
  state: StateType;
  data: Task;
  onDelete?: (task: Task) => void;
} & DraggableProps;

export default function CardTask({
  title,
  children,
  state,
  data,
  onDelete,
  ...props
}: CardTaskProps) {
  const { list } = useTasksStore();

  const stateInfo = useMemo(() => {
    if (States[state]) {
      return States[state];
    }

    const column = list.find((column) => column.id === state);

    return {
      color: column?.color as Color,
      label: column?.title,
    };
  }, [state, list]);

  return (
    <Draggable
      data={data}
      className='bg-white rounded-lg p-4 mt-4 relative border border-gray-200 flex flex-col gap-2 w-full'
      {...props}
    >
      <Badge color={stateInfo.color as Color}>{stateInfo.label}</Badge>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600 text-left'>{children}</p>
      {onDelete && (
        <button
          className='absolute top-3 right-3'
          onClick={() => onDelete(data)}
        >
          <Trash className='w-5' />
        </button>
      )}
    </Draggable>
  );
}
