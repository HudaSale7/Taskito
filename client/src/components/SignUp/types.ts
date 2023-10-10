export interface InputSignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface ResponseSignUpProps {
  signup: {
    token: string;
    id: string;
    name: string;
  };
}