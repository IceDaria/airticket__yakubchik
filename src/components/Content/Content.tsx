import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Content.module.scss';
import { FilterState } from '../../shared/Redusers/filtersReducer';
import { TicketState, fetchTickets, filterTickets, loadMore, showTickets } from '../../shared/Redusers/contentReduser';
import { ShowMore } from './components/ShowMore';
import Sidebar from '../Sidebar/Sidebar';
import { Tickets } from './components/Tickets';
import { GlobalSVGSelector } from '../../assets/GlobalSVGSelector';
import { Sorting } from './components/Sorting';
import { useWindowResize } from '../../shared/customHooks';

export const Content = () => {
  const ticketState = useSelector((state: TicketState) => state.tickets);
  const { tickets, shown } = ticketState;
  const { connections, company, criteria } = useSelector((state: FilterState) => state.filter);
  const filteredTickets = Array.isArray(tickets) ? filterTickets(tickets, connections, company.value) : [];

  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Before fetching tickets...');
        await dispatch(fetchTickets() as any);
        console.log('After fetching tickets...');
        dispatch(showTickets({ criteria }));
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
  
    fetchData();
  }, [criteria, dispatch]);

  // Настройки для дропдаум меню в мобильной версии, используем кастомный хук
  const [isMobile] = useWindowResize();

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
              onClick={handleMenuClick}
            >
              Открыть настройки 
              <span className={s.arrow}><GlobalSVGSelector id={isMenuOpen ? 'arrow-up' : 'arrow-down'} /></span>
            </button>
          </div>
          {isMenuOpen && <Sidebar />} 
        </div>
      )}
      {ticketState.status === 'succeeded' && (
      <>
        {filteredTickets.length > 0 ? (
          filteredTickets.slice(0, shown).map((ticket) => (
            <Tickets key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <div>No tickets match the criteria.</div>
        )}
      </>
    )}
      <ShowMore loadMoreHandler={() => dispatch(loadMore())} />
    </div>
  );
}

export default Content;