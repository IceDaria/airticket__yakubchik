import { companiesData } from "./MockData";
import { Companies } from "./types";

// Функция форматирования времени в пути
export const formatDuration = (duration: number): string => {
    // Рассчитываем часы и минуты из общей продолжительности в минутах
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    // Форматируем результат
    const formattedHours = hours > 0 ? `${hours}ч` : '';
    const formattedMinutes = minutes > 0 ? ` ${minutes}м` : '';

    return `${formattedHours}${formattedMinutes}`;
};

// Функция форматирования цены
export const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');