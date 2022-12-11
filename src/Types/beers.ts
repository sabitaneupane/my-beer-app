export interface Beers {
  id?: number;
  name: string;
  description: string;
  genre?: string;
  tagline?: string;
  image_url?: string;
  ingredients?: Ingredients;
}

export interface Ingredients {
  [key: string]: IngredientsDetails[] | string;
}

export interface IngredientsDetails {
  name: string;
}
