import { Link } from '@tanstack/react-router';
import type { Auction } from "../../../features/auction/types";
import { formatCurrency, formatDate } from "../../../shared/lib/formatters.ts";

interface AuctionCardProps {
	auction: Auction;
}

export function AuctionCard({auction}: AuctionCardProps) {
	const statusColor: Record<NonNullable<Auction['status']>, string> = {
		active: 'bg-green-200 text-green-700',
		closed: 'bg-red-200 text-red-700',
		cancelled: 'bg-yellow-200 text-yellow-700',
	};
	const color = auction.status ? statusColor[auction.status] : 'bg-gray-200 text-gray-600';

	// Проверяем, завершён или отменён аукцион
	const isClosedOrCancelled = auction.status === 'closed' || auction.status === 'cancelled';

	// Можно ли делать ставку (только для активных аукционов)
	const canPlaceBet = auction.canSetBet && auction.status === 'active';

	// Можно ли смотреть ставки (если история не скрыта)
	const canViewBets = !auction.hideBetsHistory;

	let actionLabel: string;
	let actionHref: string;
	let disabled = false;
	let buttonColor: string;

	// 1. Если аукцион активен и пользователь может делать ставку
	if (canPlaceBet) {
		// ✅ Если у пользователя уже есть ставка → "Изменить ставку"
		if (auction.myBetExists) {
			actionLabel = 'Изменить ставку';
		} else {
			actionLabel = 'Сделать ставку';
		}
		actionHref = `/auctions/${auction.uuid}`;
		buttonColor = 'bg-green-600 text-white hover:bg-green-700';
	}
	// 2. Если можно смотреть ставки (независимо от статуса аукциона)
	else if (canViewBets) {
		actionLabel = 'Смотреть ставки';
		actionHref = `/auctions/${auction.uuid}/bets`;
		buttonColor = 'bg-blue-600 text-white hover:bg-blue-700';
	}
	// 3. Всё остальное → disabled
	else {
		if (isClosedOrCancelled) {
			actionLabel = auction.status === 'closed' ? 'Аукцион завершён' : 'Аукцион отменён';
		} else {
			actionLabel = 'Недоступно';
		}
		actionHref = `/auctions/${auction.uuid}`;
		disabled = true;
		buttonColor = 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none';
	}

	return (
		<div
			className="flex flex-col justify-between h-full bg-white p-4 rounded shadow hover:shadow-lg transition-shadow space-y-2 overflow-hidden border border-gray-100">
			{/* Верхняя часть – кликабельная ссылка на детальную страницу */}
			<Link
				to="/auctions/$auctionUuid"
				params={{auctionUuid: auction.uuid}}
				className="block cursor-pointer transition-all duration-200 hover:bg-blue-50/50 rounded -m-1 p-1"
			>
				<div className="space-y-2">
					{/* Номер, статус, тип */}
					<div className="flex justify-between items-start gap-2 transition-colors duration-200 group">
                        <span
							className="font-semibold text-lg truncate group-hover:text-blue-600 transition-colors duration-200">
                            {auction.cargoNum}
                        </span>
						<div className="flex gap-2 flex-wrap flex-shrink-0">
                            <span
								className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs whitespace-nowrap group-hover:bg-blue-200 transition-colors duration-200">
                                {auction.type}
                            </span>

							<span
								className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${color} group-hover:ring-2 group-hover:ring-blue-300 transition-all duration-200`}>
                                {auction.status}
                            </span>
						</div>
					</div>

					{/* Индикаторы */}
					<div className="flex gap-2 flex-wrap">
						{isClosedOrCancelled ? (
							<span
								className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                {auction.status === 'closed' ? 'Аукцион завершён' : 'Аукцион отменён'}
                            </span>
						) : canPlaceBet ? (
							<span
								className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                Можно делать ставку
                            </span>
						) : (
							<span
								className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                Ставки закрыты
                            </span>
						)}
						{auction.hideBetsHistory ? (
							<span
								className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                                История скрыта
                            </span>
						) : (
							<span
								className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                История доступна
                            </span>
						)}
						{auction.myBetExists && (
							<span
								className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                ✓ Ваша ставка
                            </span>
						)}
					</div>

					{/* Торговый статус пользователя */}
					{auction.tradingStatus && (
						<div className="text-sm font-medium text-gray-700 truncate">
							Торговый статус: {auction.tradingStatus}
						</div>
					)}

					{/* Маршрут и даты */}
					<div className="grid grid-cols-1 gap-0.5 text-sm">
						<div className="truncate">
							<span className="text-gray-600">Маршрут:</span>{' '}
							{auction.route.load.city} → {auction.route.unload.city}
						</div>
						<div className="truncate">
							<span className="text-gray-600">Погрузка:</span> {formatDate(auction.route.load.date)}{' '}
							<span className="text-gray-600">Выгрузка:</span> {formatDate(auction.route.unload.date)}
						</div>
					</div>

					{/* Груз */}
					<div className="text-sm grid grid-cols-2 gap-x-2 gap-y-0.5">
						<div className="truncate"><span className="text-gray-600">Груз:</span> {auction.cargo.name}
						</div>
						<div className="truncate"><span className="text-gray-600">Вес:</span> {auction.cargo.weight} кг
						</div>
						<div className="truncate"><span
							className="text-gray-600">Объём:</span> {auction.cargo.volume} м³
						</div>
						<div className="truncate"><span className="text-gray-600">Кузов:</span> {auction.cargo.bodyType}
						</div>
					</div>

					{/* Цены и шаг */}
					<div className="flex flex-wrap gap-3 text-sm font-medium">
						<div className="truncate"><span
							className="text-gray-600">Цена:</span> {formatCurrency(auction.currentPrice)} ₽
						</div>
						<div className="truncate"><span
							className="text-gray-600">За км:</span> {formatCurrency(auction.pricePerKm)} ₽
						</div>
						<div className="truncate"><span
							className="text-gray-600">Шаг:</span> {formatCurrency(auction.betStep)} ₽
						</div>
					</div>

					{/* Подсказка при наведении */}
					<div
						className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
						<span>🔍</span> Кликните для просмотра деталей
					</div>
				</div>
			</Link>

			{/* Primary action – кнопка внизу */}
			<div className="mt-1 pt-1 border-t border-gray-100">
				<Link
					to={disabled ? '/' : actionHref}
					params={!disabled ? {auctionUuid: auction.uuid} : undefined}
					className={`block w-full text-center py-2 rounded text-base font-medium transition-colors ${buttonColor}`}
					onClick={(e) => {
						if (disabled) e.preventDefault();
					}}
				>
					{actionLabel}
				</Link>
			</div>
		</div>
	);
}