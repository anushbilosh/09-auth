import { fetchServerNotes } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "@/app/(private routes)/notes/filter/[...slug]/Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = slug?.[0] ?? "all";
  const filter = raw.toLowerCase() === "all" ? undefined : raw;
  return {
    title: `NoteHub: ${filter}`,
    description: `Notes were filtered by ${filter} tag`,
    openGraph: {
      type: "website",
      url: `https://08-zustand-eight-delta.vercel.app/notes/filter/${filter}`,
      title: `NoteHub: ${filter}`,
      description: `Notes were filtered by ${filter} tag`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub: ${filter}`,
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const filter = slug[0] === "All" ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag: filter }],
    queryFn: () => fetchServerNotes(1, "", filter),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}
