import { fetchServerNotes } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "@/app/(private routes)/notes/filter/[...slug]/Notes.client";
import { Metadata } from "next";

type RouteParams = { slug: string[] };

type Props = {
  params: Promise<RouteParams> | RouteParams;
};

const normalizeTag = (slug?: string[]): string | undefined => {
  const raw = slug?.[0];
  if (!raw) return undefined;
  const lower = raw.toLowerCase();
  if (lower === "all") return undefined;
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const filter = normalizeTag(resolved.slug);
  const ogTag = filter ?? "All";
  return {
    title: `NoteHub: ${ogTag}`,
    description: `Notes were filtered by ${ogTag} tag`,
    openGraph: {
      type: "website",
      url: `https://08-zustand-eight-delta.vercel.app/notes/filter/${ogTag}`,
      title: `NoteHub: ${ogTag}`,
      description: `Notes were filtered by ${ogTag} tag`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub: ${ogTag}`,
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const resolved = await params;
  const filter = normalizeTag(resolved.slug);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, query: "", tag: filter }],
    queryFn: () => fetchServerNotes(1, "", filter),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}
