import { prisma } from "../../util/db.js";
import { handleError } from "../../util/errorHandler.js";
import service from "../user/service.js";

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
  return result.workspace;
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
  return result.workspace;
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

const addUser = async (userEmail: string, workspaceId: number) => {
  const user = await service.findUser(userEmail);
  if (!user) {
    handleError({ message: "user not found", code: 404 });
    return;
  }
  const result = await prisma.userWorkspace.create({
    data: {
      accessType: AccessType[1],
      user: {
        connect: {
          id: user.id,
        },
      },
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
    },
    select: {
      workspace: true,
    },
  });
  return result.workspace;
};

const getAllUser = async (workspaceId: number) => {
  const result = await prisma.userWorkspace.findMany({
    where: {
      workspaceId: workspaceId,
    },
    select: {
      user: true,
    },
  });
  return result;
};

const gatAllTask = async (workspaceId: number) => {
  const result = await prisma.task.findMany({
    where: {
      workspaceId: workspaceId,
    },
  });
  return result;
};

const getAllStatus = async (workspaceId: number) => {
  const result = await prisma.workspaceStatus.findMany({
    where: {
      workspaceId: workspaceId,
    },
    select: {
      status: true,
    },
  });
  return result;
};

export default {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  getAllWorkspace,
  addUser,
  getAllUser,
  gatAllTask,
  getAllStatus,
};
