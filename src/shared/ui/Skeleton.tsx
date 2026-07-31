export function Skeleton({count = 1}: { count?: number }) {
	return (
		<>
			{Array.from({length: count}).map((_, i) => (
				<div key={i} className="animate-pulse bg-gray-200 h-24 rounded mb-4"></div>
			))}
		</>
	);
}