import { Link } from '@tanstack/react-router';

interface BackButtonProps {
	label?: string;
}

export function BackButton({ label = 'Назад к списку' }: BackButtonProps) {
	return (
		<Link
			to="/"
			className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
		>
			<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			{label}
		</Link>
	);
}