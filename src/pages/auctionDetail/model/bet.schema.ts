import { z } from 'zod';

export const betSchema = z.object({
        price: z.number({
        message: 'Введите число',
    })
        .positive('Цена должна быть больше 0')
        .refine((val) => !isNaN(val), { message: 'Цена обязательна' }),
});

export type BetFormValues = z.infer<typeof betSchema>;