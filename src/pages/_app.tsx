import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "@/zustand/StoreProvider";
import Wrapper from "@/components/Wrapper";
import { Varela_Round } from "next/font/google";

const varelaRound = Varela_Round({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${varelaRound.style.fontFamily};
        }
      `}</style>
      <StoreProvider {...pageProps.initialZustandState}>
        <Wrapper>
          <ToastContainer />
          <Navbar />
          <div className="flex justify-center mt-20 mb-4 mx-auto max-w-screen-md">
            <Component {...pageProps} />
          </div>
        </Wrapper>
      </StoreProvider>
    </>
  );
}
