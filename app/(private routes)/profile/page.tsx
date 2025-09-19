import css from "@/app/(private routes)/profile/ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export default async function Profile() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "User Profile",
  description: "User's profile page",
  openGraph: {
    type: "website",
    url: "https://09-auth-nu-lilac.vercel.app/",
    title: "User Profile",
    description: "User's profile page",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "User's profile page",
      },
    ],
  },
};
