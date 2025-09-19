"use client";

import { useState, type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import css from "./NotesPage.module.css";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api/clientApi";

interface NoteClientProps {
  filter?: string;
}

export default function NotesClient({ filter }: NoteClientProps) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { query, page, tag: filter }],
    queryFn: () => fetchNotes(page, query, filter),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetQuery(value);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={inputValue} handleChange={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page - 1}
            onPageChange={(nextZeroBased) => setPage(nextZeroBased + 1)}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {data && <NoteList notes={data.notes}></NoteList>}
    </div>
  );
}
