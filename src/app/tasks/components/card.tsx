import Badge, { type Color } from '@/core/ui/badge';
import Draggable, { DraggableProps } from '@/core/ui/draggable';

export const enum StatesEnum {
  Todo = 'todo',
  InProgress = 'inprogress',
  Done = 'done',
}

export type StateType = `${StatesEnum}` | string;

export const States: Record<StateType, { color: Color; label: string }> = {
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
} & DraggableProps;

export default function CardTask({
  title,
  children,
  state,
  ...props
}: CardTaskProps) {
  return (
    <Draggable
      className='bg-white rounded-lg p-4 mt-4 relative border border-gray-200 flex flex-col gap-2 w-full'
      {...props}
    >
      <Badge color={States[state].color}>{States[state].label}</Badge>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600 text-left'>{children}</p>
    </Draggable>
  );
}
