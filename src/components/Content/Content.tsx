import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Content.module.scss';
import { fetchTickets, filterTickets, loadMore, showTickets } from '../../shared/Redusers/contentReduser';
import Sorting from './components/Sorting';
import Sidebar from '../Sidebar/Sidebar';
import Tickets from './components/Tickets';
import ShowMore from './components/ShowMore';
import { GlobalSVGSelector } from '../../assets/GlobalSVGSelector';
import { useWindowSize } from '../../shared/customHooks';
import { RootState } from '../../store';

// Создаём компонент с основным контентом на странице
const Content = () => {
  const { tickets, shown } = useSelector((state: RootState) => state.tickets);
  const { connections, company, criteria } = useSelector((state: RootState) => state.filter);
  const filteredTickets = Array.isArray(tickets) ? filterTickets(tickets, connections, company.value) : [];

  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTickets() as any);
        dispatch(showTickets({ criteria }));
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
  
    fetchData();
  }, [criteria, dispatch]);

  // Настройки для дропдаум меню в мобильной версии, используем кастомный хук
  const { isMobile } = useWindowSize();

  // Обработчик клика и раскрытия меню в мобильной версии
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={s.content}>
      <Sorting />
      {isMobile && ( 
        <div className={s.mobile_dropdown}>
          <div className={s.menu}>
            <p className={s.text}>Авиакомпании, кол-во пересадок</p>
            <button 
              className={s.dropdown}
              onClick={handleMenuClick}>
              Открыть настройки 
              <span className={s.arrow}><GlobalSVGSelector id={isMenuOpen ? 'arrow-up' : 'arrow-down'} /></span>
            </button>
          </div>
          {isMenuOpen && <Sidebar />} 
        </div>
      )}
      {filteredTickets.slice(0, shown).map((ticket) => (
        <Tickets key={ticket.id} ticket={ticket} />
      ))}
      <ShowMore loadMoreHandler={() => dispatch(loadMore())} />
    </div>
  );
}

export default Content;