import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Connections, Criteria, Ticket } from "../types";
import generateTickets from "../MockData";

export interface TicketState {
    tickets: {
        tickets: Ticket[], // Все билеты
        shown: number, // Количество отображаемых билетов
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: null | string; 
    }
}

export const fetchTickets = createAsyncThunk('ticket/fetchTickets', async () => {
    const tickets = generateTickets();
    return tickets;
  });

// Сортировка про критериям, вершняя панель над билетами
const sortTickets = (criteria: Criteria) => {
  return (a: Ticket, b: Ticket) => {
    switch (criteria.value) {
        case 'cheapest':
            return a.price - b.price;
        case 'fastest':
            return a.duration - b.duration;
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
    tickets: {
      tickets: [],
      status: 'idle',
      error: null,
      shown: 3,
    },
  };
  
  const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
      showTickets(state, action) {
        const { criteria } = action.payload;
        state.tickets.tickets.sort(sortTickets(criteria));
        state.tickets.shown = 3;
      },
      loadMore(state) {
        state.tickets.shown += 3;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTickets.pending, (state) => {
          state.tickets.status = 'loading';
        })
        .addCase(fetchTickets.fulfilled, (state, action) => {
            state.tickets.status = 'succeeded';
            state.tickets.tickets = action.payload as Ticket[];
            console.log('Received tickets:', action.payload);
          })
        .addCase(fetchTickets.rejected, (state, action) => {
          state.tickets.status = 'failed';
          state.tickets.error = action.error.message !== undefined ? action.error.message : null;
        });
    },
  });

export default ticketSlice.reducer;
export const { showTickets, loadMore } = ticketSlice.actions;