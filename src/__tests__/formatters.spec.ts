import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from "../shared/lib/formatters.ts";

describe('formatters', () => {
	describe('formatCurrency', () => {
		it('форматирует число в рубли', () => {
			expect(formatCurrency(12345.6)).toBe('12 345,6');
			expect(formatCurrency(1000)).toBe('1 000');
			expect(formatCurrency(0)).toBe('0');
		});
	});

	describe('formatDate', () => {
		it('форматирует дату в ДД.ММ.ГГГГ', () => {
			const date = '2026-08-02T10:00:00Z';
			// Результат зависит от локальной временной зоны, поэтому проверяем только структуру
			const formatted = formatDate(date);
			expect(formatted).toMatch(/\d{2}\.\d{2}\.\d{4}/);
		});
	});
});