import * as crypto from 'crypto';

export function generateToken(userId: string, salt: string): string {
  return crypto
    .createHash('sha256')
    .update(userId + salt)
    .digest('hex');
}
