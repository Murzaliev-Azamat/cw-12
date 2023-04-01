export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  name: string;
  image: string;
}

export interface PhotoApi {
  name: string;
  image: File | null;
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
