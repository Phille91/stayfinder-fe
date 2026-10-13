import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <main>
      <h1>Boendet finns inte</h1>
      <p>Det boende du letar efter har tagits bort eller aldrig funnits.</p>
      <Link href="/properties">Tillbaka till alla boenden</Link>
    </main>
  );
}
