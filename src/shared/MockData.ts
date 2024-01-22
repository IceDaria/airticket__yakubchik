import { Airports, Companies, Ticket } from "./types";
import victoryLogo from '../assets/victory.png';
import redWingsLogo from '../assets/RedWings.png';
import s7Logo from '../assets/S7.png';

// Массив с аэропортами
const airports: Airports[] = [
  {"code": "DME"},
  {"code": "SVO"},
  {"code": "VKO"},
  {"code": "ZIA"},
  {"code": "LED"},
  {"code": "UFA"},
  {"code": "KZN"},
  {"code": "AER"},
  {"code": "ROV"},
  {"code": "SVX"},
  {"code": "KRR"},
  {"code": "OVB"},
  {"code": "CEK"},
  {"code": "KJA"},
  {"code": "UUD"},
  {"code": "VVO"},
  {"code": "KUF"},
  {"code": "TJM"},
  {"code": "KGD"},
  {"code": "NJC"},
  {"code": "AAQ"},
  {"code": "VOG"},
  {"code": "GOJ"},
  {"code": "SGC"},
  {"code": "BQS"},
  {"code": "MJZ"},
  {"code": "MMK"},
  {"code": "NER"},
  {"code": "IJK"},
  {"code": "DYR"},
  {"code": "YKS"},
  {"code": "BAX"},
];

// Генерация всех билетов
const generateTickets = (): Ticket[] =>
  Array.from({ length: 30 }, (_, i) => generateTicket(i));
  
  // Генерация отдельного билета
const generateTicket = (id: number): Ticket => {
  const startTime = getDepartureTime();
  const duration = getRandomDuration();
  const endTime = getLandindTime(startTime, duration);

  // Формирование билета
  return {
    id: id + 1,
    from: getRandomAirport().code,
    to: getRandomAirport().code,
    company: getRandomCompany(),
    price: getRandomNumber(1500, 100000),
    startTime,
    endTime,
    duration,
    connectionAmount: getRandomNumber(0, 3),
  };
};
  
  // Получение случайного аэропорта
const getRandomAirport = (): Airports => airports[Math.floor(Math.random() * airports.length)];
  
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
  
  // Генерация случайного числа для цены билета и количеста пересадок
const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

  // Массив данных об авиакомпаниях
export const companiesData = [
  { key: 'pobeda', name: 'Победа', logo: victoryLogo, alt: "Логотип компании Победа" },
  { key: 'redWings', name: 'Red Wings', logo: redWingsLogo, alt: "Логотип компании Red Wings" },
  { key: 'S7', name: 'S7', logo: s7Logo, alt: "Логотип компании S7" },
];

// Создаем объект компаний из данных, полученных из MockData
export const companies: { [key: string]: Companies } = Object.fromEntries(
  companiesData.map(company => [company.key, { name: company.name, logo: company.logo, alt: company.alt }])
);
  
  // Генерация случайной авиакомпании
const getRandomCompany = (): string => {
  const companyNames = Object.keys(companies);
  return companyNames[Math.floor(Math.random() * companyNames.length)];
};

// Экспорт функции для генерации билетов
export default generateTickets;