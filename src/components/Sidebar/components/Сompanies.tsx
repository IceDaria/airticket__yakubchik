import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '.././Sidebar.module.scss';
import { FilterState, setCompany } from '../../../shared/Redusers/filtersReducer';

// Создаём компонент для фильтрации по компаниям
const Companies = () =>  {
    const company = useSelector((state: FilterState) => state.filter.company);
    const dispatch = useDispatch();

// Данные для радио-кнопок с выбором компании
    const companyData = [
        { id: 'all', value: 'all', label: 'Все компании' },
        { id: 'pobeda', value: 'pobeda', label: 'Победа' },
        { id: 'redWings', value: 'redWings', label: 'Red Wings' },
        { id: 'S7', value: 'S7', label: 'S7 Airlines' },
    ];

// Создаём обработчик изменения состояния радио-кнопки
    const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCompany({ value: e.currentTarget.value, selected: true }));
    };

    return (
        <div className={s.wrapper}>
            <div className={s.company}>
                <p className={s.title}>Компании</p>
                <div className={s.radio}>
            {/* Отображаем радио-кнопоки на основе данных из companyData */}
                    {companyData.map(({ id, value, label }) => (
                        <div key={id} className={s.item}>
                            <label className={s.label} htmlFor={id}>
                                <input
                                    className={`${s.circle}`}
                                    name="company"
                                    type="radio"
                                    value={value}
                                    checked={company.value === value}
                                    onChange={handleRadio}
                                    id={id}
                                />
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Companies;