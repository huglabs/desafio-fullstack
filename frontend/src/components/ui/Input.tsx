import type { ComponentType, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ComponentType<{ className?: string }>;
}

export function Input({ label, icon: Icon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left w-full">
        {label && (
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                {label}
            </label>
        )}
        <div className="relative flex items-center w-full">
            {Icon && (
                <div className="absolute left-4 text-text-secondary pointer-events-none z-10">
                    <Icon className="w-5 h-5" />
                </div>
                )}
            <input className={`${Icon ? "pl-11 pr-4" : "px-4"} w-full bg-bg-card border border-border-input text-text-primary placeholder-text-secondary rounded-btn py-3 text-sm outline-none focus:border-primary transition-colors`}
                {...props}
            />
        </div>
    </div>
  );
}