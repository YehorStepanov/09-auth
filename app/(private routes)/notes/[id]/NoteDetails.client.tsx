'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import NotePreview from '@/components/NotePreview/NotePreview';
import router from 'next/router';
import Loader from '@/components/Loader/Loader';
import { fetchNoteById } from '@/lib/api/clientApi';

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();

  const {data: note, isLoading,error} = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  
  if (error || !note) return <p>Error loading note.</p>;
  return (
    <>
      <button onClick={() => router.back()}>Close</button>
      {isLoading && Loader}
      <NotePreview note={note} />
    </>
  );
}