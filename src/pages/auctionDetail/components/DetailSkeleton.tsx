export function DetailSkeleton() {
	return (
		<div className="space-y-6 animate-pulse">
			{/* Заголовок и навигация */}
			<div className="flex items-center gap-4">
				<div className="h-10 w-32 bg-gray-200 rounded"></div>
				<div className="h-6 w-48 bg-gray-200 rounded"></div>
			</div>
			<div className="flex gap-4 border-b pb-3">
				<div className="h-10 w-40 bg-gray-200 rounded"></div>
				<div className="h-10 w-32 bg-gray-200 rounded"></div>
			</div>

			{/* Основной блок информации */}
			<div className="bg-white p-6 rounded shadow space-y-6">
				{/* Номер и цена */}
				<div className="flex flex-wrap justify-between items-start gap-4">
					<div>
						<div className="h-8 w-48 bg-gray-200 rounded"></div>
						<div className="flex gap-2 mt-2">
							<div className="h-6 w-20 bg-gray-200 rounded"></div>
							<div className="h-6 w-20 bg-gray-200 rounded"></div>
						</div>
					</div>
					<div className="text-right">
						<div className="h-8 w-32 bg-gray-200 rounded"></div>
						<div className="h-5 w-24 bg-gray-200 rounded mt-1"></div>
					</div>
				</div>

				{/* Маршрут и груз */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
						<div className="space-y-2">
							<div className="h-5 w-48 bg-gray-200 rounded"></div>
							<div className="h-5 w-32 bg-gray-200 rounded"></div>
							<div className="h-5 w-40 bg-gray-200 rounded"></div>
						</div>
					</div>
					<div>
						<div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
						<div className="space-y-2">
							<div className="h-5 w-40 bg-gray-200 rounded"></div>
							<div className="h-5 w-32 bg-gray-200 rounded"></div>
							<div className="h-5 w-28 bg-gray-200 rounded"></div>
						</div>
					</div>
				</div>

				{/* Организатор */}
				<div>
					<div className="h-6 w-28 bg-gray-200 rounded mb-2"></div>
					<div className="space-y-2">
						<div className="h-5 w-48 bg-gray-200 rounded"></div>
						<div className="h-5 w-36 bg-gray-200 rounded"></div>
					</div>
				</div>

				{/* Условия оплаты */}
				<div>
					<div className="h-6 w-36 bg-gray-200 rounded mb-2"></div>
					<div className="h-5 w-64 bg-gray-200 rounded"></div>
				</div>

				{/* Параметры торгов */}
				<div className="border-t pt-4">
					<div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
						<div><div className="h-5 w-24 bg-gray-200 rounded"></div></div>
						<div><div className="h-5 w-24 bg-gray-200 rounded"></div></div>
						<div><div className="h-5 w-24 bg-gray-200 rounded"></div></div>
						<div><div className="h-5 w-24 bg-gray-200 rounded"></div></div>
					</div>
					<div className="mt-2 h-5 w-48 bg-gray-200 rounded"></div>
				</div>

				{/* Форма ставки (скелетон) */}
				<div className="bg-gray-50 p-4 rounded space-y-3">
					<div className="h-6 w-32 bg-gray-200 rounded"></div>
					<div className="h-10 w-full bg-gray-200 rounded"></div>
					<div className="flex gap-3">
						<div className="h-5 w-24 bg-gray-200 rounded"></div>
						<div className="h-5 w-24 bg-gray-200 rounded"></div>
						<div className="h-5 w-24 bg-gray-200 rounded"></div>
					</div>
					<div className="h-10 w-40 bg-gray-200 rounded"></div>
				</div>
			</div>

			{/* История ставок (скелетон) */}
			<div className="bg-white p-6 rounded shadow">
				<div className="flex justify-between items-center mb-3">
					<div className="h-6 w-32 bg-gray-200 rounded"></div>
					<div className="h-5 w-24 bg-gray-200 rounded"></div>
				</div>
				<div className="space-y-2">
					<div className="h-10 w-full bg-gray-200 rounded"></div>
					<div className="h-10 w-full bg-gray-200 rounded"></div>
					<div className="h-10 w-full bg-gray-200 rounded"></div>
				</div>
			</div>
		</div>
	);
}