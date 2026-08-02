import { FiltersSkeleton } from "./FiltersSkeleton.tsx";
import { SkeletonCard } from "./SkeletonCard.tsx";

export function AppSkeleton() {
	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-3xl font-bold mb-6">🚛 Грузовые аукционы</h1>
			<div className="animate-pulse">
				<FiltersSkeleton />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			</div>
		</div>
	);
}