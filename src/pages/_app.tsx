import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/client/firebase";
import axios from "axios";
import { useCurrentStore } from "@/client/zustand";

export default function App({ Component, pageProps }: AppProps) {
  const setUser = useCurrentStore((state: any) => state.user.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log(token);
      }

      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-3 mx-auto max-w-screen-md">
        <Component {...pageProps} />
      </div>
    </>
  );
}
