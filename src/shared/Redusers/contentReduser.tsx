import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Connections, Criteria, Ticket } from "../types";
import generateTickets from "../MockData";

export interface TicketState {
  tickets: Ticket[], // Все билеты
  shown: number, // Количество отображаемых билетов
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // статус "получения данных из АПИ"
  error: null | string; 
}

// Имитируем получение данных о билетах из АПИ
export const fetchTickets = createAsyncThunk('ticket/fetchTickets', async () => {
  const tickets = generateTickets();
  return tickets;
});

// Сортировка про критериям, вершняя панель над билетами
const sortTickets = (criteria: Criteria) => {
  return (a: Ticket, b: Ticket) => {
    switch (criteria.value) {
      // самые дешевые билеты
      case 'cheapest':
        return a.price - b.price;
      // самые быстрые билеты
      case 'fastest':
        return a.duration - b.duration;
      // самые оптимальные билеты
      // не могу сказать, что они реально самые оптимальные, выборка на основе моего больного воображения XD...
      case 'optimal':
        const isOptimalTicketA = (
          a.price <= 20000 &&
          a.connectionAmount === 0
        );

        const isOptimalTicketB = (
          b.price <= 20000 &&
          b.connectionAmount === 0
        );

        return isOptimalTicketA ? -1 : isOptimalTicketB ? 1 : a.connectionAmount - b.connectionAmount;
      default:
        return 1;
    }
  };
};

// Фильтрация по кол-ву пересадок и авиакомпании
export const filterTickets = (tickets: Ticket[], connections: Connections[], companyValue: string) => {
  const selectedConnections = connections.filter(connection => connection.selected).map(connection => connection.value);
  
  return tickets
    .filter(ticket =>
      (selectedConnections.length === 0 || selectedConnections.includes(ticket.connectionAmount)) &&
      (companyValue === 'all' || ticket.company === companyValue)
    );
};

const initialState: TicketState = {
  tickets: [],
  status: 'idle',
  error: null,
  shown: 3,
};
  
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    showTickets(state, action) {
      const { criteria } = action.payload;
      state.tickets.sort(sortTickets(criteria));
      state.shown = 3;
    },
    loadMore(state) {
      state.shown += 3;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
        console.log('Received tickets:', action.payload);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export default ticketSlice.reducer;
export const { showTickets, loadMore } = ticketSlice.actions;