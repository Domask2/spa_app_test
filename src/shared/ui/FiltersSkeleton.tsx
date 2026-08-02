export function FiltersSkeleton() {
	return (
		<div className="bg-white p-3 rounded shadow-sm space-y-3 animate-pulse">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{Array.from({ length: 9 }).map((_, i) => (
					<div key={i} className="space-y-1">
						<div className="h-4 w-20 bg-gray-200 rounded"></div>
						<div className="h-8 bg-gray-200 rounded"></div>
					</div>
				))}
			</div>
		</div>
	);
}