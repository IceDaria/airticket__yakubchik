import s from './Header.module.scss';
import logo from '../../assets/logo.svg';

// Создаём компонент с хэддером
const Header  = () => {
    return (
        <header className={s.header}>
            <img className={s.logo__svg} src={logo} alt={"Logo"}/>
            <h1 className={s.logo__text}>Поиск авиабилетов</h1>
        </header>
    )
}

export default Header;