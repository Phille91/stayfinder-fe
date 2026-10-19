"use client";

import { useUser } from "../context/user";
import { redirect } from "next/navigation";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  if (!user && !isLoading) {
    redirect("/login");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="container mx-auto">{children}</div>;
}
