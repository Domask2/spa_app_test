import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from '../pages/auctionsList/components/Filters';

describe('Filters', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('рендерит все поля фильтров', () => {
		render(<Filters initialFilters={{}} onChange={mockOnChange} />);

		// Используем getByLabelText после добавления htmlFor/id
		expect(screen.getByLabelText('Номер заявки')).toBeInTheDocument();
		expect(screen.getByLabelText('Статус')).toBeInTheDocument();
		expect(screen.getByLabelText('Тип')).toBeInTheDocument();
		expect(screen.getByLabelText('Город погрузки')).toBeInTheDocument();
		expect(screen.getByLabelText('Город выгрузки')).toBeInTheDocument();
		expect(screen.getByLabelText('Дата от')).toBeInTheDocument();
		expect(screen.getByLabelText('Дата до')).toBeInTheDocument();
		expect(screen.getByLabelText('Цена от')).toBeInTheDocument();
		expect(screen.getByLabelText('Цена до')).toBeInTheDocument();
		expect(screen.getByLabelText('Доступен')).toBeInTheDocument();
		expect(screen.getByLabelText('Участвую')).toBeInTheDocument();
	});

	it('вызывает onChange при изменении текстового поля', () => {
		render(<Filters initialFilters={{}} onChange={mockOnChange} />);
		const input = screen.getByLabelText('Номер заявки');
		fireEvent.change(input, { target: { value: 'CARGO-001' } });
		expect(mockOnChange).toHaveBeenCalledWith({ cargo_num: 'CARGO-001' });
	});

	it('вызывает onChange при изменении селекта', () => {
		render(<Filters initialFilters={{}} onChange={mockOnChange} />);
		const select = screen.getByLabelText('Статус');
		fireEvent.change(select, { target: { value: 'active' } });
		expect(mockOnChange).toHaveBeenCalledWith({ status: 'active' });
	});

	it('сбрасывает фильтры при нажатии кнопки "Сбросить всё"', () => {
		render(<Filters initialFilters={{ cargo_num: 'CARGO-001' }} onChange={mockOnChange} />);
		const resetButton = screen.getByText('Сбросить всё');
		fireEvent.click(resetButton);
		expect(mockOnChange).toHaveBeenCalledWith({});
	});
});