export interface Beers {
  id: number;
  genre: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  ingredients: Ingredients;
}

export interface Ingredients {
  [key: string]: IngredientsDetails[] | string;
}

export interface IngredientsDetails {
  name: string;
}
