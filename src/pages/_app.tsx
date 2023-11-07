import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "@/zustand/StoreProvider";
import Wrapper from "@/components/Wrapper";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: "400" });
const outfitBold = Outfit({ subsets: ["latin"], weight: "600" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${outfit.style.fontFamily};
          font-size: 18px;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${outfitBold.style.fontFamily}, sans-serif;
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
