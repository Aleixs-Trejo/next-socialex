'use client';

import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position='top-center' theme='dark' toastOptions={{ style: { background: '#000814', border: '1px solid #5a189a', color: '#fff', fontSize: '14px', padding: '12px', }, className: 'toast-custom', duration: 5000 }} richColors />
      {children}
    </>
  )
};