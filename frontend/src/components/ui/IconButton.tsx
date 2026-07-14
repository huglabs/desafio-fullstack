import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export function IconButton({children, className = "", ...props}: IconButtonProps) {
    return (
        <button
            {...props}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}