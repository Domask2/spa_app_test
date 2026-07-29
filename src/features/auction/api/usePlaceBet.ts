import {useMutation, useQueryClient} from '@tanstack/react-query';
import {requestBuilder} from "../../../shared/lib/request-builder.ts";
import toast from 'react-hot-toast';
import type {BetFormValues} from "../../../pages/auctionDetail/model/bet.schema.ts";

export function usePlaceBet(auctionUuid: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BetFormValues) => {
            const response = await requestBuilder(`/auctions/${auctionUuid}/bets`, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ошибка при размещении ставки');
            }
            return response.json();
        },
        onSuccess: () => {
            toast.success('Ставка успешно размещена!');
            queryClient.invalidateQueries({queryKey: ['auctions']});
            queryClient.invalidateQueries({queryKey: ['auction', auctionUuid]});
            queryClient.invalidateQueries({queryKey: ['bets', auctionUuid]});
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Не удалось разместить ставку');
        },
    });
}