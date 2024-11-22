import { Colors } from '@/core/ui/badge';
import Input from '@/core/ui/input';
import useTasksStore from '../store/use-tasks-store';
import { useMemo, useState, type ChangeEvent } from 'react';
import Button from '@/core/ui/button';

export default function AddColumnForm({
  onSubmit,
}: {
  onSubmit: (form: Record<string, string>) => void;
}) {
  const [form, setForm] = useState({
    column: '',
    color: Colors.Blue,
    after: 'todo',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { list } = useTasksStore();

  const namesColumns = useMemo(
    () =>
      list.map(({ id, title }) => ({
        id,
        title,
      })),
    [list]
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <Input
        autoFocus
        name='column'
        placeholder='Column Name'
        className='font-bold text-lg'
        required
        onChange={handleChange}
      />
      <div className='mt-4 flex gap-2 items-center'>
        <label
          htmlFor='color'
          className='block text-sm font-medium text-gray-700'
        >
          Color
        </label>
        <select
          name='color'
          id='color'
          onChange={handleChange}
          className='block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm'
        >
          {Object.keys(Colors).map((color) => (
            <option key={color} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className='flex gap-2 items-center mt-4'>
        <label
          htmlFor='after'
          className='block text-sm font-medium text-gray-700'
        >
          After
        </label>
        <select
          name='after'
          id='after'
          onChange={handleChange}
          className='block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm'
        >
          {namesColumns.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <Button type='submit' className='mt-4 w-full'>
        Add Column
      </Button>
    </form>
  );
}
