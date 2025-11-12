import { api } from './api';
import { Note, Tag } from '@/types/note';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';


export interface UserResponse{
  data:User,
  success: boolean
}
export const getMe = async ()=> {
   const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<UserResponse>('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export interface SessionResponse{
  success: boolean
}

export async function checkSession(): Promise<AxiosResponse<SessionResponse>> {
   const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return api.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });
}


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
export async function fetchNoteById(id:string) : Promise<Note>{
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}
