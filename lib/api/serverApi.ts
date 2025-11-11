import { cookies } from 'next/headers';
import { api } from './api';

export const getMe = async ()=> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await api.get('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await api.get('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};
