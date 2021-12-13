export interface Trailer {
    id: string;
    link: string;
}

export interface Cast {
    actor: string;
    actor_id: string;
    character: string;
}

export interface movieImdbData {
    id: string;
    title: string;
    year: string;
    length: string;
    rating: string;
    rating_votes: string;
    poster: string;
    plot: string;
    trailer: Trailer;
    cast: Cast[];
    technical_specs: string[][];
    
}