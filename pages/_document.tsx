import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAds } from "../src/data-contracts/contracts";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "${GoogleAds.adClient}",
            enable_page_level_ads: true
            });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
