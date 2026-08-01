import { useState } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { filtersSchema, type FilterValues } from './model/filters.schema';
import { Filters } from './components/Filters';
import { AuctionCard } from './components/AuctionCard';
import { Pagination } from './components/Pagination';
import { useAuctionList } from "../../features/auction/api/useAuctionList.ts";
import { AuctionsListSkeleton } from "./components/AuctionsListSkeleton.tsx";


export function AuctionsListPage() {
	const search = useSearch({from: '/'}) as Partial<FilterValues>;
	const navigate = useNavigate();
	const [cursors, setCursors] = useState<string[]>([]);

	const parsed = filtersSchema.safeParse(search);
	const filters = parsed.success ? parsed.data : {};

	const currentCursor = cursors.length > 0 ? cursors[cursors.length - 1] : undefined;
	const filtersReady = Object.keys(filters).length > 0 || Object.keys(search).length === 0;

	const {data, isLoading, isError, refetch} = useAuctionList(filters, currentCursor, {
		enabled: filtersReady,
	});

	const {items, total, nextCursor} = data || {items: [], total: 0, nextCursor: null};

	const currentPage = cursors.length + 1;
	const hasNext = !!nextCursor;
	const hasPrev = cursors.length > 0;

	const handleFilterChange = (newFilters: FilterValues) => {
		navigate({
			to: '/',
			search: newFilters,
			replace: true,
		});
		setCursors([]);
	};

	const handleNext = () => {
		if (data?.nextCursor) {
			setCursors([...cursors, data.nextCursor]);
		}
	};

	const handlePrev = () => {
		if (cursors.length > 0) {
			const newCursors = [...cursors];
			newCursors.pop();
			setCursors(newCursors);
		}
	};

	if (isLoading && !data) {
		return <AuctionsListSkeleton />;
	}

	if (isError) {
		return (
			<div className="text-center py-10">
				<p className="text-red-500">Ошибка загрузки списка аукционов</p>
				<button onClick={() => refetch()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
					Повторить
				</button>
			</div>
		);
	}

	return (
		<div>
			<Filters
				initialFilters={filters}
				onChange={handleFilterChange}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-stretch">
				{items.map((auction) => (
					<AuctionCard key={auction.uuid} auction={auction}/>
				))}
			</div>

			{items.length === 0 && (
				<div className="text-center py-10 text-gray-500">Нет аукционов, соответствующих фильтрам</div>
			)}

			<Pagination
				hasNext={hasNext}
				hasPrev={hasPrev}
				onNext={handleNext}
				onPrev={handlePrev}
				currentPage={currentPage}
				totalItems={total}
			/>
		</div>
	);
}