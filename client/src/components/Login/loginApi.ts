import request, { gql } from "graphql-request";
import { InputLoginProps, ResponseLoginProps } from "./types";

export const loginApi = async (user: InputLoginProps) => {
    const mutation = gql`
      mutation loginQuery($user: userLoginInput!) {
        login(user: $user) {
          id
          token
          name
        }
      }
    `;
    const variables = {
      user: user,
    };

    const data: ResponseLoginProps = await request(
      import.meta.env.VITE_API as string,
      mutation,
      variables
    );
    return data;
}
