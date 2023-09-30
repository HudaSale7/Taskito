import { prisma } from "../../util/db";

type Todo = {
  content: string;
  completed: boolean;
};

interface CreateTaskArgs {
  title: string;
  priority: string;
  workspaceId: string;
  statusId: string;
  todos: Todo[];
  usersId: string[];
}

const createTask = async (args: CreateTaskArgs) => {
  const task = await prisma.task.create({
    data: {
      title: args.title,
      priority: args.priority,
      workspaceId: Number(args.workspaceId),
      statusId: Number(args.statusId),
      todos: {
        create: args.todos,
      },
    },
  });
  args.usersId.map(async (id) => {
    const connectUsersToTask = await prisma.userTask.create({
      data: {
        user: {
          connect: {
            id: Number(id),
          },
        },
        task: {
          connect: {
            id: task.id,
          },
        },
      },
    });
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

export default { createTask, deleteTask, getTask };
