import s from './Sidebar.module.scss';
import Connections from './components/Connections';
import Companies from './components/Сompanies';


// СОздаём боковую панель с фильтрами
export default function Sidebar() {
    return (
        <div className={s.filters}>
            <Connections />
            <Companies />
        </div>
    )
}