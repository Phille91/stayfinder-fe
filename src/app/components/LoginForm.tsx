"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/user";

type Mode = "login" | "register";

type ErrorResponse = {
  message?: string;
  errors?: [string, string][];
};

export default function LoginForm({ mode = "login" }: { mode?: Mode }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();
  const { refresh } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${mode}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as ErrorResponse;

        if (data.errors) {
          setError(data.errors.map(([, message]) => message).join(". "));
        } else {
          setError(data.message ?? "Något gick fel");
        }
        return;
      }
      await refresh();
      router.push("/properties");
    } catch {
      setError("Kunde inte nå servern");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label>Lösenord</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit">
        {mode === "login" ? "Logga in" : "Skapa konto"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
