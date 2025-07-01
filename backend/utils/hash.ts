import bcrypt from 'bcrypt';

// Hashea una contraseña con sal de 10 rondas
export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Compara una contraseña en texto plano con su hash
export function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
