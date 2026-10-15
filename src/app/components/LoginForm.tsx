"use client";

import * as React from "react";

type Mode = "login" | "register";

export default function LoginForm({ mode = "login" }: { mode?: Mode }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${mode}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
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
    </form>
  );
}
