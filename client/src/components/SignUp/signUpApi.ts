import request, { gql } from "graphql-request";
import { InputSignUpProps, ResponseSignUpProps } from "./types";

export const signUpApi = async (user: InputSignUpProps) => {
  const mutation = gql`
    mutation signUpQuery($user: userSignUpInput!) {
      signup(user: $user) {
        id
        token
        name
      }
    }
  `;

  const variables = {
    user: user,
  };

  const data: ResponseSignUpProps = await request(
    import.meta.env.VITE_API as string,
    mutation,
    variables
  );
  return data;
};
