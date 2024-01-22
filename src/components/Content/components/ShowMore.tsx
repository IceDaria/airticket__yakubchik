import s from '../Content.module.scss';

// Передаём данные для кнопки через пробсы
interface ShowMoreProps {
    loadMoreHandler: () => void;
  }

// Создаём кнопочку "загрузить ещё"
const ShowMore: React.FC<ShowMoreProps> = ({ loadMoreHandler }) => {

    function handleClick() {
        loadMoreHandler();
    }

    return (
     <button className={s.showMore} onClick={handleClick}>Загрузить ещё билеты</button>
    );
}

export default ShowMore;
