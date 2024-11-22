import React, { type ReactNode } from 'react';
import cx from '../cx';

export enum Colors {
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Gray = 'gray',
  Pink = 'pink',
  Indigo = 'indigo',
  Rose = 'rose',
}

export type Color = `${Colors}`;

const BadgesClasses: Record<Color, string> = {
  [Colors.Blue]: 'bg-blue-300 text-blue-600 border-blue-400 border-',
  [Colors.Yellow]: 'bg-yellow-300 text-yellow-600 border-yellow-400',
  [Colors.Green]: 'bg-green-300 text-green-600 border-green-400',
  [Colors.Purple]: 'bg-purple-300 text-purple-600 border-purple-400',
  [Colors.Red]: 'bg-red-300 text-red-600 border-red-400',
  [Colors.Gray]: 'bg-gray-300 text-gray-600 border-gray-400',
  [Colors.Pink]: 'bg-pink-300 text-pink-600 border-pink-400',
  [Colors.Indigo]: 'bg-indigo-300 text-indigo-600 border-indigo-400',
  [Colors.Rose]: 'bg-rose-300 text-rose-600 border-rose-400',
};

export default function Badge({
  color,
  children,
  className,
}: {
  color: Color;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'rounded-lg border px-2 py-px w-fit flex gap-2 items-center',
        BadgesClasses[color],
        className
      )}
    >
      <span className='w-1.5 h-1.5 bg-current rounded-full' />
      {children}
    </div>
  );
}
