import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "@/zustand/StoreProvider";
import Wrapper from "@/components/Wrapper";
import Scoreboard from "@/components/Scoreboard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider {...pageProps.initialZustandState}>
        <Wrapper>
          <ToastContainer />
          <Navbar />
          <div className="mt-20">
            <Component {...pageProps} />
          </div>
        </Wrapper>
      </StoreProvider>
    </>
  );
}
