"use client";

import { Providers } from "@/components/providers";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <Providers>
      <Content />
    </Providers>
  );
}

function Content() {
  const { data: session, status } = useSession();

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a mi app</h1>
      <p>
        Estado de sesión: <strong>{status}</strong>
      </p>
      {session ? (
        <p>Hola, {session.user?.email}</p>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
