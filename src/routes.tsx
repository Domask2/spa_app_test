import { createRouter, createRootRoute, createRoute, Outlet, Link } from '@tanstack/react-router';
import { AuctionsListPage } from "./pages/auctionsList/AuctionsListPage.tsx";
import { AuctionDetailPage } from "./pages/auctionDetail/AuctionDetailPage.tsx";
import { BetsPage } from "./pages/bets/BetsPage.tsx";

const rootRoute = createRootRoute({
	component: () => (
		<div className="container mx-auto px-4 py-6">
			<Link to="/" className="block hover:opacity-80 transition-opacity">
				<h1 className="text-3xl font-bold mb-6">🚛 Грузовые аукционы</h1>
			</Link>
			<Outlet/>
		</div>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: AuctionsListPage,
});

const detailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/auctions/$auctionUuid',
	component: AuctionDetailPage,
});

const betsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/auctions/$auctionUuid/bets',
	component: BetsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, detailRoute, betsRoute]);

export const router = createRouter({routeTree});