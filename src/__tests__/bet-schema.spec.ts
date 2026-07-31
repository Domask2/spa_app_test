import { describe, it, expect } from 'vitest';
import { betSchema } from "../pages/auctionDetail/model/bet.schema.ts";

describe('betSchema', () => {
	it('валидирует цену > 0', () => {
		const result = betSchema.safeParse({price: 100});
		expect(result.success).toBe(true);
	});

	it('отклоняет цену <= 0', () => {
		const result = betSchema.safeParse({price: -5});
		expect(result.success).toBe(false);
	});
});