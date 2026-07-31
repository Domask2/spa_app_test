import { useQuery } from '@tanstack/react-query';
import type { Bet } from '../types';
import { requestBuilder } from "../../../shared/lib/request-builder.ts";

export function useBets(auctionUuid: string) {
	return useQuery<Bet[]>({
		queryKey: ['bets', auctionUuid],
		queryFn: async () => {
			const response = await requestBuilder(`/auctions/${auctionUuid}/bets`, {method: 'GET'});
			if (!response.ok) {
				throw new Error(`Ошибка загрузки ставок: ${response.status}`);
			}
			return response.json();
		},
		enabled: !!auctionUuid,
		retry: 1,
	});
}