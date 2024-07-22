export enum Mode {
    Dark = "dark",
    Light = "light"
}

export enum SortOrder {
    Ascending = 'asc',
    Descending = 'desc',
}

export type Pokemon = {
    attack: number;
    defense: number;
    generation: number;
    hit_points: number;
    legendary: boolean;
    special_attack: number,
    special_defense: number,
    speed: string;
    total: number;
    number: number;
    name: string;
    icon_url: string,
    captured: boolean,
    type_one: string;
    type_two: string;
};

