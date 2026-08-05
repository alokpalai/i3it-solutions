import bcrypt from "bcryptjs";

// bcryptjs, not bcrypt — the brief's tech stack names "bcrypt," but that
// package is a native addon requiring a C++ build toolchain (node-gyp) to
// install, which isn't reliably available on every dev machine (notably
// Windows without Visual Studio Build Tools/Python configured). bcryptjs
// is a pure-JS, API-compatible implementation of the same algorithm — same
// hash format, same security properties, no native compile step.
const SALT_ROUNDS = 12;

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}
