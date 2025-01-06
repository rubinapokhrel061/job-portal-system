"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
