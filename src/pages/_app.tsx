import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/client/firebase";
import { useCurrentStore } from "@/client/zustand";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const checkUser = useCurrentStore((state: any) => state.checkUser);
  const isFetching = useRef(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        if (!isFetching.current) {
          isFetching.current = true;
          await checkUser(token, {
            name: user.displayName,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
