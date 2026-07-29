export type AuctionStatus =
    | 'draft'
    | 'active'
    | 'closed'
    | 'cancelled'
    | 'completed';

export type AuctionType = 'Request' | 'Up' | 'Down' | 'FixPrice';

export interface RoutePoint {
    city: string;
    address?: string | null;
    date: string; // ISO
}

export interface Cargo {
    name: string;
    weight: number; // кг
    volume: number; // м³
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
    // дополнительные поля для деталки
    createdAt: string;
    updatedAt: string;
}