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
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Ошибка ${response.status}`);
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success('Ставка успешно размещена!');
            // Инвалидируем все связанные запросы
            queryClient.invalidateQueries({ queryKey: ['auctions'] });
            queryClient.invalidateQueries({ queryKey: ['auction', auctionUuid] });
            queryClient.invalidateQueries({ queryKey: ['bets', auctionUuid] });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Не удалось разместить ставку. Попробуйте снова.');
        },
    });
}