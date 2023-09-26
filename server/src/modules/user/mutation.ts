import "dotenv/config";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { handleError } from "../../util/errorHandler.js";
import service from "./service.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();

export const userMutation = {
  signup: async (
    _: any,
    args: { user: { name: string; email: string; password: string } }
  ) => {
    const ifUserExist = await service.findUser(args.user.email);
    if (ifUserExist) {
      handleError({ message: "User Already Exist.", code: 422 });
    }

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const isValidEmail = emailRegex.test(args.user.email);
    if (!isValidEmail) {
      handleError({ message: "Please enter a valid email.", code: 422 });
    }

    const hashedPassword: string = await bcryptjs.hash(args.user.password, 12);
    const user = {
      name: args.user.name,
      email: args.user.email,
      password: hashedPassword,
    };

    const createdUser = await service.createUser(user);
    if (!createdUser) {
      handleError({ message: "User creation failed.", code: 500 });
    }
    const token: string = createToken({ id: createdUser.id, name: user.name });
    return {
      token: token,
      id: createdUser.id,
      name: user.name,
    };
  },

  login: async (
    _: any,
    args: { user: { email: string; password: string } }
  ) => {
    const user = await service.findUser(args.user.email);
    if (!user) {
      handleError({ message: "Wrong Email.", code: 422 })
      return null;
    }
    const valid = await bcryptjs.compare(args.user.password, user.password);
    if (!valid) {
      handleError({ message: "Wrong Password.", code: 422 });
      return null;
    }
    const token: string = createToken({ id: user.id, name: user.name });
    return {
      token: token,
      id: user.id,
      name: user.name,
    };
  },
  loginWithGoogle: async (_: any, args: { token: string }) => {
    const ticket = await client.verifyIdToken({
      idToken: args.token,
      audience:
        "721393511236-bbgrnnv9otomidedshcgmsn9gkqj0fd1.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    if (!email) {
      handleError({ message: "Wrong Email.", code: 422 });
      return null;
    }

    let user = await service.findUser(email);
    if (!user) {
      const name = payload?.name ? payload?.name : email;
      const newUser = {
        email: email,
        name: name,
        password: "",
      };
      user = await service.createUser(newUser);
    }
    const token: string = createToken({id: user.id, name: user.name});
    return {
      token: token,
      id: user.id,
      name: user.name,
    };
  },
};

const createToken = (user: { id: number; name: string }) => {
  const token: string = jwt.sign(
    { id: user.id, name: user.name },
    process.env.SECRET_KEY as string
  );
  return token;
}
