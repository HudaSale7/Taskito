import { prisma } from "../../util/db";

const createTodo = async (taskId: number, content: string) => {
  const result = await prisma.todo.create({
    data: {
      content: content,
      completed: false,
      task: {
        connect: {
          id: taskId,
        },
      },
    },
  });
  return result;
};

const markAsCompleted = async (id: number) => {
  const result = await prisma.todo.update({
    data: {
      completed: true,
    },
    where: {
      id: id,
    },
  });
  return result;
};

const deleteTodo = async (id: number) => {
  const result = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export default { createTodo, markAsCompleted, deleteTodo };
