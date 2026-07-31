import { forwardRef, type InputHTMLAttributes } from 'react';
import cn from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({label, error, className, ...props}, ref) => {
		return (
			<div>
				{label && <label className="block text-sm font-medium">{label}</label>}
				<input
					ref={ref}
					className={cn(
						'mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
						error && 'border-red-500',
						className
					)}
					{...props}
				/>
				{error && <p className="text-red-500 text-xs mt-1">{error}</p>}
			</div>
		);
	}
);