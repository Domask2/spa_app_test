import { useQuery } from '@tanstack/react-query';
import type { Auction } from '../types';
import { requestBuilder } from "../../../shared/lib/request-builder.ts";

export function useAuctionDetail(uuid: string) {
	return useQuery<Auction>({
		queryKey: ['auction', uuid],
		queryFn: async () => {
			const response = await requestBuilder(`/auctions/${uuid}`, {method: 'GET'});
			if (!response.ok) {
				throw new Error(`Ошибка загрузки аукциона: ${response.status}`);
			}
			return response.json();
		},
		enabled: !!uuid,
		retry: 1,
		staleTime: 1000 * 60 * 2,
	});
}