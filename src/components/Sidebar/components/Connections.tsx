import { useDispatch, useSelector } from 'react-redux';
import s from '.././Sidebar.module.scss';
import { FilterState, setConnections } from '../../../shared/Redusers/filtersReducer';
import { useWindowSize } from '../../../shared/customHooks';

// Создаём компонент для фильтрации по количеству пересадок
const Connections = () => {
    const connections = useSelector((state: FilterState) => state.filter.connections);
    const dispatch = useDispatch();

    // Данные для чекбоксов с количеством пересадок
    const checkboxData = [
        { id: 'nonStop', value: 0, label: 'Без пересадок' },
        { id: '1Connection', value: 1, label: '1 пересадка' },
        { id: '2Connections', value: 2, label: '2 пересадки' },
        { id: '3Connections', value: 3, label: '3 пересадки' },
    ];

    // Обработчик изменения состояния чекбокса
    const handleCheckbox = (value: number, selected: boolean) => {
        dispatch(setConnections({ value, selected }));
    };

    // Используем кастомный хук для определения расширения
    const  { isMobile} = useWindowSize();

    return (
        <div className={s.wrapper}>
            <div className={s.transfer}>
                <p className={s.title}>{isMobile ? 'Кол-во пересадок' : 'Количество пересадок'}</p>
                <div className={s.checkbox}>
                    {/* Отображение чекбоксов на основе данных из checkboxData */}
                    {checkboxData.map(({ id, value, label }) => (
                        <div key={id} className={s.item}>
                            <label className={s.label} htmlFor={id}>
                                <input
                                    className={s.check}
                                    type="checkbox"
                                    value={value}
                                    checked={connections[value].selected}
                                    onChange={(e) => handleCheckbox(value, e.currentTarget.checked)}
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

export default Connections;