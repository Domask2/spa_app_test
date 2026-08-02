import { Link } from '@tanstack/react-router';

interface Tab {
	label: string;
	to: string;
	params?: Record<string, string>;
	count?: number;
	isLocked?: boolean;
	isActive: boolean;
}

interface AuctionTabsProps {
	tabs: Tab[];
}

export function AuctionTabs({ tabs }: AuctionTabsProps) {
	return (
		<div className="flex gap-4 border-b pb-3">
			{tabs.map((tab) => (
				<Link
					key={tab.to}
					to={tab.to}
					params={tab.params}
					className={`px-4 py-2 font-medium transition-colors ${
						tab.isActive
							? 'text-blue-600 border-b-2 border-blue-600'
							: 'text-gray-600 hover:text-blue-600'
					}`}
				>
					{tab.label}
					{tab.count !== undefined && !tab.isLocked && ` (${tab.count})`}
					{tab.isLocked && <span className="text-xs text-gray-400 ml-1">🔒</span>}
				</Link>
			))}
		</div>
	);
}