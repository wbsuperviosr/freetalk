
export interface Child {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
}

export interface Reference {
    _ref: string;
    _type: string;
}

export interface MarkDef {
    _key: string;
    _type: string;
    reference: Reference;
}

export interface Event {
    _key: string;
    _type: string;
    children: Child[];
    markDefs: MarkDef[];
    style: string;
}

export interface ImageUrl {
    urlField: string;
    url_title: string;
}

export interface Person {
    name: string;
}

export interface SourceUrl {
    urlField: string;
    url_title: string;
}

export interface Timeline {
    date: string;
    event: Event[];
    image_urls: ImageUrl[];
    people: Person[];
    source: string;
    source_urls: SourceUrl[];
    tags: string[];
    time: string;
    title:string;
    type: string;
}

