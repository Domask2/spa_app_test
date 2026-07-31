import { faker } from '@faker-js/faker';
import type { Auction } from '../types';
import type { Bet } from '../types';

export const store = {
    auctions: [] as Auction[],
    bets: {} as Record<string, Bet[]>,

    reset() {
        this.auctions = [];
        this.bets = {};
        this.seed();
    },

    getBets(auctionUuid: string): Bet[] {
        const bets = this.bets[auctionUuid] || [];
        return [...bets].sort((a, b) => b.price - a.price);
    },

    seed() {
        for (let i = 0; i < 40; i++) {
            const uuid = faker.string.uuid();
            const statuses: Auction['status'][] = ['active', 'closed', 'cancelled'];
            const types: Auction['type'][] = ['Request', 'Up', 'Down', 'FixPrice'];
            const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород'];

            const loadCity = faker.helpers.arrayElement(cities);
            let unloadCity = faker.helpers.arrayElement(cities);
            while (unloadCity === loadCity) unloadCity = faker.helpers.arrayElement(cities);

            const step = faker.number.int({ min: 500, max: 10000 });
            const minPrice = faker.number.int({ min: 1000, max: 50000 });
            const maxPrice = faker.number.int({ min: 100000, max: 500000 });

            const currentPrice = faker.number.int({
                min: Math.max(minPrice, 5000),
                max: Math.max(maxPrice - 10000, minPrice + 10000)
            });

            const canSetBet = faker.datatype.boolean();
            const hideBetsHistory = canSetBet ? false : faker.datatype.boolean();

            // Генерируем ставки
            let betCount = faker.number.int({ min: 0, max: 8 });
            const bets: Bet[] = [];

            const userHasBet = faker.datatype.boolean();

            if (userHasBet && canSetBet) {
                const userBetPrice = faker.number.int({
                    min: Math.max(minPrice, currentPrice + step),
                    max: maxPrice,
                });
                const roundedUserPrice = Math.round(userBetPrice / step) * step;

                bets.push({
                    uuid: faker.string.uuid(),
                    auctionUuid: uuid,
                    price: roundedUserPrice,
                    priceWithVat: roundedUserPrice * 1.2,
                    carrierName: 'Вы (тестовый пользователь)',
                    rank: 0,
                    isWinner: false,
                    isCancelled: false,
                    cancellationReason: null,
                    createdAt: faker.date.recent().toISOString(),
                });

                betCount = Math.min(betCount, 7);
            }

            // Генерируем остальные ставки
            const betPrices: number[] = [];
            for (let j = 0; j < betCount; j++) {
                let price = faker.number.int({
                    min: Math.max(minPrice, currentPrice),
                    max: maxPrice,
                });
                if (step) {
                    price = Math.round(price / step) * step;
                }
                betPrices.push(price);
            }

            betPrices.sort((a, b) => b - a);

            for (let j = 0; j < betCount; j++) {
                const price = betPrices[j];
                const isWinner = j === 0 && !userHasBet;
                const isCancelled = !isWinner && faker.datatype.boolean(0.1);

                bets.push({
                    uuid: faker.string.uuid(),
                    auctionUuid: uuid,
                    price: price,
                    priceWithVat: price * 1.2,
                    carrierName: faker.company.name(),
                    rank: j + 1,
                    isWinner: isWinner,
                    isCancelled: isCancelled,
                    cancellationReason: isCancelled ? faker.lorem.sentence() : null,
                    createdAt: faker.date.recent().toISOString(),
                });
            }

            // Сортируем и пересчитываем ранги
            bets.sort((a, b) => b.price - a.price);
            bets.forEach((bet, index) => {
                bet.rank = index + 1;
                bet.isWinner = index === 0;
                if (bet.isWinner) {
                    bet.isCancelled = false;
                    bet.cancellationReason = null;
                }
            });

            this.bets[uuid] = bets;

            const myBetExists = bets.some(b => b.carrierName === 'Вы (тестовый пользователь)');
            const userBet = bets.find(b => b.carrierName === 'Вы (тестовый пользователь)');
            const finalCurrentPrice = userBet ? userBet.price : currentPrice;

            const tradingStatus = myBetExists
                ? (userBet?.isWinner ? 'Winner' : 'Leading')
                : faker.helpers.arrayElement(['Losing', 'NotParticipating', null]);

            const status = faker.helpers.arrayElement(statuses);
            const isAvailable = status === 'active' && canSetBet;

            const auction: Auction = {
                uuid,
                cargoNum: `CARGO-${String(i + 1).padStart(4, '0')}`,
                type: faker.helpers.arrayElement(types),
                status: status,
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
                currentPrice: finalCurrentPrice,
                pricePerKm: faker.number.int({ min: 50, max: 200 }),
                betStep: step,
                minPrice: minPrice,
                maxPrice: maxPrice,
                isAvailable: isAvailable,
                isBidder: myBetExists,
                tradingStatus: tradingStatus,
                myBetExists: myBetExists,
                organizer: {
                    name: faker.company.name(),
                    phone: faker.phone.number(),
                    email: faker.internet.email(),
                },
                paymentTerms: faker.helpers.arrayElement(['Предоплата 50%', 'По факту', 'Безналичный расчёт', null]),
                canSetBet: canSetBet,
                hideBetsHistory: hideBetsHistory,
                hidePointsAddressAndContacts: faker.datatype.boolean(),
                noViewCargoPrice: faker.datatype.boolean(),
                betsCount: bets.length,
                createdAt: faker.date.past().toISOString(),
                updatedAt: faker.date.recent().toISOString(),
            };
            this.auctions.push(auction);
        }
    },

    addBet(auctionUuid: string, price: number) {
        if (!auctionUuid) throw new Error('UUID аукциона обязателен');
        const auction = this.auctions.find(a => a.uuid === auctionUuid);
        if (!auction) throw new Error('Аукцион не найден');

        if (auction.maxPrice && price > auction.maxPrice) {
            throw new Error(`Цена не может быть больше максимальной (${auction.maxPrice})`);
        }
        if (auction.minPrice && price < auction.minPrice) {
            throw new Error(`Цена не может быть меньше минимальной (${auction.minPrice})`);
        }
        if (auction.betStep && price % auction.betStep !== 0) {
            throw new Error(`Цена должна быть кратна шагу (${auction.betStep})`);
        }
        if (price <= auction.currentPrice) {
            throw new Error(`Цена должна быть выше текущей (${auction.currentPrice})`);
        }

        auction.currentPrice = price;
        auction.myBetExists = true;
        auction.isBidder = true;

        const existingUserBetIndex = this.bets[auctionUuid]?.findIndex(
            b => b.carrierName === 'Вы (тестовый пользователь)'
        ) ?? -1;

        if (existingUserBetIndex !== -1) {
            this.bets[auctionUuid][existingUserBetIndex].price = price;
            this.bets[auctionUuid][existingUserBetIndex].priceWithVat = price * 1.2;
            this.bets[auctionUuid][existingUserBetIndex].createdAt = new Date().toISOString();
        } else {
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
        }

        this.recalculateRanks(auctionUuid);
        auction.betsCount = this.bets[auctionUuid].length;
        auction.tradingStatus = 'Leading';

        return this.bets[auctionUuid].find(b => b.carrierName === 'Вы (тестовый пользователь)');
    },

    recalculateRanks(auctionUuid: string) {
        const bets = this.bets[auctionUuid];
        if (!bets || bets.length === 0) return;

        const sortedBets = [...bets].sort((a, b) => b.price - a.price);

        sortedBets.forEach((bet, index) => {
            const originalBet = bets.find(b => b.uuid === bet.uuid);
            if (originalBet) {
                originalBet.rank = index + 1;
                originalBet.isWinner = index === 0;
                if (originalBet.isWinner) {
                    originalBet.isCancelled = false;
                    originalBet.cancellationReason = null;
                }
            }
        });

        this.bets[auctionUuid] = sortedBets;
    },
};

store.reset();