import * as jwt from 'jsonwebtoken';
/**
 * Return access token.
 *
 * @param data
 * @returns {string}
 */
export function generateAccessToken(data:{}): string{
  return jwt.sign({ encryptedData: data }, 'secret', { expiresIn: 20 });
}
/**
 * Return refresh token.
 *
 * @param data
 * @returns {string}
 */
export function generateRefreshToken(data:{}): string {
  return jwt.sign({ encryptedData: data }, 'refreshsecret', {
    expiresIn: 120000
  });
}

/**
 * Verify access token.
 *
 */
export function verifyAccessToken(token:string): object | string {
  return jwt.verify(token, 'secret');
}

/**
 * Verify refresh token.
 *
 */
export function verifyRefreshToken(token:string): object | string {
  return jwt.verify(token, 'refreshsecret');
}
