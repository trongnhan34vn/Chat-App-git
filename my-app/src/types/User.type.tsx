export interface IUser {
  id: number;
  name?: string;
  email: string;
  image: string;
  password: string;
}

export interface IRegisForm {
  name?: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}