import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuctionCard } from "../pages/auctionsList/components/AuctionCard.tsx";
import type { Auction } from "../features/auction/types";

vi.mock('@tanstack/react-router', async () => {
	const actual = await vi.importActual('@tanstack/react-router');
	return {
		...actual,
		Link: ({ children, to, className, onClick, ...props }: any) => (
			<a href={to} className={className} onClick={onClick} {...props}>
				{children}
			</a>
		),
	};
});

const mockAuction: Auction = {
	uuid: '123',
	cargoNum: 'CARGO-001',
	type: 'Request',
	status: 'active',
	route: {
		load: { city: 'Москва', address: 'ул. Тверская', date: '2026-08-02T10:00:00Z' },
		unload: { city: 'Санкт-Петербург', address: 'Невский пр.', date: '2026-08-05T10:00:00Z' },
	},
	cargo: {
		name: 'Груз',
		weight: 1000,
		volume: 50,
		bodyType: 'Тент',
	},
	currentPrice: 100000,
	pricePerKm: 100,
	betStep: 1000,
	minPrice: 50000,
	maxPrice: 200000,
	isAvailable: true,
	isBidder: false,
	tradingStatus: null,
	myBetExists: false,
	organizer: { name: 'Организатор', phone: '123', email: 'test@test.com' },
	paymentTerms: 'Предоплата 50%',
	canSetBet: true,
	hideBetsHistory: false,
	hidePointsAddressAndContacts: false,
	noViewCargoPrice: false,
	betsCount: 0,
	createdAt: '2026-08-01T10:00:00Z',
	updatedAt: '2026-08-02T10:00:00Z',
};

describe('AuctionCard', () => {
	it('отображает номер и статус', () => {
		render(<AuctionCard auction={mockAuction} />);
		expect(screen.getByText('CARGO-001')).toBeInTheDocument();
		expect(screen.getByText('active')).toBeInTheDocument();
	});

	it('отображает маршрут', () => {
		render(<AuctionCard auction={mockAuction} />);
		expect(screen.getByText(/Москва → Санкт-Петербург/)).toBeInTheDocument();
	});

	it('отображает цену', () => {
		render(<AuctionCard auction={mockAuction} />);
		expect(screen.getByText('100 000 ₽')).toBeInTheDocument();
	});

	it('показывает индикатор "Можно делать ставку"', () => {
		render(<AuctionCard auction={mockAuction} />);
		expect(screen.getByText('Можно делать ставку')).toBeInTheDocument();
	});

	it('показывает индикатор "Ваша ставка", если myBetExists=true', () => {
		const auctionWithBet = { ...mockAuction, myBetExists: true };
		render(<AuctionCard auction={auctionWithBet} />);
		expect(screen.getByText('✓ Ваша ставка')).toBeInTheDocument();
	});

	it('кнопка имеет правильный текст для активного аукциона без ставки', () => {
		render(<AuctionCard auction={mockAuction} />);
		const button = screen.getByRole('link', { name: 'Сделать ставку' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('href', '/auctions/123');
	});

	it('кнопка имеет текст "Изменить ставку" если myBetExists=true', () => {
		const auctionWithBet = { ...mockAuction, myBetExists: true };
		render(<AuctionCard auction={auctionWithBet} />);
		expect(screen.getByRole('link', { name: 'Изменить ставку' })).toBeInTheDocument();
	});
});