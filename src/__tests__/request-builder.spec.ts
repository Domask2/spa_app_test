import { describe, it, expect, vi } from 'vitest';
import { requestBuilder } from '../shared/lib/request-builder';


describe('requestBuilder', () => {
	it('выполняет GET запрос', async () => {
		const mockResponse = {
			ok: true,
			json: async () => ({data: 'test'}),
		} as Response;

		// Мокаем глобальный fetch через spy
		const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse);

		await requestBuilder('/test');

		expect(fetchSpy).toHaveBeenCalledWith(
			expect.stringContaining('/test'),
			expect.objectContaining({method: 'GET'})
		);

		// Восстанавливаем оригинальный fetch
		fetchSpy.mockRestore();
	});
});