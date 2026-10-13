"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main>
      <h1>Något gick fel</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Försök igen</button>
    </main>
  );
}
