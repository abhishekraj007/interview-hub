import type { AppProps } from "next/app";
import { StoreContext, useStore } from "../src/stores";
// import "~antd/dist/antd.min.css";
// import "antd/dist/antd.css";
import "../src/styles/my-theme.css";
import "../src/styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(undefined);

  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}

export default MyApp;
