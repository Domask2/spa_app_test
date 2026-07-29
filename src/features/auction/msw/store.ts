import { faker } from '@faker-js/faker';
import type {Auction, Bet} from "../types";

export const store = {
    auctions: [] as Auction[],
    bets: {} as Record<string, Bet[]>, // ключ – auctionUuid

    reset() {
        this.auctions = [];
        this.bets = {};
        this.seed();
    },

    seed() {
        // Генерация 20 аукционов
        for (let i = 0; i < 20; i++) {
            const uuid = faker.string.uuid();
            const statuses: Auction['status'][] = ['draft', 'active', 'closed', 'cancelled', 'completed'];
            const types: Auction['type'][] = ['Request', 'Up', 'Down', 'FixPrice'];
            const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород'];

            const loadCity = faker.helpers.arrayElement(cities);
            let unloadCity = faker.helpers.arrayElement(cities);
            while (unloadCity === loadCity) unloadCity = faker.helpers.arrayElement(cities);

            const auction: Auction = {
                uuid,
                cargoNum: `CARGO-${String(i + 1).padStart(4, '0')}`,
                type: faker.helpers.arrayElement(types),
                status: faker.helpers.arrayElement(statuses),
                route: {
                    load: {
                        city: loadCity,
                        address: faker.location.streetAddress(),
                        date: faker.date.future().toISOString(),
                    },
                    unload: {
                        city: unloadCity,
                        address: faker.location.streetAddress(),
                        date: faker.date.future().toISOString(),
                    },
                },
                cargo: {
                    name: faker.commerce.productName(),
                    weight: faker.number.int({ min: 500, max: 20000 }),
                    volume: faker.number.int({ min: 10, max: 100 }),
                    bodyType: faker.helpers.arrayElement(['Тент', 'Рефрижератор', 'Цельнометаллический', 'Открытый']),
                },
                currentPrice: faker.number.int({ min: 10000, max: 500000 }),
                pricePerKm: faker.number.int({ min: 50, max: 200 }),
                betStep: faker.number.int({ min: 1000, max: 5000 }),
                minPrice: null,
                maxPrice: null,
                isAvailable: faker.datatype.boolean(),
                isBidder: faker.datatype.boolean(),
                tradingStatus: faker.helpers.arrayElement(['Leading', 'Losing', 'Winner', 'NotParticipating', null]),
                myBetExists: faker.datatype.boolean(),
                organizer: {
                    name: faker.company.name(),
                    phone: faker.phone.number(),
                    email: faker.internet.email(),
                },
                paymentTerms: faker.helpers.arrayElement(['Предоплата 50%', 'По факту', 'Безналичный расчёт']),
                canSetBet: faker.datatype.boolean(),
                hideBetsHistory: faker.datatype.boolean(),
                hidePointsAddressAndContacts: faker.datatype.boolean(),
                noViewCargoPrice: faker.datatype.boolean(),
                createdAt: faker.date.past().toISOString(),
                updatedAt: faker.date.recent().toISOString(),
            };
            this.auctions.push(auction);
            // Генерируем ставки для каждого аукциона (от 0 до 5)
            const betCount = faker.number.int({ min: 0, max: 5 });
            const bets: Bet[] = [];
            for (let j = 0; j < betCount; j++) {
                bets.push({
                    uuid: faker.string.uuid(),
                    auctionUuid: uuid,
                    price: faker.number.int({ min: 5000, max: 300000 }),
                    priceWithVat: faker.number.int({ min: 5000, max: 300000 }),
                    carrierName: faker.company.name(),
                    rank: j + 1,
                    isWinner: j === 0,
                    isCancelled: faker.datatype.boolean(0.1),
                    cancellationReason: faker.helpers.maybe(() => faker.lorem.sentence()),
                    createdAt: faker.date.recent().toISOString(),
                });
            }
            this.bets[uuid] = bets;
        }
    },

    // Методы для обновления (используются в мутациях)
    addBet(auctionUuid: string, price: number) {
        const auction = this.auctions.find(a => a.uuid === auctionUuid);
        if (!auction) throw new Error('Аукцион не найден');
        // Обновляем текущую цену (для простоты – новая ставка становится текущей)
        auction.currentPrice = price;
        auction.myBetExists = true;
        auction.isBidder = true;
        // Добавляем ставку в историю
        const newBet: Bet = {
            uuid: faker.string.uuid(),
            auctionUuid,
            price,
            priceWithVat: price * 1.2,
            carrierName: 'Вы (тестовый пользователь)',
            rank: (this.bets[auctionUuid]?.length || 0) + 1,
            isWinner: false,
            isCancelled: false,
            cancellationReason: null,
            createdAt: new Date().toISOString(),
        };
        if (!this.bets[auctionUuid]) this.bets[auctionUuid] = [];
        this.bets[auctionUuid].push(newBet);
        // Если ставка самая высокая, обновляем статус
        // (упрощённо)
        return newBet;
    }
};

// Инициализация
store.reset();