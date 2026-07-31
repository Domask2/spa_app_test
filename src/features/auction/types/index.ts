export type AuctionStatus =
    | 'active'
    | 'closed'
    | 'cancelled';

export type AuctionType = 'Request' | 'Up' | 'Down' | 'FixPrice';

export interface RoutePoint {
    city: string;
    address?: string | null;
    date: string;
}

export interface Cargo {
    name: string;
    weight: number;
    volume: number;
    bodyType: string;
}

export interface Organizer {
    name: string;
    phone?: string | null;
    email?: string | null;
}

export interface Auction {
    uuid: string;
    cargoNum: string;
    type: AuctionType;
    status: AuctionStatus;
    route: {
        load: RoutePoint;
        unload: RoutePoint;
    };
    cargo: Cargo;
    currentPrice: number;
    pricePerKm: number;
    betStep: number;
    betsCount: number;
    minPrice?: number | null;
    maxPrice?: number | null;
    isAvailable: boolean;
    isBidder: boolean;
    tradingStatus?: 'Leading' | 'Losing' | 'Winner' | 'NotParticipating' | null;
    myBetExists: boolean;
    organizer: Organizer;
    paymentTerms?: string | null;
    canSetBet: boolean;
    hideBetsHistory: boolean;
    hidePointsAddressAndContacts: boolean;
    noViewCargoPrice: boolean;
    createdAt: string;
    updatedAt: string;
}

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