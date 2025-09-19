import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox({ query, handleChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={query}
      onChange={handleChange}
    />
  );
}
