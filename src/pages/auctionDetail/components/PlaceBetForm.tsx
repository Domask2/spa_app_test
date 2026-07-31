import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {type BetFormValues, betSchema} from '../model/bet.schema';
import {usePlaceBet} from "../../../features/auction/api/usePlaceBet.ts";
import {Input} from "../../../shared/ui/Input.tsx";
import {Button} from "../../../shared/ui/Button.tsx";
import {formatCurrency} from "../../../shared/lib/formatters.ts";

interface PlaceBetFormProps {
    auctionUuid: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    step?: number;
    currentPrice: number;
}

export function PlaceBetForm({ auctionUuid, minPrice, maxPrice, step, currentPrice }: PlaceBetFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<BetFormValues>({
        resolver: zodResolver(betSchema),
        defaultValues: { price: currentPrice + (step || 0) },
    });

    const { mutate, isPending } = usePlaceBet(auctionUuid);
    const price = watch('price');

    const onSubmit = (data: BetFormValues) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <h3 className="font-semibold text-lg">Сделать ставку</h3>
            <div>
                <label className="block text-sm font-medium">Цена ставки (₽)</label>
                <Input
                    type="number"
                    step={step || 1}
                    {...register('price', { valueAsNumber: true })}
                    className="mt-1"
                    error={errors.price?.message}
                />
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                    {minPrice && <div>Минимум: {formatCurrency(minPrice)} ₽</div>}
                    {maxPrice && <div>Максимум: {formatCurrency(maxPrice)} ₽</div>}
                    {step && <div>Шаг: {formatCurrency(step)} ₽</div>}
                    <div>Текущая цена: {formatCurrency(currentPrice)} ₽</div>
                </div>
                {price && step && price % step !== 0 && (
                    <div className="text-xs text-yellow-600 mt-1">Цена должна быть кратна шагу</div>
                )}
            </div>
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                {isPending ? 'Отправка...' : 'Сделать ставку'}
            </Button>
        </form>
    );
}