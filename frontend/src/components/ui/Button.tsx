import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
}

export function Button({children, ...props}: ButtonProps){
    return(
        <button className="w-full py-2 bg-primary text-white rounded-btn hover:bg-primary-hover" {...props}>
            {children}
        </button>
    )
}