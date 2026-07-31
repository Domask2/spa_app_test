import { z } from 'zod';

export const filtersSchema = z.object({
    cargo_num: z.string().optional(),
    status: z.enum(['active', 'closed', 'cancelled']).optional(),
    statuses: z.array(z.enum(['draft', 'active', 'closed', 'cancelled', 'completed'])).optional(),
    auc_type: z.enum(['Request', 'Up', 'Down', 'FixPrice']).optional(),
    load_city: z.string().optional(),
    unload_city: z.string().optional(),
    load_date_from: z.string().optional(),
    load_date_to: z.string().optional(),
    is_available: z.boolean().optional(),
    is_bidder: z.boolean().optional(),
    price_from: z.preprocess(
        (val) => (val === '' || val === undefined ? undefined : Number(val)),
        z
            .number()
            .min(0, 'Цена не может быть отрицательной')
            .max(10_000_000_000, 'Цена слишком большая')
            .optional()
    ),
    price_to: z.preprocess(
        (val) => (val === '' || val === undefined ? undefined : Number(val)),
        z
            .number()
            .min(0, 'Цена не может быть отрицательной')
            .max(10_000_000_000, 'Цена слишком большая')
            .optional()
    ),
})
    .refine(
        (data) => {
            if (data.price_from !== undefined && data.price_to !== undefined) {
                return data.price_from <= data.price_to;
            }
            return true;
        },
        {
            message: 'Цена "от" не может быть больше цены "до"',
            path: ['price_from'],
        }
    );

export type FilterValues = z.infer<typeof filtersSchema>;