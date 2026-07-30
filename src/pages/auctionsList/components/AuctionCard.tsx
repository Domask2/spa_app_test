import {Link} from '@tanstack/react-router';
import type {Auction} from "../../../features/auction/types";
import {formatCurrency, formatDate} from "../../../shared/lib/formatters.ts";

interface AuctionCardProps {
    auction: Auction;
}

export function AuctionCard({auction}: AuctionCardProps) {
    const statusColor: Record<NonNullable<Auction['status']>, string> = {
        draft: 'bg-gray-200',
        active: 'bg-green-200',
        closed: 'bg-red-200',
        cancelled: 'bg-yellow-200',
        completed: 'bg-blue-200',
    };
    const color = auction.status ? statusColor[auction.status] : 'bg-gray-200';

    let actionLabel: string;
    let actionHref: string;
    let disabled = false;

    if (auction.canSetBet) {
        actionLabel = auction.myBetExists ? 'Изменить ставку' : 'Сделать ставку';
        actionHref = `/auctions/${auction.uuid}`;
    } else {
        if (auction.hideBetsHistory) {
            actionLabel = 'Смотреть ставки';
            actionHref = `/auctions/${auction.uuid}`;
        } else {
            actionLabel = 'Недоступно';
            actionHref = `/auctions/${auction.uuid}`;
            disabled = true;
        }
    }

    return (
        <Link
            to="/auctions/$auctionUuid"
            params={{auctionUuid: auction.uuid}}
            className="block h-full"
        >
            <div
                className="flex flex-col justify-between h-full bg-white p-4 rounded shadow hover:shadow-lg transition-shadow space-y-2 overflow-hidden">
                {/* Верхняя часть: номер, статус, тип */}
                <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-lg truncate">{auction.cargoNum}</span>
                    <div className="flex gap-2 flex-wrap flex-shrink-0">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs whitespace-nowrap">
                          {auction.type}
                        </span>

                        <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${color}`}>
                          {auction.status}
                        </span>
                    </div>
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
                    <div className="truncate"><span className="text-gray-600">Груз:</span> {auction.cargo.name}</div>
                    <div className="truncate"><span className="text-gray-600">Вес:</span> {auction.cargo.weight} кг
                    </div>
                    <div className="truncate"><span className="text-gray-600">Объём:</span> {auction.cargo.volume} м³
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

                {/* Флаг "моя ставка" */}
                {auction.myBetExists ? (
                    <div className="text-sm text-blue-600 font-medium">✓ Ваша ставка есть</div>
                ) : <div className="text-sm text-gray-600-600 font-medium">Ставки нет</div>}

                {/* Primary action – всегда внизу */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <Link
                        to={actionHref}
                        className={`inline-block text-center px-4 py-2 rounded text-sm font-medium transition-colors ${
                            disabled
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        onClick={(e) => {
                            if (disabled) e.preventDefault();
                        }}
                    >
                        {actionLabel}
                    </Link>
                </div>
            </div>
        </Link>
    );
}