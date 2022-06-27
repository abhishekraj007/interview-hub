import type { AppProps } from "next/app";
import { StoreContext, useStore } from "../src/stores";
// import "~antd/dist/antd.dark.min.css";
import "../src/styles/my-theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(undefined);

  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}

export default MyApp;
