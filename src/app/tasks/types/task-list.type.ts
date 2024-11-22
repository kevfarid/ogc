import Task from './task.type';

type TaskList = {
  id: string;
  title: string;
  tasks: Task[];
};

export default TaskList;
