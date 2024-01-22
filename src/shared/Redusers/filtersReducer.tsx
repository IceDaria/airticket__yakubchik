import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, Connections, Criteria } from "../types";

// Функция для генерации массива connections
function generateConnections(): Connections[] {
  return Array.from({ length: 4 }, (_, value) => ({
    value,
    label: `${value === 0 ? 'Без' : value} пересад${value === 1 ? 'ка' : value > 1 ? 'ки' : 'ок'}`,
    selected: false,
  }));
}

// Интерфейс состояния фильтра
export interface FilterState {
  filter: {
    connections: Connections[]; // Количество пересадок
    company: Company; // Авиакомпании
    criteria: Criteria; // Критерии сортировки
  };
}

// Начальное состояние фильтра
const initialState: FilterState['filter'] = {
  connections: generateConnections(),
  company: { value: 'all', selected: true },
  criteria: { value: 'cheapest' },
};

// Создание среза состояния и редукторов для фильтра
const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    // Установка состояния для количества пересадок
    setConnections: (state, action: PayloadAction<{ value: number; selected: boolean }>) => {
      const { value, selected } = action.payload;
      // Создаем копию массива, чтобы не изменять его напрямую
      const updatedConnections = [...state.connections];
      // Обновляем только один элемент в массиве
      updatedConnections[value] = { ...updatedConnections[value], selected };

      // Возвращаем новый объект состояния с обновленным массивом connections и без изменений в company
      return {
        ...state,
        connections: updatedConnections,
        company: { value: state.company.value, selected: state.company.selected },
      };
    },

    // Установка состояния для авиакомпании
    setCompany: (state, action: PayloadAction<Company>) => {
      const { value, selected } = action.payload;

      return {
        ...state,
        company: { value, selected },
      };
    },

    // Установка состояния для критериев сортировки
    setSorting: (state, action: PayloadAction<Criteria>) => ({
      ...state,
      criteria: action.payload,
    }),
  },
});

export default filterSlice.reducer;
export const { setConnections, setCompany, setSorting } = filterSlice.actions;