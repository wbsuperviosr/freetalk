export interface Author {
	_ref: string;
	_type: string;
	name: string;
}

export interface Child {
	_key: string;
	_type: string;
	marks: string[];
	text: string;
}

export interface MarkDef {
	_key: string;
	_type: string;
	href: string;
}

export interface Body {
	_key: string;
	_type: string;
	children: Child[];
	markDefs: MarkDef[];
	style: string;
	level?: number;
	listItem: string;
}

export interface Slug {
	_type: string;
	current: string;
}

export interface Post {
	_createdAt: Date;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: Date;
	author: Author;
	body: Body[];
	category: string;
	description: string;
	mainImageUrl: string;
	publishedAt: Date;
	slug: Slug;
	tags: string[];
	title: string;
	writtenAt: Date;
	theme: string;
	featured?: boolean;
}
