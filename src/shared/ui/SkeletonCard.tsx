export function SkeletonCard() {
	return (
		<div className="bg-white p-4 rounded shadow space-y-3 animate-pulse">
			<div className="flex justify-between items-start">
				<div className="h-6 w-32 bg-gray-200 rounded"></div>
				<div className="flex gap-2">
					<div className="h-5 w-16 bg-gray-200 rounded"></div>
					<div className="h-5 w-16 bg-gray-200 rounded"></div>
				</div>
			</div>
			<div className="flex gap-2">
				<div className="h-5 w-28 bg-gray-200 rounded"></div>
				<div className="h-5 w-28 bg-gray-200 rounded"></div>
			</div>
			<div className="h-4 w-48 bg-gray-200 rounded"></div>
			<div className="h-4 w-40 bg-gray-200 rounded"></div>
			<div className="grid grid-cols-2 gap-2">
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
			</div>
			<div className="flex gap-4">
				<div className="h-5 w-28 bg-gray-200 rounded"></div>
				<div className="h-5 w-28 bg-gray-200 rounded"></div>
				<div className="h-5 w-28 bg-gray-200 rounded"></div>
			</div>
			<div className="h-10 w-full bg-gray-200 rounded"></div>
		</div>
	);
}