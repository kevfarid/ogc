import { Color } from '@/core/ui/badge';
import Task from './task.type';

type TaskList = {
  id: string;
  title: string;
  color?: Color;
  tasks: Task[];
};

export default TaskList;
