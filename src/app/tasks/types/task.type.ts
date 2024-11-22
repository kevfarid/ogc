import { StateType } from '../components/card';

type Task = {
  id: string;
  title: string;
  state: StateType;
  description: string;
};

export default Task;
