import Button from '@/core/ui/button';
import Input from '@/core/ui/input';
import { ChangeEvent, useState } from 'react';

export default function CreateTaskForm({
  onSubmit,
}: {
  onSubmit?: (form: Record<string, string>) => void;
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.({
      title: form.title,
      description: form.description,
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className='w-full' onSubmit={handleFormSubmit}>
      <Input
        id='title'
        name='title'
        placeholder='Name Task'
        className='font-bold text-xl'
        onChange={handleInputChange}
        required
      />
      <div className='mt-2'>
        <textarea
          id='description'
          name='description'
          className='w-full py-2 border-none rounded outline-none resize-none'
          placeholder='Description'
          required
          onChange={handleInputChange}
          rows={4}
        />
      </div>
      <div className='bg-gray-300 w-full h-px my-2' />
      <div className='flex justify-end'>
        <Button type='submit' className='w-full'>
          Create Task
        </Button>
      </div>
    </form>
  );
}
