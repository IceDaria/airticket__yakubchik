import s from './Header.module.scss';
import logo from '../../assets/logo.svg';

// Создаём компонент с хэддером
export default function Header () {
    return (
        <header className={s.header}>
            <img className={s.logo__svg} src={logo} alt={"Logo"}/>
            <h1 className={s.logo__text}>Поиск авиабилетов</h1>
        </header>
    )
}