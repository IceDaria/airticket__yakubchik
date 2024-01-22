import { Ticket } from "../../../shared/types";
import s from '../Content.module.scss';
import { companies, formatDuration, formatPrice } from "../../../shared/MockData";

interface Tickets {
    ticket: Ticket;
}

// Создаём компонент с билетиком
export const Tickets = (props: Tickets) => {

    const {ticket} = props;
    console.log('Ticket:', ticket);

    return (
        <div className={s.ticket}>
            <div className={s.top_content}>
                <div className={s.price}>{formatPrice(ticket.price)} руб.</div>
                <img 
                className={s.logo}
                src={companies[ticket.company].logo}
                alt={companies[ticket.company].alt}/>
            </div>

            <div className={s.bottom_content}>
                <div className={s.wrapper}>
                    <div className={s.title}>{ticket.from} - {ticket.to}</div>
                    <div className={s.content}>{ticket.time.startTime} - {ticket.time.endTime}</div>
                </div>

                <div className={s.wrapper}>
                    <div className={s.title}>В пути:</div>
                    <div className={s.content}>{formatDuration(ticket.duration)}</div>
                </div>

                <div className={s.wrapper}>
                    <div className={s.title}>Пересадки:</div>
                    {
                        ticket.connectionAmount === 0 ?
                    <div className={s.content}>Без пересадок</div> :
                    <div className={s.content}>{ticket.connectionAmount} {ticket.connectionAmount === 1 ? "пересадка" : "пересадки"}</div>
                    }
                </div>
            </div>
        </div>
    )
}