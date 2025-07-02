"use client";

import { Providers } from "@/components/providers";
import { useSession, signOut } from "next-auth/react";

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
        <>
          <p>Hola, {session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
