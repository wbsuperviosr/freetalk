
type Nullable<T> = T | null;

export interface Author {
    imageUrl: string;
    name: string;
}

export interface Slug {
    _type: string;
    current: string;
}

export interface Post {
    _createdAt: string;
    _id: string;
    _upstringdAt: string;
    author: Author;
    category?: Category;
    subcategory?:Subcategory
    description: string;
    featured?: boolean;
    mainImageUrl: string;
    publishedAt?: any;
    slug: Slug;
    tags: string[];
    title: string;
    writtenAt?: string;
    body?: any;
}


export interface Slug {
    _type: string;
    current: string;
}


export interface Subcategory {
    _id: string
    slug: Slug;
    order: Nullable<number>;
    title: string;
}

export interface Category {
    _id: string;
    slug: Slug;
    subcategory: Subcategory[];
    title: string;
}