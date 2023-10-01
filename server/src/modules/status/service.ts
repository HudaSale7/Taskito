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
  return result.status;
};

const deleteStatus = async (statusId: number, workspaceId: number) => {
  const result = await prisma.workspaceStatus.delete({
    where: {
      workspaceId_statusId: { workspaceId, statusId },
    },
    select: {
      status: true,
    },
  });
  return result.status;
};

export default { createStatus, deleteStatus };
