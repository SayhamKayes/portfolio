import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie, deleteCookie } from '@tanstack/react-start/server';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-do-not-use-in-prod';

export const getSessionUser = createServerFn({ method: 'GET' }).handler(async () => {
  const token = getCookie('admin_token');
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        emailVerification: true,
        phoneVerification: true,
        appVerification: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
});

export const login = createServerFn({ method: 'POST' })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    console.log('Login called with data:', data);
    const { username, password } = data;

    // Default admin if database is empty
    let user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      console.log('User not found, checking if we should create default admin');
      // In case no user exists, let's create a default admin
      const usersCount = await prisma.user.count();
      if (usersCount === 0 && username === 'admin' && password === 'password123') {
        const hashedPassword = await bcrypt.hash('password123', 10);
        user = await prisma.user.create({
          data: {
            username: 'admin',
            password: hashedPassword,
          }
        });
        console.log('Default admin created');
      } else {
        return { error: 'Invalid username or password' };
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: 'Invalid username or password' };
    }

    // Check if 2FA is needed
    if (user.emailVerification || user.phoneVerification || user.appVerification) {
      return {
        requires2FA: true,
        userId: user.id,
        modes: {
          email: user.emailVerification,
          phone: user.phoneVerification,
          app: user.appVerification
        }
      };
    }

    // No 2FA required, login directly
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    setCookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return { success: true };
  });

export const verify2FA = createServerFn({ method: 'POST' })
  .validator((data: { userId: string; code: string; mode: string }) => data)
  .handler(async ({ data }) => {
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) return { error: 'User not found' };

    // MOCK 2FA Verification (Any code '123456' works for now)
    // You would implement real TOTP / Email / SMS verification here
    if (data.code === '123456') {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
      setCookie('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24
      });
      return { success: true };
    }

    return { error: 'Invalid verification code' };
  });

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  deleteCookie('admin_token');
  return { success: true };
});

export const getLoginSettings = createServerFn({ method: 'GET' }).handler(async () => {
  const token = getCookie('admin_token');
  if (!token) throw new Error('Not authenticated');

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      username: true,
      email: true,
      phone: true,
      emailVerification: true,
      phoneVerification: true,
      appVerification: true,
    }
  });
});

export const updateLoginSettings = createServerFn({ method: 'POST' })
  .validator((data: {
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    emailVerification?: boolean;
    phoneVerification?: boolean;
    appVerification?: boolean;
  }) => data)
  .handler(async ({ data }) => {
    const token = getCookie('admin_token');
    if (!token) throw new Error('Not authenticated');

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const updateData: any = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id: decoded.userId },
      data: updateData
    });
  });

export const requestPasswordReset = createServerFn({ method: 'POST' })
  .validator((data: { username: string }) => data)
  .handler(async ({ data }) => {
    const user = await prisma.user.findUnique({ where: { username: data.username } });
    if (!user) return { success: true }; // Don't reveal if user exists

    // Mock reset token
    const token = 'RESET_123456';
    console.log(`[PASSWORD RESET] User ${data.username} requested reset. Code: ${token}`);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        recoveryToken: token,
        recoveryTokenExpiry: new Date(Date.now() + 15 * 60000) // 15 mins
      }
    });

    return { success: true };
  });

export const resetPassword = createServerFn({ method: 'POST' })
  .validator((data: { username: string; token: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const user = await prisma.user.findUnique({ where: { username: data.username } });
    
    if (!user || user.recoveryToken !== data.token || !user.recoveryTokenExpiry || user.recoveryTokenExpiry < new Date()) {
      return { error: 'Invalid or expired reset code' };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        recoveryToken: null,
        recoveryTokenExpiry: null
      }
    });

    return { success: true };
  });
