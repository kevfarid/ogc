import createStore from '@/core/store/createStore';
import TaskList from '../types/task-list.type';
import { StateType } from '../components/card';
import Task from '../types/task.type';
import { Colors } from '@/core/ui/badge';

export type TaskStore = {
  list: TaskList[];
};

const initialData: TaskList[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [],
  },
  { id: 'done', title: 'Done', tasks: [] },
];

export type TaskStoreActions = {
  addTask: (
    task: { title: string; description: string },
    columnId?: string
  ) => void;
  updateTaskState: (task: { id: string; state: StateType; data: Task }) => void;
  deleteTask: (taskId: string) => void;
  addColumn: (column: Omit<TaskList, 'tasks' | 'id'>, after: string) => void;
  deleteColumn: (columnId: string) => void;
};

const useTasksStore = createStore<TaskStore & TaskStoreActions>(
  (set, get) => ({
    list: initialData,
    updateTaskState: (task) => {
      const { list } = get();

      const updatedList = list.map((column) => {
        const tasks = column.tasks.filter((t) => t.id !== task.id);

        if (column.id === task.state) {
          tasks.push({
            ...task.data,
            id: task.id,
            state: task.state,
          });
        }
        return { ...column, tasks };
      });
      set({ list: updatedList });
    },

    addTask: (task, columnId = 'todo') => {
      const { list } = get();

      const newTask: Task = {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        state: columnId,
      };

      const updatedList = list.map((column) => {
        if (column.id === columnId) {
          column.tasks.push(newTask);
        }
        return column;
      });

      set({ list: updatedList });
    },
    addColumn: (column, after) => {
      const { list } = get();

      const newColumn: TaskList = {
        id: crypto.randomUUID(),
        title: column.title,
        color: column.color ?? Colors.Blue,
        tasks: [],
      };

      const updatedList = list.reduce((acc, curr) => {
        if (curr.id === after) {
          acc.push(curr);
          acc.push(newColumn);
        } else {
          acc.push(curr);
        }
        return acc;
      }, [] as TaskList[]);

      set({ list: updatedList });
    },
    deleteTask: (taskId) => {
      const { list } = get();

      const updatedList = list.map((column) => {
        const tasks = column.tasks.filter((t) => t.id !== taskId);
        return { ...column, tasks };
      });

      set({ list: updatedList });
    },
    deleteColumn: (columnId) => {
      const { list } = get();

      const updatedList = list.filter((column) => column.id !== columnId);

      set({ list: updatedList });
    },
  }),
  { hydrate: true, name: 'tasks' }
);

export default useTasksStore;
