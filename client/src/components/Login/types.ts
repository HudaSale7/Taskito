export interface InputLoginProps {
  email: string;
  password: string;
}

export interface ResponseLoginProps {
  login: {
    token: string;
    id: string;
    name: string;
  }
}