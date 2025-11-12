
import type { AddNoteFormValue, Note, Tag } from '../../types/note';
import { User } from '@/types/user';
import { api } from './api';



export const register = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post('/auth/register', { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data: session } = await api.get('/auth/session');
    if (session?.success) {
      const { data: user } = await api.get('/users/me');
      return user;
    }

    return null;
  } catch (error) {
    console.error('checkSession error:', error);
    return null;
  }
};


// ---------- USER ----------
export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await api.patch('/users/me', { username });
  return data;
};

//! Old query

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(page:number, search:string, tag: Tag| null) : Promise<NoteResponse>{
  const res = await api.get<NoteResponse>("/notes", {
    params:{
        page,
        perPage: 12,
        sortBy: 'created',
        search,
        tag
    },
  });
  return res.data;
}
export async function createNote(note: AddNoteFormValue) {
  const res = await api.post<Note>("/notes", note);
  return res.data;
}
export async function deleteNote(id: string) {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id:string) : Promise<Note>{
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}