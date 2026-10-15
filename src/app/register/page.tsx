import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function RegisterPage() {
  return (
    <main>
      <h1></h1>
      <LoginForm mode="register" />
      <p>
        Har du redan ett konto? <Link href="/login">Logga in</Link>
      </p>
    </main>
  );
}
