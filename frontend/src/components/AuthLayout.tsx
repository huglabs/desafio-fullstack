import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page font-sans">
        <div className="bg-bg-card p-8 rounded-card shadow-md w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">{title}</h1>
        {children}
        {footer && (
          <div className="text-sm text-center mt-4 text-gray-600">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}