
import cn from 'classnames';
import type {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: ReactNode;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'px-4 py-2 rounded font-medium transition-colors',
                variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
                variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}