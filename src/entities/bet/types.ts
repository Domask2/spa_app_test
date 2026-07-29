export interface Bet {
    uuid: string;
    auctionUuid: string;
    price: number;
    priceWithVat?: number | null;
    carrierName: string;
    rank?: number | null;
    isWinner?: boolean;
    isCancelled?: boolean;
    cancellationReason?: string | null;
    createdAt: string;
}