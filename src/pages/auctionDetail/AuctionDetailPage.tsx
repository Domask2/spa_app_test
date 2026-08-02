import { useParams } from '@tanstack/react-router';
import { PlaceBetForm } from "./components/PlaceBetForm.tsx";
import { useAuctionDetail } from "../../features/auction/api/useAuctionDetail.ts";
import { AuctionInfo } from "./components/AuctionInfo.tsx";
import { DetailSkeleton } from "./components/DetailSkeleton.tsx";
import { BackButton } from "../../shared/ui/BackButton.tsx";
import { AuctionTabs } from "../../shared/ui/AuctionTabs.tsx";

export function AuctionDetailPage() {
	const {auctionUuid} = useParams({from: '/auctions/$auctionUuid'});
	const {data: auction, isLoading, isError, refetch} = useAuctionDetail(auctionUuid);

	if (isLoading) return <DetailSkeleton/>;

	if (isError || !auction) {
		return (
			<div className="text-center py-10">
				<p className="text-red-500">Не удалось загрузить аукцион</p>
				<button onClick={() => refetch()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
					Повторить
				</button>
			</div>
		);
	}

	const {
		hideBetsHistory,
		canSetBet,
		hidePointsAddressAndContacts,
		noViewCargoPrice,
		betsCount,
		status,
	} = auction;

	const canPlaceBet = canSetBet && status === 'active';
	const isClosedOrCancelled = status === 'closed' || status === 'cancelled';
	const showBetsHistory = !hideBetsHistory;

	return (
		<div className="space-y-6">

			<div className="flex items-center gap-4">
				<BackButton />

				<span className="text-sm text-gray-500">
          			Аукцион #{auction.cargoNum}
        		</span>

				{canPlaceBet && (
					<span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-auto">
            	 		Можно делать ставку
          			</span>
				)}

				{isClosedOrCancelled && (
					<span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full ml-auto">
            			{status === 'closed' ? 'Аукцион завершён' : 'Аукцион отменён'}
          			</span>
				)}
			</div>

			<AuctionTabs
				tabs={[
					{
						label: 'Информация об аукционе',
						to: '/auctions/$auctionUuid',
						params: { auctionUuid },
						isActive: true,
					},
					{
						label: 'Ставки',
						to: '/auctions/$auctionUuid/bets',
						params: { auctionUuid },
						count: showBetsHistory ? betsCount : undefined,
						isLocked: !showBetsHistory,
						isActive: false,
					},
				]}
			/>

			{/* Основная информация */}
			<AuctionInfo
				auction={auction}
				hidePointsAddressAndContacts={hidePointsAddressAndContacts}
				noViewCargoPrice={noViewCargoPrice}
			/>

			{/* Форма ставки - доступна только если canPlaceBet === true */}
			{canPlaceBet ? (
				<div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
					<PlaceBetForm
						auctionUuid={auctionUuid}
						minPrice={auction.minPrice}
						maxPrice={auction.maxPrice}
						step={auction.betStep}
						currentPrice={auction.currentPrice}
					/>
				</div>
			) : isClosedOrCancelled ? (
				<div className="bg-white p-6 rounded shadow text-center">
					<div className="text-gray-500">
						<svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor"
							 viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
								  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
						</svg>
						<p className="text-lg font-medium">
							{status === 'closed' ? 'Аукцион завершён' : 'Аукцион отменён'}
						</p>
						<p className="text-sm mt-1">
							{status === 'closed' ? 'Торги по этому аукциону уже завершены' : 'Аукцион был отменён организатором'}
						</p>
						{!hideBetsHistory && (
							<p className="text-sm text-blue-600 mt-2">
								История ставок доступна для просмотра
							</p>
						)}
					</div>
				</div>
			) : (
				<div className="bg-white p-6 rounded shadow text-center">
					<div className="text-gray-500">
						<svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor"
							 viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
								  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
						</svg>
						<p className="text-lg font-medium">Вы не можете сделать ставку</p>
						<p className="text-sm mt-1">Ставки на этот аукцион закрыты</p>
					</div>
				</div>
			)}
		</div>
	);
}