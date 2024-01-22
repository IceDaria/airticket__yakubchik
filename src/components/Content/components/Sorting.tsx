import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '../Content.module.scss';
import { FilterState, setSorting } from '../../../shared/Redusers/filtersReducer';

// Создаём верхнюю плашку с сортировкой билетов
const Sorting = () => {
    const criteria = useSelector((state: FilterState) => state.filter.criteria);
    const dispatch = useDispatch();

// Данные для опций сортировки
    const sortingOptions = [
        { id: 'cheapest', value: 'cheapest', label: 'Самый дешевый' },
        { id: 'fastest', value: 'fastest', label: 'Самый быстрый' },
        { id: 'optimal', value: 'optimal', label: 'Самый оптимальный' },
    ];

// Обработчик изменения критерия сортировки
    const handleClick = (value: string) => {
        dispatch(setSorting({ value }));
    };

    return (
        <div className={s.sorting}>
    {/* Отображение опций сортировки на основе данных из sortingOptions */}
            {sortingOptions.map(option => (
                <React.Fragment key={option.id}>
            {/* Радио-кнопка с соответствующими параметрами */}
                    <input
                        className={s.input}
                        type="radio"
                        name={'criteria'}
                        value={option.value}
                        id={option.id}
                        onChange={() => handleClick(option.value)}
                        checked={criteria.value === option.value}
                    />
                    <label htmlFor={option.id} className={s.item}>{option.label}</label>
                </React.Fragment>
            ))}
        </div>
    );
}

export default Sorting