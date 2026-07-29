import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import {AuctionsListPage} from "./pages/auctions/list/AuctionsListPage.tsx";
import {AuctionDetailPage} from "./pages/auctions/detail/AuctionDetailPage.tsx";

const rootRoute = createRootRoute({
    component: () => (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">🚛 Грузовые аукционы</h1>
            <Outlet />
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

const routeTree = rootRoute.addChildren([indexRoute, detailRoute]);

export const router = createRouter({ routeTree });