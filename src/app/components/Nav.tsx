"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../context/user";

export default function Nav() {
  const { user, isLoading, logout } = useUser();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/properties");
  }

  return (
    <nav>
      <Link href="/properties">Boenden</Link>

      {isLoading ? null : user ? (
        <>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Logga ut</button>
        </>
      ) : (
        <>
          <Link href="/login">Logga in</Link>
          <Link href="/register">Skapa konto</Link>
        </>
      )}
    </nav>
  );
}
