import Link from "next/link";
import css from "@/app/(private routes)/notes/filter/@sidebar/SidebarNotes.module.css";
import type { NoteTag } from "@/types/note";

export default async function TagsSidebar() {
  const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
