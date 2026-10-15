import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <h1></h1>
      <LoginForm mode="login" />
      <p>
        Inget konto? <Link href="/register">Skapa ett konto</Link>
      </p>
    </main>
  );
}
