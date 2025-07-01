import { Prisma, PrismaClient, Role } from '@db/generated/prisma';
import { hashPassword, comparePassword } from '@/backend/utils/hash';

const prisma = new PrismaClient();

// Crear un usuario
export async function createUserController(
  email: string,
  username: string,
  password: string,
  role: Role = Role.USER
) {
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password,
      role,
    },
  });
  return user;
}

// Obtener todos los usuarios
export async function getAllUsersController() {
  return prisma.user.findMany();
}

// Obtener usuario por ID
export async function getUserByIdController(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

// Obtener usuario por email
export async function getUserByEmailController(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Actualizar usuario (campos generales)
export async function updateUserController(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

// Eliminar usuario
export async function deleteUserController(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

// Cambiar contraseña de un usuario
export async function changePasswordController(userId: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await comparePassword(currentPassword, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect current password');
  }

  const hashed = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });

  return { message: 'Password changed successfully' };
}
