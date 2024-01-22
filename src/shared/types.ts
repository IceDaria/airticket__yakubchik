export interface TicketTime {
    startTime: string;
    endTime: string;
};

export interface Ticket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    time: TicketTime;
    duration: number;
    connectionAmount: number;
};

export interface Airport {
    code: string;
    name: string;
  };

export interface Companies {
    name: string; 
    logo: string;
    alt: string;
}

export interface Criteria {
    // Критерии сортировки
    value: string,
}

export interface Connections {
    // Количество пересадок
    value: number,
    label: string,
    selected: boolean,
}

export interface Company {
    // Компания
    value: string,
    selected: boolean,
}

