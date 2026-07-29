import { describe, it, expect } from 'vitest';
import {filtersSchema} from "../pages/auctionsList/model/filters.schema.ts";

describe('filtersSchema', () => {
    it('валидирует корректные данные', () => {
        const data = { cargo_num: 'CARGO-001', price_from: 1000 };
        const result = filtersSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    it('возвращает fallback для невалидных полей', () => {
        const data = { status: 'invalid' };
        const result = filtersSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});