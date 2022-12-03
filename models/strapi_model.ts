
export interface PostDetail {
    author: string;
    content: string;
    createdAt: string;
    description: string;
    featured: boolean;
    modifiedAt: string;
    publishedAt: string;
    tags: string[];
    id: number;
    title: string;
    uid: string;
    updatedAt: string;
    thumbnail: string;
}

export interface PostData {
    id: number;
    attributes: PostDetail;
}


export interface PostsResponse {
    data: PostData[]
}

export interface PostResponse {
    data: PostData
}