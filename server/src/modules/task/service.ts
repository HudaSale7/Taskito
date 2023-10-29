import { prisma } from "../../util/db";
import { handleError } from "../../util/errorHandler";
import service from "../user/service";

type Todo = {
  content: string;
  completed: boolean;
};

interface CreateTaskArgs {
  title: string;
  priority: string;
  statusId: string;
  todos: Todo[];
  users: string[];
}

const createTask = async (args: CreateTaskArgs) => {
  const task = await prisma.task.create({
    data: {
      title: args.title,
      priority: args.priority,
      statusId: Number(args.statusId),
      todos: {
        create: args.todos,
      },
    },
  });

  const usersId = await prisma.user.findMany({
    where: {
      email: {
        in: args.users,
      },
    },
    select: {
      id: true,
    },
  }) 

  const userTaskConnect = usersId.map((user) => {
    return {
      userId: user.id,
      taskId: task.id,
    };
  })

  const connectUsersToTask = await prisma.userTask.createMany({
    data: userTaskConnect,
  });
  return task;
};

const deleteTask = async (taskId: number) => {
  const task = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return task;
};

const getTask = async (taskId: number) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
  return task;
};

const addUserToTask = async (userEmail: string, taskId: number) => {
  const user = await service.findUser(userEmail);
  if (!user) {
    handleError({ message: "user not found", code: 404 });
    return;
  }
  const result = await prisma.userTask.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      task: {
        connect: {
          id: taskId,
        },
      },
    },
    select: {
      task: true,
    },
  });
  return result.task;
};

const getAllTodo = async (taskId: number) => {
  const result = await prisma.todo.findMany({
    where: {
      taskId: taskId,
    },
  });
  return result;
};

const getAllUser = async (taskId: number) => {
  const users = await prisma.userTask.findMany({
    where: {
      taskId: taskId,
    },
    select: {
      user: true,
    },
  });
  return users;
};

export default {
  createTask,
  deleteTask,
  getTask,
  addUserToTask,
  getAllTodo,
  getAllUser,
};
