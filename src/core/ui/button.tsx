import { ButtonHTMLAttributes } from 'react';
import cx from '../cx';

export const enum ButtonsVariant {
  Solid = 'solid',
  Outlined = 'outlined',
}

export type ButtonVariant = `${ButtonsVariant}`;

const buttonClasses: Record<ButtonVariant, string> = {
  [ButtonsVariant.Solid]: 'bg-black text-white hover:bg-gray-800',
  [ButtonsVariant.Outlined]:
    'border border-black text-black hover:bg-black hover:text-white',
};

type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  variant = ButtonsVariant.Solid,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        'rounded-md font-semibold py-2.5 px-4 transition-colors duration-200 ease-in-out',
        buttonClasses[variant],
        className
      )}
    />
  );
}
