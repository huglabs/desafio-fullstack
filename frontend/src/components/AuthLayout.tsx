
import type { AuthLayoutProps } from "../types/Auth";

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page font-sans px-4">
        <div className="bg-bg-card p-8 rounded-card shadow-md w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">{title}</h1>
        {children}
        {footer && (
          <div className="text-sm text-center mt-4 text-text-secondary">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}