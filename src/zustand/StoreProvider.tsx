import { type PropsWithChildren, useRef } from "react";
import type { AppshareStoreType } from ".";
import { initializeStore, Provider } from ".";

const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<AppshareStoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
