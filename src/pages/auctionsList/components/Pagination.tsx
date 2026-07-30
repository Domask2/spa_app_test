interface PaginationProps {
    hasNext: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
    currentPage: number;
    totalItems: number;
}

export function Pagination({ hasNext, hasPrev, onNext, onPrev, currentPage, totalItems }: PaginationProps) {
    return (
        <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600">Всего: {totalItems}</span>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 cursor-pointer text-lg "
                >
                    ‹
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded text-sm">{currentPage}</span>
                <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 cursor-pointer text-lg"
                >
                    ›
                </button>
            </div>
        </div>
    );
}