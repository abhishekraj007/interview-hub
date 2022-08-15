import React, { useEffect } from "react";
import { GoogleAds } from "../data-contracts/contracts";

export default function Adsense() {
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("adsense error", error);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={GoogleAds.adClient}
      data-ad-slot="9728624437"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
