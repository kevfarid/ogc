import React, { type ReactNode } from 'react';
import cx from '../cx';

export const enum Colors {
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
}

export type Color = `${Colors}`;

const BadgesClasses: Record<Color, string> = {
  [Colors.Blue]: 'bg-blue-300 text-blue-600 border-blue-400',
  [Colors.Yellow]: 'bg-yellow-300 text-yellow-600 border-yellow-400',
  [Colors.Green]: 'bg-green-300 text-green-600 border-green-400',
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
