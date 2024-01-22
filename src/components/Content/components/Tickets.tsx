import { Ticket } from "../../../shared/types";
import s from '../Content.module.scss';
import { formatDuration, formatPrice } from "../../../shared/utils";
import { companies } from "../../../shared/MockData";

interface Tickets {
    ticket: Ticket;
}

// Создаём компонент с билетиком
const Tickets: React.FC<Tickets> = ({ ticket }) => {
    const { price, company, from, to, startTime, endTime, duration, connectionAmount } = ticket;
    const companyLogo = companies[company].logo;
    const companyAlt = companies[company].alt;

    return (
        <div className={s.ticket}>
            <div className={s.top_content}>
                <div className={s.price}>{formatPrice(price)} руб.</div>
                <img className={s.logo} src={companyLogo} alt={companyAlt} />
            </div>

            <div className={s.bottom_content}>
                <div className={s.wrapper}>
                    <div className={s.title}>{from} - {to}</div>
                    <div className={s.content}>{startTime} - {endTime}</div>
                </div>

                <div className={s.wrapper}>
                    <div className={s.title}>В пути:</div>
                    <div className={s.content}>{formatDuration(duration)}</div>
                </div>

                <div className={s.wrapper}>
                    <div className={s.title}>Пересадки:</div>
                    <div className={s.content}>
                        {connectionAmount === 0
                            ? "Без пересадок"
                            : `${connectionAmount} ${connectionAmount === 1 ? "пересадка" : "пересадки"}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tickets;