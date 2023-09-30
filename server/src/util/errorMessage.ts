import { handleError } from "./errorHandler";

export const checkAuthentication = (contextValue: any) => {
  if (!contextValue.user) {
    handleError({ message: "Not Authenticated", code: 422 });
  }
};

export const checkForServerError = (result: any) => {
  if (!result) {
    handleError({ message: "server error", code: 500 });
  }
};


