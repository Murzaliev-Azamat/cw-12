export interface Cocktail {
  _id: string;
  name: string;
  image: string;
  recipe: string;
  ingredients: IngredientPayload[];
  isPublished: boolean;
}

export interface IngredientPayload {
  _id: string;
  name: string;
  amount: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailApi {
  name: string;
  image: File | null;
  recipe: string;
  ingredients: Ingredient[];
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  image: File | null;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  image?: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
