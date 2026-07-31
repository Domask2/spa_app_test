import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Auction } from '../types';
import type { FilterValues } from "../../../pages/auctionsList/model/filters.schema.ts";
import { requestBuilder } from "../../../shared/lib/request-builder.ts";

interface ListResponse {
	items: Auction[];
	nextCursor?: string | null;
	total: number;
}

export function useAuctionList(filters: FilterValues, cursor?: string, options?: { enabled?: boolean }) {
	return useQuery<ListResponse>({
		queryKey: ['auctions', filters, cursor],
		queryFn: async () => {
			const response = await requestBuilder('/auctions/list', {
				method: 'POST',
				body: JSON.stringify({...filters, cursor}),
			});
			return response.json();
		},
		placeholderData: keepPreviousData,
		...options
	});
}