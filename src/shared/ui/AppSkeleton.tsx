export function AppSkeleton() {
	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-3xl font-bold mb-6">🚛 Грузовые аукционы</h1>
			<div className="animate-pulse">
				{/* Скелетон фильтров */}
				<div className="bg-white p-3 rounded shadow-sm space-y-3">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						{Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className="space-y-1">
								<div className="h-4 w-20 bg-gray-200 rounded"></div>
								<div className="h-8 bg-gray-200 rounded"></div>
							</div>
						))}
					</div>
				</div>

				{/* Скелетон карточек */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="bg-white p-4 rounded shadow space-y-3">
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
					))}
				</div>
			</div>
		</div>
	);
}