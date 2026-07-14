import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left w-full">
      {label && (
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <input className=" w-fullbg-bg-card border border-border-input text-text-primary placeholder-text-secondary rounded-btn px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
        {...props}
      />
    </div>
  );
}