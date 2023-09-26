import { GraphQLError } from "graphql";

export const handleError = (error: { message: string; code: number }) => {
  throw new GraphQLError(error.message, {
    extensions: {
      code: error.code,
    },
  });
};
