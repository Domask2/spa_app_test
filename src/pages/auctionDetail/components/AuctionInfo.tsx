import type { Auction } from "../../../features/auction/types";
import { formatCurrency, formatDate } from "../../../shared/lib/formatters.ts";

interface AuctionInfoProps {
	auction: Auction;
	hidePointsAddressAndContacts: boolean;
	noViewCargoPrice: boolean;
}

export function AuctionInfo({auction, hidePointsAddressAndContacts, noViewCargoPrice}: AuctionInfoProps) {
	const {
		cargoNum,
		type,
		status,
		route,
		cargo,
		currentPrice,
		pricePerKm,
		betStep,
		minPrice,
		maxPrice,
		isAvailable,
		tradingStatus,
		myBetExists,
		organizer,
		paymentTerms,
		createdAt,
		updatedAt,
	} = auction;

	const showAddress = !hidePointsAddressAndContacts;
	const showPrice = !noViewCargoPrice;

	return (
		<div className="bg-white p-6 rounded shadow space-y-6">
			{/* Заголовок: номер, тип, статус */}
			<div className="flex flex-wrap justify-between items-start gap-4">
				<div>
					<h2 className="text-2xl font-bold">{cargoNum}</h2>
					<div className="flex flex-wrap gap-2 mt-1">
						<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{type}</span>
						<span className="px-2 py-1 bg-gray-200 rounded text-sm">{status}</span>
						{tradingStatus && (
							<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                				{tradingStatus}
                            </span>
						)}
						{myBetExists && (
							<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                ✓ Ваша ставка
                            </span>
						)}
						{!isAvailable && (
							<span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                                Недоступен
                            </span>
						)}
					</div>
				</div>
				<div className="text-right">
					<div className="text-2xl font-bold">{formatCurrency(currentPrice)} ₽</div>
					<div className="text-sm text-gray-600">за км: {formatCurrency(pricePerKm)} ₽</div>
				</div>
			</div>

			{/* Маршрут */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h3 className="font-semibold text-lg">Маршрут</h3>
					<div className="space-y-1 mt-1">
						<p><strong>Погрузка:</strong> {route.load.city}</p>
						{showAddress && route.load.address && (
							<p className="text-sm text-gray-600">Адрес: {route.load.address}</p>
						)}
						<p><strong>Дата:</strong> {formatDate(route.load.date)}</p>
					</div>
					<div className="space-y-1 mt-2">
						<p><strong>Выгрузка:</strong> {route.unload.city}</p>
						{showAddress && route.unload.address && (
							<p className="text-sm text-gray-600">Адрес: {route.unload.address}</p>
						)}
						<p><strong>Дата:</strong> {formatDate(route.unload.date)}</p>
					</div>
				</div>

				{/* Груз */}
				<div>
					<h3 className="font-semibold text-lg">Груз и требования к ТС</h3>
					<div className="space-y-1 mt-1">
						<p><strong>Название:</strong> {cargo.name}</p>
						<p><strong>Вес:</strong> {cargo.weight} кг</p>
						<p><strong>Объём:</strong> {cargo.volume} м³</p>
						<p><strong>Тип кузова:</strong> {cargo.bodyType}</p>
						{showPrice && (
							<p><strong>Цена за км:</strong> {formatCurrency(pricePerKm)} ₽</p>
						)}
					</div>
				</div>
			</div>

			{/* Организатор */}
			{organizer && (
				<div>
					<h3 className="font-semibold text-lg">Организатор</h3>
					<div className="space-y-1 mt-1">
						<p><strong>Название:</strong> {organizer.name}</p>
						{!hidePointsAddressAndContacts && organizer.phone && (
							<p><strong>Телефон:</strong> {organizer.phone}</p>
						)}
						{!hidePointsAddressAndContacts && organizer.email && (
							<p><strong>Email:</strong> {organizer.email}</p>
						)}
					</div>
				</div>
			)}

			{/* Условия оплаты */}
			{paymentTerms && (
				<div>
					<h3 className="font-semibold text-lg">Условия оплаты</h3>
					<p className="mt-1">{paymentTerms}</p>
				</div>
			)}

			{/* Параметры торгов */}
			<div className="border-t pt-4">
				<h3 className="font-semibold text-lg">Параметры торгов</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-2">
					<div>
						<span className="text-gray-600">Текущая цена:</span>
						<div className="font-medium">{formatCurrency(currentPrice)} ₽</div>
					</div>
					<div>
						<span className="text-gray-600">Доступная цена:</span>
						<div className="font-medium">
							{minPrice && maxPrice
								? `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
								: 'не ограничена'}
						</div>
					</div>
					<div>
						<span className="text-gray-600">Мин. цена:</span>
						<div className="font-medium">{minPrice ? formatCurrency(minPrice) : 'не указан'}</div>
					</div>
					<div>
						<span className="text-gray-600">Макс. цена:</span>
						<div className="font-medium">{maxPrice ? formatCurrency(maxPrice) : 'не указан'}</div>
					</div>
					<div>
						<span className="text-gray-600">Шаг ставки:</span>
						<div className="font-medium">{formatCurrency(betStep)}</div>
					</div>
				</div>
				<div className="mt-2">
					<span className="text-gray-600">Состояние вашей ставки:</span>{' '}
					{myBetExists
						? <span className="text-green-600 font-medium">Есть активная ставка</span>
						: <span className="text-gray-500">Нет ставки</span>
					}
				</div>
			</div>

			{/* Даты создания и обновления */}
			<div className="border-t pt-4 text-xs text-gray-500">
				<p>Создан: {formatDate(createdAt)}</p>
				<p>Обновлён: {formatDate(updatedAt)}</p>
			</div>
		</div>
	);
}