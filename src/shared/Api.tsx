import generateTickets from "./MockData";
import { Ticket } from "./types";

// Имитируем API запрос
const fakeApiRequest = async (): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tickets = generateTickets();
      resolve(tickets);
    }, 1000); // Имитируем задержку в 1 секунду
  });
};

export default fakeApiRequest;