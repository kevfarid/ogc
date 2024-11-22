'use client';
import { ReactNode, useEffect, useState } from 'react';

export default function Preloader({ children }: { children?: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        children
      ) : (
        <div className='w-screen h-screen flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-2 border-b-0 border-l-0 border-gray-900' />
        </div>
      )}
    </>
  );
}
