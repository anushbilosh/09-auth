import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "NoteHub page not found",
  openGraph: {
    type: "website",
    url: "https://08-zustand-eight-delta.vercel.app/not-found",
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Sorry, the page you are looking for does not exist",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
