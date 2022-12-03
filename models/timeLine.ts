
export interface Event {
    time: string;
    event: string;
    people: string[];
}

export interface Detail {
    date: string;
    events: Event[];
    order: number;
}

export interface Timeline {
    category: string;
    details: Detail[];
}


