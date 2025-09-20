"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import Loader from "@/app/loading";
import { useAuthStore } from "@/lib/store/authStore";

export default function Edit() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        setUsername(user.username || "");
        setEmail(user.email || "");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const currentUser = await getMe();
        setUsername(currentUser.username || "");
        setEmail(currentUser.email || "");
        setUser(currentUser);
      } catch (err) {
        console.error(err);
        setError("Unable to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, setUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/profile");
    }
  };

  if (loading) return <Loader />;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="/avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        {error && <p className={css.error}>{error}</p>}

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
