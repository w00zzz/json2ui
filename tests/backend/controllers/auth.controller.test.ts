// tests/user.controller.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userController from '@/backend/controllers/auth.controller';
import { Role, PrismaClient } from '@db/generated/prisma';
import { comparePassword, hashPassword } from '@/backend/utils/hash';

vi.mock('@db/generated/prisma', () => {
  const mUser = {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  return {
    PrismaClient: vi.fn(() => ({ user: mUser })),
    Role: { USER: 'USER', ADMIN: 'ADMIN' },
  };
});

vi.mock('@/backend/utils/hash', () => ({
  hashPassword: vi.fn(async (p) => 'hashed_' + p),
  comparePassword: vi.fn(async (a, b) => a === 'correct' && b === 'hashed_correct'),
}));

// Aquí está el cambio importante para evitar error TS con mocks:
const prisma = new PrismaClient() as unknown as {
  user: {
    create: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('User Controller', () => {
  it('should create a user', async () => {
    prisma.user.create.mockResolvedValue({ id: '1', email: 'a@a.com', username: 'a', password: 'hashed_pw', role: 'USER' });
    const result = await userController.createUserController('a@a.com', 'a', 'pw', Role.USER);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'a@a.com', username: 'a', password: 'pw', role: 'USER' },
    });
    expect(result).toMatchObject({ id: '1' });
  });

  it('should return all users', async () => {
    prisma.user.findMany.mockResolvedValue([{ id: '1' }, { id: '2' }]);
    const users = await userController.getAllUsersController();
    expect(users.length).toBe(2);
  });

  it('should get user by ID', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1' });
    const user = await userController.getUserByIdController('1');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(user?.id).toBe('1');
  });

  it('should get user by email', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'a@a.com' });
    const user = await userController.getUserByEmailController('a@a.com');
    expect(user?.email).toBe('a@a.com');
  });

  it('should update a user', async () => {
    prisma.user.update.mockResolvedValue({ id: '1', username: 'newname' });
    const result = await userController.updateUserController('1', { username: 'newname' });
    expect(result.username).toBe('newname');
  });

  it('should delete a user', async () => {
    prisma.user.delete.mockResolvedValue({ id: '1' });
    const result = await userController.deleteUserController('1');
    expect(result.id).toBe('1');
  });

  it('should change password successfully', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', password: 'hashed_correct' });
    prisma.user.update.mockResolvedValue({ id: '1' });

    const result = await userController.changePasswordController('1', 'correct', 'newpass');
    expect(result).toEqual({ message: 'Password changed successfully' });
    expect(prisma.user.update).toHaveBeenCalled();
  });

  it('should throw if current password is incorrect', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', password: 'hashed_correct' });
    const error = await userController.changePasswordController('1', 'wrong', 'newpass').catch(e => e);
    expect(error.message).toBe('Incorrect current password');
  });

  it('should throw if user not found on password change', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const error = await userController.changePasswordController('999', 'correct', 'newpass').catch(e => e);
    expect(error.message).toBe('User not found');
  });
});
