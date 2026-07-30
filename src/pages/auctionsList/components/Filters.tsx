import { useState, useEffect } from 'react';
import { type FilterValues } from '../model/filters.schema';
import { Input } from '../../../shared/ui/Input';
import {Button} from "../../../shared/ui/Button.tsx";

const cityOptions = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород'];
const statusOptions = ['draft', 'active', 'closed', 'cancelled', 'completed'];
const typeOptions = ['Request', 'Up', 'Down', 'FixPrice'];

interface FiltersProps {
    initialFilters: FilterValues;
    onChange: (filters: FilterValues) => void;
}

export function Filters({ initialFilters, onChange }: FiltersProps) {
    const [filters, setFilters] = useState<FilterValues>(initialFilters);
    const [errors, setErrors] = useState<{ price_from?: string; price_to?: string }>({});

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const validatePrice = (value: number | undefined): string | undefined => {
        if (value === undefined) return undefined;
        if (value < 0) return 'Цена не может быть отрицательной';
        if (value > 10_000_000_000) return 'Цена слишком большая (макс. 10 000 000 000)';
        return undefined;
    };

    // Проверка, что price_from <= price_to
    const validatePriceRange = (from?: number, to?: number): string | undefined => {
        if (from !== undefined && to !== undefined && from > to) {
            return 'Цена "от" не может быть больше цены "до"';
        }
        return undefined;
    };

    const handleFieldChange = <K extends keyof FilterValues>(field: K, value: FilterValues[K]) => {
        const newValue = value === '' ? undefined : value;
        const newFilters = { ...filters, [field]: newValue };
        setFilters(newFilters);

        // Для ценовых полей выполняем валидацию
        if (field === 'price_from' || field === 'price_to') {
            const numValue = newValue as number | undefined;
            const fieldError = validatePrice(numValue);
            const rangeError = validatePriceRange(
                field === 'price_from' ? numValue : filters.price_from,
                field === 'price_to' ? numValue : filters.price_to
            );
            setErrors({
                price_from: field === 'price_from' ? fieldError || rangeError : undefined,
                price_to: field === 'price_to' ? fieldError || rangeError : undefined,
            });
            // Если есть ошибки, не применяем фильтр
            if (fieldError || rangeError) {
                return;
            }
        }

        // Если ошибок нет, применяем фильтр
        onChange(newFilters);
    };

    const handleCheckboxChange = (field: keyof FilterValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked || undefined;
        handleFieldChange(field, checked);
    };

    const handleSelectChange = (field: keyof FilterValues) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value || undefined;
        handleFieldChange(field, value);
    };

    const handleInputChange = (field: keyof FilterValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        if (field === 'price_from' || field === 'price_to') {
            const numValue = rawValue === '' ? undefined : Number(rawValue);
            const finalValue = numValue !== undefined && !isNaN(numValue) ? numValue : undefined;
            handleFieldChange(field, finalValue as FilterValues[typeof field]);
        } else {
            const value = rawValue || undefined;
            handleFieldChange(field, value as FilterValues[typeof field]);
        }
    };

    const resetFilters = () => {
        const emptyFilters: FilterValues = {};
        setFilters(emptyFilters);
        onChange(emptyFilters);
    };

    return (
        <div className="bg-white p-3 rounded shadow-sm space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Номер заявки */}
                <Input
                    label="Номер заявки"
                    value={filters.cargo_num || ''}
                    onChange={handleInputChange('cargo_num')}
                    className="text-sm py-1 px-2 h-8"
                />

                {/* Статус */}
                <div>
                    <label className="block text-sm font-medium">Статус</label>
                    <select
                        value={filters.status || ''}
                        onChange={handleSelectChange('status')}
                        className="w-full border rounded text-sm py-1 px-2 h-8 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                    >
                        <option value="">Все статусы</option>
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Тип аукциона */}
                <div>
                    <label className="block text-sm font-medium">Тип</label>
                    <select
                        value={filters.auc_type || ''}
                        onChange={handleSelectChange('auc_type')}
                        className="w-full border rounded text-sm py-1 px-2 h-8 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                    >
                        <option value="">Все типы</option>
                        {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                {/* Город погрузки */}
                <div>
                    <label className="block text-sm font-medium">Город погрузки</label>
                    <select
                        value={filters.load_city || ''}
                        onChange={handleSelectChange('load_city')}
                        className="w-full border rounded text-sm py-1 px-2 h-8 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                    >
                        <option value="">Все города</option>
                        {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Дата погрузки от */}
                <Input
                    label="Дата от"
                    type="date"
                    value={filters.load_date_from || ''}
                    onChange={handleInputChange('load_date_from')}
                    className="text-sm py-1 px-2 h-8"
                />

                {/* Дата погрузки до */}
                <Input
                    label="Дата до"
                    type="date"
                    value={filters.load_date_to || ''}
                    onChange={handleInputChange('load_date_to')}
                    className="text-sm py-1 px-2 h-8"
                />

                {/* Город выгрузки */}
                <div>
                    <label className="block text-sm font-medium">Город выгрузки</label>
                    <select
                        value={filters.unload_city || ''}
                        onChange={handleSelectChange('unload_city')}
                        className="w-full border rounded text-sm py-1 px-2 h-8 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                    >
                        <option value="">Все города</option>
                        {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Цена от */}
                <div>
                    <label className="block text-sm font-medium">Цена от</label>
                    <input
                        type="number"
                        value={filters.price_from ?? ''}
                        onChange={handleInputChange('price_from')}
                        className={`w-full border rounded text-sm px-2 h-8 mt-1 focus:outline-none focus:ring-1 ${
                            errors.price_from ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                        }`}
                    />
                    {errors.price_from && (
                        <p className="text-red-500 text-xs mt-1">{errors.price_from}</p>
                    )}
                </div>

                {/* Цена до */}
                <div>
                    <label className="block text-sm font-medium">Цена до</label>
                    <input
                        type="number"
                        value={filters.price_to ?? ''}
                        onChange={handleInputChange('price_to')}
                        className={`w-full border rounded text-sm px-2 h-8 mt-1 focus:outline-none focus:ring-1 ${
                            errors.price_to ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                        }`}
                    />
                    {errors.price_to && (
                        <p className="text-red-500 text-xs mt-1">{errors.price_to}</p>
                    )}
                </div>

                {/* Доступен */}
                <div className="flex items-center space-x-2 pt-1">
                    <input
                        type="checkbox"
                        checked={!!filters.is_available}
                        onChange={handleCheckboxChange('is_available')}
                        className="h-4 w-4"
                    />
                    <label className="text-sm">Доступен</label>
                </div>

                {/* Участвую */}
                <div className="flex items-center space-x-2 pt-1">
                    <input
                        type="checkbox"
                        checked={!!filters.is_bidder}
                        onChange={handleCheckboxChange('is_bidder')}
                        className="h-4 w-4"
                    />
                    <label className="text-sm">Участвую</label>
                </div>
            </div>

            {/* Кнопка сброса */}
            <div className="flex justify-end">
                <Button type="button" variant="secondary" onClick={resetFilters} className="text-sm py-1 px-3">
                    Сбросить всё
                </Button>
            </div>
        </div>
    );
}