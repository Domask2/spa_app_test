import {useBets} from "../../../features/auction/api/useBets.ts";
import {formatCurrency} from "../../../shared/lib/formatters.ts";

export function BetHistory({ auctionUuid }: { auctionUuid: string }) {
    const { data: bets, isLoading, isError } = useBets(auctionUuid);

    if (isLoading) {
        return (
            <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold text-lg">История ставок</h3>
                <div className="animate-pulse space-y-2 mt-2">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold text-lg">История ставок</h3>
                <div className="text-red-500 mt-2">Ошибка загрузки ставок</div>
            </div>
        );
    }

    if (!bets || bets.length === 0) {
        return (
            <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold text-lg">История ставок</h3>
                <div className="text-gray-500 mt-2">Нет ставок</div>
            </div>
        );
    }

    // Количество участников (уникальные перевозчики)
    const uniqueParticipants = new Set(bets.map(b => b.carrierName)).size;

    return (
        <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">История ставок</h3>
                <span className="text-sm text-gray-600">Участников: {uniqueParticipants}</span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-sm font-semibold">Перевозчик</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Цена (с НДС)</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Ранг</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bets.map((bet) => (
                        <tr key={bet.uuid} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm">{bet.carrierName}</td>
                            <td className="px-4 py-2 text-sm">{formatCurrency(bet.priceWithVat ?? bet.price)} ₽</td>
                            <td className="px-4 py-2 text-sm">{bet.rank ?? '-'}</td>
                            <td className="px-4 py-2 text-sm">
                                {bet.isWinner && (
                                    <span className="text-green-600 font-bold">🏆 Победитель</span>
                                )}
                                {bet.isCancelled && (
                                    <span className="text-red-500">
                      Отменена
                                        {bet.cancellationReason && (
                                            <span className="block text-xs text-gray-500">{bet.cancellationReason}</span>
                                        )}
                    </span>
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
    );
}