import type { InputHTMLAttributes } from 'react';
import cx from '../cx';

type InputProps = {
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      autoFocus
      className={cx('w-full border-none rounded outline-none py-2', className)}
    />
  );
}
