import {http, HttpResponse} from 'msw';
import {store} from './store';
import type {FilterValues} from "../../../pages/auctionsList/model/filters.schema.ts";
import type {Auction} from "../types";

function filterAuctions(filters: Partial<FilterValues>): Auction[] {
    let list = store.auctions;
    if (filters.cargo_num) {
        list = list.filter(a => a.cargoNum.includes(filters.cargo_num!));
    }
    if (filters.status) {
        list = list.filter(a => a.status === filters.status);
    }
    if (filters.statuses && Array.isArray(filters.statuses)) {
        list = list.filter(a => filters.statuses!.includes(a.status));
    }
    if (filters.auc_type) {
        list = list.filter(a => a.type === filters.auc_type);
    }
    if (filters.load_city) {
        list = list.filter(a => a.route.load.city === filters.load_city);
    }
    if (filters.unload_city) {
        list = list.filter(a => a.route.unload.city === filters.unload_city);
    }
    if (filters.load_date_from) {
        const fromDate = new Date(filters.load_date_from);
        list = list.filter(a => new Date(a.route.load.date) >= fromDate);
    }
    if (filters.load_date_to) {
        const toDate = new Date(filters.load_date_to);
        list = list.filter(a => new Date(a.route.load.date) <= toDate);
    }
    if (filters.is_available) {
        list = list.filter(a => a.isAvailable === filters.is_available);
    }
    if (filters.is_bidder !== undefined) {
        list = list.filter(a => a.isBidder === filters.is_bidder);
    }
    if (filters.price_from !== undefined && filters.price_from !== null) {
        list = list.filter(a => a.currentPrice >= filters.price_from!);
    }
    if (filters.price_to !== undefined && filters.price_to !== null) {
        list = list.filter(a => a.currentPrice <= filters.price_to!);
    }
    return list;
}

export const handlers = [
    http.post('/auctions/list', async ({request}) => {
        const body = (await request.json()) as Partial<FilterValues> & { cursor?: string };
        const cursor = body.cursor || null;
        const limit = 10;
        const filtered = filterAuctions(body);
        const total = filtered.length;
        // Пагинация (cursor = индекс последнего элемента)
        let start = 0;
        if (cursor) {
            const idx = filtered.findIndex(a => a.uuid === cursor);
            if (idx !== -1) start = idx + 1;
        }
        const items = filtered.slice(start, start + limit);
        const nextCursor = items.length > 0 && start + limit < total ? items[items.length - 1].uuid : null;
        return HttpResponse.json({items, nextCursor, total});
    }),

    http.get('/auctions/:uuid', ({params}) => {
        const {uuid} = params;
        const auction = store.auctions.find(a => a.uuid === uuid);
        if (!auction) return new HttpResponse(null, {status: 404});
        return HttpResponse.json(auction);
    }),

    http.get('/auctions/:uuid/bets', ({params}) => {
        const {uuid} = params;
        const uuidStr = Array.isArray(uuid) ? uuid[0] : uuid;
        if (!uuidStr) {
            return new HttpResponse(null, { status: 404 });
        }
        const bets = store.getBets(uuidStr);
        return HttpResponse.json(bets);
    }),

    http.post('/auctions/:uuid/bets', async ({params, request}) => {
        const {uuid} = params;
        const body = await request.json() as { price: number };
        if (!body.price || body.price <= 0) {
            return new HttpResponse(JSON.stringify({message: 'Цена должна быть больше 0'}), {status: 422});
        }
        try {
            const newBet = store.addBet(uuid as string, body.price);
            return HttpResponse.json(newBet, {status: 201});
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
            return new HttpResponse(JSON.stringify({ message }), { status: 400 });
        }
    }),
];