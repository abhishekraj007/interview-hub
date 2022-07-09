import type { AppProps } from "next/app";
import Script from "next/script";
import { StoreContext, useStore } from "../src/stores";
// import "~antd/dist/antd.min.css";
// import "antd/dist/antd.css";
import "../src/styles/my-theme.css";
import "../src/styles/styles.css";

// <script
//   async
//   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6695906984875280"
//   // @ts-ignore
//   crossorigin="anonymous"
// ></script>;

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(undefined);

  return (
    <StoreContext.Provider value={store}>
      <Script
        id="adsense-id"
        async
        onError={(e) => {
          console.error("Adsense failed to load", e);
        }}
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6695906984875280"
        // @ts-ignore
        crossorigin="anonymous"
      />
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}

export default MyApp;
