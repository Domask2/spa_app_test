export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}