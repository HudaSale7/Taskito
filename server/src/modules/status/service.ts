import { prisma } from "../../util/db";

const createStatus = async (workspaceId: number, status: { type: string }) => {
  const result = await prisma.status.create({
    data: {
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
      type: status.type,
    },
  });

  return result;
};

const deleteStatus = async (statusId: number) => {
  const result = await prisma.status.delete({
    where: {
      id: statusId,
    },
  });
  return result;
};

const getAllTask = async (statusId: number) => {
  const result = await prisma.task.findMany({
    where: {
      statusId: statusId,
    },
    orderBy: {
      id: "desc",
    },
  });
  return result;
};

export default { createStatus, deleteStatus, getAllTask };
