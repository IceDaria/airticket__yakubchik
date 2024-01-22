import { Airport, Companies, Ticket, TicketTime } from "./types";
import victoryLogo from '../assets/victory.png';
import redWingsLogo from '../assets/RedWings.png';
import s7Logo from '../assets/S7.png';

// Массив с аэропортами
const airports: Airport[] = [
    {"code": "DME", "name": "Москва (Домодедово)"},
    {"code": "SVO", "name": "Москва (Шереметьево)"},
    {"code": "VKO", "name": "Москва (Внуково)"},
    {"code": "ZIA", "name": "Москва (Жуковский)"},
    {"code": "LED", "name": "Санкт-Петербург (Пулково)"},
    {"code": "UFA", "name": "Уфа (Уфимский)"},
    {"code": "KZN", "name": "Казань (Казанский)"},
    {"code": "AER", "name": "Сочи (Адлер)"},
    {"code": "ROV", "name": "Ростов-на-Дону (Платов)"},
    {"code": "SVX", "name": "Екатеринбург (Кольцово)"},
    {"code": "KRR", "name": "Краснодар (Пашковский)"},
    {"code": "OVB", "name": "Новосибирск (Толмачево)"},
    {"code": "CEK", "name": "Челябинск (Баландино)"},
    {"code": "KJA", "name": "Красноярск (Емельяново)"},
    {"code": "UUD", "name": "Улан-Удэ (Мухино)"},
    {"code": "VVO", "name": "Владивосток (Кневичи)"},
    {"code": "KUF", "name": "Самара (Курумоч)"},
    {"code": "TJM", "name": "Тюмень (Рощино)"},
    {"code": "KGD", "name": "Калининград (Храброво)"},
    {"code": "NJC", "name": "Нижневартовск (Богандинский)"},
    {"code": "AAQ", "name": "Анапа (Витязево)"},
    {"code": "VOG", "name": "Волгоград (Гумрак)"},
    {"code": "GOJ", "name": "Нижний Новгород (Стригино)"},
    {"code": "SGC", "name": "Сургут (Сургут)"},
    {"code": "BQS", "name": "Благовещенск (Игнатьево)"},
    {"code": "MJZ", "name": "Мирный (Мирный)"},
    {"code": "MMK", "name": "Мурманск (Мурманск)"},
    {"code": "NER", "name": "Нерюнгри (Чурапча)"},
    {"code": "IJK", "name": "Ижевск (Плеханово)"},
    {"code": "DYR", "name": "Анадырь (Угольный)"},
    {"code": "YKS", "name": "Якутск (Якутск)"},
    {"code": "BAX", "name": "Барнаул (Герцена)"},
];

// Генерация всех билетов
const generateTickets = (): Ticket[] =>
  Array.from({ length: 30 }, (_, i) => generateTicket(i));
  
  // Генерация отдельного билета
  const generateTicket = (id: number): Ticket => {

    const ticketTime: TicketTime = getTicketTime();
  
    // Формирование билета
    return {
      id: id + 1,
      from: getRandomAirport().code,
      to: getRandomAirport().code,
      company: getRandomCompany(),
      price: getRandomNumber(1000, 100000),
      time: ticketTime,
      duration: getRandomDuration(),
      connectionAmount: getRandomNumber(0, 3),
    };
  };
  
  // Генерация времени вылета и прилета
  const getTicketTime = (): TicketTime => {
    const startTime = getDepartureTime();
    const duration = getRandomDuration();
    const endTime = getLandindTime(startTime, duration);
    
    return {
      startTime: startTime,
      endTime: endTime,
    };
  };
  
  // Получение случайного аэропорта
  const getRandomAirport = (): Airport => airports[Math.floor(Math.random() * airports.length)];
  
  // Генерация случайного времени вылета
  const getDepartureTime = (): string => {
    const hour = getRandomNumber(0, 23).toString().padStart(2, '0');
    const minute = getRandomNumber(0, 59).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  };
  
  // Генерация случайной продолжительности от 1 часа до 24 часов
  const getRandomDuration = (): number => getRandomNumber(60, 24 * 60);
  
  // Расчет времени прилета на основе времени вылета и продолжительности
  const getLandindTime = (startTime: string, duration: number): string => {
    const startHour = Number(startTime.split(':')[0]);
    const startMinute = Number(startTime.split(':')[1]);
  
    const endHour = Math.floor((startHour + duration / 60) % 24);
    const endMinute = Math.floor((startMinute + duration % 60) % 60);
  
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };
  
  // Генерация случайного числа в заданном диапазоне
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const companiesData = [
    { key: 'victory', name: 'Победа', logo: victoryLogo, alt: "Логотип компании Победа" },
    { key: 'redWings', name: 'Red Wings', logo: redWingsLogo, alt: "Логотип компании Red Wings" },
    { key: 'S7', name: 'S7', logo: s7Logo, alt: "Логотип компании S7" },
];

export const companies: { [key: string]: Companies } = Object.fromEntries(
    companiesData.map(company => [company.key, { name: company.name, logo: company.logo, alt: company.alt }])
);
  
  // Генерация случайной авиакомпании
  const getRandomCompany = (): string => {
    const companyNames = Object.keys(companies);
    return companyNames[Math.floor(Math.random() * companyNames.length)];
};

// Функция форматирования времени в пути
export const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedHours = hours > 0 ? `${hours}ч` : '';
    const formattedMinutes = minutes > 0 ? ` ${minutes}м` : '';

    return `${formattedHours}${formattedMinutes}`;
};

// Функция форматирования цены
export const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// Экспорт функции для генерации билетов
export default generateTickets;