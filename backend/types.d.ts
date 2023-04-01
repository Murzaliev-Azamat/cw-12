export interface PhotoMutation {
  user: string;
  name: string;
  image: string | null;
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
