import { prisma } from "../../util/db";

const createStatus = async (workspaceId: number, status: { type: string }) => {
  const result = await prisma.workspaceStatus.create({
    data: {
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
      status: {
        create: status,
      },
    },
    select: {
      status: true,
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

export default { createStatus, deleteStatus };
