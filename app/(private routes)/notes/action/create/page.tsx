import css from "@/app/(private routes)/notes/action/create/CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note",
  openGraph: {
    type: "website",
    url: "https://09-auth-nu-lilac.vercel.app/notes/action/create",
    title: "Create note",
    description: "Create a new note",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a new note",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
