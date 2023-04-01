export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  user: string;
  name: string;
  recipe: string;
  image: string | null;
  ingredients: Ingredient[];
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image?: string;
}
