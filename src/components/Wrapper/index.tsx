import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/client/firebase";
import { useStore } from "@/zustand";
import { type PropsWithChildren, useEffect, useRef } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
  const checkUser = useStore((state) => state.checkUser);
  const isFetching = useRef(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        if (!isFetching.current) {
          isFetching.current = true;
          await checkUser(user, {
            name: user.displayName,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default Wrapper;
