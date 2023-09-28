import { prisma } from "../../util/db.js";

enum AccessType {
  "CREATOR",
  "USER",
}

const createWorkspace = async (
  workspace: { title: string },
  userId: number
) => {
  const result = await prisma.userWorkspace.create({
    data: {
      accessType: AccessType[0],
      user: {
        connect: {
          id: userId,
        },
      },
      workspace: {
        create: workspace,
      },
    },
    select: {
      workspace: true,
    },
  });
  return result;
};

const deleteWorkspace = async (workspaceId: number, userId: number) => {
  const result = await prisma.userWorkspace.delete({
    where: {
      userId_workspaceId: { userId: userId, workspaceId: workspaceId },
      accessType: AccessType[0],
    },
    select: {
      workspace: true,
    },
  });
  return result;
};

const getWorkspace = async (workspaceId: number, userId: number) => {
  const result = await prisma.userWorkspace.findUnique({
    where: {
      userId_workspaceId: { userId: userId, workspaceId: workspaceId },
    },
    select: {
      workspace: true,
      accessType: true,
    },
  });
  return result;
};

const getAllWorkspace = async (userId: number) => {
  const result = await prisma.userWorkspace.findMany({
    where: {
      userId: userId,
    },
    select: {
      workspace: true,
    },
  });
  return result;
};

export default {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  getAllWorkspace,
};
