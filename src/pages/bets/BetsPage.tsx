import { useParams, Link } from '@tanstack/react-router';
import { useAuctionDetail } from "../../features/auction/api/useAuctionDetail.ts";
import { useBets } from "../../features/auction/api/useBets.ts";
import { Skeleton } from "../../shared/ui/Skeleton.tsx";
import { formatCurrency } from "../../shared/lib/formatters.ts";

export function BetsPage() {
	const {auctionUuid} = useParams({from: '/auctions/$auctionUuid/bets'});

	const {data: auction, isLoading: isAuctionLoading, isError: isAuctionError} = useAuctionDetail(auctionUuid);
	const {data: bets, isLoading: isBetsLoading, isError: isBetsError} = useBets(auctionUuid);

	if (isAuctionLoading || isBetsLoading) {
		return (
			<div className="space-y-6">
				<div className="flex gap-4 border-b pb-3">
					<div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
					<div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
				</div>
				<Skeleton count={4}/>
			</div>
		);
	}

	if (isAuctionError || !auction) {
		return (
			<div className="text-center py-10">
				<p className="text-red-500">Не удалось загрузить информацию об аукционе</p>
			</div>
		);
	}

	const {hideBetsHistory, betsCount, cargoNum} = auction;

	return (
		<div className="space-y-6">
			{/* Кнопка "Назад" */}
			<div className="flex items-center gap-4">
				<Link
					to="/"
					className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
							  d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
					</svg>
					Назад к списку
				</Link>
				<span className="text-sm text-gray-500">
          Аукцион #{cargoNum} — Ставки
        </span>
			</div>

			{/* Навигация между страницами */}
			<div className="flex gap-4 border-b pb-3">
				<Link
					to="/auctions/$auctionUuid"
					params={{auctionUuid}}
					className="px-4 py-2 font-medium text-gray-600 hover:text-blue-600"
				>
					Информация об аукционе
				</Link>
				<Link
					to="/auctions/$auctionUuid/bets"
					params={{auctionUuid}}
					className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600"
				>
					Ставки {!hideBetsHistory && `(${betsCount || 0})`}
				</Link>
			</div>

			{/* Контент страницы ставок */}
			{hideBetsHistory ? (
				<div className="bg-white p-6 rounded shadow">
					<h3 className="font-semibold text-lg">История ставок</h3>
					<div className="text-gray-500 mt-2">История ставок скрыта организатором</div>
				</div>
			) : isBetsError ? (
				<div className="bg-white p-6 rounded shadow">
					<h3 className="font-semibold text-lg">История ставок</h3>
					<div className="text-red-500 mt-2">Ошибка загрузки ставок</div>
				</div>
			) : !bets || bets.length === 0 ? (
				<div className="bg-white p-6 rounded shadow">
					<h3 className="font-semibold text-lg">История ставок</h3>
					<div className="text-gray-500 mt-2">Нет ставок</div>
				</div>
			) : (
				<div className="bg-white p-6 rounded shadow">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-semibold text-lg">История ставок</h3>
						<span className="text-sm text-gray-600">
              Участников: {new Set(bets.map(b => b.carrierName)).size}
            </span>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full border">
							<thead>
							<tr className="bg-gray-50">
								<th className="px-4 py-2 text-left text-sm font-semibold">Перевозчик</th>
								<th className="px-4 py-2 text-left text-sm font-semibold">Цена без НДС</th>
								<th className="px-4 py-2 text-left text-sm font-semibold">Цена с НДС</th>
								<th className="px-4 py-2 text-left text-sm font-semibold">Место в рейтинге</th>
								<th className="px-4 py-2 text-left text-sm font-semibold">Статус</th>
							</tr>
							</thead>
							<tbody>
							{bets.map((bet) => (
								<tr key={bet.uuid} className="border-t hover:bg-gray-50">
									<td className="px-4 py-2 text-sm">{bet.carrierName}</td>
									<td className="px-4 py-2 text-sm">{formatCurrency(bet.price)} ₽</td>
									<td className="px-4 py-2 text-sm">
										{bet.priceWithVat ? `${formatCurrency(bet.priceWithVat)} ₽` : '—'}
									</td>
									<td className="px-4 py-2 text-sm">{bet.rank ?? '—'}</td>
									<td className="px-4 py-2 text-sm">
										{bet.isWinner && (
											<span className="text-green-600 font-bold">🏆 Победитель</span>
										)}
										{bet.isCancelled && (
											<div>
												<span className="text-red-500">Отменена</span>
												{bet.cancellationReason && (
													<span
														className="block text-xs text-gray-500">{bet.cancellationReason}</span>
												)}
											</div>
										)}
										{!bet.isWinner && !bet.isCancelled && (
											<span className="text-gray-600">Обычная</span>
										)}
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}