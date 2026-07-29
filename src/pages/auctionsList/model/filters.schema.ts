import { z } from 'zod';

export const filtersSchema = z.object({
    cargo_num: z.string().optional(),
    status: z.enum(['draft', 'active', 'closed', 'cancelled', 'completed']).optional(),
    statuses: z.array(z.enum(['draft', 'active', 'closed', 'cancelled', 'completed'])).optional(),
    auc_type: z.enum(['Request', 'Up', 'Down', 'FixPrice']).optional(),
    load_city: z.string().optional(),
    unload_city: z.string().optional(),
    load_date_from: z.string().optional(),
    load_date_to: z.string().optional(),
    is_available: z.boolean().optional(),
    is_bidder: z.boolean().optional(),
    price_from: z.number().optional(),
    price_to: z.number().optional(),
});

export type FilterValues = z.infer<typeof filtersSchema>;