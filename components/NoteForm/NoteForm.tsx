"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { createNote } from "@/lib/api/clientApi";
import type { NewNote } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: (values: NewNote) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      if (onClose) {
        onClose();
      } else {
        router.push("/notes/filter/all");
      }
    },

    onError: (err) => {
      console.error("Failed to create note:", err);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: NewNote = {
      title: draft.title.trim(),
      content: draft.content.trim(),
      tag: draft.tag,
    };
    mutation.mutate(values);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraft({ ...draft, tag: e.target.value as NoteTag });
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/notes/filter/all");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          className={css.input}
          required
          disabled={mutation.isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          name="content"
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          className={css.textarea}
          required
          disabled={mutation.isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleTagChange}
          className={css.select}
          required
          disabled={mutation.isPending}
        >
          <option value="">Select tag…</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={mutation.isPending}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={
            mutation.isPending ||
            !draft.title.trim() ||
            !draft.content.trim() ||
            !draft.tag
          }
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
