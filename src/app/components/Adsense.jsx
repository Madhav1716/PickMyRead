import Script from "next/script";

const AdSense = () => {
  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_CLIENT_ID"
        data-ad-slot="YOUR_ADSENSE_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9168362458076214`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default AdSense;
